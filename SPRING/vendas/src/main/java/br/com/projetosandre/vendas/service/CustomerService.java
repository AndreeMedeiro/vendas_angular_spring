package br.com.projetosandre.vendas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.projetosandre.vendas.model.entities.Customer;
import br.com.projetosandre.vendas.repository.CustomerRepository;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CustomerService  {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer add (@NotNull Customer customer){
        return customerRepository.save(customer);
    }

    public Customer update (@NotNull Customer newCustomer, @Positive Long id){
        return customerRepository.findById(id)
        .map(customer -> {
            customer.setName(newCustomer.getName());
            customer.setCpfCnpj(newCustomer.getCpfCnpj());
            customer.setEmail(newCustomer.getEmail());
            customer.setTel(newCustomer.getTel());
            customer.setAddress(newCustomer.getAddress());
            return customerRepository.save(customer);
        }).orElseGet(() -> {
            newCustomer.setId(id);
            return customerRepository.save(newCustomer);
        });
    }

    public void delete(@Positive Long id) {
        customerRepository.deleteById(id);
    }

    public List<Customer> getByEmail(@NotNull String email) {
        return customerRepository.findTop1ByEmail(email);
    }

    public Optional<Customer> getById(@Positive Long id) {
        return customerRepository.findById(id);
    }

    public List<Customer> getByName(String name) {
        return customerRepository.findByNameContaining(name);
    }

    public List<Customer> getByCpfCnpj(String cpfCnpj) {
        return customerRepository.findByCpfCnpj(cpfCnpj);
    }

    public List<Customer> getByTel(String tel) {
        return customerRepository.findByTel(tel);
    }
    
    
    
}
