package com.example.beltwise_api.analytics.builders;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.dtos.dashboard.AnalyticFilterDTO;
import com.example.beltwise_api.analytics.specifications.AnalyticsFilterSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;


@Component
public class AnalyticsGeographicScopeSpecificationBuilder {

    public Specification<Accident> build(AnalyticFilterDTO filter) {

        if (filter.searchType() == null ||
                filter.searchId() == null) {
            return Specification.unrestricted();
        }

        return switch (filter.searchType()) {

            case STATES ->
                    AnalyticsFilterSpecification
                            .belongsToState(filter.searchId());

            case CITIES ->
                    AnalyticsFilterSpecification
                            .belongsToCity(filter.searchId());

            case ROADS ->
                    AnalyticsFilterSpecification
                            .belongsToRoad(filter.searchId());
        };
    }

}
