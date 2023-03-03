
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, delay, map, Observable, tap } from "rxjs";
import { ProductService } from "../services/product.service";

@Injectable({ providedIn: 'root' })

export class ProductValidator {

  codeInUse(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return productService.readByCode2(control.value).pipe(
        delay(5000),
        map(result =>{
          console.log(result)
          return (result.length > 0 ?{invalidAsync: true}:null)})
        )
    };
  }



// }

// export function userExistsValidator(productService: ProductService):AsyncValidatorFn  {
//   return (control: AbstractControl) => {
//     return productService.readByCode2(control.value).pipe(
//               map(result =>{
//                 console.log(result)
//                 return (result.length > 0 ?{invalidAsync: true}:null)})
//               )
//           };
}
