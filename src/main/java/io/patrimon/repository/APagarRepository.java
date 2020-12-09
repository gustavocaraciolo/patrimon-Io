package io.patrimon.repository;

import io.patrimon.domain.APagar;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the APagar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface APagarRepository extends JpaRepository<APagar, Long> {
    // List<APagar> findAllByDtVencimentoBetweenAndUserLogin(LocalDate firstDate, LocalDate secondDate, String login);
    List<APagar> findAllByDtVencimentoBetween(LocalDate firstDate, LocalDate secondDate);
}
