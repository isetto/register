import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable( {
  providedIn: 'root'
} )
export class ValidatorService {

  constructor() { }

  matchValues( matchTo: string ): ValidatorFn {
    return ( control: { [key: string]: any } | null ) => {
      const value = control?.value
      const matchToValue = control?.parent?.controls[matchTo].value
      return this.matchCheck( value, matchToValue )
    }
  }

  matchCheck( value: string, matchToValue: string ) {
    return value === matchToValue ? null : { isMatching: true };
  }

  isSubstring( matchTo: string ): ValidatorFn {
    return ( control: { [key: string]: any } | null ) => {
      const value = control?.value?.toLowerCase()
      const matchToValue = control?.parent?.controls[matchTo].value?.toLowerCase()
      return this.substringCheck( value, matchToValue, matchTo )
    }
  }

  substringCheck( value: string | undefined, matchToValue: string | undefined, matchTo: string ) {
    if ( !matchToValue || matchToValue === '' || !value || value === '' ) return null
    return !value.includes( matchToValue ) ? null : { [matchTo]: true };
  }
}
