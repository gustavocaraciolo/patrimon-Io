package io.patrimon.repository;

import io.patrimon.domain.Investimento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Investimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {

    @Query("select investimento from Investimento investimento where investimento.user.login = ?#{principal.username}")
    List<Investimento> findByUserIsCurrentUser();
}
