import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { register, registerFail, registerSuccess } from './register.action';
import { RegisterState } from './RegisterState';

const initialState: RegisterState = AppInitialState.register;

const reducer = createReducer(
	initialState,
	on(register, currentState => {
		return {
			...currentState,
			isRegistering: true,
			isRegistered: false,
			error: null
		}
	}),
	on(registerSuccess, currentState => {
		return {
			...currentState,
			isRegistering: false,
			isRegistered: true,
		}
	}),
	on(registerFail, (currentState, action) => {
		return {
			...currentState,
			isRegistering: false,
			isRegistered: false,
			error: action.error
		}
	})
);

export function registerReducer(state: RegisterState, action) {
	return reducer(state, action);
};
