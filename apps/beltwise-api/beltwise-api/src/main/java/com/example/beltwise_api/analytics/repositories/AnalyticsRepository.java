package com.example.beltwise_api.analytics.repositories;

import com.example.beltwise_api.accident.models.Accident;
import com.example.beltwise_api.analytics.dtos.AccidentSummaryResponseDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

@Repository
public class AnalyticsRepository {

    private final EntityManager entityManager;

    @Autowired
    public AnalyticsRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }


    public AccidentSummaryResponseDTO getSummary(Specification<Accident> specification){

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        // what the request must return
        CriteriaQuery<AccidentSummaryResponseDTO> query = criteriaBuilder.createQuery(AccidentSummaryResponseDTO.class);

        // where the query comes from
        Root<Accident> root = query.from(Accident.class);

        Predicate predicate = specification.toPredicate(root,query,criteriaBuilder);

        query.where(predicate);

        Expression<Long> accidentCount = criteriaBuilder.count(root);
        Expression<Long> peoplePerAccident =
                criteriaBuilder.sum(
                        criteriaBuilder.toLong(root.get("totalInjuries")),
                        criteriaBuilder.toLong(root.get("uninjuredPeople"))
                );

        Expression<Long> victimsCount =
                criteriaBuilder.sum(peoplePerAccident);

        query.select(
                criteriaBuilder.construct(
                        AccidentSummaryResponseDTO.class,
                        accidentCount,
                        victimsCount
                )
        );

        return entityManager.createQuery(query).getSingleResult();
    }

}
