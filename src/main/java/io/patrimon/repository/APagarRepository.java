package io.patrimon.repository;

import io.patrimon.domain.APagar;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the APagar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface APagarRepository extends JpaRepository<APagar, Long> {
}
