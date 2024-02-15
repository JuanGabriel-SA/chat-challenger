import React, { HTMLAttributes, useEffect, useState } from 'react';
import './Reply.css';
import { FaMinus, FaPen, FaPlus, FaReply, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '../../hooks';
import CustomButton from '../Button';
import { AnimatePresence, motion } from 'framer-motion';
import { setModalVisible } from '../../store/reducers/modalSlice';
import Avatar from '../Avatar';
import TextBox from '../TextBox';
import { setDeletingMessage } from '../../store/reducers/deletingMessage';
import { setMessages } from '../../store/reducers/messageSlice';

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
    upvotes: number,
    user_image: string,
    user_name: string,
    created_at: string,
    message_id: number,
    onEdit: () => void;
    children: string,
    user_id: number
}


interface Reply {
    content: string,
    created_at: string,
    id: number,
    reply_to?: number,
    score: number,
    user_id: number
}

interface Vote {
    id: number,
    user_id: number,
    comment_id: number,
}

const Reply = ({ onEdit, message_id, user_id, upvotes, user_image, user_name, created_at, children, className, ...rest }: MessageProps) => {

    const currentUser = useAppSelector(state => state.currentUserState);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editetText, setEditedText] = useState<string>(children);
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [replyContent, setReplyContent] = useState<string>('');
    const [allReplies, setAllReplies] = useState<Reply[]>([]);
    const [userMark, setUserMark] = useState<string>('');
    const allUsers = useAppSelector(state => state.userState.users);
    const [allVotes, setAllVotes] = useState<Vote[]>([]);
    const allMessages = useAppSelector(state => state.messageState.messages);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getReplies();
    }, [])

    async function getReplies() {
        const replies = await fetch(`http://localhost:8080/chat/get-replies/${message_id}`).then(res => res.json());
        setAllReplies(replies);
    }

    useEffect(() => {
        getReplies();
        getReplyMark();
    }, [allMessages])

    async function upScore() {

        const data = {
            user_id: currentUser.id,
            comment_id: message_id
        }

        await fetch("http://localhost:8080/vote/up", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        onEdit();
    }

    async function downScore() {

        const data = {
            user_id: currentUser.id,
            comment_id: message_id
        }

        await fetch(`http://localhost:8080/vote/down`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify(data)
        })

        onEdit();
    }

    function formatDate(date_message: string) {
        const oldDate = new Date(date_message);
        const dateNow = new Date();
        const dayDifference = Math.floor((dateNow.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24));
        var aux = null;
        if (dayDifference < 7) {
            aux = `${dayDifference} ${dayDifference === 1 ? 'day ago' : 'days ago'}`;
        } else if (dayDifference < 30) {
            const weekDifference = Math.floor(dayDifference / 7);
            aux = `${weekDifference} ${weekDifference === 1 ? 'week ago' : 'weeks ago'}`;
        } else {
            const monthDifference = Math.floor(dayDifference / 30);
            aux = `${monthDifference} ${monthDifference === 1 ? 'month ago' : 'months ago'}`;
        }

        return aux;
    }

    async function updateMessage() {
        const data = {
            content: editetText,
            created_at: new Date(created_at).toLocaleDateString('pt-BR'),
            score: upvotes,
            user_id: 1
        }

        await fetch(`http://localhost:8080/chat/att-message/${message_id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(data)
        })

        setEditMode(false);
        onEdit();

    }

    async function deleteMessage() {
        dispatch(setDeletingMessage(message_id));
        dispatch(setModalVisible(true));
    }

    function replyMode() {
        setIsReplying(true);
    }

    async function sendReply() {
        if (replyContent !== '') {

            const dataContent = {
                content: replyContent,
                created_at: new Date().toLocaleDateString('pt-BR'),
                user_id: currentUser.id,
                reply_to: message_id
            }

            await fetch('http://localhost:8080/chat/send-message', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(dataContent)
            });
            setReplyContent('');
            setIsReplying(false);
            getMessages();
            getReplies();
        }
    }

    function getUser(id: number) {
        const aux = [...allUsers];
        return aux.filter(item => item.id == id)[0];
    }

    function attContent() {
        getAllVotes();
        getMessages();
    }

    async function getAllVotes() {
        const votes = await fetch("http://localhost:8080/vote/get-all-votes").then(res => res.json());
        setAllVotes(votes);
    }

    async function getMessages() {
        const messages = await fetch("http://localhost:8080/chat/get-messages").then(res => res.json());
        dispatch(setMessages(messages));
    }

    function getUpvotes(commentId: number) {
        let countVotes = allVotes.filter(item => item.comment_id == commentId);
        return countVotes.length;
    }

    function getReplyMark() {
        const message = allMessages.filter(item => item.id == message_id)[0];
        if (message !== undefined) {
            const repliedMessage = allMessages.filter(item => item.id == message.reply_to)[0];
            const userMark = getUser(repliedMessage.user_id).username;
            setUserMark(userMark);
        }
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 200
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
                opacity: 0,
                x: 200,
                transition: {
                    duration: 0.2
                }
            }}

            className='message-container reply-container'>
            {allReplies.length > 0 &&
                <div className='reply-line'></div>
            }
            <div className="message-body">
                <div className='upvote-buttons'>
                    <span onClick={e => upScore()}>
                        <FaPlus size={10} />
                    </span>
                    <span>
                        <h5>{upvotes}</h5>
                    </span>
                    <span onClick={e => downScore()}>
                        <FaMinus size={10} />
                    </span>
                </div>
                <div className="message-content">
                    <div className='message-header'>
                        <img className='user-image' src={user_image} width={30} height={30} />
                        <h3>{user_name}</h3>
                        <h4>{formatDate(created_at)}</h4>
                        {currentUser.id !== user_id ?
                            <button className='reply-button' onClick={e => replyMode()}>
                                <FaReply />
                                Reply
                            </button>
                            :
                            <div className='edit-delete-buttons'>
                                <button className='delete-button' onClick={e => deleteMessage()}>
                                    <FaTrash />
                                    Delete
                                </button>
                                <button className='edit-button' onClick={e => setEditMode(true)}>
                                    <FaPen />
                                    Edit
                                </button>
                            </div>
                        }
                    </div>
                    <motion.div animate={{ height: editMode ? '152.8px' : 'initial' }} className='message-text'>
                        {editMode ?
                            <motion.textarea onChange={e => setEditedText(e.target.value)} spellCheck='false'>
                                {children}
                            </motion.textarea>
                            :
                            <motion.h4 initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}>
                                <b>@{userMark}</b>
                                {children}
                            </motion.h4>
                        }
                    </motion.div>
                    <div className='message-footer'>
                        <div className='responsive-upvote-buttons'>
                            <span onClick={e => upScore()}>
                                <FaPlus size={12} />
                            </span>
                            <h5>{upvotes}</h5>
                            <span onClick={e => downScore()}>
                                <FaMinus size={12} />
                            </span>
                        </div>
                        {currentUser.id !== user_id ?
                            <button className='responsive-reply-button' onClick={e => replyMode()}>
                                <FaReply />
                                Reply
                            </button>
                            :
                            <div className='responsive-edit-delete-buttons'>
                                <button className='delete-button' onClick={e => deleteMessage()}>
                                    <FaTrash />
                                    Delete
                                </button>
                                <button className='edit-button' onClick={e => setEditMode(true)}>
                                    <FaPen />
                                    Edit
                                </button>
                            </div>
                        }
                    </div>
                    {editMode &&
                        <CustomButton className='update-button' onClick={e => updateMessage()}>UPDATE</CustomButton>
                    }
                </div>
            </div>
            <AnimatePresence>
                {isReplying &&
                    <motion.div
                        initial={{ height: 0, scaleY: 0, opacity: 0 }}
                        animate={{ height: 90, scaleY: 1, opacity: 1 }}
                        exit={{ height: 0, scaleY: 0, opacity: 0 }}
                        className='message-reply-section'>
                        <Avatar src={currentUser.user_image} />
                        <TextBox
                            onKeyDown={e => e.key == 'Escape' && setIsReplying(false)}
                            onTextChange={(e) => setReplyContent(e)}
                            replyingTo={user_name}
                            placeholder='Type something...'>
                        </TextBox>
                        <CustomButton
                            onClick={e => sendReply()}>REPLY</CustomButton>
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {allReplies.length > 0 && (
                    allReplies.map(item =>
                        <Reply
                            className='reply-message'
                            user_id={getUser(item.user_id).id}
                            key={item.id}
                            onEdit={() => attContent()}
                            message_id={item.id}
                            user_name={getUser(item.user_id).username}
                            upvotes={getUpvotes(item.id)}
                            user_image={getUser(item.user_id).image}
                            created_at={item.created_at}>
                            {item.content}
                        </Reply>
                    )
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Reply;