package com.example.beltwise_api.participant.models;


import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.participant.enums.GenderEnum;
import com.example.beltwise_api.vehicle.models.Vehicle;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;



@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table
public class Participant {

    @Id
    private UUID id;
    private Integer age;
    private String condition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GenderEnum gender;

    @ManyToOne(optional = true)
    @JoinColumn(name = "vehicle_id",nullable = true)
    @JsonBackReference
    private Vehicle vehicle;

    @Column(name = "participant_type")
    private String participantType;

    @ManyToOne()
    @JoinColumn(name = "accident_id")
    @JsonBackReference
    private Accident accident;



}
