package com.example.beltwise_api.analytics.services;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.dtos.AccidentSummaryResponseDTO;
import com.example.beltwise_api.analytics.dtos.AnalyticFilterDTO;
import com.example.beltwise_api.analytics.dtos.SeverityDistributionResponseDTO;
import com.example.beltwise_api.analytics.enums.SeverityDistributionType;
import com.example.beltwise_api.analytics.repositories.AnalyticsRepository;
import com.example.beltwise_api.analytics.specifications.AnalyticsFilterSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;

    @Autowired
    public AnalyticsService(AnalyticsRepository analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }


    public AccidentSummaryResponseDTO getSummary(AnalyticFilterDTO filter) {

        Specification<Accident> specification = Specification.unrestricted();

        assert filter != null;

        if (filter.startDate() != null) {
            specification = specification.and(
                AnalyticsFilterSpecification.hasDateGreaterThanOrEqualTo(filter.startDate())
            );
        }
        if (filter.endDate() != null) {
            specification = specification.and(
                AnalyticsFilterSpecification.hasDateLessThanOrEqualTo(filter.endDate())
            );
        }

        if(filter.vehicleType() != null){
            specification = specification.and(
                    AnalyticsFilterSpecification.hasVehicleType(filter.vehicleType())
            );
        }

        if(filter.startTime() != null ){
            specification = specification.and(
                    AnalyticsFilterSpecification.hastTimeGreaterThanOrEqualTo(filter.startTime())
            );
        }

        if(filter.endTime() != null ){
            specification = specification.and(
                    AnalyticsFilterSpecification.hastTimeLessThanOrEqualTo(filter.endTime())
            );
        }

        if (filter.accidentClassification() != null){
            specification = specification.and(
                    AnalyticsFilterSpecification.hasAccidentClassification(filter.accidentClassification())
            );
        }


        return this.analyticsRepository.getSummary(specification);
    }

    public List<SeverityDistributionResponseDTO> getSeverityDistribution(AnalyticFilterDTO filter, SeverityDistributionType type) {

        Specification<Accident> specification = Specification.unrestricted();

        assert filter != null;

        if (filter.startDate() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification.hasDateGreaterThanOrEqualTo(filter.startDate())
            );
        }
        if (filter.endDate() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification.hasDateLessThanOrEqualTo(filter.endDate())
            );
        }

        if (filter.vehicleType() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification.hasVehicleType(filter.vehicleType())
            );
        }

        if (filter.startTime() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification.hastTimeGreaterThanOrEqualTo(filter.startTime())
            );
        }

        if (filter.endTime() != null) {
            specification = specification.and(
                    AnalyticsFilterSpecification.hastTimeLessThanOrEqualTo(filter.endTime())
            );
        }


        return switch (type) {
            case ACCIDENT -> this.analyticsRepository.getSeverityDistributionAccident(specification);
            case VICTIM -> this.analyticsRepository.getSeverityDistributionVictim(specification);
            default -> throw new IllegalArgumentException("Unsupported severity distribution type: " + type);
        };


    }

    }