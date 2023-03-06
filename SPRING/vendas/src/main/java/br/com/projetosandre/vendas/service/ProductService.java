package br.com.projetosandre.vendas.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.projetosandre.vendas.dto.mapper.ProductMapper;
import br.com.projetosandre.vendas.model.entities.Product;
import br.com.projetosandre.vendas.repository.ProductRepository;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public Product add (@NotNull Product product){
        return productRepository.save(product);
    }

    public Iterable<Product> getAll() {
        return productRepository.findAll();
    }

    public Optional<Product[]> getByCode(@NotNull String code) {
        return productRepository.findTop1ByCode(code);
    }

    public Optional<Product> getById(@Positive Integer id) {
        return productRepository.findById(id);//.map(productMapper::toDto);
    }

    public Optional<Product[]> getByDescription(String description) {
        return productRepository.findByDescriptionContaining(description);
    }

    public Product update(@NotNull Product newProduct, @Positive Integer id) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setDescription(newProduct.getDescription());
                    product.setCode(newProduct.getCode());
                    product.setPrice(newProduct.getPrice());
                    return productRepository.save(product);
                }).orElseGet(() -> {
                    newProduct.setId(id);
                    return productRepository.save(newProduct);
                });
    }

    public void delete(@Positive Integer id) {
        productRepository.deleteById(id);
    }
    
}
