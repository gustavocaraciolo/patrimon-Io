package io.patrimon.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import io.patrimon.domain.enumeration.TipoIvestimento;

/**
 * A Investimento.
 */
@Entity
@Table(name = "investimento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Investimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "investimento")
    private TipoIvestimento investimento;

    @ManyToOne
    @JsonIgnoreProperties(value = "investimentos", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoIvestimento getInvestimento() {
        return investimento;
    }

    public Investimento investimento(TipoIvestimento investimento) {
        this.investimento = investimento;
        return this;
    }

    public void setInvestimento(TipoIvestimento investimento) {
        this.investimento = investimento;
    }

    public User getUser() {
        return user;
    }

    public Investimento user(User user) {
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
        if (!(o instanceof Investimento)) {
            return false;
        }
        return id != null && id.equals(((Investimento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Investimento{" +
            "id=" + getId() +
            ", investimento='" + getInvestimento() + "'" +
            "}";
    }
}
