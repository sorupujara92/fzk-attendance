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
import { getAttendance, getDepartments } from '../service/AttendanceService';
const defaultFormFields = {
    'departmentsValue' : ["select department"],
    'selectedDepartment' : '',
    'employeesData' : []
};
const Home = ()=> {
    const[formFields,setFormFields] = useState(defaultFormFields);
    const currentUser = useSelector(selectCurrentUser)
    const userToken = useSelector(selectUserToken)
    const {departmentsValue,selectedDepartment,employeesData} = formFields;
    console.log(departmentsValue)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name+value)
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

    const getAttendanceData = async (event) => {
        event.preventDefault();
        console.log(selectedDepartment)
        try {   
            const response = await getAttendance(selectedDepartment,userToken);
            setFormFields({ ...formFields, ['employeesData'] : response });
            console.log(response)
        }catch(error){
            switch(error.code){
                default : 
                    console.log(error);    
            }
    
        }
        
    }


    return (

        <div className="home-component">
            
            <div className="nav-links-container">
            { currentUser ? ( <span className="nav-link" onClick={signOutUser}> SIGN OUT</span>) : "" }
            { currentUser ? ( <span className="nav-link"> Welcome {currentUser.email}</span>) : "" }
            </div>

            <div className="search-page">
                <form onSubmit={getAttendanceData}>
                <select className='select-box' value={selectedDepartment} name='selectedDepartment' onChange={handleChange}> {departmentsValue.map(department => (
                    <option key={department} value={department}>
                        {department}
                    </option>
))}
                 </select>;
                {/* <FormInput  type='text' required label='Department' onChange={handleChange} value={department} name='department'></FormInput> */}
                <Button type="submit"  children="search"></Button>
                </form>   
            </div>

            <div className='employeesList'>
                <div>
                    <table border="2" cellPadding="30">
                    <tr> 
                        <th>InTime</th>
                        <th>OutTime</th>
                        <th>attendanceDate</th>
                        <th>employeeName</th>
                        <th>departmentFname</th>
                    </tr>
                    {
                        employeesData.map(employee => (
                        <tr>
                            <td>{employee.inTime}</td>
                            <td>{employee.outTime}</td>
                            <td>{employee.attendanceDate}</td>
                            <td>{employee.employeeName}</td>
                            <td>{employee.departmentFname}</td>
                        </tr>
                        ))
                    }
                    </table>
              </div>
            </div>
        </div>
    );
}

export default Home;