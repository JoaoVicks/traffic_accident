package com.example.beltwise_api.accident.services;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.accident.repositories.AccidentRepository;
import org.springframework.stereotype.Service;

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
}
