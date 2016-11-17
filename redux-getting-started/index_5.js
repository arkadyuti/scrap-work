import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";


const initialState = {
	fetching : false,
	fetched : false,
	user: [],
	error : null
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_USER_START": {
			return {...state, fetching : true}
			break;
		}
		case "FETCH_USER_ERROR": {
			return {...state, fetching : false, error :action.payload}
			break;
		}
		case "RECEIVE_USER": {
			return {...state, fetching : false, user : action.payload}
			break;
		}
	}
	return state;
}

const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducer, middleware);

store.dispatch((dispatch) => {
	dispatch({type : "FETCH_USER_START"});
	axios.get("http://rest.learncode.academy/api/wstern/users")
		.then((response) => {
			dispatch({type:"RECEIVE_USER", payload: response.data})
		})
		.catch((err) => {
			dispatch({type: "FETCH_USER_ERROR", payload: err})
		})
})