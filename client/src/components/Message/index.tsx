import React, { HTMLAttributes } from 'react';

interface MessageProps extends HTMLAttributes<HTMLDivElement> {

}

const Message = ({ ...rest }: MessageProps) => {
    return (
        <div className='message' {...rest}>
            <div className='upvote-buttons'></div>
            <div className='message-header'>
                <img className='user-image' />
                <h4></h4>
                <button></button>
            </div>
            <div className='message-content'></div>
        </div>
    )
}

export default Message;