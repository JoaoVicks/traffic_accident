package com.example.beltwise_api.search.services;

import com.example.beltwise_api.city.repositories.CityRepository;
import com.example.beltwise_api.road.repositories.RoadRepository;
import com.example.beltwise_api.search.dtos.*;
import com.example.beltwise_api.state.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class SearchService {

    private final StateRepository stateRepository;
    private final CityRepository cityRepository;
    private final RoadRepository roadRepository;

    @Autowired
    public SearchService(StateRepository stateRepository,CityRepository cityRepository,RoadRepository roadRepository){
        this.cityRepository = cityRepository;
        this.stateRepository = stateRepository;
        this.roadRepository = roadRepository;
    }

    public List<SearchResultResponseDTO> searchSuggestions(SearchRequestDTO searchRequestDTO) {

        int limit = 5;

        Pageable pageable =  PageRequest.of(0,limit);


     List<StateSearchResultResponseDTO>  states = this.stateRepository.searchByName(searchRequestDTO.inputSearch(), pageable);

     List<RoadSearchProjectionDTO>  roads = this.roadRepository.getRoadByRoadCode(searchRequestDTO.inputSearch(), pageable);

     List<CitySearchResultResponseDTO> cities = this.cityRepository.searchByName(searchRequestDTO.inputSearch(),pageable);


     SearchResultResponseDTO searchResultResponseDTOS = new SearchResultResponseDTO(
             states,
             cities,
             roads
     );

     return Collections.singletonList(searchResultResponseDTOS);

    }
}
