package com.example.beltwise_api.analytics.specifications;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.vehicle.models.Vehicle;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AnalyticsFilterSpecification {

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

    public static Specification<Accident> hastTimeGreaterThanOrEqualTo(LocalTime startTime){
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("time"),startTime)
                );
    }

    public static Specification<Accident> hastTimeLessThanOrEqualTo(LocalTime endTime){
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



}
