package com.example.beltwise_api.city.repositories;

import com.example.beltwise_api.city.models.City;
import com.example.beltwise_api.search.dtos.CitySearchResultResponseDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CityRepository extends JpaRepository<City, UUID> {


    @Query("""
    SELECT new com.example.beltwise_api.search.dtos.CitySearchResultResponseDTO(
    c.id,
    c.cityName,
    s.stateCode,
    COUNT(DISTINCT a.id)
    )
    FROM City c
    JOIN c.state s
    JOIN c.roads r
    JOIN r.accidents a
    WHERE LOWER(c.cityName)
         LIKE LOWER(CONCAT('%', :term, '%'))
    GROUP BY c.id,c.cityName, s.stateCode
    ORDER BY COUNT(DISTINCT a.id) DESC
""")
    List<CitySearchResultResponseDTO> searchByName(
            @Param("term") String term, Pageable pageable);

}
