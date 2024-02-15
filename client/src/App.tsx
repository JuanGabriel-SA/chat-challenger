import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Avatar from './components/Avatar';
import CustomButton from './components/Button';
import Message from './components/Message';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';
import Modal from './components/Modal';
import { AnimatePresence } from 'framer-motion';
import { setModalVisible } from './store/reducers/modalSlice';
import { motion } from 'framer-motion';
import { setMessages } from './store/reducers/messageSlice';
import { setUsers } from './store/reducers/userSlice';

interface Message {
  content: string,
  created_at: string,
  id: number,
  reply_to?: string,
  score: number,
  user_id: number
}

interface User {
  id: number,
  image: string,
  username: string,
}

interface Vote {
  id: number,
  user_id: number,
  comment_id: number,
}

function App() {
  const [messageContent, setMessageContent] = useState<string>('');
  const [allVotes, setAllVotes] = useState<Vote[]>([]);
  const modalVisible = useAppSelector(state => state.modal.visible);
  const allMessages = useAppSelector(state => state.messageState.messages);
  const deletingMessage = useAppSelector(state => state.deletingMessage);
  const currentUser = useAppSelector(state => state.currentUserState);
  const allUsers = useAppSelector(state => state.userState.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllUsers();
    getMessages();
    getAllVotes();
  }, [])

  async function sendMessage() {
    if (messageContent !== '') {

      const dataContent = {
        content: messageContent,
        created_at: new Date().toLocaleDateString('pt-BR'),
        user_id: currentUser.id
      }

      await fetch('http://localhost:8080/chat/send-message', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(dataContent)
      });


      await getAllVotes();
      getMessages();
    }
  }

  async function getMessages() {
    const messages = await fetch("http://localhost:8080/chat/get-messages").then(res => res.json());
    dispatch(setMessages(messages));
  }

  async function getAllUsers() {
    const users = await fetch("http://localhost:8080/user/get-users").then(res => res.json());
    dispatch(setUsers(users));
  }

  async function getAllVotes() {
    const votes = await fetch("http://localhost:8080/vote/get-all-votes").then(res => res.json());
    setAllVotes(votes);
  }

  function getUser(id: number) {
    return allUsers.filter(item => item.id == id)[0];
  }

  function attContent() {
    getAllVotes();
    getMessages();
  }

  function getUpvotes(commentId: number) {
    let countVotes = allVotes.filter(item => item.comment_id == commentId);
    return countVotes.length;
  }

  function createChat() {
    if (allMessages.length > 0 && allUsers.length > 0) {
      return allMessages.map(item =>
        item.reply_to == null &&
        <Message
          user_id={getUser(item.user_id).id}
          key={item.id}
          onEdit={() => attContent()}
          message_id={item.id}
          user_name={getUser(item.user_id).username}
          upvotes={getUpvotes(item.id)}
          user_image={getUser(item.user_id).image}
          created_at={item.created_at}>
          {item.content}
        </Message>
      )
    } else {
      return null;
    }
  }

  async function deleteMessage() {
    await fetch(`http://localhost:8080/chat/delete-message/${deletingMessage.id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    });

    dispatch(setModalVisible(false));
    getMessages();
  }

  return (
    <div className="chat-page-body">
      <AnimatePresence>
        {modalVisible && (
          <Modal
            onSubmit={() => deleteMessage()}
            cancelText='NO, CANCEL'
            submitText='YES, DELETE'
            className='delete-modal'
            title='Delete comment'>
            <h1>
              Are you sure you want to delete this comment? This will remove the comment and can't be undone
            </h1>
          </Modal>
        )}
      </AnimatePresence>
      <div className='container'>
        <motion.div layout className='chat-section'>
          <AnimatePresence>
            {createChat()}
          </AnimatePresence>
        </motion.div>
        <div className='send-message-section'>
          <Avatar src={currentUser.user_image} />
          <textarea
            placeholder='Type something...'
            onChange={e => setMessageContent(e.target.value)}
            spellCheck="false" />
          <CustomButton
            onClick={e => sendMessage()}>SEND</CustomButton>
        </div>
        <div className='responsive-send-message-section'>
          <textarea
            placeholder='Type something...'
            onChange={e => setMessageContent(e.target.value)}
            spellCheck="false" />
          <div className="send-message-section-footer">
            <Avatar src={currentUser.user_image} />
            <CustomButton
              onClick={e => sendMessage()}>SEND</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
