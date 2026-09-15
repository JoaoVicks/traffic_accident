package com.example.beltwise_api.city.models;

import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.state.models.State;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table
public class City {

    private Long id;
    private String city_name;
    @ManyToMany(mappedBy = "cities")
    private List<Road> roads;
    @ManyToOne
    private State state;

}
