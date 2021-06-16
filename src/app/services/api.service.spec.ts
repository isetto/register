import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../model/user';

describe( 'ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach( () => {

    TestBed.configureTestingModule( {
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService
      ]
    } );

    apiService = TestBed.inject( ApiService ),
      httpTestingController = TestBed.inject( HttpTestingController );

  } );


  it( 'should be created', () => {
    expect( apiService ).toBeTruthy();
  } );

  it( 'should save the user data and return it', () => {

    const user: User = {
      firstName: 'Adrian',
      lastName: 'Fąk',
      email: 'test@wp.pl'
    }

    apiService.register( user )
      .subscribe( ( userData: User ) => {
        expect( userData.firstName ).toEqual( user.firstName );
        expect( userData.lastName ).toEqual( user.lastName );
        expect( userData.email ).toEqual( user.email );
        expect( userData._id ).toBeTruthy()
      } );

    const req = httpTestingController.expectOne( 'https://demo-api.now.sh/users' );

    expect( req.request.method ).toEqual( "POST" );

    req.flush( {
      _id: '23qwesd',
      ...user
    } )

  } );

  afterEach( () => {
    httpTestingController.verify();
  } );

} );
