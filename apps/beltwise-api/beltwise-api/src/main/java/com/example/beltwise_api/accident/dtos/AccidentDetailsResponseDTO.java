package com.example.beltwise_api.accident.dtos;

import com.example.beltwise_api.accident.enums.LaneConfigurationEnum;
import com.example.beltwise_api.accident.enums.RoadDirectionEnum;
import com.example.beltwise_api.vehicle.dtos.VehicleDetailsResponseDTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public record AccidentDetailsResponseDTO(
        UUID id,
        Integer participantsCount,
        Integer fatalities,
        LocalTime time,
        LocalDate date,
        Double latitude,
        Double longitude,
        LaneConfigurationEnum laneConfigurationType,
        RoadDirectionEnum roadDirection,
        String roadGeometry,
        String dayPhase,
        String accidentCause,
        String accidentType,
        String accidentClassification,
        List<VehicleDetailsResponseDTO> vehicles

) {

}
