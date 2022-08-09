import axios from "axios";
import { setCurrentUser } from "../store/user/user.action";
import { useDispatch } from "react-redux";
import { setUserToken } from "../store/token/token.action";

const API_URL = "http://localhost:8080/";

  export const LoginUser = (email, password) => {

    return axios
      .post(API_URL + "users", { email, password })
      .then((response) => {
        if (response.data.user) {
          console.log("11")
        
          return response.data;
        }
        return response.data;
        console.log("22")

      });
      
  }


  export const LogoutUser = () => {
  const dispatch = useDispatch();
  dispatch(setCurrentUser(null));
  dispatch(setUserToken(null));
 
}

