package io.patrimon.web.rest;

import io.patrimon.PatrimonIoApp;
import io.patrimon.domain.Imovel;
import io.patrimon.repository.ImovelRepository;

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

/**
 * Integration tests for the {@link ImovelResource} REST controller.
 */
@SpringBootTest(classes = PatrimonIoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ImovelResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PROJETO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROJETO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PROJETO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROJETO_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_TABELA_PRECO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_TABELA_PRECO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_TABELA_PRECO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_TABELA_PRECO_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_CONTRATO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONTRATO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CONTRATO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONTRATO_CONTENT_TYPE = "image/png";

    private static final BigDecimal DEFAULT_VALOR_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_TOTAL = new BigDecimal(2);

    private static final LocalDate DEFAULT_DT_INICIAL_PAGAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_INICIAL_PAGAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DT_FINAL_PAGAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_FINAL_PAGAMENTO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restImovelMockMvc;

    private Imovel imovel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Imovel createEntity(EntityManager em) {
        Imovel imovel = new Imovel()
            .nome(DEFAULT_NOME)
            .projeto(DEFAULT_PROJETO)
            .projetoContentType(DEFAULT_PROJETO_CONTENT_TYPE)
            .tabelaPreco(DEFAULT_TABELA_PRECO)
            .tabelaPrecoContentType(DEFAULT_TABELA_PRECO_CONTENT_TYPE)
            .contrato(DEFAULT_CONTRATO)
            .contratoContentType(DEFAULT_CONTRATO_CONTENT_TYPE)
            .valorTotal(DEFAULT_VALOR_TOTAL)
            .dtInicialPagamento(DEFAULT_DT_INICIAL_PAGAMENTO)
            .dtFinalPagamento(DEFAULT_DT_FINAL_PAGAMENTO);
        return imovel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Imovel createUpdatedEntity(EntityManager em) {
        Imovel imovel = new Imovel()
            .nome(UPDATED_NOME)
            .projeto(UPDATED_PROJETO)
            .projetoContentType(UPDATED_PROJETO_CONTENT_TYPE)
            .tabelaPreco(UPDATED_TABELA_PRECO)
            .tabelaPrecoContentType(UPDATED_TABELA_PRECO_CONTENT_TYPE)
            .contrato(UPDATED_CONTRATO)
            .contratoContentType(UPDATED_CONTRATO_CONTENT_TYPE)
            .valorTotal(UPDATED_VALOR_TOTAL)
            .dtInicialPagamento(UPDATED_DT_INICIAL_PAGAMENTO)
            .dtFinalPagamento(UPDATED_DT_FINAL_PAGAMENTO);
        return imovel;
    }

    @BeforeEach
    public void initTest() {
        imovel = createEntity(em);
    }

    @Test
    @Transactional
    public void createImovel() throws Exception {
        int databaseSizeBeforeCreate = imovelRepository.findAll().size();
        // Create the Imovel
        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isCreated());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeCreate + 1);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testImovel.getProjeto()).isEqualTo(DEFAULT_PROJETO);
        assertThat(testImovel.getProjetoContentType()).isEqualTo(DEFAULT_PROJETO_CONTENT_TYPE);
        assertThat(testImovel.getTabelaPreco()).isEqualTo(DEFAULT_TABELA_PRECO);
        assertThat(testImovel.getTabelaPrecoContentType()).isEqualTo(DEFAULT_TABELA_PRECO_CONTENT_TYPE);
        assertThat(testImovel.getContrato()).isEqualTo(DEFAULT_CONTRATO);
        assertThat(testImovel.getContratoContentType()).isEqualTo(DEFAULT_CONTRATO_CONTENT_TYPE);
        assertThat(testImovel.getValorTotal()).isEqualTo(DEFAULT_VALOR_TOTAL);
        assertThat(testImovel.getDtInicialPagamento()).isEqualTo(DEFAULT_DT_INICIAL_PAGAMENTO);
        assertThat(testImovel.getDtFinalPagamento()).isEqualTo(DEFAULT_DT_FINAL_PAGAMENTO);
    }

    @Test
    @Transactional
    public void createImovelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imovelRepository.findAll().size();

        // Create the Imovel with an existing ID
        imovel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllImovels() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        // Get all the imovelList
        restImovelMockMvc.perform(get("/api/imovels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imovel.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].projetoContentType").value(hasItem(DEFAULT_PROJETO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].projeto").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROJETO))))
            .andExpect(jsonPath("$.[*].tabelaPrecoContentType").value(hasItem(DEFAULT_TABELA_PRECO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].tabelaPreco").value(hasItem(Base64Utils.encodeToString(DEFAULT_TABELA_PRECO))))
            .andExpect(jsonPath("$.[*].contratoContentType").value(hasItem(DEFAULT_CONTRATO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].contrato").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTRATO))))
            .andExpect(jsonPath("$.[*].valorTotal").value(hasItem(DEFAULT_VALOR_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].dtInicialPagamento").value(hasItem(DEFAULT_DT_INICIAL_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].dtFinalPagamento").value(hasItem(DEFAULT_DT_FINAL_PAGAMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        // Get the imovel
        restImovelMockMvc.perform(get("/api/imovels/{id}", imovel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(imovel.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.projetoContentType").value(DEFAULT_PROJETO_CONTENT_TYPE))
            .andExpect(jsonPath("$.projeto").value(Base64Utils.encodeToString(DEFAULT_PROJETO)))
            .andExpect(jsonPath("$.tabelaPrecoContentType").value(DEFAULT_TABELA_PRECO_CONTENT_TYPE))
            .andExpect(jsonPath("$.tabelaPreco").value(Base64Utils.encodeToString(DEFAULT_TABELA_PRECO)))
            .andExpect(jsonPath("$.contratoContentType").value(DEFAULT_CONTRATO_CONTENT_TYPE))
            .andExpect(jsonPath("$.contrato").value(Base64Utils.encodeToString(DEFAULT_CONTRATO)))
            .andExpect(jsonPath("$.valorTotal").value(DEFAULT_VALOR_TOTAL.intValue()))
            .andExpect(jsonPath("$.dtInicialPagamento").value(DEFAULT_DT_INICIAL_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.dtFinalPagamento").value(DEFAULT_DT_FINAL_PAGAMENTO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingImovel() throws Exception {
        // Get the imovel
        restImovelMockMvc.perform(get("/api/imovels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        int databaseSizeBeforeUpdate = imovelRepository.findAll().size();

        // Update the imovel
        Imovel updatedImovel = imovelRepository.findById(imovel.getId()).get();
        // Disconnect from session so that the updates on updatedImovel are not directly saved in db
        em.detach(updatedImovel);
        updatedImovel
            .nome(UPDATED_NOME)
            .projeto(UPDATED_PROJETO)
            .projetoContentType(UPDATED_PROJETO_CONTENT_TYPE)
            .tabelaPreco(UPDATED_TABELA_PRECO)
            .tabelaPrecoContentType(UPDATED_TABELA_PRECO_CONTENT_TYPE)
            .contrato(UPDATED_CONTRATO)
            .contratoContentType(UPDATED_CONTRATO_CONTENT_TYPE)
            .valorTotal(UPDATED_VALOR_TOTAL)
            .dtInicialPagamento(UPDATED_DT_INICIAL_PAGAMENTO)
            .dtFinalPagamento(UPDATED_DT_FINAL_PAGAMENTO);

        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedImovel)))
            .andExpect(status().isOk());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testImovel.getProjeto()).isEqualTo(UPDATED_PROJETO);
        assertThat(testImovel.getProjetoContentType()).isEqualTo(UPDATED_PROJETO_CONTENT_TYPE);
        assertThat(testImovel.getTabelaPreco()).isEqualTo(UPDATED_TABELA_PRECO);
        assertThat(testImovel.getTabelaPrecoContentType()).isEqualTo(UPDATED_TABELA_PRECO_CONTENT_TYPE);
        assertThat(testImovel.getContrato()).isEqualTo(UPDATED_CONTRATO);
        assertThat(testImovel.getContratoContentType()).isEqualTo(UPDATED_CONTRATO_CONTENT_TYPE);
        assertThat(testImovel.getValorTotal()).isEqualTo(UPDATED_VALOR_TOTAL);
        assertThat(testImovel.getDtInicialPagamento()).isEqualTo(UPDATED_DT_INICIAL_PAGAMENTO);
        assertThat(testImovel.getDtFinalPagamento()).isEqualTo(UPDATED_DT_FINAL_PAGAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingImovel() throws Exception {
        int databaseSizeBeforeUpdate = imovelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        int databaseSizeBeforeDelete = imovelRepository.findAll().size();

        // Delete the imovel
        restImovelMockMvc.perform(delete("/api/imovels/{id}", imovel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
