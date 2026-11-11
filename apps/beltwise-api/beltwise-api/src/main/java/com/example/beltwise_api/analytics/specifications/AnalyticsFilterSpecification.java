package com.example.beltwise_api.analytics.specifications;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.city.models.City;
import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.state.models.State;
import com.example.beltwise_api.vehicle.models.Vehicle;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class  AnalyticsFilterSpecification {

    public static Specification<Accident> hasDateGreaterThanOrEqualTo(LocalDate startDate){
        return (
                (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("date"), startDate)
                );
    }

    public static Specification<Accident> hasDateLessThanOrEqualTo(LocalDate endDate){
        return (
                (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("date"),endDate)
                );
    }

    public static Specification<Accident> hasTimeGreaterThanOrEqualTo(LocalTime startTime){
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("time"),startTime)
                );
    }

    public static Specification<Accident> hasTimeLessThanOrEqualTo(LocalTime endTime){
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("time"),endTime)
                );
    }

    public static Specification<Accident> hasVehicleType(String vehicleType) {
        return ((root, query, criteriaBuilder) -> {
            Subquery<Vehicle> subquery = query.subquery(Vehicle.class);
            Root<Vehicle> vehicle = subquery.from(Vehicle.class);

            subquery.select(vehicle)
                    .where(
                            criteriaBuilder.equal(vehicle.get("accident"), root),
                            criteriaBuilder.equal(vehicle.get("vehicleType"), vehicleType)
                    );

            return criteriaBuilder.exists(subquery);
        });
    }


    public static Specification<Accident> hasAccidentClassification(String accidentClassification){
        return ((root, query, criteriaBuilder) ->
            criteriaBuilder.equal(root.get("accidentClassification"), accidentClassification)
        );


    }


    public static Specification<Accident> belongsToState(UUID stateId) {
        return (root, query, criteriaBuilder) -> {

            Join<Accident, City> cityJoin = root.join("city", JoinType.INNER);
            Join<City, State> stateJoin = cityJoin.join("state", JoinType.INNER);

               return criteriaBuilder.equal(stateJoin.get("id"), stateId );
        };
    }

    public static Specification<Accident> belongsToCity(UUID cityId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("city"), cityId );
    }

    public static Specification<Accident> belongsToRoad(UUID roadId) {
        return (root, query, criteriaBuilder) -> {

            Join<Accident, Road> roadJoin = root.join("road", JoinType.INNER);

            return criteriaBuilder.equal(roadJoin.get("id"), roadId );
        };

    }
}
