import React, { HTMLAttributes } from "react";
import './Modal.css';
import { useAppDispatch } from "../../hooks";
import { setModalVisible } from "../../store/reducers/modalSlice";
import { motion } from "framer-motion";
interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    title: string,
    cancelText: string,
    submitText: string,
    onSubmit: () => void,
}

const Modal = ({ children, onSubmit, className, title, cancelText, submitText, ...rest }: ModalProps) => {
    const dispatch = useAppDispatch();

    function closeModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === event.currentTarget) {
            dispatch(setModalVisible(false));
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0
            }}
            className={`modal ${className}`}
            onClick={e => closeModal(e)}>
            <div
                className="modal-content">
                <h3 className="modal-title">{title}</h3>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <button className="cancel-button" onClick={e => dispatch(setModalVisible(false))}>
                        {cancelText}
                    </button>
                    <button className="submit-button" onClick={ e => onSubmit()}>
                        {submitText}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default Modal;