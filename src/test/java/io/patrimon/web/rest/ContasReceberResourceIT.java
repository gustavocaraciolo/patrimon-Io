package io.patrimon.web.rest;

import io.patrimon.PatrimonIoApp;
import io.patrimon.domain.ContasReceber;
import io.patrimon.repository.ContasReceberRepository;

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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.patrimon.domain.enumeration.Status;
/**
 * Integration tests for the {@link ContasReceberResource} REST controller.
 */
@SpringBootTest(classes = PatrimonIoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContasReceberResourceIT {

    private static final LocalDate DEFAULT_DT_RECEBIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_RECEBIDO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DT_RECEBIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_RECEBIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    private static final Status DEFAULT_PAGO = Status.PAGO;
    private static final Status UPDATED_PAGO = Status.A_PAGAR;

    @Autowired
    private ContasReceberRepository contasReceberRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContasReceberMockMvc;

    private ContasReceber contasReceber;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContasReceber createEntity(EntityManager em) {
        ContasReceber contasReceber = new ContasReceber()
            .dtRecebido(DEFAULT_DT_RECEBIDO)
            .dtRecebimento(DEFAULT_DT_RECEBIMENTO)
            .valor(DEFAULT_VALOR)
            .pago(DEFAULT_PAGO);
        return contasReceber;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContasReceber createUpdatedEntity(EntityManager em) {
        ContasReceber contasReceber = new ContasReceber()
            .dtRecebido(UPDATED_DT_RECEBIDO)
            .dtRecebimento(UPDATED_DT_RECEBIMENTO)
            .valor(UPDATED_VALOR)
            .pago(UPDATED_PAGO);
        return contasReceber;
    }

    @BeforeEach
    public void initTest() {
        contasReceber = createEntity(em);
    }

    @Test
    @Transactional
    public void createContasReceber() throws Exception {
        int databaseSizeBeforeCreate = contasReceberRepository.findAll().size();
        // Create the ContasReceber
        restContasReceberMockMvc.perform(post("/api/contas-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contasReceber)))
            .andExpect(status().isCreated());

        // Validate the ContasReceber in the database
        List<ContasReceber> contasReceberList = contasReceberRepository.findAll();
        assertThat(contasReceberList).hasSize(databaseSizeBeforeCreate + 1);
        ContasReceber testContasReceber = contasReceberList.get(contasReceberList.size() - 1);
        assertThat(testContasReceber.getDtRecebido()).isEqualTo(DEFAULT_DT_RECEBIDO);
        assertThat(testContasReceber.getDtRecebimento()).isEqualTo(DEFAULT_DT_RECEBIMENTO);
        assertThat(testContasReceber.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testContasReceber.getPago()).isEqualTo(DEFAULT_PAGO);
    }

    @Test
    @Transactional
    public void createContasReceberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contasReceberRepository.findAll().size();

        // Create the ContasReceber with an existing ID
        contasReceber.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContasReceberMockMvc.perform(post("/api/contas-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contasReceber)))
            .andExpect(status().isBadRequest());

        // Validate the ContasReceber in the database
        List<ContasReceber> contasReceberList = contasReceberRepository.findAll();
        assertThat(contasReceberList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContasRecebers() throws Exception {
        // Initialize the database
        contasReceberRepository.saveAndFlush(contasReceber);

        // Get all the contasReceberList
        restContasReceberMockMvc.perform(get("/api/contas-recebers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contasReceber.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtRecebido").value(hasItem(DEFAULT_DT_RECEBIDO.toString())))
            .andExpect(jsonPath("$.[*].dtRecebimento").value(hasItem(DEFAULT_DT_RECEBIMENTO.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.intValue())))
            .andExpect(jsonPath("$.[*].pago").value(hasItem(DEFAULT_PAGO.toString())));
    }
    
    @Test
    @Transactional
    public void getContasReceber() throws Exception {
        // Initialize the database
        contasReceberRepository.saveAndFlush(contasReceber);

        // Get the contasReceber
        restContasReceberMockMvc.perform(get("/api/contas-recebers/{id}", contasReceber.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contasReceber.getId().intValue()))
            .andExpect(jsonPath("$.dtRecebido").value(DEFAULT_DT_RECEBIDO.toString()))
            .andExpect(jsonPath("$.dtRecebimento").value(DEFAULT_DT_RECEBIMENTO.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.intValue()))
            .andExpect(jsonPath("$.pago").value(DEFAULT_PAGO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingContasReceber() throws Exception {
        // Get the contasReceber
        restContasReceberMockMvc.perform(get("/api/contas-recebers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContasReceber() throws Exception {
        // Initialize the database
        contasReceberRepository.saveAndFlush(contasReceber);

        int databaseSizeBeforeUpdate = contasReceberRepository.findAll().size();

        // Update the contasReceber
        ContasReceber updatedContasReceber = contasReceberRepository.findById(contasReceber.getId()).get();
        // Disconnect from session so that the updates on updatedContasReceber are not directly saved in db
        em.detach(updatedContasReceber);
        updatedContasReceber
            .dtRecebido(UPDATED_DT_RECEBIDO)
            .dtRecebimento(UPDATED_DT_RECEBIMENTO)
            .valor(UPDATED_VALOR)
            .pago(UPDATED_PAGO);

        restContasReceberMockMvc.perform(put("/api/contas-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContasReceber)))
            .andExpect(status().isOk());

        // Validate the ContasReceber in the database
        List<ContasReceber> contasReceberList = contasReceberRepository.findAll();
        assertThat(contasReceberList).hasSize(databaseSizeBeforeUpdate);
        ContasReceber testContasReceber = contasReceberList.get(contasReceberList.size() - 1);
        assertThat(testContasReceber.getDtRecebido()).isEqualTo(UPDATED_DT_RECEBIDO);
        assertThat(testContasReceber.getDtRecebimento()).isEqualTo(UPDATED_DT_RECEBIMENTO);
        assertThat(testContasReceber.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testContasReceber.getPago()).isEqualTo(UPDATED_PAGO);
    }

    @Test
    @Transactional
    public void updateNonExistingContasReceber() throws Exception {
        int databaseSizeBeforeUpdate = contasReceberRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContasReceberMockMvc.perform(put("/api/contas-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contasReceber)))
            .andExpect(status().isBadRequest());

        // Validate the ContasReceber in the database
        List<ContasReceber> contasReceberList = contasReceberRepository.findAll();
        assertThat(contasReceberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContasReceber() throws Exception {
        // Initialize the database
        contasReceberRepository.saveAndFlush(contasReceber);

        int databaseSizeBeforeDelete = contasReceberRepository.findAll().size();

        // Delete the contasReceber
        restContasReceberMockMvc.perform(delete("/api/contas-recebers/{id}", contasReceber.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContasReceber> contasReceberList = contasReceberRepository.findAll();
        assertThat(contasReceberList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
