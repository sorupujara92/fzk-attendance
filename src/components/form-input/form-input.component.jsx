import './form-input.styles.scss';

const FormInput = ({label,...props}) => {

    return (
        <div className='form-box'>
        <label className='form-label'>{label}</label>
        <input className='form-input' {...props}></input>
        </div>

    );

}

export default FormInput;