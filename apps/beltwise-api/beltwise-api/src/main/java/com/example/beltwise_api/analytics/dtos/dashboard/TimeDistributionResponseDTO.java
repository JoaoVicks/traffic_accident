package com.example.beltwise_api.analytics.dtos.dashboard;

import java.time.LocalTime;

public record TimeDistributionResponseDTO(
LocalTime time,
Long count
) {
}
