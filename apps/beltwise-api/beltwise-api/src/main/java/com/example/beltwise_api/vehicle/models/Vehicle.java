package com.example.beltwise_api.vehicle.models;

import com.example.beltwise_api.participant.models.Participant;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Vehicle {

    @Id
    private Long id;
    private String brand_vehicle;
    private Integer fabrication_year;
    private String vehicle_type;

    @OneToMany(mappedBy = "vehicle")
    private Participant participant;
}
