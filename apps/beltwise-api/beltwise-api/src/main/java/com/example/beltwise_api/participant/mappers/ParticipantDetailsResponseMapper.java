package com.example.beltwise_api.participant.mappers;

import com.example.beltwise_api.participant.dtos.ParticipantDetailsResponseDTO;
import com.example.beltwise_api.participant.models.Participant;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ParticipantDetailsResponseMapper implements Function<Participant, ParticipantDetailsResponseDTO> {


    @Override
    public ParticipantDetailsResponseDTO apply(Participant participant) {
        return new
                ParticipantDetailsResponseDTO(participant.getId(),
                participant.getAge(), participant.getGender(),
                participant.getParticipantType(),
                participant.getCondition());
    }
}
