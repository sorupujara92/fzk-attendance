import axios from "axios";
import { useDispatch } from "react-redux";

const API_URL = "http://localhost:8080/";

  export const getDepartments = (department,token) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    const bodyParameters = {
        department: {department}
    };
    
    return axios
      .get(API_URL + "department",
      bodyParameters,
      config)
      .then((response) => {
        console.log(response)
      });
      
  }



