import logo from './logo.svg';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//useEffect for fetching
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(!response) {
				console.log("Server gave no response.");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							return;
						}
						setState({
							list:data
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
					default:
						return;
				}
			} else {
				console.log("Server responded a status "+response.status+" "+response.statusText);
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	//REST API
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"GET"
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				"method":"DELETE"
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	return (
		<div className="App">
			<Navbar/>
			<Routes>
				<Route path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
}

export default App;
