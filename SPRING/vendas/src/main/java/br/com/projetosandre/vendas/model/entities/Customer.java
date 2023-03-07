package br.com.projetosandre.vendas.model.entities;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

// @Entity(name = "Customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE )
    Long id;

    
    @NotBlank(message = "O Nome é obrigatório!")
    @Length(min = 5, max = 30, message = "O Nome precisa ter entre 5 e 30 caracteres!")
    @Column(length = 30, nullable = false)
    String name;

    @Length(max = 18, message = "O e-mail não pode ter mais que 18 caracteres!")
    @Column(length = 18, nullable = false)
    String cpfCnpj;

    @Length(max = 40, message = "O e-mail não pode ter mais que 40 caracteres!")
    @Column(length = 40, nullable = false)
    String email;

    String telefone;





    
}
