package io.patrimon.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

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

    @ManyToOne
    @JsonIgnoreProperties(value = "imovels", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "imovels", allowSetters = true)
    private ContasReceber contasReceber;

    @ManyToOne
    @JsonIgnoreProperties(value = "imovels", allowSetters = true)
    private ContasPagar contasPagar;

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

    public ContasReceber getContasReceber() {
        return contasReceber;
    }

    public Imovel contasReceber(ContasReceber contasReceber) {
        this.contasReceber = contasReceber;
        return this;
    }

    public void setContasReceber(ContasReceber contasReceber) {
        this.contasReceber = contasReceber;
    }

    public ContasPagar getContasPagar() {
        return contasPagar;
    }

    public Imovel contasPagar(ContasPagar contasPagar) {
        this.contasPagar = contasPagar;
        return this;
    }

    public void setContasPagar(ContasPagar contasPagar) {
        this.contasPagar = contasPagar;
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
            "}";
    }
}
