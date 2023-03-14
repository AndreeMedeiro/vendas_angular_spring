package br.com.projetosandre.vendas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.projetosandre.vendas.model.entities.Product;
import br.com.projetosandre.vendas.repository.ProductRepository;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    public Product add (@NotNull Product product){
        return productRepository.save(product);
    }

    public List<Product> getByCode(@NotNull String code) {
        return productRepository.findTop1ByCode(code);
    }

    public Optional<Product> getById(@Positive Integer id) {
        return productRepository.findById(id);
    }

    public List<Product> getByDescription(String description) {
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
