package com.example.beltwise_api.analytics.dtos;

import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;
import java.time.LocalTime;

public record AnalyticFilterDTO(
        @PastOrPresent(message = "Start date cannot be in the future")
        LocalDate startDate,

        @PastOrPresent(message = "End date cannot be in the future")
        LocalDate endDate,

        LocalTime startTime,
        LocalTime endTime,
        String vehicleType,
        String accidentClassification
) {
}
