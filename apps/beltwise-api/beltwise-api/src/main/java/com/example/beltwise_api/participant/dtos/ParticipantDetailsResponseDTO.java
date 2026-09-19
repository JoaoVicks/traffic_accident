package com.example.beltwise_api.participant.dtos;

import com.example.beltwise_api.participant.enums.GenderEnum;

import java.util.UUID;

public record ParticipantDetailsResponseDTO(
        UUID id,
        Integer age,
        GenderEnum gender,
        String participantType,
        String condition
) {
}
