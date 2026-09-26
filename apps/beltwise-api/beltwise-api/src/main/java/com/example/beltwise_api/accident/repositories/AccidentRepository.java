package com.example.beltwise_api.accident.repositories;

import com.example.beltwise_api.accident.dtos.AccidentMapPointResponseDTO;
import com.example.beltwise_api.accident.models.Accident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface AccidentRepository extends JpaRepository<Accident, UUID> {


    @Query("""
    SELECT new com.example.beltwise_api.accident.dtos.AccidentMapPointResponseDTO(
        a.id,
        a.latitude,
        a.longitude
    )
    FROM Accident a
    WHERE a.latitude IS NOT NULL
      AND a.longitude IS NOT NULL
      
      AND (CAST(:startDate AS date) IS NULL OR a.date >= :startDate)
      AND (CAST(:endDate AS date) IS NULL OR a.date <= :endDate)
      
AND (
    :startTimeEnabled = false
    OR a.time >= :startTime
)

AND (
    :endTimeEnabled = false
    OR a.time <= :endTime
)
      
      AND (
      CAST(:vehicleType AS string) IS NULL OR\s
      EXISTS (
            SELECT 1
            FROM Vehicle v
            WHERE v.accident = a
            AND v.vehicleType = :vehicleType
             )
          )
          
       AND(
       CAST(:accidentClassification AS string) IS NULL
       OR a.accidentClassification = :accidentClassification
       )
""")
    List<AccidentMapPointResponseDTO> findMapPoints(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("vehicleType") String vehicleType,
            @Param("accidentClassification") String accidentClassification,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("startTimeEnabled") boolean startTimeEnabled,
            @Param("endTimeEnabled") boolean endTimeEnabled

    );
}
