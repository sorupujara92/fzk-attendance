import axios from "axios";
import { setCurrentUser } from "../store/user/user.action";
import { useDispatch } from "react-redux";
import { setUserToken } from "../store/token/token.action";

const API_URL = "http://localhost:8080/api/auth/";

  export const LoginUser = (username, password) => {

    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.user) {
          return response.data;
        }
        return response.data;
      });
      
  }


  export const LogoutUser = () => {
  const dispatch = useDispatch();
  dispatch(setCurrentUser(null));
  dispatch(setUserToken(null));
 
}

