import './login.styles.scss'
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginUser,LogoutUser } from '../../service/auth.service';
const defaultFormFields = {
    'email' : '',
    'password' : ''
};
const Login = ()=> {

    const[formFields,setFormFields] = useState(defaultFormFields);
    const navigate = useNavigate();

    const {email,password} = formFields;

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

            console.log(response);
            navigate('/Home');
        }catch(error){
            switch(error.code){
                case "auth/wrong-password":
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