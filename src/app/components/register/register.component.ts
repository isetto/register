import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  private subscription: Subscription = new Subscription
  
  constructor(private fb: FormBuilder, private validateService: ValidatorService) { }
 

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z]).*$'), this.validateService.isSubstring('firstName'), this.validateService.isSubstring('secondName')]],
      confirmPassword: ['', [Validators.required, this.validateService.matchValues('password')]]
    })
    this.subscription.add(this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    }))
    this.subscription.add(this.registerForm.controls.firstName.valueChanges.subscribe(()=>{
      this.registerForm.controls.password.updateValueAndValidity()
    }))
    this.subscription.add(this.registerForm.controls.secondName.valueChanges.subscribe(()=>{
      this.registerForm.controls.password.updateValueAndValidity()
    }))
  }



  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

}
