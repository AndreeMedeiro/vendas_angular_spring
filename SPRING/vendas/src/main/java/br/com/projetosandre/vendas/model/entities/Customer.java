package br.com.projetosandre.vendas.model.entities;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "Customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    @NotBlank(message = "O Nome é obrigatório!")
    @Length(min = 5, max = 30, message = "O Nome precisa ter entre 5 e 30 caracteres!")
    @Column(length = 30, nullable = false)
    String name;

    @Length(max = 18, message = "O e-mail não pode ter mais que 18 caracteres!")
    @Column(length = 18, nullable = false)
    String cpfCnpj;

    @Length(max = 40, message = "O e-mail não pode ter mais que 40 caracteres!")
    @Email
    @Column(length = 40, nullable = false)
    String email;

    @Length(max = 18, message = "O telefone não pode ter mais que 18 caracteres!")
    @Column(length = 18, nullable = false)
    String tel;
    @Embedded
    Address address;

    public Customer() {

    }

    public Customer(Long id,
            @NotBlank(message = "O Nome é obrigatório!") @Length(min = 5, max = 30, message = "O Nome precisa ter entre 5 e 30 caracteres!") String name,
            @Length(max = 18, message = "O cpf não pode ter mais que 18 caracteres!") String cpfCnpj,
            @Length(max = 40, message = "O e-mail não pode ter mais que 40 caracteres!") @Email String email,
            @Length(max = 18, message = "O telefone não pode ter mais que 18 caracteres!") String tel,
            Address address) {
        this.id = id;
        this.name = name;
        this.cpfCnpj = cpfCnpj;
        this.email = email;
        this.tel = tel;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpfCnpj() {
        return cpfCnpj;
    }

    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((cpfCnpj == null) ? 0 : cpfCnpj.hashCode());
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
        Customer other = (Customer) obj;
        if (cpfCnpj == null) {
            if (other.cpfCnpj != null)
                return false;
        } else if (!cpfCnpj.equals(other.cpfCnpj))
            return false;
        return true;
    }

}
