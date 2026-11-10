package com.example.beltwise_api.analytics.dtos.ranking;

import java.util.UUID;

public record StateRankingResponseDTO(
        UUID id,
        String stateCode,
        Long count
) {
}
