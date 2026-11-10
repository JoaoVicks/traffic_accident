package com.example.beltwise_api.analytics.controllers;


import com.example.beltwise_api.analytics.dtos.ranking.CityRankingResponseDTO;
import com.example.beltwise_api.analytics.dtos.ranking.PageRequestDTO;
import com.example.beltwise_api.analytics.dtos.ranking.RoadRankingResponseDTO;
import com.example.beltwise_api.analytics.dtos.ranking.StateRankingResponseDTO;
import com.example.beltwise_api.analytics.enums.ranking.CityRankingCriteriaType;
import com.example.beltwise_api.analytics.enums.OrderByType;
import com.example.beltwise_api.analytics.services.AnalyticsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<CityRankingResponseDTO> getCitiesRanking(@PathVariable String by, @PathVariable String order, @Valid @ModelAttribute PageRequestDTO pageRequestDTO) {

        CityRankingCriteriaType criteria = CityRankingCriteriaType.valueOf(by.toUpperCase());

        OrderByType orderByType = OrderByType.valueOf(order.toUpperCase());


        return this.analyticsService.getCitiesRanking(criteria, orderByType, pageRequestDTO);

    }

    @GetMapping("/roads/{by}/{order}")
    public List<RoadRankingResponseDTO> getRoadsRanking(@PathVariable String by, @PathVariable String order, @Valid @ModelAttribute PageRequestDTO pageRequestDTO) {

        CityRankingCriteriaType criteria = CityRankingCriteriaType.valueOf(by.toUpperCase());

        OrderByType orderByType = OrderByType.valueOf(order.toUpperCase());


        return this.analyticsService.getRoadsRanking(criteria, orderByType,pageRequestDTO);

    }



    @GetMapping("/states/{by}/{order}")
    public List<StateRankingResponseDTO> getStatesRanking(
            @PathVariable String by, @PathVariable String order, @Valid @ModelAttribute PageRequestDTO pageRequestDTO
    ) {

        CityRankingCriteriaType criteria = CityRankingCriteriaType.valueOf(by.toUpperCase());

        OrderByType orderByType = OrderByType.valueOf(order.toUpperCase());


        return this.analyticsService.getStatesRanking(criteria, orderByType,pageRequestDTO);

    }

}
