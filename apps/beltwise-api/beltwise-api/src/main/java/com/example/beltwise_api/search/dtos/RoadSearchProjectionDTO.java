package com.example.beltwise_api.search.dtos;

import java.util.UUID;

public record RoadSearchProjectionDTO(
        UUID id,
        String roadCode,
        long accidentCount
) {
}
