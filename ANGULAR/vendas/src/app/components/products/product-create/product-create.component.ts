import { Product } from './../../../model/product.model';
import { catchError } from 'rxjs/operators';
import { OperacaoCrud } from './../../../shared/enum/enum';
import { ProductService } from '../product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  operacaoCrud!: OperacaoCrud;
  idProduct: number = 0;
  enableButtonSave: boolean = true;
  enableButtonDelete: boolean = false;

  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  productForm = this.fb.group({
    id: [0],
    code: ['', [Validators.required, Validators.maxLength(10)]],
    price: ['0.00', [Validators.required, Validators.pattern(this.numRegex)]],
    description: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)],],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private notificationsService: NotificationsService
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

    this.idProduct = data.id ?? 0;
  }

  ngOnInit(): void {
    this.verificaProduto();
  }

  cancel(): void {
    this.dialogRef.close();
    this.productForm.reset();
  }

  async save() {
    var isProductValid: boolean = false;

    isProductValid = await this.validaInformacoesAdicionaisDoProduto();

    if (this.productForm.valid && isProductValid) {
      if (this.operacaoCrud == OperacaoCrud.Create) {
        this.productService
          .create(this.productForm.value)
          .subscribe(async (product) => {
             if (product.id > 0 ){
              this.idProduct = product.id
              await this.productService.readByIdList(product.id)
             }
          });
        this.dialogRef.close(true);
        this.productForm.reset();

      } else if (this.operacaoCrud == OperacaoCrud.Update) {
        this.productService.update(this.productForm.value).subscribe(async(product) => {
          if (product.id > 0 ){
            this.idProduct = product.id
            await this.productService.readByIdList(product.id)
           }
        });
        this.dialogRef.close(true);
        this.productForm.reset();

      }

    }

  }

  delete() {
    console.log(this.productForm.value);

    this.productService
      .deleteById(this.idProduct.toString())
      .subscribe((products) => {
        this.dialogRef.close(true);
        this.productForm.reset();
        window.location.reload();
      });
  }

  verificaProduto() {
    if (this.operacaoCrud != OperacaoCrud.Create) {
      this.productService
        .readById(this.idProduct)
        .subscribe((products) => {
          this.productForm.patchValue({
            id: Number(products!.id!.toString()),
            code: products.code,
            description: products.description,
            price: products?.price?.toString(),
          });

          if (this.operacaoCrud != OperacaoCrud.Update) {
            this.productForm.get('code')?.disable();
            this.productForm.get('description')?.disable();
            this.productForm.get('price')?.disable();
          }
        });
    }

    this.enableButtonSave =
      this.operacaoCrud == OperacaoCrud.Create ||
      this.operacaoCrud == OperacaoCrud.Update;
    this.enableButtonDelete = this.operacaoCrud == OperacaoCrud.Delete
  }

  async validaInformacoesAdicionaisDoProduto(): Promise<boolean> {

    var productResult =  await this.productService.readByCode(
      this.productForm?.value?.code ?? '0'
    );

    console.log(productResult)

    if (productResult == null || productResult.length == 0) {
      return true;
    } else if (
      productResult[0].id != this.idProduct &&
      this.operacaoCrud == OperacaoCrud.Update
    ) {
      this.notificationsService.showMessage(
        'O código de barras já está vinculado a outro produto!',
        true
      );
      return false;
    } else if (
      productResult[0].id > 0 &&
      this.operacaoCrud == OperacaoCrud.Create
    ) {
      this.notificationsService.showMessage(
        'O código de barras já está vinculado a outro produto!',
        true
      );
      return false;
    } else {
       return true;
    }
  }
}
