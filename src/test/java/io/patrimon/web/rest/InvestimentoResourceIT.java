package io.patrimon.web.rest;

import io.patrimon.PatrimonIoApp;
import io.patrimon.domain.Investimento;
import io.patrimon.repository.InvestimentoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.patrimon.domain.enumeration.TipoIvestimento;
/**
 * Integration tests for the {@link InvestimentoResource} REST controller.
 */
@SpringBootTest(classes = PatrimonIoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InvestimentoResourceIT {

    private static final TipoIvestimento DEFAULT_INVESTIMENTO = TipoIvestimento.ACOES;
    private static final TipoIvestimento UPDATED_INVESTIMENTO = TipoIvestimento.ALUGUEL;

    @Autowired
    private InvestimentoRepository investimentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvestimentoMockMvc;

    private Investimento investimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Investimento createEntity(EntityManager em) {
        Investimento investimento = new Investimento()
            .investimento(DEFAULT_INVESTIMENTO);
        return investimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Investimento createUpdatedEntity(EntityManager em) {
        Investimento investimento = new Investimento()
            .investimento(UPDATED_INVESTIMENTO);
        return investimento;
    }

    @BeforeEach
    public void initTest() {
        investimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvestimento() throws Exception {
        int databaseSizeBeforeCreate = investimentoRepository.findAll().size();
        // Create the Investimento
        restInvestimentoMockMvc.perform(post("/api/investimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(investimento)))
            .andExpect(status().isCreated());

        // Validate the Investimento in the database
        List<Investimento> investimentoList = investimentoRepository.findAll();
        assertThat(investimentoList).hasSize(databaseSizeBeforeCreate + 1);
        Investimento testInvestimento = investimentoList.get(investimentoList.size() - 1);
        assertThat(testInvestimento.getInvestimento()).isEqualTo(DEFAULT_INVESTIMENTO);
    }

    @Test
    @Transactional
    public void createInvestimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = investimentoRepository.findAll().size();

        // Create the Investimento with an existing ID
        investimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvestimentoMockMvc.perform(post("/api/investimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(investimento)))
            .andExpect(status().isBadRequest());

        // Validate the Investimento in the database
        List<Investimento> investimentoList = investimentoRepository.findAll();
        assertThat(investimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInvestimentos() throws Exception {
        // Initialize the database
        investimentoRepository.saveAndFlush(investimento);

        // Get all the investimentoList
        restInvestimentoMockMvc.perform(get("/api/investimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(investimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].investimento").value(hasItem(DEFAULT_INVESTIMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getInvestimento() throws Exception {
        // Initialize the database
        investimentoRepository.saveAndFlush(investimento);

        // Get the investimento
        restInvestimentoMockMvc.perform(get("/api/investimentos/{id}", investimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(investimento.getId().intValue()))
            .andExpect(jsonPath("$.investimento").value(DEFAULT_INVESTIMENTO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInvestimento() throws Exception {
        // Get the investimento
        restInvestimentoMockMvc.perform(get("/api/investimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvestimento() throws Exception {
        // Initialize the database
        investimentoRepository.saveAndFlush(investimento);

        int databaseSizeBeforeUpdate = investimentoRepository.findAll().size();

        // Update the investimento
        Investimento updatedInvestimento = investimentoRepository.findById(investimento.getId()).get();
        // Disconnect from session so that the updates on updatedInvestimento are not directly saved in db
        em.detach(updatedInvestimento);
        updatedInvestimento
            .investimento(UPDATED_INVESTIMENTO);

        restInvestimentoMockMvc.perform(put("/api/investimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvestimento)))
            .andExpect(status().isOk());

        // Validate the Investimento in the database
        List<Investimento> investimentoList = investimentoRepository.findAll();
        assertThat(investimentoList).hasSize(databaseSizeBeforeUpdate);
        Investimento testInvestimento = investimentoList.get(investimentoList.size() - 1);
        assertThat(testInvestimento.getInvestimento()).isEqualTo(UPDATED_INVESTIMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingInvestimento() throws Exception {
        int databaseSizeBeforeUpdate = investimentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestimentoMockMvc.perform(put("/api/investimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(investimento)))
            .andExpect(status().isBadRequest());

        // Validate the Investimento in the database
        List<Investimento> investimentoList = investimentoRepository.findAll();
        assertThat(investimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvestimento() throws Exception {
        // Initialize the database
        investimentoRepository.saveAndFlush(investimento);

        int databaseSizeBeforeDelete = investimentoRepository.findAll().size();

        // Delete the investimento
        restInvestimentoMockMvc.perform(delete("/api/investimentos/{id}", investimento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Investimento> investimentoList = investimentoRepository.findAll();
        assertThat(investimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
