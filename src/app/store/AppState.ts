import { LoadingState } from './loading/LoadingState';
import { LoginState } from './login/LoginState';

export interface AppState {
	login: LoginState;
	loading: LoadingState;
}
