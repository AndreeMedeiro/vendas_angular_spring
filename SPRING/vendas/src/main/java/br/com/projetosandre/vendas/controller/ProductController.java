package br.com.projetosandre.vendas.controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetosandre.vendas.model.entities.Product;
import br.com.projetosandre.vendas.model.repository.ProductRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping()
    public Product add(@RequestBody @Valid Product product) throws Exception {

        System.out.println(product);
        try {
            // var productDb = productRepository.findTop1ByCodigo(product.getCodigo());

            // System.out.println(product.getCodigo());
            // System.out.println(productDb);
            // if(productDb != null){
            // throw new Exception("O código já está sendo utilizado em outro cadastro!");
            // }

            productRepository.save(product);
            System.out.println(product);
            return productRepository.save(product);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    @GetMapping()
    public Iterable<Product> getAll() {
        return productRepository.findAll();
    }

    @GetMapping("/Code/{code}")
    public Optional<Product[]> getByCodigo(@PathVariable String code) {
        return productRepository.findTop1ByCode(code);
    }

    @GetMapping("/{id}")
    public Optional<Product> getById(@PathVariable Integer id) {
        return productRepository.findById(id);
    }

    @GetMapping("/description/{description}")
    public Optional<Product[]> getByDescription(@PathVariable String description) {
        return productRepository.findByDescriptionContaining(description);
    }

    @PutMapping("/{id}")
    public Product update(@RequestBody @Valid Product newProduct, @PathVariable Integer id) {
        System.out.println(id);
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

    @DeleteMapping("/{id}")
    void deleteEmployee(@PathVariable Integer id) {
      productRepository.deleteById(id);
    }

}
