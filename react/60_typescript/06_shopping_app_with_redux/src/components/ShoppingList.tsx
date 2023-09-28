import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {remove,edit} from '../actions/shoppingActions';
import {useSelector,useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {AppState} from '../types/states';

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const shoppingSelector = (state:AppState) => {
		return {
			token:state.login.token,
			list:state.shopping.list
		}
	}
	
	const appState = useSelector(shoppingSelector);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const changeMode = (index:number,mode:string) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id:string) => {
		dispatch(remove(appState.token,id));
		changeMode(0,"cancel");
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(appState.token,item));
		changeMode(0,"cancel");
	}
	
	const items = appState.list.map((item,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}/>
			)
		}
		if(state.editIndex === index) {
			return(
				<EditRow key={item.id} item={item} changeMode={changeMode} editItem={editItem}/>
			)
		}
		return(
			<Row key={item.id} index={index} item={item} changeMode={changeMode}/>
		)
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)
	
}

export default ShoppingList;