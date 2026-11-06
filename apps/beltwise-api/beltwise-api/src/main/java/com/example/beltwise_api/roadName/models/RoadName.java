package com.example.beltwise_api.roadName.models;


import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.roadName.enums.RoadNameType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "road_name")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoadName {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "road_id", nullable = false)
    private Road road;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "name_type", nullable = false)
    private RoadNameType nameType;

    @Column(name = "source_name", nullable = false)
    private String sourceName;

    @Column(name = "source_relation_id")
    private Long sourceRelationId;
}