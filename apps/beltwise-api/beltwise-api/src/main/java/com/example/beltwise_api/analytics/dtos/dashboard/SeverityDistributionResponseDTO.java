package com.example.beltwise_api.analytics.dtos.dashboard;

public record SeverityDistributionResponseDTO(
        String severity,
        Long count
) {
}
