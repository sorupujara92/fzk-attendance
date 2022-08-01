import './login.styles.scss'
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';
const Login = ()=> {

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
      navigate('/checkout');
    };
    const signIn =  async() => {
        navigate("/Home");
    };
    return (
        <div className="login-component">
            <div className="signin-component">
            {/* <FormInput  type='text' label='Email'></FormInput>
            <FormInput  type='password' label='Password'></FormInput> */}
            <Button onClick={signIn}></Button>
            </div>
        </div>
    );
}

export default Login;