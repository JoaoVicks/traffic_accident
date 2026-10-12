package com.example.beltwise_api.analytics.repositories;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.dtos.*;
import com.example.beltwise_api.vehicle.models.Vehicle;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.hibernate.Session;
import org.hibernate.query.common.TemporalUnit;
import org.hibernate.query.criteria.HibernateCriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public class AnalyticsRepository {

    private final EntityManager entityManager;

    @Autowired
    public AnalyticsRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    public AccidentSummaryResponseDTO getSummary(Specification<Accident> specification) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<AccidentSummaryResponseDTO> query = criteriaBuilder.createQuery(AccidentSummaryResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        Predicate predicate = specification.toPredicate(root, query, criteriaBuilder);

        query.where(predicate);

        Expression<Long> accidentCount = criteriaBuilder.count(root);
        Expression<Long> peoplePerAccident =
                criteriaBuilder.sum(
                        criteriaBuilder.toLong(root.get("totalInjuries")),
                        criteriaBuilder.toLong(root.get("uninjuredPeople"))
                );

        Expression<Long> victimsCount =
                criteriaBuilder.sum(peoplePerAccident);

        query.select(
                criteriaBuilder.construct(
                        AccidentSummaryResponseDTO.class,
                        accidentCount,
                        victimsCount
                )
        );

        return entityManager.createQuery(query).getSingleResult();
    }

    public List<SeverityDistributionResponseDTO> getSeverityDistributionAccident(Specification<Accident> specification) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<SeverityDistributionResponseDTO> query =
                criteriaBuilder.createQuery(SeverityDistributionResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        Predicate predicate = specification.toPredicate(root, query, criteriaBuilder);

        query.where(predicate);

        Path<String> severity = root.get("accidentClassification");

        query.select(
                criteriaBuilder.construct(
                        SeverityDistributionResponseDTO.class,
                        severity,
                        criteriaBuilder.count(root)
                )
        );

        query.groupBy(severity);

        return entityManager.createQuery(query).getResultList();
    }


    public List<SeverityDistributionResponseDTO> getSeverityDistributionVictim(Specification<Accident> specification) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<SeverityDistributionResponseDTO> query =
                criteriaBuilder.createQuery(SeverityDistributionResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        Predicate predicate = specification.toPredicate(root, query, criteriaBuilder);

        query.where(predicate);

        Expression<Long> peoplePerAccident =
                criteriaBuilder.sum(
                        criteriaBuilder.toLong(root.get("totalInjuries")),
                        criteriaBuilder.toLong(root.get("uninjuredPeople"))
                );

        Expression<Long> victimsCount =
                criteriaBuilder.sum(peoplePerAccident);

        Path<String> severity = root.get("accidentClassification");

        query.select(
                criteriaBuilder.construct(
                        SeverityDistributionResponseDTO.class,
                        severity,
                        victimsCount
                )
        );

        query.groupBy(severity);

        return entityManager.createQuery(query).getResultList();
    }

    public List<VehiclesDistributionResponseDTO> getVehicleDistribution(Specification<Accident> specification) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<VehiclesDistributionResponseDTO> query =
                criteriaBuilder.createQuery(VehiclesDistributionResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        // Join tables
        Join<Accident,Vehicle> vehicleJoin = root.join("vehicles",JoinType.INNER);

        Predicate predicate =  specification.toPredicate(root,query,criteriaBuilder);

        query.where(predicate);
        Path<String> vehicleType =  vehicleJoin.get("vehicleType");


        query.select(
                criteriaBuilder.construct(
                 VehiclesDistributionResponseDTO.class,
                        vehicleType,
                        criteriaBuilder.count(vehicleJoin)
                )
        );

        query.groupBy(vehicleType);

        return entityManager.createQuery(query).getResultList();
    }

    public List<WeatherDistributionResponseDTO> getWeatherDistribution(Specification<Accident> specification) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<WeatherDistributionResponseDTO> query =
                criteriaBuilder.createQuery(WeatherDistributionResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        Predicate predicate =  specification.toPredicate(root,query,criteriaBuilder);

        Path<String> weatherCondition = root.get("weatherCondition");

        Expression<Long> quantityAccidentByWeather = criteriaBuilder.count(root);

        query.where(predicate);


        query.select(
                criteriaBuilder.construct(
                        WeatherDistributionResponseDTO.class,
                        weatherCondition,
                        quantityAccidentByWeather
                )
        );

        query.groupBy(weatherCondition);
        query.orderBy(
                criteriaBuilder.asc(quantityAccidentByWeather)
        );


        return entityManager.createQuery(query).getResultList();
    }


    public List<TimeDistributionResponseDTO> getTimeDistribution(Specification<Accident> specification) {

        HibernateCriteriaBuilder criteriaBuilder =  entityManager.unwrap(Session.class).getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<TimeDistributionResponseDTO> query =
                criteriaBuilder.createQuery(TimeDistributionResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        Predicate predicate =  specification.toPredicate(root,query,criteriaBuilder);

        Expression<LocalTime> time = criteriaBuilder.truncate(root.get("time"), TemporalUnit.HOUR );
        query.where(predicate);


        query.select(
                criteriaBuilder.construct(
                        TimeDistributionResponseDTO.class,
                        time,
                        criteriaBuilder.count(root)

                )
        );


        query.groupBy(time);
        query.orderBy(
                criteriaBuilder.asc(time)
        );


        return entityManager.createQuery(query).getResultList();
    }
}
