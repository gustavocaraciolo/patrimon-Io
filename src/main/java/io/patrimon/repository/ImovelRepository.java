package io.patrimon.repository;

import io.patrimon.domain.Imovel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Imovel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImovelRepository extends JpaRepository<Imovel, Long> {

    @Query("select imovel from Imovel imovel where imovel.user.login = ?#{principal.username}")
    List<Imovel> findByUserIsCurrentUser();
}
