package io.patrimon.repository;

import io.patrimon.domain.ContasPagar;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContasPagar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContasPagarRepository extends JpaRepository<ContasPagar, Long> {
}
