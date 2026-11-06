package com.example.beltwise_api.road.models;


import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.city.models.City;
import com.example.beltwise_api.roadName.models.RoadName;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

  @Column(name = "road_code")
  private String roadCode;

  @Column(name = "road_prefix")
  private String roadPrefix;


  @ManyToMany(mappedBy = "roads")
  private List<City> cities;

  @OneToMany(mappedBy = "road")
  private List<RoadName> names;

  @OneToMany(mappedBy = "road" )
  @JsonManagedReference
  private List<Accident> accidents;





}
