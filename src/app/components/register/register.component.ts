import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z]).*$'), this.isSubstring('firstName'), this.isSubstring('secondName')]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    })
    this.registerForm.controls.firstName.valueChanges.subscribe(()=>{
      this.registerForm.controls.password.updateValueAndValidity()
    })
    this.registerForm.controls.secondName.valueChanges.subscribe(()=>{
      this.registerForm.controls.password.updateValueAndValidity()
    })
  }

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
