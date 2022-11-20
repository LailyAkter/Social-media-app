import {createStore ,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {reducers} from "../Reducers";

function saveToLocalStorage(store){
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem("store",serializedStore);
    } catch (error) {
        console.log(error)
    }
}

function loadFromLocalStorage(){
    try {
        const serializedStore = window.localStorage.getItem("store");
        if(serializedStore === null ) return undefined;
        return JSON.parse(serializedStore)
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSON_COMPOSE__ || compose;
const persisredState = loadFromLocalStorage();

const store = createStore(reducers,persisredState,composeEnhancers(applyMiddleware(thunk)));

store.subscribe(()=>saveToLocalStorage(store.getState()));

export default store;