package io.patrimon.web.rest;

import io.patrimon.PatrimonIoApp;
import io.patrimon.domain.APagar;
import io.patrimon.repository.APagarRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.patrimon.domain.enumeration.Moeda;
import io.patrimon.domain.enumeration.Status;
/**
 * Integration tests for the {@link APagarResource} REST controller.
 */
@SpringBootTest(classes = PatrimonIoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class APagarResourceIT {

    private static final LocalDate DEFAULT_DT_PAGAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_PAGAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DT_VENCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_VENCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    private static final Moeda DEFAULT_MOEDA = Moeda.REAL;
    private static final Moeda UPDATED_MOEDA = Moeda.DOLAR;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Status DEFAULT_STATUS = Status.PAGO;
    private static final Status UPDATED_STATUS = Status.A_PAGAR;

    private static final byte[] DEFAULT_COMPROVANTE_PAGAMENTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_COMPROVANTE_PAGAMENTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE = "image/png";

    @Autowired
    private APagarRepository aPagarRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAPagarMockMvc;

    private APagar aPagar;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static APagar createEntity(EntityManager em) {
        APagar aPagar = new APagar()
            .dtPagamento(DEFAULT_DT_PAGAMENTO)
            .dtVencimento(DEFAULT_DT_VENCIMENTO)
            .valor(DEFAULT_VALOR)
            .moeda(DEFAULT_MOEDA)
            .descricao(DEFAULT_DESCRICAO)
            .status(DEFAULT_STATUS)
            .comprovantePagamento(DEFAULT_COMPROVANTE_PAGAMENTO)
            .comprovantePagamentoContentType(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
        return aPagar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static APagar createUpdatedEntity(EntityManager em) {
        APagar aPagar = new APagar()
            .dtPagamento(UPDATED_DT_PAGAMENTO)
            .dtVencimento(UPDATED_DT_VENCIMENTO)
            .valor(UPDATED_VALOR)
            .moeda(UPDATED_MOEDA)
            .descricao(UPDATED_DESCRICAO)
            .status(UPDATED_STATUS)
            .comprovantePagamento(UPDATED_COMPROVANTE_PAGAMENTO)
            .comprovantePagamentoContentType(UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
        return aPagar;
    }

    @BeforeEach
    public void initTest() {
        aPagar = createEntity(em);
    }

    @Test
    @Transactional
    public void createAPagar() throws Exception {
        int databaseSizeBeforeCreate = aPagarRepository.findAll().size();
        // Create the APagar
        restAPagarMockMvc.perform(post("/api/a-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aPagar)))
            .andExpect(status().isCreated());

        // Validate the APagar in the database
        List<APagar> aPagarList = aPagarRepository.findAll();
        assertThat(aPagarList).hasSize(databaseSizeBeforeCreate + 1);
        APagar testAPagar = aPagarList.get(aPagarList.size() - 1);
        assertThat(testAPagar.getDtPagamento()).isEqualTo(DEFAULT_DT_PAGAMENTO);
        assertThat(testAPagar.getDtVencimento()).isEqualTo(DEFAULT_DT_VENCIMENTO);
        assertThat(testAPagar.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testAPagar.getMoeda()).isEqualTo(DEFAULT_MOEDA);
        assertThat(testAPagar.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testAPagar.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAPagar.getComprovantePagamento()).isEqualTo(DEFAULT_COMPROVANTE_PAGAMENTO);
        assertThat(testAPagar.getComprovantePagamentoContentType()).isEqualTo(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createAPagarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aPagarRepository.findAll().size();

        // Create the APagar with an existing ID
        aPagar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAPagarMockMvc.perform(post("/api/a-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aPagar)))
            .andExpect(status().isBadRequest());

        // Validate the APagar in the database
        List<APagar> aPagarList = aPagarRepository.findAll();
        assertThat(aPagarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAPagars() throws Exception {
        // Initialize the database
        aPagarRepository.saveAndFlush(aPagar);

        // Get all the aPagarList
        restAPagarMockMvc.perform(get("/api/a-pagars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aPagar.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtPagamento").value(hasItem(DEFAULT_DT_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].dtVencimento").value(hasItem(DEFAULT_DT_VENCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.intValue())))
            .andExpect(jsonPath("$.[*].moeda").value(hasItem(DEFAULT_MOEDA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].comprovantePagamentoContentType").value(hasItem(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].comprovantePagamento").value(hasItem(Base64Utils.encodeToString(DEFAULT_COMPROVANTE_PAGAMENTO))));
    }
    
    @Test
    @Transactional
    public void getAPagar() throws Exception {
        // Initialize the database
        aPagarRepository.saveAndFlush(aPagar);

        // Get the aPagar
        restAPagarMockMvc.perform(get("/api/a-pagars/{id}", aPagar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aPagar.getId().intValue()))
            .andExpect(jsonPath("$.dtPagamento").value(DEFAULT_DT_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.dtVencimento").value(DEFAULT_DT_VENCIMENTO.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.intValue()))
            .andExpect(jsonPath("$.moeda").value(DEFAULT_MOEDA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.comprovantePagamentoContentType").value(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.comprovantePagamento").value(Base64Utils.encodeToString(DEFAULT_COMPROVANTE_PAGAMENTO)));
    }
    @Test
    @Transactional
    public void getNonExistingAPagar() throws Exception {
        // Get the aPagar
        restAPagarMockMvc.perform(get("/api/a-pagars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAPagar() throws Exception {
        // Initialize the database
        aPagarRepository.saveAndFlush(aPagar);

        int databaseSizeBeforeUpdate = aPagarRepository.findAll().size();

        // Update the aPagar
        APagar updatedAPagar = aPagarRepository.findById(aPagar.getId()).get();
        // Disconnect from session so that the updates on updatedAPagar are not directly saved in db
        em.detach(updatedAPagar);
        updatedAPagar
            .dtPagamento(UPDATED_DT_PAGAMENTO)
            .dtVencimento(UPDATED_DT_VENCIMENTO)
            .valor(UPDATED_VALOR)
            .moeda(UPDATED_MOEDA)
            .descricao(UPDATED_DESCRICAO)
            .status(UPDATED_STATUS)
            .comprovantePagamento(UPDATED_COMPROVANTE_PAGAMENTO)
            .comprovantePagamentoContentType(UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);

        restAPagarMockMvc.perform(put("/api/a-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAPagar)))
            .andExpect(status().isOk());

        // Validate the APagar in the database
        List<APagar> aPagarList = aPagarRepository.findAll();
        assertThat(aPagarList).hasSize(databaseSizeBeforeUpdate);
        APagar testAPagar = aPagarList.get(aPagarList.size() - 1);
        assertThat(testAPagar.getDtPagamento()).isEqualTo(UPDATED_DT_PAGAMENTO);
        assertThat(testAPagar.getDtVencimento()).isEqualTo(UPDATED_DT_VENCIMENTO);
        assertThat(testAPagar.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testAPagar.getMoeda()).isEqualTo(UPDATED_MOEDA);
        assertThat(testAPagar.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAPagar.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAPagar.getComprovantePagamento()).isEqualTo(UPDATED_COMPROVANTE_PAGAMENTO);
        assertThat(testAPagar.getComprovantePagamentoContentType()).isEqualTo(UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAPagar() throws Exception {
        int databaseSizeBeforeUpdate = aPagarRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAPagarMockMvc.perform(put("/api/a-pagars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aPagar)))
            .andExpect(status().isBadRequest());

        // Validate the APagar in the database
        List<APagar> aPagarList = aPagarRepository.findAll();
        assertThat(aPagarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAPagar() throws Exception {
        // Initialize the database
        aPagarRepository.saveAndFlush(aPagar);

        int databaseSizeBeforeDelete = aPagarRepository.findAll().size();

        // Delete the aPagar
        restAPagarMockMvc.perform(delete("/api/a-pagars/{id}", aPagar.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<APagar> aPagarList = aPagarRepository.findAll();
        assertThat(aPagarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
