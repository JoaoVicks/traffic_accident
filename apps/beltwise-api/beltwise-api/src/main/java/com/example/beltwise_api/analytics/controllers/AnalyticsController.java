package com.example.beltwise_api.analytics.controllers;


import com.example.beltwise_api.analytics.dtos.AccidentSummaryResponseDTO;
import com.example.beltwise_api.analytics.dtos.AnalyticFilterDTO;
import com.example.beltwise_api.analytics.dtos.SeverityDistributionResponseDTO;
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

    @GetMapping("/severity-distribution/accident")
    public List<SeverityDistributionResponseDTO> getSeverityDistributionAccident(
            @ModelAttribute AnalyticFilterDTO filter,
            @RequestParam SeverityDistributionType type){
      return this.analyticsService.getSeverityDistribution(filter,type);
    }




}
