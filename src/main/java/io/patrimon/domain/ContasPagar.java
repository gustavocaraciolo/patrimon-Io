package io.patrimon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import io.patrimon.domain.enumeration.Status;

/**
 * A ContasPagar.
 */
@Entity
@Table(name = "contas_pagar")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ContasPagar implements Serializable {

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
    @Column(name = "pago")
    private Status pago;

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

    public ContasPagar dtPagamento(LocalDate dtPagamento) {
        this.dtPagamento = dtPagamento;
        return this;
    }

    public void setDtPagamento(LocalDate dtPagamento) {
        this.dtPagamento = dtPagamento;
    }

    public LocalDate getDtVencimento() {
        return dtVencimento;
    }

    public ContasPagar dtVencimento(LocalDate dtVencimento) {
        this.dtVencimento = dtVencimento;
        return this;
    }

    public void setDtVencimento(LocalDate dtVencimento) {
        this.dtVencimento = dtVencimento;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public ContasPagar valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Status getPago() {
        return pago;
    }

    public ContasPagar pago(Status pago) {
        this.pago = pago;
        return this;
    }

    public void setPago(Status pago) {
        this.pago = pago;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContasPagar)) {
            return false;
        }
        return id != null && id.equals(((ContasPagar) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContasPagar{" +
            "id=" + getId() +
            ", dtPagamento='" + getDtPagamento() + "'" +
            ", dtVencimento='" + getDtVencimento() + "'" +
            ", valor=" + getValor() +
            ", pago='" + getPago() + "'" +
            "}";
    }
}
