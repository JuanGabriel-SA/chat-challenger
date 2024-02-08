import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Avatar from './components/Avatar';
import CustomButton from './components/Button';
import Message from './components/Message';

interface Message {
  content: string,
  created_at: string,
  id: number,
  reply_to?: string,
  score: number,
  user_id: number
}

function App() {
  const [messageContent, setMessageContent] = useState<string>('');
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  async function sendMessage() {

    const dataContent = {
      content: messageContent,
      created_at: new Date().toLocaleDateString('pt-BR'),
      user_id: 1
    }

    await fetch('http://localhost:8080/chat/send-message', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dataContent)
    });

    getMessages();

  }

  async function getMessages() {
    const messages = await fetch("http://localhost:8080/chat/get-messages").then(res => res.json());
    setAllMessages(messages);
  }

  function createChat() {
    if (allMessages.length > 0)
      return allMessages.map(item => 
        <Message></Message>
      )
    else
      return null;
  }

  return (
    <div className="chat-page-body">
      <div className='container'>
        <div className='chat-section'>
          {createChat()}
        </div>
        <div className='send-message-section'>
          <Avatar src='images/avatars/image-amyrobson.webp' />
          <textarea onChange={e => setMessageContent(e.target.value)} spellCheck="false" />
          <CustomButton
            onClick={e => sendMessage()}>SEND</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default App;
