package com.example.beltwise_api.road.models;


import com.example.beltwise_api.city.models.City;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Road {

  @Id
  private Long id;
  private String road_code;
  @ManyToMany
  private List<City> cities;
  @OneToMany
  private List<Accident> accidents;



}
