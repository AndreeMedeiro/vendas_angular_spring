import { Endereco } from './../../../model/endereco.model';
import { CustomersService } from './../customers.service';
import { Customer } from './../../../model/customer.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuscaCepService } from 'src/app/shared/services/busca-cep/busca-cep.service';

@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.css']
})
export class CustomerCrudComponent implements OnInit {

  operacaoCrud!: OperacaoCrud;
  idCliente: number = 0;
  enabledButtonSave: boolean = true;
  enabledButtonDelete: boolean = false;

  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  customerForm = this.fb.group({
    id: [0],
    nome: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
    cpf: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email],],
    celular: ['', [Validators.required],],
    endereco: this.fb.group({
      cep: ['', [Validators.required],],
      rua: ['', [Validators.required],],
      numero: ['', [Validators.required, Validators.maxLength(6)],],
      complemento: ['', [Validators.required,],],
      bairro: ['', [Validators.required,],],
      cidade: ['', [Validators.required,],],
      estado: ['', [Validators.required],],
    })
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private buscaCepService: BuscaCepService,
    private customerService: CustomersService,
    private snackBar: MatSnackBar
  ) {
    switch (data.operacaoCrud) {
      case 1: {
        this.operacaoCrud = OperacaoCrud.Create;
        break;
      }
      case 2: {
        this.operacaoCrud = OperacaoCrud.Read;
        break;
      }
      case 3: {
        this.operacaoCrud = OperacaoCrud.Update;
        break;
      }
      case 4: {
        this.operacaoCrud = OperacaoCrud.Delete;
        break;
      }
      default: {
        this.operacaoCrud = OperacaoCrud.Create;
        break;
      }
    }

    this.idCliente = data.id ?? 0;
  }

  ngOnInit(): void {
    this.verificaCliente()
  }

  buscaCep() {
    console.log(this.customerForm.value.endereco?.estado)
    var cep = this.customerForm.value.endereco?.cep ?? ''
    console.log(cep)
    this.buscaCepService.get(cep).subscribe(cep => {
      this.customerForm.patchValue({
        endereco: {
          rua: cep.logradouro,
          bairro: cep.bairro,
          cidade: cep.localidade,
          estado: cep.uf,
        }
      });
      console.log(cep)
    })
  }

  async save() {
    console.log(this.customerForm)
    var clienteValido = await this.validaDadosCliente();
    console.log(clienteValido)

    console.log(this.operacaoCrud)
    if (this.customerForm.valid && clienteValido) {
      if (this.operacaoCrud == OperacaoCrud.Create) {
        this.customerService
          .create(this.customerForm.value)
          .subscribe((result) => {
            this.idCliente = result.id
            if(this.idCliente > 0) {
              this.customerService.readById2(this.idCliente.toString())
            }});
        this.dialogRef.close(true);
        this.customerForm.reset();

        console.log(this.idCliente)

        // window.location.reload();

      }
      else if (this.operacaoCrud == OperacaoCrud.Update) {
        console.log(this.customerForm.value)
        this.customerService.update(this.customerForm.value).subscribe(() => {
          console.log('atualizado!');
        });
        this.dialogRef.close(true);
        this.customerForm.reset();
        // window.location.reload();
        if(this.idCliente > 0) {
          await this.customerService.readById2(this.idCliente.toString())
        }
      }
    }

  }

  cancel(): void {
    this.dialogRef.close();
    this.customerForm.reset();
  }

  delete() {
    console.log(this.customerForm.value);

    this.customerService
      .deleteById(this.idCliente.toString())
      .subscribe(() => {
        this.dialogRef.close(true);
        this.customerForm.reset();
        window.location.reload();
      });
  }

  verificaCliente() {
    if (this.operacaoCrud != OperacaoCrud.Create) {
      this.customerService
        .readById(this.idCliente.toString())
        .subscribe((customer) => {
          this.customerForm.patchValue({
            id: Number(customer!.id!.toString()),
            nome: customer.nome,
            cpf: customer.cpf,
            email: customer.email,
            celular: customer.celular,
            endereco: {
              cep: customer.endereco.cep,
              rua: customer.endereco.rua,
              numero: customer.endereco.numero,
              complemento: customer.endereco.complemento,
              bairro: customer.endereco.bairro,
              cidade: customer.endereco.cidade,
              estado: customer.endereco.estado,
            }

          });

          if (this.operacaoCrud != OperacaoCrud.Update) {
            this.customerForm.get('id')?.disable();
            this.customerForm.get('nome')?.disable();
            this.customerForm.get('email')?.disable();
            this.customerForm.get('cpf')?.disable();
            this.customerForm.get('celular')?.disable();
            this.customerForm.get('endereco.cep')?.disable();
            this.customerForm.get('endereco.rua')?.disable();
            this.customerForm.get('endereco.numero')?.disable();
            this.customerForm.get('endereco.complemento')?.disable();
            this.customerForm.get('endereco.bairro')?.disable();
            this.customerForm.get('endereco.cidade')?.disable();
            this.customerForm.get('endereco.estado')?.disable();
          }
        });
    }

    this.enabledButtonSave =
      this.operacaoCrud == OperacaoCrud.Create ||
      this.operacaoCrud == OperacaoCrud.Update;
    this.enabledButtonDelete = this.operacaoCrud == OperacaoCrud.Delete
  }

  async validaDadosCliente(): Promise<boolean>{

    var clienteValido: boolean
    clienteValido = await this.validaEmail()

    clienteValido = clienteValido &&  await this.validaCpf()


    return clienteValido;
  }

  async validaEmail(): Promise<boolean>{
    var customers = await this.customerService.readByEmail(this.customerForm.value?.email ??'');

    if(customers == null || customers.length == 0){ //não existem registros para esse e-mail
      return true;
    }

    if(customers[0].id != this.idCliente){
      this.showMessage(`O e-mail ${customers[0].email.toUpperCase()} já está sendo utilizado em outro cadastro!`, true)
      return false;
    }

    return true
  }

  async validaCpf(): Promise<boolean>{
    var customers = await this.customerService.readByCpf(this.customerForm.value?.cpf ??'');

    if(customers == null || customers.length == 0){ //não existem registros para esse e-mail
      return true;
    }

    // var cpfFormatado: String
    // cpfFormatado = ''

    // if (this.customerForm.value?.cpf?.length == 11){
    //  cpfFormatado = customers[0].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") //cpf
    // }else if(this.customerForm.value?.cpf?.length == 14){
    //  cpfFormatado = customers[0].cpf.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5") //cnph
    // }

    if(customers[0].id != this.idCliente){
      if (this.customerForm.value?.cpf?.length == 14){
        this.showMessage(`O Cpf ${this.customerForm.value?.cpf} já está sendo utilizado em outro cadastro!`, true)
      }else if(this.customerForm.value?.cpf?.length == 18){
        this.showMessage(`O Cnpj ${this.customerForm.value?.cpf} já está sendo utilizado em outro cadastro!`, true)
      }

      return false;
    }

    return true
  }



  showMessage(msg: string, isError: boolean = false): void {
    console.log('teste');
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess'],
    });
  }

}
