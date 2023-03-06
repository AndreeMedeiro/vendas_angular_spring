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

@Entity(name = "Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE )
    Integer id;

    @NotBlank(message = "O Código é obrigatório!")
    @Length( max = 30, message = "O Código não pode ter mais que 30 caracteres!")
    @Column(length = 30, nullable = false)
    String code;

    @NotBlank(message = "A Descrição é obrigatória!")
    @NonNull
    @Length(min = 3, max = 50, message = "A descrição precisa ter entre 3 a 100 caracteres!")
    @Column(length = 50, nullable = false)
    String description;

    @NonNull
    @Positive
    double price;

    public Product() {
    }

    public Product(int id, String code, String description, double price) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((code == null) ? 0 : code.hashCode());
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
        Product other = (Product) obj;
        if (code == null) {
            if (other.code != null)
                return false;
        } else if (!code.equals(other.code))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", codigo=" + code + ", descricao=" + description + ", preco=" + price + "]";
    }

}
