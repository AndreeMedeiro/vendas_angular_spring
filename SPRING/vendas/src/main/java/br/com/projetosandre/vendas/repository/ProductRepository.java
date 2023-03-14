package br.com.projetosandre.vendas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import br.com.projetosandre.vendas.model.entities.Product;

public interface ProductRepository  extends CrudRepository<Product, Integer>{
   
    public List<Product> findTop1ByCode(String code);
    public List<Product> findByDescriptionContaining(String description);
    
}
