package br.com.projetosandre.vendas.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.PositiveOrZero;

public record ProductDTO( Integer id,
@NotBlank  @Length( max = 30) String code,
@NotBlank @NotNull @Length(min = 3, max = 50) String description,
@Null @PositiveOrZero double price) {
    
}
