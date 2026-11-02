package com.example.beltwise_api.search.dtos;

import java.util.UUID;

public record RoadCitySearchResultResponseDTO(
        UUID roadId,
        UUID cityId,
        String cityName,
        long accidentCount
) {
}
