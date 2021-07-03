import {createStore , combineReducers , applyMiddleware} from "redux"
import AdminReducer from "./AdminReducer";
// import CartReducer from "./Cartreducer";
import thunk from "redux-thunk"

let middle=store=>next =>action => {
    // alert("reducer pe jane se pehle")
    next(action)
}

var reducers = combineReducers({AdminReducer});

let store  =  createStore(reducers, applyMiddleware(middle, thunk));

export default store;