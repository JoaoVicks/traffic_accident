package com.example.beltwise_api.participant.models;


import com.example.beltwise_api.participant.enums.Gender;
import com.example.beltwise_api.vehicle.models.Vehicle;
import jakarta.persistence.*;

@Entity
@Table
public class Participant {

    @Id
    private Long id;
    private Integer age;
    private String condition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @ManyToOne(optional = true)
    @JoinColumn(name = "vehicle_id",nullable = true)
    private Vehicle vehicle;

    private String participant_type;
}
