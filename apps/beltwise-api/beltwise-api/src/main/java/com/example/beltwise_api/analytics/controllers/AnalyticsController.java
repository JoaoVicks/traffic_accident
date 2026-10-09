package com.example.beltwise_api.analytics.controllers;


import com.example.beltwise_api.analytics.dtos.*;
import com.example.beltwise_api.analytics.enums.SeverityDistributionType;
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
            @PathVariable SeverityDistributionType type){
      return this.analyticsService.getSeverityDistribution(filter,type);
    }


    @GetMapping("/vehicle-distribution")
    public List<VehiclesDistributionResponseDTO> getVehicleDistribution(
            @ModelAttribute AnalyticFilterDTO filter
    ){
      return this.analyticsService.getVehicleDistribution(filter);
    }

    @GetMapping("/weather_distribution")
    public List<WeatherDistributionResponseDTO> getWeatherDistribution(@ModelAttribute AnalyticFilterDTO filter){
        return this.analyticsService.getWeatherDistribution(filter);
    }

}
