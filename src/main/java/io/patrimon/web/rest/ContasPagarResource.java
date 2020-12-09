package io.patrimon.web.rest;

import io.patrimon.domain.ContasPagar;
import io.patrimon.repository.ContasPagarRepository;
import io.patrimon.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.patrimon.domain.ContasPagar}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContasPagarResource {

    private final Logger log = LoggerFactory.getLogger(ContasPagarResource.class);

    private static final String ENTITY_NAME = "contasPagar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContasPagarRepository contasPagarRepository;

    public ContasPagarResource(ContasPagarRepository contasPagarRepository) {
        this.contasPagarRepository = contasPagarRepository;
    }

    /**
     * {@code POST  /contas-pagars} : Create a new contasPagar.
     *
     * @param contasPagar the contasPagar to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contasPagar, or with status {@code 400 (Bad Request)} if the contasPagar has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contas-pagars")
    public ResponseEntity<ContasPagar> createContasPagar(@RequestBody ContasPagar contasPagar) throws URISyntaxException {
        log.debug("REST request to save ContasPagar : {}", contasPagar);
        if (contasPagar.getId() != null) {
            throw new BadRequestAlertException("A new contasPagar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContasPagar result = contasPagarRepository.save(contasPagar);
        return ResponseEntity.created(new URI("/api/contas-pagars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contas-pagars} : Updates an existing contasPagar.
     *
     * @param contasPagar the contasPagar to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contasPagar,
     * or with status {@code 400 (Bad Request)} if the contasPagar is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contasPagar couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contas-pagars")
    public ResponseEntity<ContasPagar> updateContasPagar(@RequestBody ContasPagar contasPagar) throws URISyntaxException {
        log.debug("REST request to update ContasPagar : {}", contasPagar);
        if (contasPagar.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContasPagar result = contasPagarRepository.save(contasPagar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contasPagar.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contas-pagars} : get all the contasPagars.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contasPagars in body.
     */
    @GetMapping("/contas-pagars")
    public List<ContasPagar> getAllContasPagars() {
        log.debug("REST request to get all ContasPagars");
        return contasPagarRepository.findAll();
    }

    /**
     * {@code GET  /contas-pagars/:id} : get the "id" contasPagar.
     *
     * @param id the id of the contasPagar to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contasPagar, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contas-pagars/{id}")
    public ResponseEntity<ContasPagar> getContasPagar(@PathVariable Long id) {
        log.debug("REST request to get ContasPagar : {}", id);
        Optional<ContasPagar> contasPagar = contasPagarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contasPagar);
    }

    /**
     * {@code DELETE  /contas-pagars/:id} : delete the "id" contasPagar.
     *
     * @param id the id of the contasPagar to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contas-pagars/{id}")
    public ResponseEntity<Void> deleteContasPagar(@PathVariable Long id) {
        log.debug("REST request to delete ContasPagar : {}", id);
        contasPagarRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
