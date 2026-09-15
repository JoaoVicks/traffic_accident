package com.example.beltwise_api.state.models;

import com.example.beltwise_api.city.models.City;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table
public class State {
    @Id
    private String id;
    private String state_code;
    @OneToMany(mappedBy = "state")
    private List<City> cities;




}
