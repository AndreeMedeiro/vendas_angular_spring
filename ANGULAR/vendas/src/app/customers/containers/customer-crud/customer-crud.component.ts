import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { BuscaCepService } from 'src/app/shared/services/busca-cep/busca-cep.service';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { CustomersService } from '../../services/customers.service';
import { CustomerValidator } from '../../validators/customer.validator';

@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.css'],
})
export class CustomerCrudComponent implements OnInit {
  operacaoCrud!: OperacaoCrud;
  idCustomer: number = 0;
  enabledButtonSave: boolean = true;
  enabledButtonDelete: boolean = false;
  isLoadingCep: boolean = false;

  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  customerForm = this.fb.group({
    id: [0],
    name: [
      '',
      [Validators.required, Validators.maxLength(30), Validators.minLength(5)],
    ],
    cpfCnpj: [
      '',
      {
        validators: [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(3),
        ],
        asyncValidators: [
          this.customerValidator.cpfCnpjInUse(this.customerService),
        ],
        updateOn: 'blur',
      },
    ],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email, Validators.maxLength(80),],
        asyncValidators: [
          this.customerValidator.emailInUse(this.customerService),
        ],
        updateOn: 'blur',
      },
    ],
    tel: ['', [Validators.required]],
    address: this.fb.group({
      zipCode: ['', [Validators.required, Validators.maxLength(11)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      complement: ['',[Validators.maxLength(30)]],
      district: ['', [Validators.required,Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      uf: ['', [Validators.required,Validators.maxLength(30)]],
    }),
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private buscaCepService: BuscaCepService,
    private customerService: CustomersService,
    private customerValidator: CustomerValidator,
    private notificationService: NotificationsService
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

    this.idCustomer = data.id ?? 0;
  }

  ngOnInit(): void {
    this.loadingInfoCustomer();
  }

  getCep() {
    const cep = this.customerForm.value.address?.zipCode ?? '';
    if(cep != ''){
      this.isLoadingCep = true;
      this.buscaCepService.get(cep).subscribe({
        next:(cep) => {
          this.customerForm.patchValue({
            address: {
              street: cep.logradouro,
              district: cep.bairro,
              city: cep.localidade,
              uf: cep.uf,
            },
          });
          this.isLoadingCep = false;
        },
        error: () => {
          this.isLoadingCep = false
          this.notificationService.showMessage(
            'Ocorreu um erro ao buscar o cep!'
          );
        },
      })
    }

  }

  save() {
    console.log(this.customerForm);

    if (this.customerForm.valid) {
      if (this.operacaoCrud == OperacaoCrud.Create) {
        this.customerService
          .create(this.customerForm.value)
          .subscribe({
            next: (customer) => {
              this.idCustomer = customer.id;
              this.dialogRef.close(this.idCustomer);
              this.customerForm.reset();
            },
            error: () => {
              this.notificationService.showMessage(
                'Ocorreu um erro ao salvar o cliente!'
              );
            },
          });
      } else if (this.operacaoCrud == OperacaoCrud.Update) {
        console.log(this.customerForm.value);
        this.customerService.update(this.customerForm.value).subscribe({
          next: (customer) => {
            this.idCustomer = customer.id;
            this.dialogRef.close(this.idCustomer);
            this.customerForm.reset();
          },
          error: () => {
            this.notificationService.showMessage(
              'Ocorreu um erro ao salvar o cliente!'
            );
          },
        })
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
      .deleteById(this.idCustomer.toString())
      .subscribe(() => {
        this.dialogRef.close(true);
        this.customerForm.reset();
        window.location.reload();
      });
  }

  loadingInfoCustomer() {
    if (this.operacaoCrud != OperacaoCrud.Create) {
      this.customerService
        .getById(this.idCustomer.toString())
        .subscribe((customer) => {
          this.customerForm.patchValue({
            id: Number(customer.id.toString()),
            name: customer.name,
            cpfCnpj: customer.cpfCnpj,
            email: customer.email,
            tel: customer.tel,
            address: {
              zipCode: customer.address.zipCode,
              street: customer.address.street,
              number: customer.address.number,
              complement: customer.address.complement,
              district: customer.address.district,
              city: customer.address.city,
              uf: customer.address.uf,
            },
          });

          if (this.operacaoCrud != OperacaoCrud.Update) {
            this.customerForm.get('id')?.disable();
            this.customerForm.get('name')?.disable();
            this.customerForm.get('email')?.disable();
            this.customerForm.get('cpfCnpj')?.disable();
            this.customerForm.get('tel')?.disable();
            this.customerForm.get('address.zipCode')?.disable();
            this.customerForm.get('address.street')?.disable();
            this.customerForm.get('address.number')?.disable();
            this.customerForm.get('address.complement')?.disable();
            this.customerForm.get('address.district')?.disable();
            this.customerForm.get('address.city')?.disable();
            this.customerForm.get('address.uf')?.disable();
          }
        });
    }

    this.enabledButtonSave =
      this.operacaoCrud == OperacaoCrud.Create ||
      this.operacaoCrud == OperacaoCrud.Update;
    this.enabledButtonDelete = this.operacaoCrud == OperacaoCrud.Delete;
  }
}
