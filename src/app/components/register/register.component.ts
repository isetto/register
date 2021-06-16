import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { fromEvent } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
} )
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  registerForm!: FormGroup;
  private subscription: Subscription = new Subscription
  @ViewChild( 'registerBtn' ) button: any;
  clicks$!: Subscription;

  constructor( private fb: FormBuilder, private validateService: ValidatorService, private apiService: ApiService, private toastr: ToastrService ) { }


  ngOnInit(): void {
    this.initializeForm()
  }

  ngAfterViewInit(): void {
    this.clicks$ = fromEvent( this.button.nativeElement, 'click' )
      .pipe(
        exhaustMap( () => this.register() )
      )
      .subscribe( ( user: User ) => {
        this.toastr.success( `${user.firstName} your account has been created`, 'Succes' )
        this.registerForm.reset()
        this.registerForm.updateValueAndValidity()
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
      email: ['', [Validators.required, Validators.pattern( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )]],
      password: ['', [Validators.required, Validators.minLength( 8 ), Validators.pattern( '^(?=.*?[a-z])(?=.*?[A-Z]).*$' ), this.validateService.isSubstring( 'firstName' ), this.validateService.isSubstring( 'lastName' )]],
      confirmPassword: ['', [Validators.required, this.validateService.matchValues( 'password' )]]
    } )
    this.subscription.add( this.registerForm.controls.password.valueChanges.subscribe( () => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    } ) )
    this.subscription.add( this.registerForm.controls.firstName.valueChanges.subscribe( () => {
      this.registerForm.controls.password.updateValueAndValidity()
    } ) )
    this.subscription.add( this.registerForm.controls.lastName.valueChanges.subscribe( () => {
      this.registerForm.controls.password.updateValueAndValidity()
    } ) )
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe()
    }
    if ( this.clicks$ ) {
      this.clicks$.unsubscribe()
    }
  }

}
