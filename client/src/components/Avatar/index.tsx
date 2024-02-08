import React, { ImgHTMLAttributes } from 'react';
import './Avatar.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {

}

const Avatar = ({ ...rest }: AvatarProps) => {
    return <img className='avatar' {...rest} />
}

export default Avatar;