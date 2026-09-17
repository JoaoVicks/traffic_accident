package com.example.beltwise_api.accident.services;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.accident.repositories.AccidentRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class AccidentService {
    private final AccidentRepository accidentRepository;

    public AccidentService(AccidentRepository accidentRepository){
        this.accidentRepository = accidentRepository;
    }

    public List<Accident> getAccident(String id) {

        UUID uuid = UUID.fromString(id);
        
        return Collections.singletonList(this.accidentRepository.getReferenceById(uuid));

    }
}
