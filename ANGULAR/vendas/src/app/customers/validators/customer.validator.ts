import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn, FormGroup
} from '@angular/forms';
import { delay, map, of } from 'rxjs';
import { CustomersService } from '../services/customers.service';


@Injectable({ providedIn: 'root' })
export class CustomerValidator {

  cpfCnpjInUse(customerService: CustomersService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const form = control.parent as FormGroup;
      const cpfCnpj: string = form.get('cpfCnpj')?.value;
      const id: number = form.get('id')?.value;

      if(cpfCnpj == "000.000.000-00" || cpfCnpj == "00.000.000/0000-00" ){
        return of(null)
      }

      return customerService.getByCpfCnpj(cpfCnpj).pipe(
        delay(1000),
        map((result) => {
          const containsError =
            result.filter((customer) => customer.id !== id).length > 0;
          return containsError ? { cpfCnpjAlreadyUsed: true } : null;
        })
      );
    };
  }

  emailInUse(customerService: CustomersService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const form = control.parent as FormGroup;
      const email: string = form.get('email')?.value;
      const id: number = form.get('id')?.value;

      if(email == "naoinformado@teste.com"){
        return of(null)
      }

      return customerService.getByEmail(email).pipe(
        delay(1000),
        map((result) => {
          const containsError =
            result.filter((customer) => customer.id !== id).length > 0;
          return containsError ? { emailAlreadyUsed: true } : null;
        })
      );
    };
  }


  // codeInUse(customerService: CustomersService): AsyncValidatorFn {
  //   return (control: AbstractControl) => {
  //     const form = control as FormGroup;
  //     const code: string = form.get('code')?.value;
  //     const id: Number = form.get('id')?.value;

  //     return customerService.getByCode(code).pipe(
  //       // delay(2000),
  //       map((result) => {
  //         var containsError =
  //           result.filter((product) => product.id !== id).length > 0;
  //         if (containsError) {
  //           form.controls?.['code'].setErrors({ codeAlreadyUsed: true });
  //         } else {
  //           form.controls?.['code'].setErrors(null);
  //         }
  //         return containsError ? { codeAlreadyUsed: true } : null;
  //       })
  //     );
  //   };
  // }
}
