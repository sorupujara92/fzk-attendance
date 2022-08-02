import './login.styles.scss'
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
        console.log(name,value);
        setFormFields({ ...formFields, [name] : value });
    };
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {   
            console.log(email)
            // const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            navigate('/Home');
        }catch(error){
            switch(error.code){
                case "auth/wrong-password":
                    alert("incorrect password for email");
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