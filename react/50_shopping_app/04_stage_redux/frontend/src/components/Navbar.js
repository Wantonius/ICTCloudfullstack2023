import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/loginActions';

const Navbar = (props) => {
	
	const dispatch = useDispatch();
	const state = useSelector(state => {
		return {
			isLogged:state.isLogged,
			token:state.token,
			user:state.user
		}
	})
	
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
						<Link to="/"  onClick={() => dispatch(logout(state.token))} className="nav-link">Logout</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p className="nav-link" style={{color:"blue"}}>Logged in as {state.user}</p>
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