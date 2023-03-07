package br.com.projetosandre.vendas.model.entities;

import org.hibernate.validator.constraints.Length;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity(name = "Produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE )
    Integer id;

    @NotBlank(message = "O Código é obrigatório!")
    @Length( max = 30, message = "O Código não pode ter mais que 30 caracteres!")
    @Column(length = 30, nullable = false)
    String codigo;

    @NotBlank(message = "A Descrição é obrigatória!")
    @NonNull
    @Length(min = 3, max = 50, message = "A descrição precisa ter entre 3 a 100 caracteres!")
    @Column(length = 50, nullable = false)
    String descricao;

    @NonNull
    @Positive
    double preco;

    public Produto() {
    }

    public Produto(int id, String codigo, String descricao, double preco) {
        this.id = id;
        this.codigo = codigo;
        this.descricao = descricao;
        this.preco = preco;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Produto other = (Produto) obj;
        if (codigo == null) {
            if (other.codigo != null)
                return false;
        } else if (!codigo.equals(other.codigo))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", codigo=" + codigo + ", descricao=" + descricao + ", preco=" + preco + "]";
    }

}
