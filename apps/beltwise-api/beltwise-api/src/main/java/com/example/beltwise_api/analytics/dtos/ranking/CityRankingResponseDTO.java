package com.example.beltwise_api.analytics.dtos.ranking;

import java.util.UUID;

public record CityRankingResponseDTO(
        UUID id,
        String cityName,
        Long count
) {
}
