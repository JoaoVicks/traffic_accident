package com.example.beltwise_api.accident.models;

import com.example.beltwise_api.accident.enums.LaneConfigurationEnum;
import com.example.beltwise_api.accident.enums.RoadDirectionEnum;
import com.example.beltwise_api.participant.models.Participant;
import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.vehicle.models.Vehicle;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(name = "coordenate_validity")
    private Boolean coordinateValidity;

    @Enumerated(EnumType.STRING)
    @Column(name = "road_direction")
    private RoadDirectionEnum roadDirection;

    @Enumerated(EnumType.STRING)
    @Column(name = "lane_configuration_type")
    private LaneConfigurationEnum laneConfigurationType;

    @Column(name = "road_geometry")
    private String roadGeometry;

    @Column(name = "day_phase")
    private String dayPhase;

    @Column(name = "accident_cause")
    private String accidentCause;

    @Column(name = "accident_type")
    private String accidentType;

    @Column(name = "accident_classification")
    private String accidentClassification;

    private Integer fatalities;

    @Column(name = "minor_injuries")
    private Integer minorInjuries;

    @Column(name = "serious_injuries")
    private Integer seriousInjuries;

    @Column(name = "uninjured_people")
    private Integer uninjuredPeople;

    @Column(name = "total_injuries")
    private Integer totalInjuries;

    @Column(name = "participants_count")
    private Integer participantsCount;

    @Column(name = "unknown_condition_count")
    private Integer unknownConditionCount;

    @Column(name = "vehicle_count")
    private Integer vehicleCount;

    @OneToMany(mappedBy = "accident")
    @JsonManagedReference
    private List<Participant> participants;

    @OneToMany(mappedBy = "accident")
    @JsonManagedReference
    private List<Vehicle> vehicles;

    @ManyToOne()
    @JoinColumn(name = "road_id")
    @JsonBackReference
    private Road road;


    @Override
    public String toString() {
        return "Accident{" +
                "id=" + id +
                ", time=" + time +
                ", date=" + date +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", coordinateValidity=" + coordinateValidity +
                ", roadDirection=" + roadDirection +
                ", laneConfigurationType=" + laneConfigurationType +
                ", roadGeometry='" + roadGeometry + '\'' +
                ", dayPhase='" + dayPhase + '\'' +
                ", accidentCause='" + accidentCause + '\'' +
                ", accidentType='" + accidentType + '\'' +
                ", accidentClassification='" + accidentClassification + '\'' +
                ", fatalities=" + fatalities +
                ", minorInjuries=" + minorInjuries +
                ", seriousInjuries=" + seriousInjuries +
                ", uninjuredPeople=" + uninjuredPeople +
                ", totalInjuries=" + totalInjuries +
                ", participantsCount=" + participantsCount +
                ", unknownConditionCount=" + unknownConditionCount +
                ", vehicleCount=" + vehicleCount +
                ", participants=" + participants +
                ", vehicles=" + vehicles +
                ", road=" + road +
                '}';
    }
}
