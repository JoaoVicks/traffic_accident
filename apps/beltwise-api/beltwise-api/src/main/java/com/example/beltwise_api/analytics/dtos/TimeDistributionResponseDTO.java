package com.example.beltwise_api.analytics.dtos;

import java.time.LocalTime;

public record TimeDistributionResponseDTO(
LocalTime time,
Long count
) {
}
