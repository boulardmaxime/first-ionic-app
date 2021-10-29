import { UserRegister } from 'src/app/model/user/UserRegister';
import { AppInitialState } from '../AppInitialState';
import { register, registerFail, registerSuccess } from './register.action';
import { registerReducer } from './register.reducers';

describe('Register store', () => {
	it('register', () => {
		const initialState = {
			...AppInitialState.register
		};

		const newState = registerReducer(initialState, register({userRegister: new UserRegister()}));

		expect(newState).toEqual({
			...initialState,
			isRegistering: true,
			isRegistered: false,
			error: null
		});
	});

	it('registerSuccess', () => {
		const initialState = {
			...AppInitialState.register,
			isRegistering: true
		};

		const newState = registerReducer(initialState, registerSuccess());

		expect(newState).toEqual({
			...initialState,
			isRegistering: false,
			isRegistered: true
		});
	});

	it('registerFail', () => {
		const initialState = {
			...AppInitialState.register,
			isRegistering: true
		};

		const error = {error: 'anyError'};
		const newState = registerReducer(initialState, registerFail({error}));

		expect(newState).toEqual({
			...initialState,
			isRegistering: false,
			isRegistered: false,
			error
		});
	});
});
