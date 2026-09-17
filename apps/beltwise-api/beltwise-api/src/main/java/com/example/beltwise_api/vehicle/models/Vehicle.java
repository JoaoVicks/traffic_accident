package com.example.beltwise_api.vehicle.models;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.participant.models.Participant;
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
    private String brand_vehicle;
    private Integer fabrication_year;
    private String vehicle_type;

    @OneToMany(mappedBy = "vehicle")
    private List<Participant> participant;

    @ManyToOne()
    @JoinColumn(name = "accident_id")
    private Accident accident;


}
