import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import authReducer from '../reduce/auth/reducer';
import bannerReducer from '../reduce/banner/reducer';
import departementReducer from '../reduce/departement/reducer';
import jabatanReducer from '../reduce/jabatan/reducer';

import thunk from 'redux-thunk';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducers = combineReducers({
    auth: authReducer,
    departements: departementReducer,
    banners: bannerReducer, 
    jabatans: jabatanReducer
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store
