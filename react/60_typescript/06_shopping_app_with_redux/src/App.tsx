import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppState} from './types/states';

function App() {
	
	const stateSelector = (state:AppState) => {
		let error = state.shopping.error;
		if(state.login.error) {
			error = state.login.error
		}
		return {
			error:error,
			loading:state.login.loading,
			isLogged:state.login.isLogged
		}
	}
	
	const state = useSelector(stateSelector);
	
	let messageArea = <h4 style={{height:30}}></h4>
	if(state.loading) {
		messageArea = <h4 style={{height:30}}>Loading ...</h4>
	}
	if(state.error) {
		messageArea = <h4 style={{height:30}}>{state.error}</h4>
	}
	if(state.isLogged) {
		return (
			<div className="App">
				<Navbar/>
				{messageArea}
				<Routes>
					<Route path="/" element={<ShoppingList/>}/>
					<Route path="/form" element={<ShoppingForm/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<Navbar/>
				{messageArea}
				<Routes>
					<Route path="/" element={<LoginPage/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);		
	}
}

export default App;
