package com.example.beltwise_api.search.controllers;


import com.example.beltwise_api.search.dtos.*;
import com.example.beltwise_api.search.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("")
    public List<SearchResultResponseDTO> searchSuggestions(@ModelAttribute SearchRequestDTO searchRequestDTO){
      return this.searchService.searchSuggestions(searchRequestDTO);
    }



}
