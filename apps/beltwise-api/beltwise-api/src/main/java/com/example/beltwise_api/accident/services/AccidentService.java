package com.example.beltwise_api.accident.services;

import com.example.beltwise_api.accident.dtos.AccidentMapFilterDTO;
import com.example.beltwise_api.accident.dtos.AccidentMapPointResponseDTO;
import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.accident.repositories.AccidentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccidentService {
    private final AccidentRepository accidentRepository;

    public AccidentService(AccidentRepository accidentRepository){
        this.accidentRepository = accidentRepository;
    }

    public Accident getAccident(String id) {

        UUID uuid = UUID.fromString(id);

        Optional<Accident> accidentOptional = this.accidentRepository.findById(uuid);

        if(accidentOptional.isPresent()){
            return accidentOptional.get();
        }
        else{
            throw new RuntimeException("Accident not found");
        }

    }

    public List<AccidentMapPointResponseDTO> getMapPoints(AccidentMapFilterDTO filter)
    {


        LocalTime startTime = filter.startTime() != null
                ? filter.startTime()
                : LocalTime.MIN;

        LocalTime endTime = filter.endTime() != null
                ? filter.endTime()
                : LocalTime.MAX;


       return this.accidentRepository.findMapPoints(
               filter.startDate(),
               filter.endDate(),
               filter.vehicleType(),
               filter.accidentClassification(),
               startTime,
               endTime,
               filter.startTime() != null,
               filter.endTime() != null
       );
    }


}
