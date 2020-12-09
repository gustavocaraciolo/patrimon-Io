package io.patrimon.repository;

import io.patrimon.domain.APagar;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the APagar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface APagarRepository extends JpaRepository<APagar, Long> {

    @Query("select aPagar from APagar aPagar where aPagar.imovel.login = ?#{principal.username}")
    List<APagar> findByImovelIsCurrentUser();
}
