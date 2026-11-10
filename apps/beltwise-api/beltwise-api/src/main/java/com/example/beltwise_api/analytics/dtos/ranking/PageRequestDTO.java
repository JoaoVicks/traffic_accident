package com.example.beltwise_api.analytics.dtos.ranking;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record PageRequestDTO(

        @Min(value = 0, message = "Page must be greater than or equal to 0")
        Integer page,

        @Min(value = 1, message = "Page size must be at least 1")
        @Max(value = 10, message = "Page size cannot exceed 10")
        Integer size
) {

        public PageRequestDTO {
                page = page == null ? 0 : page;
                size = size == null ? 10 : size;
        }
}
