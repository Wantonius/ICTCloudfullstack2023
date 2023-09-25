import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useSelector} from 'react-redux';
function App() {


	const appState = useSelector(state => {
		let error = state.shopping.error
		if(state.login.error) {
			error = state.login.error
		}
		return {
			isLogged:state.login.isLogged,
			token:state.login.token,
			error:error,
			loading:state.login.loading
		}
	})
	
	
	//RENDERING
	
	let message = <></>
	if(appState.loading) {
		message = <h4>Loading ...</h4>
	}
	if(appState.error) {
		message = <h4>{appState.error}</h4>
	}
	if(appState.isLogged) {
		return (
			<div className="App">
				<Navbar />
				<div style={{height:35, textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<ShoppingList />}/>
					<Route path="/form" element={<ShoppingForm />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	} else{
		return (
			<div className="App">
				<Navbar />
				<div style={{height:35, textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);		
	} 
}

export default App;
