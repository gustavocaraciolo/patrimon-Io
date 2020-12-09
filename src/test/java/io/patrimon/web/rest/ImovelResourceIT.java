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
import javax.persistence.EntityManager;
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
            .nome(DEFAULT_NOME);
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
            .nome(UPDATED_NOME);
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
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
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
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
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
            .nome(UPDATED_NOME);

        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedImovel)))
            .andExpect(status().isOk());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getNome()).isEqualTo(UPDATED_NOME);
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
