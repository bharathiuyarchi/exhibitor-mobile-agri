import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberOnlyService {

  constructor() { }
  number_service(num: any, size: any) {
    const inputValue = num.target.value;
    const numericValue = Number(inputValue.replace(/[^0-9]/g, ''));
    if (numericValue.toString().length > size) {
      num.target.value = numericValue.toString().slice(0, size);
    }

  }
}
