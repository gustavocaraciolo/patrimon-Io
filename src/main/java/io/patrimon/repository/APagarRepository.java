package io.patrimon.repository;

import io.patrimon.domain.APagar;
import java.time.LocalDate;
import java.util.List;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the APagar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface APagarRepository extends JpaRepository<APagar, Long> {
    @Query("select aPagar from APagar aPagar where aPagar.user.login = ?#{principal.username}")
    List<APagar> findByUserIsCurrentUser();

    List<APagar> findAllByDtVencimentoBetweenAndUserLogin(LocalDate firstDate, LocalDate secondDate, String login);
}
