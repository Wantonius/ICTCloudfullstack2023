import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../actions/loginActions';
import {AppState} from '../types/states';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

const Navbar:React.FC<{}> = (props) => {
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const stateSelector = (state:AppState) => {
		return {
			isLogged:state.login.isLogged,
			token:state.login.token,
			username:state.login.username
		}
	}
	
	const state = useSelector(stateSelector);
	
	if(state.isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form" className="nav-link">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link" onClick={() => dispatch(logout(state.token))}>Logout</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p className="nav-link" style={{color:"blue"}}>Logged in as {state.username}</p>
					</li>
				</ul>
			</nav>
		)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>		
			</nav>
		)
	}
}

export default Navbar;