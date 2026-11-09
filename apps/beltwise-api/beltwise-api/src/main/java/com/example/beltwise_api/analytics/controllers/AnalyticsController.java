package com.example.beltwise_api.analytics.controllers;


import com.example.beltwise_api.analytics.dtos.dashboard.*;
import com.example.beltwise_api.analytics.enums.dashboard.SeverityDistributionType;
import com.example.beltwise_api.analytics.enums.dashboard.TimeDistributionType;
import com.example.beltwise_api.analytics.services.AnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService){
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public AccidentSummaryResponseDTO getSummary(@ModelAttribute AnalyticFilterDTO filter){
    return this.analyticsService.getSummary(filter);

}

    @GetMapping("/severity-distribution/{type}")
    public List<SeverityDistributionResponseDTO> getSeverityDistributionAccident(
            @ModelAttribute AnalyticFilterDTO filter,
            @PathVariable String type){

        SeverityDistributionType severityDistributionType =  SeverityDistributionType.valueOf(type.toUpperCase());


      return this.analyticsService.getSeverityDistribution(filter,severityDistributionType);
    }


    @GetMapping("/vehicle-distribution")
    public List<VehiclesDistributionResponseDTO> getVehicleDistribution(
            @ModelAttribute AnalyticFilterDTO filter
    ){
      return this.analyticsService.getVehicleDistribution(filter);
    }

    @GetMapping("/weather-distribution")
    public List<WeatherDistributionResponseDTO> getWeatherDistribution(@ModelAttribute AnalyticFilterDTO filter){
        return this.analyticsService.getWeatherDistribution(filter);
    }

    @GetMapping("/time-distribution/{type}")
    public List<TimeDistributionResponseDTO> getWeatherDistribution(
            @ModelAttribute AnalyticFilterDTO filter,
            @PathVariable String type
    ){

        TimeDistributionType timeDistributionType = TimeDistributionType.valueOf(type.toUpperCase());


        return this.analyticsService.getTimeDistribution(filter,timeDistributionType);
    }




}
