package br.com.projetosandre.vendas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.projetosandre.vendas.model.entities.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long>{

    public List<Customer> findTop1ByEmail(String email);
    public List<Customer> findByCpfCnpj(String cpfCnpj);
    public List<Customer> findByTel(String tel);
    public List<Customer> findByNameContaining(String description);
}
