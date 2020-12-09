package io.patrimon.web.rest;

import io.patrimon.domain.ContasReceber;
import io.patrimon.repository.ContasReceberRepository;
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
 * REST controller for managing {@link io.patrimon.domain.ContasReceber}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContasReceberResource {

    private final Logger log = LoggerFactory.getLogger(ContasReceberResource.class);

    private static final String ENTITY_NAME = "contasReceber";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContasReceberRepository contasReceberRepository;

    public ContasReceberResource(ContasReceberRepository contasReceberRepository) {
        this.contasReceberRepository = contasReceberRepository;
    }

    /**
     * {@code POST  /contas-recebers} : Create a new contasReceber.
     *
     * @param contasReceber the contasReceber to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contasReceber, or with status {@code 400 (Bad Request)} if the contasReceber has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contas-recebers")
    public ResponseEntity<ContasReceber> createContasReceber(@RequestBody ContasReceber contasReceber) throws URISyntaxException {
        log.debug("REST request to save ContasReceber : {}", contasReceber);
        if (contasReceber.getId() != null) {
            throw new BadRequestAlertException("A new contasReceber cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContasReceber result = contasReceberRepository.save(contasReceber);
        return ResponseEntity.created(new URI("/api/contas-recebers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contas-recebers} : Updates an existing contasReceber.
     *
     * @param contasReceber the contasReceber to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contasReceber,
     * or with status {@code 400 (Bad Request)} if the contasReceber is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contasReceber couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contas-recebers")
    public ResponseEntity<ContasReceber> updateContasReceber(@RequestBody ContasReceber contasReceber) throws URISyntaxException {
        log.debug("REST request to update ContasReceber : {}", contasReceber);
        if (contasReceber.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContasReceber result = contasReceberRepository.save(contasReceber);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contasReceber.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contas-recebers} : get all the contasRecebers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contasRecebers in body.
     */
    @GetMapping("/contas-recebers")
    public List<ContasReceber> getAllContasRecebers() {
        log.debug("REST request to get all ContasRecebers");
        return contasReceberRepository.findAll();
    }

    /**
     * {@code GET  /contas-recebers/:id} : get the "id" contasReceber.
     *
     * @param id the id of the contasReceber to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contasReceber, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contas-recebers/{id}")
    public ResponseEntity<ContasReceber> getContasReceber(@PathVariable Long id) {
        log.debug("REST request to get ContasReceber : {}", id);
        Optional<ContasReceber> contasReceber = contasReceberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contasReceber);
    }

    /**
     * {@code DELETE  /contas-recebers/:id} : delete the "id" contasReceber.
     *
     * @param id the id of the contasReceber to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contas-recebers/{id}")
    public ResponseEntity<Void> deleteContasReceber(@PathVariable Long id) {
        log.debug("REST request to delete ContasReceber : {}", id);
        contasReceberRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
