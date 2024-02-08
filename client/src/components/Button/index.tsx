import React, { ButtonHTMLAttributes } from 'react';
import './CustomButton.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {


}
const CustomButton = ({ children, ...rest }: ButtonProps) => {
    return <button className='custom-button' {...rest}>{children}</button>;
}

export default CustomButton;