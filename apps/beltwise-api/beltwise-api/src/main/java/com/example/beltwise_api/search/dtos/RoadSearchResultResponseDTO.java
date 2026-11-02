package com.example.beltwise_api.search.dtos;

import java.util.List;
import java.util.UUID;

public record RoadSearchResultResponseDTO(
        UUID id,
        String roadCode,
        long accidentCount,
        List<RoadCitySearchResultResponseDTO> roadSegments
) {
}
