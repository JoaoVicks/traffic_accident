package com.example.beltwise_api.vehicle.dtos;

import com.example.beltwise_api.participant.dtos.ParticipantDetailsResponseDTO;

import java.util.List;
import java.util.UUID;

public record VehicleDetailsResponseDTO(
        UUID vehicleId,
        String vehicleType,
        List<ParticipantDetailsResponseDTO> participants,
        String vehicleBrandModel
) {

}
