package br.com.projetosandre.vendas.dto.mapper;

import org.springframework.stereotype.Component;

import br.com.projetosandre.vendas.dto.CustomerDTO;
import br.com.projetosandre.vendas.model.entities.Customer;

@Component
public class CustomerMapper {

    public CustomerDTO toDto(Customer customer){
        return new CustomerDTO(customer.getId(),customer.getName(), customer.getCpfCnpj(), customer.getEmail(), customer.getTel(), customer.getAddress());

    }

    public Customer toEntity(CustomerDTO customerDTO) {

        Customer customer = new Customer();
        if (customerDTO.id() != null) {
            customer.setId(customerDTO.id());
        }
        customer.setName(customerDTO.name());
        customer.setCpfCnpj(customerDTO.cpfCnpj());
        customer.setEmail(customerDTO.email());
        customer.setEmail(customerDTO.email());
        customer.setTel(customerDTO.tel());
        customer.setAddress(customerDTO.address());

        return customer;
    }
}
