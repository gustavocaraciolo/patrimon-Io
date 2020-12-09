package io.patrimon.repository;

import io.patrimon.domain.ContasReceber;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContasReceber entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContasReceberRepository extends JpaRepository<ContasReceber, Long> {
}
