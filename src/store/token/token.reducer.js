import { TOKEN_ACTION_TYPES } from "./token.type";


const INITIAL_STATE = {
    userToken : null
}

export const tokenReducer = (state = INITIAL_STATE,action) => {
    const {type,payload} = action;
    switch(type) {
        case TOKEN_ACTION_TYPES.SET_USER_TOKEN:
            return {...state,userToken : payload}

        default : 
            return state;    
    }

}