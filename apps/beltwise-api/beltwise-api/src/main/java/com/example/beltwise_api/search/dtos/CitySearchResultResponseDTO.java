package com.example.beltwise_api.search.dtos;

import java.util.UUID;

public record CitySearchResultResponseDTO(
        UUID id,
        String cityName,
        String stateCode,
        long accidentCount
) {
}
