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
import { getDepartments } from '../service/AttendanceService';
const defaultFormFields = {
    'departmentsValue' : ["select department"],
    'department' : ''
};
const Home = ()=> {
    const[formFields,setFormFields] = useState(defaultFormFields);
    const currentUser = useSelector(selectCurrentUser)
    const userToken = useSelector(selectUserToken)
    const {departmentsValue,department} = formFields;
    console.log(departmentsValue)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name] : value });
    };
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    useEffect(() => {
        const getDepartment = async () => {
          const departmentArray = await getDepartments(userToken);
          console.log(departmentArray.departments)
          if(departmentArray.departments.length>0) {
          setFormFields({ ...formFields, ['departmentsValue'] : departmentArray.departments });
          }
        };
    getDepartment();   
},
    [])
    
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
                <form onSubmit={null}>
                <select className='select-box' value={department} name='department' onChange={handleChange}> {departmentsValue.map(department => (
                    <option key={department} value={department}>
                        {department}
                    </option>
))}
                 </select>;
                {/* <FormInput  type='text' required label='Department' onChange={handleChange} value={department} name='department'></FormInput> */}
                <Button type="submit"  children="search"></Button>
                </form>   
            </div>

        </div>
    );
}

export default Home;