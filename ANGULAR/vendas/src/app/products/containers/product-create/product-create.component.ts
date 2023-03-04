import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { ProductService } from '../../services/product.service';
import { ProductValidator } from '../../validators/product.validator';

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationsService: NotificationsService,
    private productValidador: ProductValidator
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

  productForm = this.fb.group(
    {
      id: [0],
      code: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(30)],
          // asyncValidators: [this.productValidador.codeInUse2(this.productService)],
          updateOn: 'blur',
        },
      ],
      price: [
        '0.00',
        {
          validators: [Validators.required, Validators.pattern(this.numRegex)],
          asyncValidators: [],
          updateOn: 'blur',
        },
      ],

      description: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
          asyncValidators: [],
          updateOn: 'blur',
        },
      ],
    },
    {
      asyncValidators: [this.productValidador.codeInUse(this.productService)],
      updateOn: 'change',
    }
  );

  get code() {
    return this.productForm.controls['code'];
  }

  cancel(): void {
    this.dialogRef.close();
    this.productForm.reset();
  }

  save() {
    if (this.productForm.valid) {
      if (this.operacaoCrud == OperacaoCrud.Create) {
        this.productService
          .create(this.productForm.value)
          .subscribe(product => {
            this.idProduct = product.id
            this.dialogRef.close(this.idProduct);
            this.productForm.reset();
          });

      } else if (this.operacaoCrud == OperacaoCrud.Update) {
        this.productService
          .update(this.productForm.value)
          .subscribe(product => {
            this.idProduct = product.id
            this.dialogRef.close(this.idProduct);
            this.productForm.reset();
          });
      }
    }
  }

  delete() {
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
      this.productService.getById(this.idProduct).subscribe((products) => {
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

    this.enableButtonDelete = this.operacaoCrud == OperacaoCrud.Delete;
  }
}
