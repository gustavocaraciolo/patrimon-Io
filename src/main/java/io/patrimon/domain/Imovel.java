package io.patrimon.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A Imovel.
 */
@Entity
@Table(name = "imovel")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Imovel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Lob
    @Column(name = "projeto")
    private byte[] projeto;

    @Column(name = "projeto_content_type")
    private String projetoContentType;

    @Lob
    @Column(name = "tabela_preco")
    private byte[] tabelaPreco;

    @Column(name = "tabela_preco_content_type")
    private String tabelaPrecoContentType;

    @Lob
    @Column(name = "contrato")
    private byte[] contrato;

    @Column(name = "contrato_content_type")
    private String contratoContentType;

    @Column(name = "valor_total", precision = 21, scale = 2)
    private BigDecimal valorTotal;

    @Column(name = "dt_inicial_pagamento")
    private LocalDate dtInicialPagamento;

    @Column(name = "dt_final_pagamento")
    private LocalDate dtFinalPagamento;

    @Column(name = "dia_preferencial_pgmt")
    private LocalDate diaPreferencialPgmt;

    @ManyToOne
    @JsonIgnoreProperties(value = "imovels", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Imovel nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte[] getProjeto() {
        return projeto;
    }

    public Imovel projeto(byte[] projeto) {
        this.projeto = projeto;
        return this;
    }

    public void setProjeto(byte[] projeto) {
        this.projeto = projeto;
    }

    public String getProjetoContentType() {
        return projetoContentType;
    }

    public Imovel projetoContentType(String projetoContentType) {
        this.projetoContentType = projetoContentType;
        return this;
    }

    public void setProjetoContentType(String projetoContentType) {
        this.projetoContentType = projetoContentType;
    }

    public byte[] getTabelaPreco() {
        return tabelaPreco;
    }

    public Imovel tabelaPreco(byte[] tabelaPreco) {
        this.tabelaPreco = tabelaPreco;
        return this;
    }

    public void setTabelaPreco(byte[] tabelaPreco) {
        this.tabelaPreco = tabelaPreco;
    }

    public String getTabelaPrecoContentType() {
        return tabelaPrecoContentType;
    }

    public Imovel tabelaPrecoContentType(String tabelaPrecoContentType) {
        this.tabelaPrecoContentType = tabelaPrecoContentType;
        return this;
    }

    public void setTabelaPrecoContentType(String tabelaPrecoContentType) {
        this.tabelaPrecoContentType = tabelaPrecoContentType;
    }

    public byte[] getContrato() {
        return contrato;
    }

    public Imovel contrato(byte[] contrato) {
        this.contrato = contrato;
        return this;
    }

    public void setContrato(byte[] contrato) {
        this.contrato = contrato;
    }

    public String getContratoContentType() {
        return contratoContentType;
    }

    public Imovel contratoContentType(String contratoContentType) {
        this.contratoContentType = contratoContentType;
        return this;
    }

    public void setContratoContentType(String contratoContentType) {
        this.contratoContentType = contratoContentType;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public Imovel valorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public LocalDate getDtInicialPagamento() {
        return dtInicialPagamento;
    }

    public Imovel dtInicialPagamento(LocalDate dtInicialPagamento) {
        this.dtInicialPagamento = dtInicialPagamento;
        return this;
    }

    public void setDtInicialPagamento(LocalDate dtInicialPagamento) {
        this.dtInicialPagamento = dtInicialPagamento;
    }

    public LocalDate getDtFinalPagamento() {
        return dtFinalPagamento;
    }

    public Imovel dtFinalPagamento(LocalDate dtFinalPagamento) {
        this.dtFinalPagamento = dtFinalPagamento;
        return this;
    }

    public void setDtFinalPagamento(LocalDate dtFinalPagamento) {
        this.dtFinalPagamento = dtFinalPagamento;
    }

    public LocalDate getDiaPreferencialPgmt() {
        return diaPreferencialPgmt;
    }

    public Imovel diaPreferencialPgmt(LocalDate diaPreferencialPgmt) {
        this.diaPreferencialPgmt = diaPreferencialPgmt;
        return this;
    }

    public void setDiaPreferencialPgmt(LocalDate diaPreferencialPgmt) {
        this.diaPreferencialPgmt = diaPreferencialPgmt;
    }

    public User getUser() {
        return user;
    }

    public Imovel user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Imovel)) {
            return false;
        }
        return id != null && id.equals(((Imovel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Imovel{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", projeto='" + getProjeto() + "'" +
            ", projetoContentType='" + getProjetoContentType() + "'" +
            ", tabelaPreco='" + getTabelaPreco() + "'" +
            ", tabelaPrecoContentType='" + getTabelaPrecoContentType() + "'" +
            ", contrato='" + getContrato() + "'" +
            ", contratoContentType='" + getContratoContentType() + "'" +
            ", valorTotal=" + getValorTotal() +
            ", dtInicialPagamento='" + getDtInicialPagamento() + "'" +
            ", dtFinalPagamento='" + getDtFinalPagamento() + "'" +
            ", diaPreferencialPgmt='" + getDiaPreferencialPgmt() + "'" +
            "}";
    }
}
