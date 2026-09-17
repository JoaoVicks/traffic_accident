package com.example.beltwise_api.accident.repositories;

import com.example.beltwise_api.accident.models.Accident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccidentRepository extends JpaRepository<Accident, UUID> {


}
