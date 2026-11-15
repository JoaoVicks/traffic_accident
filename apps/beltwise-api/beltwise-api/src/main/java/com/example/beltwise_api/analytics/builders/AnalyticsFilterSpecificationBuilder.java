package com.example.beltwise_api.analytics.builders;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.dtos.dashboard.AnalyticFilterDTO;
import com.example.beltwise_api.analytics.specifications.AnalyticsFilterSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class AnalyticsFilterSpecificationBuilder {

    public Specification<Accident> build(AnalyticFilterDTO filter) {

        Specification<Accident> specification =
                Specification.unrestricted();

        assert filter != null;

        if (filter.startDate() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification
                            .hasDateGreaterThanOrEqualTo(filter.startDate())
            );
        }

        if (filter.endDate() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification
                            .hasDateLessThanOrEqualTo(filter.endDate())
            );
        }

        if (filter.vehicleType() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification
                            .hasVehicleType(filter.vehicleType())
            );
        }

        if (filter.startTime() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification
                            .hasTimeGreaterThanOrEqualTo(filter.startTime())
            );
        }

        if (filter.endTime() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification
                            .hasTimeLessThanOrEqualTo(filter.endTime())
            );
        }

        if (filter.accidentClassification() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification
                            .hasAccidentClassification(
                                    filter.accidentClassification()
                            )
            );
        }

        return specification;
    }
}
