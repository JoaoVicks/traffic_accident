package com.example.beltwise_api.road.repositories;

import com.example.beltwise_api.road.models.Road;
import com.example.beltwise_api.search.dtos.RoadCitySearchResultResponseDTO;
import com.example.beltwise_api.search.dtos.RoadSearchProjectionDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface RoadRepository extends JpaRepository<Road, UUID> {

    @Query("""
    SELECT new com.example.beltwise_api.search.dtos.RoadSearchProjectionDTO(
      r.id,
      r.roadCode,
      COUNT(DISTINCT a.id)
      )
    FROM Road r
    JOIN r.accidents a
        WHERE r.roadCode
         LIKE LOWER(CONCAT('%', :term, '%'))
    GROUP BY r.id, r.roadCode
    ORDER BY COUNT(DISTINCT a.id) DESC
""")
    List<RoadSearchProjectionDTO> getRoadByRoadCode(@Param("term") String term, Pageable pageable);



    @Query("""
    SELECT new com.example.beltwise_api.search.dtos.RoadCitySearchResultResponseDTO(
      r.id,
      c.id,
      c.cityName,
      COUNT(DISTINCT a.id)
      )
    FROM Road r
    JOIN r.cities c
    LEFT JOIN r.accidents a ON a.city.id = c.id
       WHERE r.id = :id
    GROUP BY r.id,c.id,c.cityName
    ORDER BY COUNT(DISTINCT a.id) DESC
""")
    List<RoadCitySearchResultResponseDTO> getRoadCitiesById(@Param("id") UUID id, Pageable pageable);



}
