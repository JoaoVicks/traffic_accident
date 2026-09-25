package com.example.beltwise_api.state.models;

import com.example.beltwise_api.city.models.City;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
public class State {
    @Id
    private UUID id;
    private String state_code;
    @OneToMany(mappedBy = "state")
    private List<City> cities;




}
