import ShoppingItem from '../models/ShoppingItem';

export interface LoginState {
	isLogged:boolean;
	loading:boolean;
	token:string;
	error:string;
	username:string;
}

export interface ShoppingState {
	list:ShoppingItem[];
	error:string;
}

export interface AppState {
	login:LoginState;
	shopping:ShoppingState;
}