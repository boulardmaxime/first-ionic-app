import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

declare var google;

export class RegisterPageForm {

	private formBuilder: FormBuilder;
	private form: FormGroup;

	constructor(formBuilder: FormBuilder){
		this.formBuilder = formBuilder;
		this.form = this.createForm();
	}

	setAddress(place){
		const addressForm = this.form.get('address');
		addressForm.get('street').setValue(google.maps.places.findStreet(place.address_components));
		addressForm.get('number').setValue(google.maps.places.findAddressNumber(place.address_components));
		addressForm.get('neighborhoods').setValue(google.maps.places.findNeighborhoods(place.address_components));
		addressForm.get('zipCode').setValue(google.maps.places.findZipCode(place.address_components));
		addressForm.get('state').setValue(google.maps.places.findState(place.address_components));
		addressForm.get('city').setValue(google.maps.places.findCity(place.address_components));
	}

	getForm(): FormGroup {
		return this.form;
	}

	private createForm(): FormGroup {

		let form = this.formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			repeatPassword: [''],
			phone: ['', [Validators.required]],
			address: this.formBuilder.group({
				street: ['', [Validators.required]],
				number: ['', [Validators.required]],
				neighborhood: ['', [Validators.required]],
				complement: ['', [Validators.required]],
				zipCode: ['', [Validators.required]],
				city: ['', [Validators.required]],
				state: ['', [Validators.required]]
			})
		});

		form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));

		return form;
	}

}

function matchPasswordAndRepeatPassword(form: FormGroup): ValidatorFn {
	const password = form.get('password');
	const repeatPassword = form.get('repeatPassword');
	
	const validator = () => {
		return password.value == repeatPassword.value ? null : {isntMatching: true};
	};
	
	return validator;
}