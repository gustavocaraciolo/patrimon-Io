package io.patrimon.web.rest;

import io.patrimon.domain.APagar;
import io.patrimon.repository.APagarRepository;
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
 * REST controller for managing {@link io.patrimon.domain.APagar}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class APagarResource {

    private final Logger log = LoggerFactory.getLogger(APagarResource.class);

    private static final String ENTITY_NAME = "aPagar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final APagarRepository aPagarRepository;

    public APagarResource(APagarRepository aPagarRepository) {
        this.aPagarRepository = aPagarRepository;
    }

    /**
     * {@code POST  /a-pagars} : Create a new aPagar.
     *
     * @param aPagar the aPagar to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aPagar, or with status {@code 400 (Bad Request)} if the aPagar has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/a-pagars")
    public ResponseEntity<APagar> createAPagar(@RequestBody APagar aPagar) throws URISyntaxException {
        log.debug("REST request to save APagar : {}", aPagar);
        if (aPagar.getId() != null) {
            throw new BadRequestAlertException("A new aPagar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        APagar result = aPagarRepository.save(aPagar);
        return ResponseEntity.created(new URI("/api/a-pagars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /a-pagars} : Updates an existing aPagar.
     *
     * @param aPagar the aPagar to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aPagar,
     * or with status {@code 400 (Bad Request)} if the aPagar is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aPagar couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/a-pagars")
    public ResponseEntity<APagar> updateAPagar(@RequestBody APagar aPagar) throws URISyntaxException {
        log.debug("REST request to update APagar : {}", aPagar);
        if (aPagar.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        APagar result = aPagarRepository.save(aPagar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aPagar.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /a-pagars} : get all the aPagars.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aPagars in body.
     */
    @GetMapping("/a-pagars")
    public List<APagar> getAllAPagars() {
        log.debug("REST request to get all APagars");
        return aPagarRepository.findAll();
    }

    /**
     * {@code GET  /a-pagars/:id} : get the "id" aPagar.
     *
     * @param id the id of the aPagar to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aPagar, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/a-pagars/{id}")
    public ResponseEntity<APagar> getAPagar(@PathVariable Long id) {
        log.debug("REST request to get APagar : {}", id);
        Optional<APagar> aPagar = aPagarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aPagar);
    }

    /**
     * {@code DELETE  /a-pagars/:id} : delete the "id" aPagar.
     *
     * @param id the id of the aPagar to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/a-pagars/{id}")
    public ResponseEntity<Void> deleteAPagar(@PathVariable Long id) {
        log.debug("REST request to delete APagar : {}", id);
        aPagarRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
