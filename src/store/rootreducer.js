import { combineReducers } from "redux";
import { tokenReducer } from "./token/token.reducer";
import { userReducer } from "./user/user.reducer";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
    user : userReducer,
    token : tokenReducer
})

const persistConfig = {
    key : 'root',
    storage,
    blacklist : ['user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);