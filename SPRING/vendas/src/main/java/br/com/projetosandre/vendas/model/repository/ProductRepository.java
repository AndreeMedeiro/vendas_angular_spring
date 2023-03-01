package br.com.projetosandre.vendas.model.repository;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import br.com.projetosandre.vendas.model.entities.Product;

public interface ProductRepository  extends CrudRepository<Product, Integer>{
   
    public Optional<Product[]> findTop1ByCode(String code);
    public Optional<Product[]> findByDescriptionContaining(String description);
    
}
