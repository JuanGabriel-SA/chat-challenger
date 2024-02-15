import { HTMLAttributes, useRef } from "react";
import './TextBox.css';

interface TextBoxProps extends HTMLAttributes<HTMLDivElement> {
    placeholder?: string,
    replyingTo: string,
    onTextChange: (text: string) => void,
}

const TextBox = ({ placeholder, children, replyingTo, onTextChange, onKeyDown, ...rest }: TextBoxProps) => {
    const textRef = useRef<HTMLHeadingElement>(null);

    function editText() {
        textRef.current?.focus();
    }

    return (
        <div className="text-box" onClick={e => editText()}>
            <h4 className="reply-mark">
                @{replyingTo}
            </h4>
            <h4
                onKeyDown={e => onKeyDown !== undefined && onKeyDown(e)}
                onInput={e => onTextChange(e.currentTarget.innerText)}
                ref={textRef}
                className="reply-text"
                contentEditable={true}
                spellCheck={false}>{children}</h4>
        </div>
    );
}

export default TextBox;