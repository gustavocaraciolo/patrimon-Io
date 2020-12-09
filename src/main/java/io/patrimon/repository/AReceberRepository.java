package io.patrimon.repository;

import io.patrimon.domain.AReceber;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AReceber entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AReceberRepository extends JpaRepository<AReceber, Long> {
}
