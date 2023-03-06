package br.com.projetosandre.vendas.dto.mapper;

import org.springframework.stereotype.Component;

import br.com.projetosandre.vendas.dto.ProductDTO;
import br.com.projetosandre.vendas.model.entities.Product;

@Component
public class ProductMapper {
    public ProductDTO toDto(Product product){
        return new ProductDTO(product.getId(), product.getCode(), product.getDescription(), product.getPrice());

    }
}
