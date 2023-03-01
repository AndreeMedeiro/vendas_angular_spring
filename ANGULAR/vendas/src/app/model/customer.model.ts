import { Endereco } from './endereco.model';
export interface Customer {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  endereco: Endereco;
}
