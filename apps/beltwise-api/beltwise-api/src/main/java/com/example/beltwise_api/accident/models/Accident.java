package com.example.beltwise_api.accident.models;

import com.example.beltwise_api.accident.enums.LaneConfigurationEnum;
import com.example.beltwise_api.accident.enums.RoadDirectionEnum;
import com.example.beltwise_api.participant.models.Participant;
import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.vehicle.models.Vehicle;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table
public class Accident {

    @Id
    private UUID id;

    private LocalTime time;
    private LocalDate date;

    @Column(name = "long")
    private Double longitude;

    @Column(name = "lat")
    private Double latitude;

    private Boolean coordenate_validity;

    @Enumerated(EnumType.STRING)
    private RoadDirectionEnum road_direction;

    @Enumerated(EnumType.STRING)
    private LaneConfigurationEnum lane_configuration_type;

    private String road_geometry;
    private String day_phase;
    private String accident_cause;
    private String accident_type;
    private String accident_classification;
    private Integer fatalities;
    private Integer minor_injuries;
    private Integer serious_injuries;
    private Integer uninjured_people;
    private Integer total_injuries;
    private Integer participants_count;
    private Integer unknown_condition_count;
    private Integer vehicle_count;

    @OneToMany(mappedBy = "accident")
    private List<Participant> participants;

    @OneToMany(mappedBy = "accident")
    private List<Vehicle> vehicles;

    @ManyToOne()
    @JoinColumn(name = "road_id")
    private Road road;


    @Override
    public String toString() {
        return "Accident{" +
                "id=" + id +
                ", time=" + time +
                ", date=" + date +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", coordenate_validity=" + coordenate_validity +
                ", road_direction=" + road_direction +
                ", lane_configuration_type=" + lane_configuration_type +
                ", road_geometry='" + road_geometry + '\'' +
                ", day_phase='" + day_phase + '\'' +
                ", accident_cause='" + accident_cause + '\'' +
                ", accident_type='" + accident_type + '\'' +
                ", accident_classification='" + accident_classification + '\'' +
                ", fatalities=" + fatalities +
                ", minor_injuries=" + minor_injuries +
                ", serious_injuries=" + serious_injuries +
                ", uninjured_people=" + uninjured_people +
                ", total_injuries=" + total_injuries +
                ", participants_count=" + participants_count +
                ", unknown_condition_count=" + unknown_condition_count +
                ", vehicle_count=" + vehicle_count +
                ", participants=" + participants +
                ", vehicles=" + vehicles +
                ", road=" + road +
                '}';
    }
}
