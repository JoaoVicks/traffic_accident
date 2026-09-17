package com.example.beltwise_api.road.models;


import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.city.models.City;
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
public class Road {

  @Id
  private UUID id;
  private String road_code;

  @ManyToMany
  private List<City> cities;

  @OneToMany(mappedBy = "road" )
  private List<Accident> accidents;



}
