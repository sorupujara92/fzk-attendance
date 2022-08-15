import './login.styles.scss'
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginUser,LogoutUser } from '../../service/auth.service';
import { setCurrentUser } from '../../store/user/user.action';
import { setUserToken } from '../../store/token/token.action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useEffect } from 'react';
const defaultFormFields = {
    'email' : '',
    'password' : ''
};
const Login = ()=> {
    const dispatch = useDispatch();

    const[formFields,setFormFields] = useState(defaultFormFields);
    const navigate = useNavigate();

    const {email,password} = formFields;
    const currentUser = useSelector(selectCurrentUser)
    useEffect(() => {
        if (currentUser){
         navigate("/Home")   
        }
    },[])
   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name] : value });
    };
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {   
            console.log(email)
            const response = await LoginUser(email,password);
            dispatch(setCurrentUser(response.user))
            dispatch(setUserToken(response.token));
            navigate('/Home');
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


    return (
        <div className="login-component">
            <div className="signin-component">
            <form onSubmit={handleSubmit}>
            <FormInput  type='email' required label='Email' onChange={handleChange} value={email} name='email'></FormInput>
            <FormInput  type='password'required  label='Password' onChange={handleChange} value={password} name='password'></FormInput>
            <Button type="submit" children="signin"></Button>
            </form>
            </div>
        </div>
    );
}

export default Login;