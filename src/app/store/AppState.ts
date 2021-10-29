import { LoadingState } from './loading/LoadingState';
import { LoginState } from './login/LoginState';
import { RegisterState } from './register/RegisterState';

export interface AppState {
	login: LoginState;
	loading: LoadingState;
	register: RegisterState;
}
