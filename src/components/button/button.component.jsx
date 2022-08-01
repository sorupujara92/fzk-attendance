import "./button.styles.scss";

const Button = (...otherProps) => {

    return (
            <button className="button-container" {...otherProps}></button>

    );
}

export default Button;