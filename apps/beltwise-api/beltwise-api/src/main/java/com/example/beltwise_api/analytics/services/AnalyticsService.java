package com.example.beltwise_api.analytics.services;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.builders.AnalyticsFilterSpecificationBuilder;
import com.example.beltwise_api.analytics.builders.AnalyticsGeographicScopeSpecificationBuilder;
import com.example.beltwise_api.analytics.dtos.dashboard.*;
import com.example.beltwise_api.analytics.dtos.ranking.CityRankingResponseDTO;
import com.example.beltwise_api.analytics.dtos.ranking.PageRequestDTO;
import com.example.beltwise_api.analytics.dtos.ranking.RoadRankingResponseDTO;
import com.example.beltwise_api.analytics.dtos.ranking.StateRankingResponseDTO;
import com.example.beltwise_api.analytics.enums.ranking.CityRankingCriteriaType;
import com.example.beltwise_api.analytics.enums.OrderByType;
import com.example.beltwise_api.analytics.enums.dashboard.SeverityDistributionType;
import com.example.beltwise_api.analytics.enums.dashboard.TimeDistributionType;
import com.example.beltwise_api.analytics.repositories.AnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;
    private final AnalyticsFilterSpecificationBuilder analyticsFilterSpecificationBuilder;
    private final AnalyticsGeographicScopeSpecificationBuilder analyticsGeographicScopeSpecificationBuilder;

    @Autowired
    public AnalyticsService(AnalyticsRepository analyticsRepository,
                            AnalyticsFilterSpecificationBuilder analyticsFilterSpecificationBuilder,
                            AnalyticsGeographicScopeSpecificationBuilder analyticsGeographicScopeSpecificationBuilder

    ) {
        this.analyticsRepository = analyticsRepository;
        this.analyticsFilterSpecificationBuilder = analyticsFilterSpecificationBuilder;
        this.analyticsGeographicScopeSpecificationBuilder = analyticsGeographicScopeSpecificationBuilder;
    }


    public AccidentSummaryResponseDTO getSummary(AnalyticFilterDTO filter) {

        Specification<Accident> specification = this.analyticsFilterSpecificationBuilder.build(filter).and(this.analyticsGeographicScopeSpecificationBuilder.build(filter));


        return this.analyticsRepository.getSummary(specification);
    }

    public List<SeverityDistributionResponseDTO> getSeverityDistribution(AnalyticFilterDTO filter, SeverityDistributionType type) {

        Specification<Accident> specification = this.analyticsFilterSpecificationBuilder.build(filter).and(this.analyticsGeographicScopeSpecificationBuilder.build(filter));

        return switch (type) {
            case ACCIDENT -> this.analyticsRepository.getSeverityDistributionAccident(specification);
            case VICTIM -> this.analyticsRepository.getSeverityDistributionVictim(specification);
        };


    }

    public List<VehiclesDistributionResponseDTO> getVehicleDistribution(AnalyticFilterDTO filter) {

        Specification<Accident> specification = this.analyticsFilterSpecificationBuilder.build(filter).and(this.analyticsGeographicScopeSpecificationBuilder.build(filter));

        return this.analyticsRepository.getVehicleDistribution(specification);
    }


    public List<WeatherDistributionResponseDTO> getWeatherDistribution(AnalyticFilterDTO filter) {

        Specification<Accident> specification = this.analyticsFilterSpecificationBuilder.build(filter).and(this.analyticsGeographicScopeSpecificationBuilder.build(filter));

        return this.analyticsRepository.getWeatherDistribution(specification);

    }

    public List<TimeDistributionResponseDTO> getTimeDistribution(AnalyticFilterDTO filter, TimeDistributionType type) {

        Specification<Accident> specification = this.analyticsFilterSpecificationBuilder.build(filter).and(this.analyticsGeographicScopeSpecificationBuilder.build(filter));

                return switch (type){
                    case VICTIM -> this.analyticsRepository.getTimeDistributionByVictim(specification);
                    case ACCIDENT -> this.analyticsRepository.getTimeDistributionByAccident(specification);
                };


    }

    public List<CityRankingResponseDTO> getCitiesRanking(CityRankingCriteriaType criteria, OrderByType orderByType, PageRequestDTO pageRequestDTO) {

        return switch (criteria){
            case ACCIDENTS -> this.analyticsRepository.getCitiesRankingByAccidentsCount(orderByType,pageRequestDTO);
            case DEATHS -> this.analyticsRepository.getCitiesRankingByDeathsCount(orderByType, pageRequestDTO);
            case VEHICLES -> this.analyticsRepository.getCitiesRankingByVehiclesCount(orderByType ,pageRequestDTO);
        };

    }

    public List<RoadRankingResponseDTO> getRoadsRanking(CityRankingCriteriaType criteria, OrderByType orderByType, PageRequestDTO pageRequestDTO) {

        return switch (criteria){
            case ACCIDENTS -> this.analyticsRepository.getRoadsRankingByAccidentsCount(orderByType,pageRequestDTO);
            case DEATHS -> this.analyticsRepository.getRoadsRankingByDeathsCount(orderByType,pageRequestDTO);
            case VEHICLES -> this.analyticsRepository.getRoadsRankingByVehiclesCount(orderByType,pageRequestDTO);
        };

    }

    public List<StateRankingResponseDTO> getStatesRanking(CityRankingCriteriaType criteria, OrderByType orderByType, PageRequestDTO pageRequestDTO) {

        return switch (criteria){
            case ACCIDENTS -> this.analyticsRepository.getStatesRankingByAccidentsCount(orderByType, pageRequestDTO);
            case DEATHS -> this.analyticsRepository.getStatesRankingByDeathsCount(orderByType, pageRequestDTO);
            case VEHICLES -> this.analyticsRepository.getStatesRankingByVehiclesCount(orderByType, pageRequestDTO);
        };

    }
}