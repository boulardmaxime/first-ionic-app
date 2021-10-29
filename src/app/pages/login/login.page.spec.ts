import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/model/user/user';
import { AppState } from 'src/app/store/AppState';
import { loadingReducer } from 'src/app/store/loading/loading.reducers';
import { login, loginFail, loginSuccess, recoverPassword
, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.action';
import { loginReducer } from 'src/app/store/login/login.reducers';
import { environment } from 'src/environments/environment';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let navController: NavController;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
		IonicModule.forRoot(),
		AppRoutingModule,
		ReactiveFormsModule,
		StoreModule.forRoot([]),
		StoreModule.forFeature('loading', loadingReducer),
		StoreModule.forFeature('login', loginReducer),
		AngularFireModule.initializeApp(environment.firebaseConfig)
	  ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
	router = TestBed.get(Router);
	navController = TestBed.get(NavController);
	store = TestBed.get(Store);
	toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
	page = fixture.debugElement.nativeElement;
  }));

  it('should create a form on init', () => {
	component.ngOnInit();

	expect(component.form).not.toBeUndefined();
  });

  it('should go to the register page on register', () => {
	spyOn(router, 'navigate');
	component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should show the loading when recovering the password on forgot email/password', () => {
	fixture.detectChanges();
	component.form.get('email').setValue('valid@email.com');
	page.querySelector('#recoverPasswordButton').click();
	store.select('login').subscribe(loginState => {
		expect(loginState.isRecoveringPassword).toBeTruthy();
	});
	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeTruthy();
	});
  });

  it('given user is recovering password, when success, then hide loading and show success message', () => {
	spyOn(toastController, 'create');

	fixture.detectChanges();
	store.dispatch(recoverPassword({email: 'any@email.com'}));
	store.dispatch(recoverPasswordSuccess());
	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeFalsy();
	});
	expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('given user is recovering password, when fail, then hide loading and show error message', () => {
	spyOn(toastController, 'create');

	fixture.detectChanges();
	store.dispatch(recoverPassword({email: 'any@email.com'}));
	store.dispatch(recoverPasswordFail({error: 'message'}));
	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeFalsy();
	});
	expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should show loading component and start login when logging in', () => {
	fixture.detectChanges();
	component.form.get('email').setValue('valid@email.com');
	component.form.get('password').setValue('123456');
	page.querySelector('#loginButton').click();
	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeTruthy();
	});
	store.select('login').subscribe(loginState => {
		expect(loginState.isLoggingIn).toBeTruthy();
	});
  });

  it('given user is logging in, when success, then hide loading and send user to home page', () => {
	spyOn(navController, 'navigateRoot');

	fixture.detectChanges();
	store.dispatch(login({email: 'any@email.com', password: 'anyPassword'}));
	store.dispatch(loginSuccess({user: new User()}));

	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeFalsy();
	});
	store.select('login').subscribe(loginState => {
		expect(loginState.isLoggedIn).toBeTruthy();
	});
	expect(navController.navigateRoot).toHaveBeenCalledWith('home');
  });

  it('given user is logging in, when fail, then hide loading and show error message', () => {
	spyOn(toastController, 'create').and.returnValue(Promise.resolve({present: () => {}}) as any);

	fixture.detectChanges();
	store.dispatch(login({email: 'any@email.com', password: 'anyPassword'}));
	store.dispatch(loginFail({error: {message: 'error message'}}));

	store.select('loading').subscribe(loadingState => {
		expect(loadingState.show).toBeFalsy();
	});
	expect(toastController.create).toHaveBeenCalledTimes(1);
  });

});

