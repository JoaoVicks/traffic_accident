package com.example.beltwise_api.accident.dtos;

import java.util.UUID;

public record AccidentMapPointResponseDTO(
        UUID id,
        Double latitude,
        Double longitude
) {
}
