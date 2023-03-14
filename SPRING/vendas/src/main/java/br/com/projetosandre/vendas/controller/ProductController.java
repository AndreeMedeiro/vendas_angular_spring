package br.com.projetosandre.vendas.controller;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetosandre.vendas.dto.ProductDTO;
import br.com.projetosandre.vendas.dto.mapper.ProductMapper;
import br.com.projetosandre.vendas.model.entities.Product;
import br.com.projetosandre.vendas.service.ProductService;
import io.micrometer.common.lang.NonNull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping(path = "api/products")
public class ProductController {

    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private ProductMapper productMapper;

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public ProductDTO add(@RequestBody @Valid  @NonNull ProductDTO productdDto) {
        
        return productMapper.toDto(this.productService.add(productMapper.toEntity(productdDto)));
    }

    @GetMapping("/Code/{code}")
    public List<ProductDTO> getByCodigo(@PathVariable String code) {
        return this.productService.getByCode(code).stream()
        .map(productMapper::toDto)
        .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<ProductDTO> getById(@PathVariable @Positive Integer id) {
        return this.productService.getById(id).map(productMapper::toDto);
    }

    @GetMapping("/description/{description}")
    public List<ProductDTO> getByDescription(@PathVariable String description) {
        return this.productService.getByDescription(description).stream()
        .map(productMapper::toDto)
        .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ProductDTO update(@RequestBody @Valid @NotNull ProductDTO newProduct, @PathVariable @Positive Integer id) {
        return productMapper.toDto(this.productService.update(productMapper.toEntity(newProduct), id));
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable @Positive Integer id) {
        this.productService.delete(id);
    }

}
