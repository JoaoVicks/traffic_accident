package com.example.beltwise_api.city.models;

import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.state.models.State;
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
public class City {

    @Id
    private UUID id;
    private String city_name;

    @ManyToMany(mappedBy = "cities")
    private List<Road> roads;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;

}
