package io.patrimon.web.rest;

import io.patrimon.PatrimonIoApp;
import io.patrimon.domain.ContasPagar;
import io.patrimon.repository.ContasPagarRepository;

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
 * Integration tests for the {@link ContasPagarResource} REST controller.
 */
@SpringBootTest(classes = PatrimonIoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContasPagarResourceIT {

    private static final LocalDate DEFAULT_DT_PAGAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_PAGAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DT_VENCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_VENCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    private static final Status DEFAULT_PAGO = Status.PAGO;
    private static final Status UPDATED_PAGO = Status.A_PAGAR;

    @Autowired
    private ContasPagarRepository contasPagarRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContasPagarMockMvc;

    private ContasPagar contasPagar;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContasPagar createEntity(EntityManager em) {
        ContasPagar contasPagar = new ContasPagar()
            .dtPagamento(DEFAULT_DT_PAGAMENTO)
            .dtVencimento(DEFAULT_DT_VENCIMENTO)
            .valor(DEFAULT_VALOR)
            .pago(DEFAULT_PAGO);
        return contasPagar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContasPagar createUpdatedEntity(EntityManager em) {
        ContasPagar contasPagar = new ContasPagar()
            .dtPagamento(UPDATED_DT_PAGAMENTO)
            .dtVencimento(UPDATED_DT_VENCIMENTO)
            .valor(UPDATED_VALOR)
            .pago(UPDATED_PAGO);
        return contasPagar;
    }

    @BeforeEach
    public void initTest() {
        contasPagar = createEntity(em);
    }

    @Test
    @Transactional
    public void createContasPagar() throws Exception {
        int databaseSizeBeforeCreate = contasPagarRepository.findAll().size();
        // Create the ContasPagar
        restContasPagarMockMvc.perform(post("/api/contas-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contasPagar)))
            .andExpect(status().isCreated());

        // Validate the ContasPagar in the database
        List<ContasPagar> contasPagarList = contasPagarRepository.findAll();
        assertThat(contasPagarList).hasSize(databaseSizeBeforeCreate + 1);
        ContasPagar testContasPagar = contasPagarList.get(contasPagarList.size() - 1);
        assertThat(testContasPagar.getDtPagamento()).isEqualTo(DEFAULT_DT_PAGAMENTO);
        assertThat(testContasPagar.getDtVencimento()).isEqualTo(DEFAULT_DT_VENCIMENTO);
        assertThat(testContasPagar.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testContasPagar.getPago()).isEqualTo(DEFAULT_PAGO);
    }

    @Test
    @Transactional
    public void createContasPagarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contasPagarRepository.findAll().size();

        // Create the ContasPagar with an existing ID
        contasPagar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContasPagarMockMvc.perform(post("/api/contas-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contasPagar)))
            .andExpect(status().isBadRequest());

        // Validate the ContasPagar in the database
        List<ContasPagar> contasPagarList = contasPagarRepository.findAll();
        assertThat(contasPagarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContasPagars() throws Exception {
        // Initialize the database
        contasPagarRepository.saveAndFlush(contasPagar);

        // Get all the contasPagarList
        restContasPagarMockMvc.perform(get("/api/contas-pagars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contasPagar.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtPagamento").value(hasItem(DEFAULT_DT_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].dtVencimento").value(hasItem(DEFAULT_DT_VENCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.intValue())))
            .andExpect(jsonPath("$.[*].pago").value(hasItem(DEFAULT_PAGO.toString())));
    }
    
    @Test
    @Transactional
    public void getContasPagar() throws Exception {
        // Initialize the database
        contasPagarRepository.saveAndFlush(contasPagar);

        // Get the contasPagar
        restContasPagarMockMvc.perform(get("/api/contas-pagars/{id}", contasPagar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contasPagar.getId().intValue()))
            .andExpect(jsonPath("$.dtPagamento").value(DEFAULT_DT_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.dtVencimento").value(DEFAULT_DT_VENCIMENTO.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.intValue()))
            .andExpect(jsonPath("$.pago").value(DEFAULT_PAGO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingContasPagar() throws Exception {
        // Get the contasPagar
        restContasPagarMockMvc.perform(get("/api/contas-pagars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContasPagar() throws Exception {
        // Initialize the database
        contasPagarRepository.saveAndFlush(contasPagar);

        int databaseSizeBeforeUpdate = contasPagarRepository.findAll().size();

        // Update the contasPagar
        ContasPagar updatedContasPagar = contasPagarRepository.findById(contasPagar.getId()).get();
        // Disconnect from session so that the updates on updatedContasPagar are not directly saved in db
        em.detach(updatedContasPagar);
        updatedContasPagar
            .dtPagamento(UPDATED_DT_PAGAMENTO)
            .dtVencimento(UPDATED_DT_VENCIMENTO)
            .valor(UPDATED_VALOR)
            .pago(UPDATED_PAGO);

        restContasPagarMockMvc.perform(put("/api/contas-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContasPagar)))
            .andExpect(status().isOk());

        // Validate the ContasPagar in the database
        List<ContasPagar> contasPagarList = contasPagarRepository.findAll();
        assertThat(contasPagarList).hasSize(databaseSizeBeforeUpdate);
        ContasPagar testContasPagar = contasPagarList.get(contasPagarList.size() - 1);
        assertThat(testContasPagar.getDtPagamento()).isEqualTo(UPDATED_DT_PAGAMENTO);
        assertThat(testContasPagar.getDtVencimento()).isEqualTo(UPDATED_DT_VENCIMENTO);
        assertThat(testContasPagar.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testContasPagar.getPago()).isEqualTo(UPDATED_PAGO);
    }

    @Test
    @Transactional
    public void updateNonExistingContasPagar() throws Exception {
        int databaseSizeBeforeUpdate = contasPagarRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContasPagarMockMvc.perform(put("/api/contas-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contasPagar)))
            .andExpect(status().isBadRequest());

        // Validate the ContasPagar in the database
        List<ContasPagar> contasPagarList = contasPagarRepository.findAll();
        assertThat(contasPagarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContasPagar() throws Exception {
        // Initialize the database
        contasPagarRepository.saveAndFlush(contasPagar);

        int databaseSizeBeforeDelete = contasPagarRepository.findAll().size();

        // Delete the contasPagar
        restContasPagarMockMvc.perform(delete("/api/contas-pagars/{id}", contasPagar.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContasPagar> contasPagarList = contasPagarRepository.findAll();
        assertThat(contasPagarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
