import { createAction } from "../../utils/reducers/reducers.util"
import { TOKEN_ACTION_TYPES } from "./token.type";


export const setUserToken = (userToken) => createAction(TOKEN_ACTION_TYPES.SET_USER_TOKEN,userToken); 
