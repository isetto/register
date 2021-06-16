import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { fromEvent } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { emailRegex } from 'src/app/constants/email-regex';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
} )
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  registerForm!: FormGroup;
  private controlsSubscription: Subscription = new Subscription
  @ViewChild( 'registerBtn' ) button: any;
  clicksSubscription!: Subscription;

  constructor( private fb: FormBuilder, private validateService: ValidatorService, private apiService: ApiService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  ngAfterViewInit(): void {
    this.clicksSubscription = fromEvent( this.button.nativeElement, 'click' )
      .pipe(
        exhaustMap( () => this.register() ) //exhaustMap is used here to prevent sending multiple http calls by clicking register btn few times
      )
      .subscribe( ( user: User ) => {
        this.toastr.success( `${user.firstName} your account has been created`, 'Success' )
        this.registerForm.reset()
      } )
  }

  register(): Observable<User> {
    const controls = this.registerForm.controls
    const user: User = {
      firstName: controls.firstName.value,
      lastName: controls.lastName.value,
      email: controls.email.value
    }
    return this.apiService.register( user )
  }

  initializeForm(): void {
    this.registerForm = this.fb.group( {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern( emailRegex )]],
      password: ['', [Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(?=.*?[a-z])(?=.*?[A-Z]).*$' ), this.validateService.isSubstring( 'firstName' ), this.validateService.isSubstring( 'lastName' )]],
      confirmPassword: ['', [Validators.required, this.validateService.matchValues( 'password' )]]
    } )
    this.controlsSubscription.add( this.registerForm.controls.password.valueChanges.subscribe( () => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    } ) )
    this.controlsSubscription.add( this.registerForm.controls.firstName.valueChanges.subscribe( () => {
      this.registerForm.controls.password.updateValueAndValidity()
    } ) )
    this.controlsSubscription.add( this.registerForm.controls.lastName.valueChanges.subscribe( () => {
      this.registerForm.controls.password.updateValueAndValidity()
    } ) )
  }

  ngOnDestroy(): void {
    if ( this.controlsSubscription ) {
      this.controlsSubscription.unsubscribe()
    }
    if ( this.clicksSubscription ) {
      this.clicksSubscription.unsubscribe()
    }
  }

}
