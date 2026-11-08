package com.example.beltwise_api.analytics.controllers;


import com.example.beltwise_api.analytics.dtos.ranking.CityRankingResponseDTO;
import com.example.beltwise_api.analytics.enums.ranking.CityRankingCriteriaType;
import com.example.beltwise_api.analytics.enums.OrderByType;
import com.example.beltwise_api.analytics.services.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ranking")
public class RankingController {

    private final AnalyticsService analyticsService;

    @Autowired
    public RankingController(AnalyticsService analyticsService){
        this.analyticsService = analyticsService;
    }


    @GetMapping("/cities/{by}/{order}")
    public List<CityRankingResponseDTO> getCitiesRanking(@PathVariable String by, @PathVariable String order) {

        CityRankingCriteriaType criteria = CityRankingCriteriaType.valueOf(by.toUpperCase());

        OrderByType orderByType = OrderByType.valueOf(order.toUpperCase());


        return this.analyticsService.getCitiesRanking(criteria, orderByType);

    }

}
