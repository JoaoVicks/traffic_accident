package com.example.beltwise_api.state.repository;


import com.example.beltwise_api.search.dtos.StateSearchResultResponseDTO;
import com.example.beltwise_api.state.models.State;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface   StateRepository extends JpaRepository<State, UUID> {


  @Query("""
      SELECT new
    com.example.beltwise_api.search.dtos.StateSearchResultResponseDTO(
    s.id,
    s.stateCode,
    COUNT(DISTINCT a.id)
    )
     FROM State s
     JOIN s.cities c
     JOIN c.roads r
     JOIN Accident a ON a.road = r
            WHERE LOWER(s.stateCode)
                 LIKE LOWER(CONCAT('%', :term, '%'))
         GROUP BY s.id, s.stateCode
         ORDER BY COUNT(DISTINCT a.id) DESC
   """)
  List<StateSearchResultResponseDTO> searchByName(
          @Param("term") String term, Pageable pageable);

}
