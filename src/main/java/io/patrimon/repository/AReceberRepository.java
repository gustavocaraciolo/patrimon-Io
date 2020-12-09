package io.patrimon.repository;

import io.patrimon.domain.AReceber;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the AReceber entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AReceberRepository extends JpaRepository<AReceber, Long> {

    @Query("select aReceber from AReceber aReceber where aReceber.imovel.login = ?#{principal.username}")
    List<AReceber> findByImovelIsCurrentUser();
}
