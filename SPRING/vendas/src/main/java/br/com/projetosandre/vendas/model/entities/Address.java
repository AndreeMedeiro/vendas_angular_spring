package br.com.projetosandre.vendas.model.entities;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    @Length(max = 11, message = "O cep não pode ter mais que 10 caracteres!")
    @Column(length = 11, nullable = false)
    String zipCode;

    @Length(max = 100, message = "O rua não pode ter mais que 100 caracteres!")
    @Column(length = 100, nullable = false)
    String street;

    @Length(max = 10, message = "O numero não pode ter mais que 10 caracteres!")
    @Column(length = 10, nullable = false)
    String number;

    @Length(max = 30, message = "O complemento não pode ter mais que 30 caracteres!")
    @Column(length = 30)
    String complement;

    @Length(max = 30, message = "O bairro não pode ter mais que 30 caracteres!")
    @Column(length = 30, nullable = false)
    String district;

    
    @Length(max = 30, message = "O bairro não pode ter mais que 30 caracteres!")
    @Column(length = 30, nullable = false)
    String city;

    @Length(max = 30, message = "O estado não pode ter mais que 30 caracteres!")
    @Column(length = 30, nullable = false)
    String uf;    

    public Address() {
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((zipCode == null) ? 0 : zipCode.hashCode());
        result = prime * result + ((street == null) ? 0 : street.hashCode());
        result = prime * result + ((number == null) ? 0 : number.hashCode());
        result = prime * result + ((complement == null) ? 0 : complement.hashCode());
        result = prime * result + ((district == null) ? 0 : district.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((uf == null) ? 0 : uf.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Address other = (Address) obj;
        if (zipCode == null) {
            if (other.zipCode != null)
                return false;
        } else if (!zipCode.equals(other.zipCode))
            return false;
        if (street == null) {
            if (other.street != null)
                return false;
        } else if (!street.equals(other.street))
            return false;
        if (number == null) {
            if (other.number != null)
                return false;
        } else if (!number.equals(other.number))
            return false;
        if (complement == null) {
            if (other.complement != null)
                return false;
        } else if (!complement.equals(other.complement))
            return false;
        if (district == null) {
            if (other.district != null)
                return false;
        } else if (!district.equals(other.district))
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (uf == null) {
            if (other.uf != null)
                return false;
        } else if (!uf.equals(other.uf))
            return false;
        return true;
    }

    

    


}
