import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  matchValues(matchTo: string): ValidatorFn{
    return (control: { [key: string]: any } | null) => { 
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    }
  }

  isSubstring(matchTo: string): ValidatorFn{
    return (control: { [key: string]: any } | null) => { 
      const value = control?.value.toLowerCase()
      const matchToValue = control?.parent?.controls[matchTo].value.toLowerCase()
      if(!matchToValue || matchToValue === '') return null
      return !value.includes(matchToValue) ?  null : { [matchTo]: true };
    }
  }
}
