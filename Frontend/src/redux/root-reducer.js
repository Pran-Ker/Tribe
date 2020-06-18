import {combineReducers} from "redux";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/auth-reducer';
import navigationReducer from './navigation/navigation-reducer';
import userReducer from './user/user-reducer';
import modalReducer from './modal/modal-reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','nav','user']
}

const rootReducer = combineReducers({
    auth: authReducer,
    nav: navigationReducer,
    user: userReducer,
    modal: modalReducer
})

export default persistReducer(persistConfig, rootReducer);