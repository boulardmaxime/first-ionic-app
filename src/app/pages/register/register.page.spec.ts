import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { AppState } from 'src/app/store/AppState';
import { loadingReducer } from 'src/app/store/loading/loading.reducers';
import { loginReducer } from 'src/app/store/login/login.reducers';
import { register, registerFail, registerSuccess } from 'src/app/store/register/register.action';
import { registerReducer } from 'src/app/store/register/register.reducers';
import { RegisterPageModule } from './register.module';

import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
		IonicModule.forRoot(),
		AppRoutingModule,
		ReactiveFormsModule,
		RegisterPageModule,
		StoreModule.forRoot([]),
		StoreModule.forFeature('loading', loadingReducer),
		StoreModule.forFeature('register', registerReducer),
		StoreModule.forFeature('login', loginReducer)
	  ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
	router = TestBed.get(Router);
	store = TestBed.get(Store);
	toastController = TestBed.get(ToastController);
    component = fixture.componentInstance;
	page = fixture.debugElement.nativeElement;
  }));

  it('should create register component.registerForm.getForm() on page init', () => {
	fixture.detectChanges();
	expect(component.registerForm.getForm()).not.toBeUndefined();
  });

  it('should not register when the component.registerForm.getForm() is not valid', () => {
	fixture.detectChanges();

	clickOnRegisterButton();
	store.select('register').subscribe(state => {
		expect(state.isRegistering).toBeFalsy();
	});
  });

  it('given form is valid, when user click on register, then register', () => {
	fixture.detectChanges();
	fillForm();
	clickOnRegisterButton();
	store.select('register').subscribe(state => {
		expect(state.isRegistering).toBeTruthy();
	});
  });


  it('given form is valid, when user click on register, then show loading', () => {
	fixture.detectChanges();
	fillForm();
	clickOnRegisterButton();
	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeTruthy();
	});
  });

  it('should hide loading component when registration successful', () => {
	fixture.detectChanges();

	store.dispatch(register({userRegister: new UserRegister()}));
	store.dispatch(registerSuccess());
	store.select('loading').subscribe(state => {
		expect(state.show).toBeFalsy();
	});
  });

  it('should login when registration successful', () => {
	fixture.detectChanges();

	store.dispatch(register({userRegister: new UserRegister()}));
	store.dispatch(registerSuccess());

	store.select('login').subscribe(state => {
		expect(state.isLoggingIn).toBeTruthy();
	});

  });

  it('should hide loading component when registration fails', () => {
	fixture.detectChanges();

	store.dispatch(register({userRegister: new UserRegister()}));
	store.dispatch(registerFail({error: {message: 'error'}}));
	store.select('loading').subscribe(state => {
		expect(state.show).toBeFalsy();
	});
  });

  it('should show error on registration fail', () => {
	fixture.detectChanges();

	spyOn(toastController, 'create').and.returnValue(Promise.resolve({present: () => {}}) as any);

	store.dispatch(register({userRegister: new UserRegister()}));
	store.dispatch(registerFail({error: {message: 'error'}}));

	expect(toastController.create).toHaveBeenCalled();

  });


  function clickOnRegisterButton() {
	page.querySelector('ion-button').click();
  }

  function fillForm() {
	component.registerForm.getForm().get('name').setValue('anyName');
	component.registerForm.getForm().get('email').setValue('any@email.com');
	component.registerForm.getForm().get('password').setValue('anyPassword');
	component.registerForm.getForm().get('repeatPassword').setValue('anyPassword');
	component.registerForm.getForm().get('phone').setValue('anyPhone');
	component.registerForm.getForm().get('address').get('street').setValue('anyStreet');
	component.registerForm.getForm().get('address').get('number').setValue('anyNumber');
	component.registerForm.getForm().get('address').get('complement').setValue('anyComplement');
	component.registerForm.getForm().get('address').get('neighborhood').setValue('anyNeighborhood');
	component.registerForm.getForm().get('address').get('zipCode').setValue('anyZipCode');
	component.registerForm.getForm().get('address').get('city').setValue('anyCity');
	component.registerForm.getForm().get('address').get('state').setValue('anyState');
  }

});
