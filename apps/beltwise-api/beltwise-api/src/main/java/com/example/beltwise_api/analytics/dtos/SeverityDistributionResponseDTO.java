package com.example.beltwise_api.analytics.dtos;

public record SeverityDistributionResponseDTO(
        String severity,
        Long count
) {
}
