package com.example.beltwise_api.analytics.controllers;


import com.example.beltwise_api.analytics.dtos.AccidentSummaryResponseDTO;
import com.example.beltwise_api.analytics.dtos.AnalyticFilterDTO;
import com.example.beltwise_api.analytics.services.AnalyticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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




}
