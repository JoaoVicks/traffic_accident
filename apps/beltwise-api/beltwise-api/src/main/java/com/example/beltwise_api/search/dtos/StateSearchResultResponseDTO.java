package com.example.beltwise_api.search.dtos;

import java.util.UUID;

public record StateSearchResultResponseDTO(
        UUID id,
        String stateName,
        long accidentCount
) {
}
