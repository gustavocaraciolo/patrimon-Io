package io.patrimon.web.rest;

import io.patrimon.PatrimonIoApp;
import io.patrimon.domain.AReceber;
import io.patrimon.repository.AReceberRepository;

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
 * Integration tests for the {@link AReceberResource} REST controller.
 */
@SpringBootTest(classes = PatrimonIoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AReceberResourceIT {

    private static final LocalDate DEFAULT_DT_RECEBIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_RECEBIDO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DT_RECEBIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_RECEBIMENTO = LocalDate.now(ZoneId.systemDefault());

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
    private AReceberRepository aReceberRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAReceberMockMvc;

    private AReceber aReceber;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AReceber createEntity(EntityManager em) {
        AReceber aReceber = new AReceber()
            .dtRecebido(DEFAULT_DT_RECEBIDO)
            .dtRecebimento(DEFAULT_DT_RECEBIMENTO)
            .valor(DEFAULT_VALOR)
            .moeda(DEFAULT_MOEDA)
            .descricao(DEFAULT_DESCRICAO)
            .status(DEFAULT_STATUS)
            .comprovantePagamento(DEFAULT_COMPROVANTE_PAGAMENTO)
            .comprovantePagamentoContentType(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
        return aReceber;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AReceber createUpdatedEntity(EntityManager em) {
        AReceber aReceber = new AReceber()
            .dtRecebido(UPDATED_DT_RECEBIDO)
            .dtRecebimento(UPDATED_DT_RECEBIMENTO)
            .valor(UPDATED_VALOR)
            .moeda(UPDATED_MOEDA)
            .descricao(UPDATED_DESCRICAO)
            .status(UPDATED_STATUS)
            .comprovantePagamento(UPDATED_COMPROVANTE_PAGAMENTO)
            .comprovantePagamentoContentType(UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
        return aReceber;
    }

    @BeforeEach
    public void initTest() {
        aReceber = createEntity(em);
    }

    @Test
    @Transactional
    public void createAReceber() throws Exception {
        int databaseSizeBeforeCreate = aReceberRepository.findAll().size();
        // Create the AReceber
        restAReceberMockMvc.perform(post("/api/a-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aReceber)))
            .andExpect(status().isCreated());

        // Validate the AReceber in the database
        List<AReceber> aReceberList = aReceberRepository.findAll();
        assertThat(aReceberList).hasSize(databaseSizeBeforeCreate + 1);
        AReceber testAReceber = aReceberList.get(aReceberList.size() - 1);
        assertThat(testAReceber.getDtRecebido()).isEqualTo(DEFAULT_DT_RECEBIDO);
        assertThat(testAReceber.getDtRecebimento()).isEqualTo(DEFAULT_DT_RECEBIMENTO);
        assertThat(testAReceber.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testAReceber.getMoeda()).isEqualTo(DEFAULT_MOEDA);
        assertThat(testAReceber.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testAReceber.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAReceber.getComprovantePagamento()).isEqualTo(DEFAULT_COMPROVANTE_PAGAMENTO);
        assertThat(testAReceber.getComprovantePagamentoContentType()).isEqualTo(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createAReceberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aReceberRepository.findAll().size();

        // Create the AReceber with an existing ID
        aReceber.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAReceberMockMvc.perform(post("/api/a-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aReceber)))
            .andExpect(status().isBadRequest());

        // Validate the AReceber in the database
        List<AReceber> aReceberList = aReceberRepository.findAll();
        assertThat(aReceberList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllARecebers() throws Exception {
        // Initialize the database
        aReceberRepository.saveAndFlush(aReceber);

        // Get all the aReceberList
        restAReceberMockMvc.perform(get("/api/a-recebers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aReceber.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtRecebido").value(hasItem(DEFAULT_DT_RECEBIDO.toString())))
            .andExpect(jsonPath("$.[*].dtRecebimento").value(hasItem(DEFAULT_DT_RECEBIMENTO.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.intValue())))
            .andExpect(jsonPath("$.[*].moeda").value(hasItem(DEFAULT_MOEDA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].comprovantePagamentoContentType").value(hasItem(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].comprovantePagamento").value(hasItem(Base64Utils.encodeToString(DEFAULT_COMPROVANTE_PAGAMENTO))));
    }
    
    @Test
    @Transactional
    public void getAReceber() throws Exception {
        // Initialize the database
        aReceberRepository.saveAndFlush(aReceber);

        // Get the aReceber
        restAReceberMockMvc.perform(get("/api/a-recebers/{id}", aReceber.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aReceber.getId().intValue()))
            .andExpect(jsonPath("$.dtRecebido").value(DEFAULT_DT_RECEBIDO.toString()))
            .andExpect(jsonPath("$.dtRecebimento").value(DEFAULT_DT_RECEBIMENTO.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.intValue()))
            .andExpect(jsonPath("$.moeda").value(DEFAULT_MOEDA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.comprovantePagamentoContentType").value(DEFAULT_COMPROVANTE_PAGAMENTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.comprovantePagamento").value(Base64Utils.encodeToString(DEFAULT_COMPROVANTE_PAGAMENTO)));
    }
    @Test
    @Transactional
    public void getNonExistingAReceber() throws Exception {
        // Get the aReceber
        restAReceberMockMvc.perform(get("/api/a-recebers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAReceber() throws Exception {
        // Initialize the database
        aReceberRepository.saveAndFlush(aReceber);

        int databaseSizeBeforeUpdate = aReceberRepository.findAll().size();

        // Update the aReceber
        AReceber updatedAReceber = aReceberRepository.findById(aReceber.getId()).get();
        // Disconnect from session so that the updates on updatedAReceber are not directly saved in db
        em.detach(updatedAReceber);
        updatedAReceber
            .dtRecebido(UPDATED_DT_RECEBIDO)
            .dtRecebimento(UPDATED_DT_RECEBIMENTO)
            .valor(UPDATED_VALOR)
            .moeda(UPDATED_MOEDA)
            .descricao(UPDATED_DESCRICAO)
            .status(UPDATED_STATUS)
            .comprovantePagamento(UPDATED_COMPROVANTE_PAGAMENTO)
            .comprovantePagamentoContentType(UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);

        restAReceberMockMvc.perform(put("/api/a-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAReceber)))
            .andExpect(status().isOk());

        // Validate the AReceber in the database
        List<AReceber> aReceberList = aReceberRepository.findAll();
        assertThat(aReceberList).hasSize(databaseSizeBeforeUpdate);
        AReceber testAReceber = aReceberList.get(aReceberList.size() - 1);
        assertThat(testAReceber.getDtRecebido()).isEqualTo(UPDATED_DT_RECEBIDO);
        assertThat(testAReceber.getDtRecebimento()).isEqualTo(UPDATED_DT_RECEBIMENTO);
        assertThat(testAReceber.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testAReceber.getMoeda()).isEqualTo(UPDATED_MOEDA);
        assertThat(testAReceber.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAReceber.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAReceber.getComprovantePagamento()).isEqualTo(UPDATED_COMPROVANTE_PAGAMENTO);
        assertThat(testAReceber.getComprovantePagamentoContentType()).isEqualTo(UPDATED_COMPROVANTE_PAGAMENTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAReceber() throws Exception {
        int databaseSizeBeforeUpdate = aReceberRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAReceberMockMvc.perform(put("/api/a-recebers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aReceber)))
            .andExpect(status().isBadRequest());

        // Validate the AReceber in the database
        List<AReceber> aReceberList = aReceberRepository.findAll();
        assertThat(aReceberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAReceber() throws Exception {
        // Initialize the database
        aReceberRepository.saveAndFlush(aReceber);

        int databaseSizeBeforeDelete = aReceberRepository.findAll().size();

        // Delete the aReceber
        restAReceberMockMvc.perform(delete("/api/a-recebers/{id}", aReceber.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AReceber> aReceberList = aReceberRepository.findAll();
        assertThat(aReceberList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
