package com.example.beltwise_api.vehicle.mappers;

import com.example.beltwise_api.participant.mappers.ParticipantDetailsResponseMapper;
import com.example.beltwise_api.vehicle.dtos.VehicleDetailsResponseDTO;
import com.example.beltwise_api.vehicle.models.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class VehicleDetailsResponseMapper implements Function<Vehicle, VehicleDetailsResponseDTO> {

    private final ParticipantDetailsResponseMapper participantDetailsResponseMapper ;

    @Autowired
    public VehicleDetailsResponseMapper(ParticipantDetailsResponseMapper participantDetailsResponseMapper){
        this.participantDetailsResponseMapper = participantDetailsResponseMapper;
    }

    @Override
    public VehicleDetailsResponseDTO apply(Vehicle vehicle) {
        return new VehicleDetailsResponseDTO(
                vehicle.getId(),
                vehicle.getVehicleType(),
                vehicle.getParticipant().stream().map(participantDetailsResponseMapper).toList(),
                vehicle.getBrandModelVehicle()

        );
    }
}
