package io.patrimon.web.rest;

import io.patrimon.domain.AReceber;
import io.patrimon.repository.AReceberRepository;
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
 * REST controller for managing {@link io.patrimon.domain.AReceber}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AReceberResource {

    private final Logger log = LoggerFactory.getLogger(AReceberResource.class);

    private static final String ENTITY_NAME = "aReceber";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AReceberRepository aReceberRepository;

    public AReceberResource(AReceberRepository aReceberRepository) {
        this.aReceberRepository = aReceberRepository;
    }

    /**
     * {@code POST  /a-recebers} : Create a new aReceber.
     *
     * @param aReceber the aReceber to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aReceber, or with status {@code 400 (Bad Request)} if the aReceber has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/a-recebers")
    public ResponseEntity<AReceber> createAReceber(@RequestBody AReceber aReceber) throws URISyntaxException {
        log.debug("REST request to save AReceber : {}", aReceber);
        if (aReceber.getId() != null) {
            throw new BadRequestAlertException("A new aReceber cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AReceber result = aReceberRepository.save(aReceber);
        return ResponseEntity.created(new URI("/api/a-recebers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /a-recebers} : Updates an existing aReceber.
     *
     * @param aReceber the aReceber to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aReceber,
     * or with status {@code 400 (Bad Request)} if the aReceber is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aReceber couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/a-recebers")
    public ResponseEntity<AReceber> updateAReceber(@RequestBody AReceber aReceber) throws URISyntaxException {
        log.debug("REST request to update AReceber : {}", aReceber);
        if (aReceber.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AReceber result = aReceberRepository.save(aReceber);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aReceber.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /a-recebers} : get all the aRecebers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aRecebers in body.
     */
    @GetMapping("/a-recebers")
    public List<AReceber> getAllARecebers() {
        log.debug("REST request to get all ARecebers");
        return aReceberRepository.findAll();
    }

    /**
     * {@code GET  /a-recebers/:id} : get the "id" aReceber.
     *
     * @param id the id of the aReceber to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aReceber, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/a-recebers/{id}")
    public ResponseEntity<AReceber> getAReceber(@PathVariable Long id) {
        log.debug("REST request to get AReceber : {}", id);
        Optional<AReceber> aReceber = aReceberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aReceber);
    }

    /**
     * {@code DELETE  /a-recebers/:id} : delete the "id" aReceber.
     *
     * @param id the id of the aReceber to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/a-recebers/{id}")
    public ResponseEntity<Void> deleteAReceber(@PathVariable Long id) {
        log.debug("REST request to delete AReceber : {}", id);
        aReceberRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
