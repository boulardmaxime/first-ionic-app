import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { AuthService } from 'src/app/services/auth/auth.service';
import { register, registerFail, registerSuccess } from './register.action';

@Injectable()
export class RegisterEffects {
	register$ = createEffect(() => this.actions$.pipe(
		ofType(register),
		switchMap((payload: {userRegister: UserRegister}) => this.authService.register(payload.userRegister).pipe(
			map(() => registerSuccess()),
			catchError(error => of(registerFail({error})))
		))
	));

	constructor(private actions$: Actions, private authService: AuthService) {}
}
