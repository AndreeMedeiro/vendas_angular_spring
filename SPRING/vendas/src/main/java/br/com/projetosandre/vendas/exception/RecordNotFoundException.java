package br.com.projetosandre.vendas.exception;

public class RecordNotFoundException extends RuntimeException {
    public RecordNotFoundException(Integer id){
        super("Registro ID<" + id + "> não encontrado");
    }
}
