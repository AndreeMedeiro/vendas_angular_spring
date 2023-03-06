package br.com.projetosandre.vendas.controller;
import java.util.Optional;

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

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Product add(@RequestBody @Valid  @NonNull Product product) {

        return this.productService.add(product);

    }

    @GetMapping()
    public Iterable<Product> getAll() {
        return this.productService.getAll();
    }

    @GetMapping("/Code/{code}")
    public Optional<Product[]> getByCodigo(@PathVariable String code) {
        return this.productService.getByCode(code);
    }

    @GetMapping("/{id}")
    public Optional<Product> getById(@PathVariable @Positive Integer id) {
        return this.productService.getById(id);
    }

    /**
     * @param description
     * @return
     */
    @GetMapping("/description/{description}")
    public Optional<Product[]> getByDescription(@PathVariable String description) {
        return this.productService.getByDescription(description);
    }

    @PutMapping("/{id}")
    public Product update(@RequestBody @Valid @NotNull Product newProduct, @PathVariable @Positive Integer id) {
        return this.productService.update(newProduct, id);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable @Positive Integer id) {
        this.productService.delete(id);
    }

}
