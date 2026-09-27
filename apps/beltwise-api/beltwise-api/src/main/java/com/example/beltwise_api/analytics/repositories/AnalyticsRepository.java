package com.example.beltwise_api.analytics.repositories;

import com.example.beltwise_api.analytics.dtos.AccidentSummaryResponseDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AnalyticsRepository {

    private final EntityManager entityManager;

    @Autowired
    public AnalyticsRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }


    public AccidentSummaryResponseDTO getSummary(){

        Query query = entityManager.createQuery("""
          SELECT new com.example.beltwise_api.analytics.dtos.AccidentSummaryResponseDTO(
                 COUNT(a),
                 SUM(a.totalInjuries + a.uninjuredPeople)
             )
             FROM Accident a
""");
        return (AccidentSummaryResponseDTO) query.getSingleResult();
    }

}
