package io.patrimon.web.rest;

import io.patrimon.domain.Investimento;
import io.patrimon.repository.InvestimentoRepository;
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
 * REST controller for managing {@link io.patrimon.domain.Investimento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InvestimentoResource {

    private final Logger log = LoggerFactory.getLogger(InvestimentoResource.class);

    private static final String ENTITY_NAME = "investimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvestimentoRepository investimentoRepository;

    public InvestimentoResource(InvestimentoRepository investimentoRepository) {
        this.investimentoRepository = investimentoRepository;
    }

    /**
     * {@code POST  /investimentos} : Create a new investimento.
     *
     * @param investimento the investimento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new investimento, or with status {@code 400 (Bad Request)} if the investimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/investimentos")
    public ResponseEntity<Investimento> createInvestimento(@RequestBody Investimento investimento) throws URISyntaxException {
        log.debug("REST request to save Investimento : {}", investimento);
        if (investimento.getId() != null) {
            throw new BadRequestAlertException("A new investimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Investimento result = investimentoRepository.save(investimento);
        return ResponseEntity.created(new URI("/api/investimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /investimentos} : Updates an existing investimento.
     *
     * @param investimento the investimento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investimento,
     * or with status {@code 400 (Bad Request)} if the investimento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the investimento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/investimentos")
    public ResponseEntity<Investimento> updateInvestimento(@RequestBody Investimento investimento) throws URISyntaxException {
        log.debug("REST request to update Investimento : {}", investimento);
        if (investimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Investimento result = investimentoRepository.save(investimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investimento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /investimentos} : get all the investimentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of investimentos in body.
     */
    @GetMapping("/investimentos")
    public List<Investimento> getAllInvestimentos() {
        log.debug("REST request to get all Investimentos");
        return investimentoRepository.findAll();
    }

    /**
     * {@code GET  /investimentos/:id} : get the "id" investimento.
     *
     * @param id the id of the investimento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the investimento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/investimentos/{id}")
    public ResponseEntity<Investimento> getInvestimento(@PathVariable Long id) {
        log.debug("REST request to get Investimento : {}", id);
        Optional<Investimento> investimento = investimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(investimento);
    }

    /**
     * {@code DELETE  /investimentos/:id} : delete the "id" investimento.
     *
     * @param id the id of the investimento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/investimentos/{id}")
    public ResponseEntity<Void> deleteInvestimento(@PathVariable Long id) {
        log.debug("REST request to delete Investimento : {}", id);
        investimentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
