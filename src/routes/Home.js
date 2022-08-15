import './Home.styles.scss'
import { selectCurrentUser } from '../store/user/user.selector';
import { selectUserToken } from '../store/token/token.selector';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCurrentUser } from '../store/user/user.action';
import { setUserToken } from '../store/token/token.action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import FormInput from '../components/form-input/form-input.component';
import Button from '../components/button/button.component';
const defaultFormFields = {
    'department' : '',
};
const Home = ()=> {
    const[formFields,setFormFields] = useState(defaultFormFields);

    const {department} = formFields;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name] : value });
    };
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const getAttendance = async (event) => {
        event.preventDefault();
    
        try {   
            // const response = await LoginUser(email,password);
            console.log(department)
        }catch(error){
            switch(error.code){
                case "ERR_BAD_REQUEST":
                    alert("incorrect password for email");
                    break;
                case "ERR_NETWORK":
                    alert("site not reachable");
                    break;    
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default : 
                    console.log(error);    
            }
    
        }
        
    }
    const currentUser = useSelector(selectCurrentUser)
    const userToken = useSelector(selectUserToken)
    useEffect(() => {
        if (!currentUser){
         navigate("/")   
        }
    },[])
    
    const signOutUser = () => {
        dispatch(setCurrentUser(null))
        dispatch(setUserToken(null));
        navigate("/")   
    }
    return (

        <div className="home-component">
            
            <div className="nav-links-container">
            { currentUser ? ( <span className="nav-link" onClick={signOutUser}> SIGN OUT</span>) : "" }
            { currentUser ? ( <span className="nav-link"> Welcome {currentUser.email}</span>) : "" }
            </div>

            <div className="search-page">
                <form onSubmit={getAttendance}>
                <FormInput  type='text' required label='Department' onChange={handleChange} value={department} name='department'></FormInput>
                <Button type="submit"  children="search"></Button>
                </form>   
            </div>

        </div>
    );
}

export default Home;