package com.example.beltwise_api.search.dtos;

import java.util.List;

public record SearchResultResponseDTO(
        List<StateSearchResultResponseDTO> states,
        List<CitySearchResultResponseDTO> cities,
        List<RoadSearchProjectionDTO> roads
) {
}
