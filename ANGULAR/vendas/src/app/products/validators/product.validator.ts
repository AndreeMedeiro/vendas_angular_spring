import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn, FormGroup
} from '@angular/forms';
import { delay, map } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({ providedIn: 'root' })
export class ProductValidator {
  // codeInUse(productService: ProductService): AsyncValidatorFn {
  //   return (control: AbstractControl) => {
  //     return productService.readByCode2(control.value).pipe(
  //       delay(5000),
  //       map((result) => {
  //         return result.length > 0 ? { invalidAsync: true } : null;
  //       })
  //     );
  //   };
  // }

  codeInUse(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const form = control as FormGroup;
      const code: string = form.get('code')?.value;
      const id: Number = form.get('id')?.value;

      return productService.getByCode(code).pipe(
        delay(2000),
        map((result) => {
          var containsError =
            result.filter((product) => product.id !== id).length > 0;
          if (containsError) {
            form.controls?.['code'].setErrors({ invalidAsync: true });
          } else {
            form.controls?.['code'].setErrors(null);
          }
          return containsError ? { invalidAsync: true } : null;
        })
      );
    };
  }
}
