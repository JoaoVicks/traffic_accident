package com.example.beltwise_api.vehicle.models;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.participant.models.Participant;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;



@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table
public class Vehicle {

    @Id
    private UUID id;
    @Column(name = "brand_vehicle")
    private String brandModelVehicle;

    @Column(name = "fabrication_year")
    private Integer fabricationYear;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @OneToMany(mappedBy = "vehicle")
    @JsonManagedReference
    private List<Participant> participant;

    @ManyToOne()
    @JoinColumn(name = "accident_id")
    @JsonBackReference
    private Accident accident;


}
