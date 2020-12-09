package io.patrimon.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import io.patrimon.domain.enumeration.Moeda;

import io.patrimon.domain.enumeration.Status;

/**
 * A APagar.
 */
@Entity
@Table(name = "a_pagar")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class APagar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dt_pagamento")
    private LocalDate dtPagamento;

    @Column(name = "dt_vencimento")
    private LocalDate dtVencimento;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "moeda")
    private Moeda moeda;

    @Column(name = "descricao")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Lob
    @Column(name = "comprovante_pagamento")
    private byte[] comprovantePagamento;

    @Column(name = "comprovante_pagamento_content_type")
    private String comprovantePagamentoContentType;

    @ManyToOne
    @JsonIgnoreProperties(value = "aPagars", allowSetters = true)
    private Imovel imovel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDtPagamento() {
        return dtPagamento;
    }

    public APagar dtPagamento(LocalDate dtPagamento) {
        this.dtPagamento = dtPagamento;
        return this;
    }

    public void setDtPagamento(LocalDate dtPagamento) {
        this.dtPagamento = dtPagamento;
    }

    public LocalDate getDtVencimento() {
        return dtVencimento;
    }

    public APagar dtVencimento(LocalDate dtVencimento) {
        this.dtVencimento = dtVencimento;
        return this;
    }

    public void setDtVencimento(LocalDate dtVencimento) {
        this.dtVencimento = dtVencimento;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public APagar valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Moeda getMoeda() {
        return moeda;
    }

    public APagar moeda(Moeda moeda) {
        this.moeda = moeda;
        return this;
    }

    public void setMoeda(Moeda moeda) {
        this.moeda = moeda;
    }

    public String getDescricao() {
        return descricao;
    }

    public APagar descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Status getStatus() {
        return status;
    }

    public APagar status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public byte[] getComprovantePagamento() {
        return comprovantePagamento;
    }

    public APagar comprovantePagamento(byte[] comprovantePagamento) {
        this.comprovantePagamento = comprovantePagamento;
        return this;
    }

    public void setComprovantePagamento(byte[] comprovantePagamento) {
        this.comprovantePagamento = comprovantePagamento;
    }

    public String getComprovantePagamentoContentType() {
        return comprovantePagamentoContentType;
    }

    public APagar comprovantePagamentoContentType(String comprovantePagamentoContentType) {
        this.comprovantePagamentoContentType = comprovantePagamentoContentType;
        return this;
    }

    public void setComprovantePagamentoContentType(String comprovantePagamentoContentType) {
        this.comprovantePagamentoContentType = comprovantePagamentoContentType;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public APagar imovel(Imovel imovel) {
        this.imovel = imovel;
        return this;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof APagar)) {
            return false;
        }
        return id != null && id.equals(((APagar) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "APagar{" +
            "id=" + getId() +
            ", dtPagamento='" + getDtPagamento() + "'" +
            ", dtVencimento='" + getDtVencimento() + "'" +
            ", valor=" + getValor() +
            ", moeda='" + getMoeda() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", status='" + getStatus() + "'" +
            ", comprovantePagamento='" + getComprovantePagamento() + "'" +
            ", comprovantePagamentoContentType='" + getComprovantePagamentoContentType() + "'" +
            "}";
    }
}
