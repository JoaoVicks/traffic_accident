package com.example.beltwise_api.analytics.dtos.ranking;

import java.util.UUID;

public record RoadRankingResponseDTO(
        UUID id,
        String roadPrefix,
        String roadCode,
        Long count
) {
}
