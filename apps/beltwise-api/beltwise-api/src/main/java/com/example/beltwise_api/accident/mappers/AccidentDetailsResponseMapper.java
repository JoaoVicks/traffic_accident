package com.example.beltwise_api.accident.mappers;

import com.example.beltwise_api.accident.dtos.AccidentDetailsResponseDTO;
import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.vehicle.mappers.VehicleDetailsResponseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;


@Service
public class AccidentDetailsResponseMapper implements Function<Accident, AccidentDetailsResponseDTO> {


    private final VehicleDetailsResponseMapper vehicleDetailsResponseMapper;

    @Autowired
    public AccidentDetailsResponseMapper(VehicleDetailsResponseMapper vehicleDetailsResponseMapper){
        this.vehicleDetailsResponseMapper = vehicleDetailsResponseMapper;
    }

    @Override
    public AccidentDetailsResponseDTO apply(Accident accident) {
        return new AccidentDetailsResponseDTO(
                accident.getId(),
                accident.getParticipantsCount(),
                accident.getFatalities(),
                accident.getTime(),
                accident.getDate(),
                accident.getLatitude(),
                accident.getLongitude(),
                accident.getLaneConfigurationType(),
                accident.getRoadDirection(),
                accident.getRoadGeometry(),
                accident.getDayPhase(),
                accident.getAccidentCause(),
                accident.getAccidentType(),
                accident.getAccidentClassification(),
                accident.getVehicles().stream().map(vehicleDetailsResponseMapper).toList()
        );
    }
}
