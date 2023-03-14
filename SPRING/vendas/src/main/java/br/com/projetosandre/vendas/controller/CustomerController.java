package br.com.projetosandre.vendas.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
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

import br.com.projetosandre.vendas.dto.CustomerDTO;
import br.com.projetosandre.vendas.dto.mapper.CustomerMapper;
import br.com.projetosandre.vendas.model.entities.Customer;
import br.com.projetosandre.vendas.service.CustomerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

// @Validated
@RestController
@RequestMapping(path = "api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private CustomerMapper customerMapper;
    
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Customer add(@RequestBody  @NotNull CustomerDTO customerDto) {

        return this.customerService.add(customerMapper.toEntity(customerDto));

    }
    
    @PutMapping("/{id}")
    public CustomerDTO update(@RequestBody @Valid @NotNull CustomerDTO newCustomer, @PathVariable @Positive Long id) {
        return  customerMapper.toDto(this.customerService.update(customerMapper.toEntity(newCustomer), id));
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable @Positive Long id) {
        this.customerService.delete(id);
    }


    @GetMapping("/email/{email}")
    public List<CustomerDTO> getByEmail(@PathVariable String email) {
        return this.customerService.getByEmail(email).stream()
        .map(customerMapper::toDto)
        .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<CustomerDTO> getById(@PathVariable @Positive Long id) {
        return this.customerService.getById(id).map(customerMapper::toDto);
    }

    @GetMapping("/name/{name}")
    public List<CustomerDTO> getByName(@PathVariable String name) {
        return this.customerService.getByName(name).stream()
        .map(customerMapper::toDto)
        .collect(Collectors.toList());
    }

    @GetMapping("/cpfCnpj/{cpfCnpj}")
    public List<CustomerDTO> getByCpfCnpj(@PathVariable String cpfCnpj) {
        return this.customerService.getByCpfCnpj(cpfCnpj).stream()
        .map(customerMapper::toDto)
        .collect(Collectors.toList());
    }

    @GetMapping("/tel/{tel}")
    public List<CustomerDTO> getByTel(@PathVariable String tel) {
        return this.customerService.getByTel(tel).stream()
        .map(customerMapper::toDto)
        .collect(Collectors.toList());
    }

    
}
