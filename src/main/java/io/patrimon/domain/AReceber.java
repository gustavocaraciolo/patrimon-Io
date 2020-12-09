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
 * A AReceber.
 */
@Entity
@Table(name = "a_receber")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AReceber implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dt_recebido")
    private LocalDate dtRecebido;

    @Column(name = "dt_recebimento")
    private LocalDate dtRecebimento;

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
    @JsonIgnoreProperties(value = "aRecebers", allowSetters = true)
    private User imovel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDtRecebido() {
        return dtRecebido;
    }

    public AReceber dtRecebido(LocalDate dtRecebido) {
        this.dtRecebido = dtRecebido;
        return this;
    }

    public void setDtRecebido(LocalDate dtRecebido) {
        this.dtRecebido = dtRecebido;
    }

    public LocalDate getDtRecebimento() {
        return dtRecebimento;
    }

    public AReceber dtRecebimento(LocalDate dtRecebimento) {
        this.dtRecebimento = dtRecebimento;
        return this;
    }

    public void setDtRecebimento(LocalDate dtRecebimento) {
        this.dtRecebimento = dtRecebimento;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public AReceber valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Moeda getMoeda() {
        return moeda;
    }

    public AReceber moeda(Moeda moeda) {
        this.moeda = moeda;
        return this;
    }

    public void setMoeda(Moeda moeda) {
        this.moeda = moeda;
    }

    public String getDescricao() {
        return descricao;
    }

    public AReceber descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Status getStatus() {
        return status;
    }

    public AReceber status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public byte[] getComprovantePagamento() {
        return comprovantePagamento;
    }

    public AReceber comprovantePagamento(byte[] comprovantePagamento) {
        this.comprovantePagamento = comprovantePagamento;
        return this;
    }

    public void setComprovantePagamento(byte[] comprovantePagamento) {
        this.comprovantePagamento = comprovantePagamento;
    }

    public String getComprovantePagamentoContentType() {
        return comprovantePagamentoContentType;
    }

    public AReceber comprovantePagamentoContentType(String comprovantePagamentoContentType) {
        this.comprovantePagamentoContentType = comprovantePagamentoContentType;
        return this;
    }

    public void setComprovantePagamentoContentType(String comprovantePagamentoContentType) {
        this.comprovantePagamentoContentType = comprovantePagamentoContentType;
    }

    public User getImovel() {
        return imovel;
    }

    public AReceber imovel(User user) {
        this.imovel = user;
        return this;
    }

    public void setImovel(User user) {
        this.imovel = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AReceber)) {
            return false;
        }
        return id != null && id.equals(((AReceber) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AReceber{" +
            "id=" + getId() +
            ", dtRecebido='" + getDtRecebido() + "'" +
            ", dtRecebimento='" + getDtRecebimento() + "'" +
            ", valor=" + getValor() +
            ", moeda='" + getMoeda() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", status='" + getStatus() + "'" +
            ", comprovantePagamento='" + getComprovantePagamento() + "'" +
            ", comprovantePagamentoContentType='" + getComprovantePagamentoContentType() + "'" +
            "}";
    }
}
