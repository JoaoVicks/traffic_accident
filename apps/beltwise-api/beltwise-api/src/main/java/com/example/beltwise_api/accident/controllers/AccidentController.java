package com.example.beltwise_api.accident.controllers;


import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.accident.services.AccidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accident")
public class AccidentController {

    private final AccidentService accidentService;

    @Autowired
    public AccidentController(AccidentService accidentService){
        this.accidentService = accidentService;
    }

    @GetMapping(path = "{accidentId}")
    public List<Accident> getAccident(@PathVariable("accidentId") String id){

        return this.accidentService.getAccident(id);
    }
}
