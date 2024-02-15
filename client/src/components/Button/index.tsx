import React, { ButtonHTMLAttributes } from 'react';
import './CustomButton.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {


}
const CustomButton = ({ className, children, ...rest }: ButtonProps) => {
    return <button className={`custom-button ${className}`} {...rest}>{children}</button>;
}

export default CustomButton;