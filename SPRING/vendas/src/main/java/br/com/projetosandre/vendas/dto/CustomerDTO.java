package br.com.projetosandre.vendas.dto;

import org.hibernate.validator.constraints.Length;

import br.com.projetosandre.vendas.model.entities.Address;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CustomerDTO ( Long id,
@NotBlank  @Length(min = 5 , max = 30) String name,
@NotBlank @NotNull @Length(max = 18) String cpfCnpj,
@NotBlank @NotNull @Length(max = 40) String email,
@NotBlank @NotNull @Length(max = 18) String tel,
Address address
)
 {   
}
