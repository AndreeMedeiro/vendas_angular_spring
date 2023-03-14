import { Address } from "src/app/Address/model/address.model";

export interface Customer {
  id: number;
  name: string;
  cpfCnpj: string;
  email: string;
  tel: string;
  address: Address;
}
