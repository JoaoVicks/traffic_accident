package com.example.beltwise_api.analytics.services;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.dtos.dashboard.*;
import com.example.beltwise_api.analytics.dtos.ranking.CityRankingResponseDTO;
import com.example.beltwise_api.analytics.enums.ranking.CityRankingCriteriaType;
import com.example.beltwise_api.analytics.enums.OrderByType;
import com.example.beltwise_api.analytics.enums.dashboard.SeverityDistributionType;
import com.example.beltwise_api.analytics.enums.dashboard.TimeDistributionType;
import com.example.beltwise_api.analytics.enums.ranking.RankingType;
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
            default -> throw new IllegalArgumentException("Unsupported severity distribution by type: " + type);
        };


    }

    public List<VehiclesDistributionResponseDTO> getVehicleDistribution(AnalyticFilterDTO filter) {

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


        return this.analyticsRepository.getVehicleDistribution(specification);
    }


    public List<WeatherDistributionResponseDTO> getWeatherDistribution(AnalyticFilterDTO filter) {

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

        return this.analyticsRepository.getWeatherDistribution(specification);

    }

    public List<TimeDistributionResponseDTO> getTimeDistribution(AnalyticFilterDTO filter, TimeDistributionType type) {

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


       return switch (type){
           case VICTIM -> this.analyticsRepository.getTimeDistributionByVictim(specification);
           case ACCIDENT -> this.analyticsRepository.getTimeDistributionByAccident(specification);
           default -> throw new IllegalArgumentException("Unsupported time distribution by type: " + type);
       };

    }

    public List<CityRankingResponseDTO> getCitiesRanking(CityRankingCriteriaType criteria, OrderByType orderByType) {

        return switch (criteria){
            case ACCIDENTS -> this.analyticsRepository.getCitiesRankingByAccidentsCount(orderByType);
            case DEATHS -> this.analyticsRepository.getCitiesRankingByDeathsCount(orderByType);
            case VEHICLES -> this.analyticsRepository.getCitiesRankingByVehiclesCount(orderByType);
        };

    }
}