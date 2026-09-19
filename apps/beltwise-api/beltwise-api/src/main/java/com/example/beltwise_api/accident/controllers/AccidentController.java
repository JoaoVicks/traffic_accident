package com.example.beltwise_api.accident.controllers;


import com.example.beltwise_api.accident.dtos.AccidentDetailsResponseDTO;
import com.example.beltwise_api.accident.mappers.AccidentDetailsResponseMapper;
import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.accident.services.AccidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/accident")
public class AccidentController {

    private final AccidentService accidentService;
    private final AccidentDetailsResponseMapper accidentDetailsResponseMapper;


    @Autowired
    public AccidentController(AccidentService accidentService, AccidentDetailsResponseMapper accidentDetailsResponseMapper){
        this.accidentService = accidentService;
        this.accidentDetailsResponseMapper = accidentDetailsResponseMapper;
    }



    @GetMapping(path = "{accidentId}")
    public AccidentDetailsResponseDTO getAccident(@PathVariable("accidentId") String id){

        Accident accident = this.accidentService.getAccident(id);

        return this.accidentDetailsResponseMapper.apply(accident);

    }
}
