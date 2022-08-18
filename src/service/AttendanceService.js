import axios from "axios";
import { useDispatch } from "react-redux";

const API_URL = "http://localhost:8080/";

  export const getDepartments = (token) => {

    const config = {
        headers: { 'Authorization' : `Bearer ${token}` }
    };
    
    console.log(config)
    return axios
      .get(API_URL + "department",
      {
        headers: { 'Authorization' : `Bearer ${token}` }
      })
      .then((response) => {
        return response.data;
      });
      
  }



