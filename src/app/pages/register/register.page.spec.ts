import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPageModule } from './register.module';

import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
		IonicModule.forRoot(),
		AppRoutingModule,
		ReactiveFormsModule,
		RegisterPageModule
	  ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
	router = TestBed.get(Router);
    component = fixture.componentInstance;
	page = fixture.debugElement.nativeElement;
  }));

  it('should go to the home page on register', () => {
	fixture.detectChanges();

	spyOn(router, 'navigate');

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

	page.querySelector('ion-button').click();
	expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should create register component.registerForm.getForm() on page init', () => {
	fixture.detectChanges();
	expect(component.registerForm.getForm()).not.toBeUndefined();
  });

  it('should not register when the component.registerForm.getForm() is not valid', () => {
	fixture.detectChanges();

	spyOn(router, 'navigate');

	page.querySelector('ion-button').click();
	expect(router.navigate).toHaveBeenCalledTimes(0);
  });

});
