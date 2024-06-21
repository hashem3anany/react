import React, { useState, useEffect } from 'react';
import './Chat.css';
import UserNav from "../UserNav/UserNav";
import axios from 'axios';
import Pusher from 'pusher-js';

function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [friends,setfriends] = useState([]);
  let id = Number(localStorage.getItem("userId"))
  let cid = Number(localStorage.getItem("reciver"))
  let SenderID = id;
  let ReceiverID = cid;
  
  useEffect(() => {
        
    // Fetch initial messages from the API
    const fetchMessages = async () => {
      try {
        const response = await axios.post('https://ertdemo.azurewebsites.net/api/Chat/GetMessages', {
          SenderID,
          ReceiverID
        }, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();

   
    // Initialize Pusher and subscribe to the channel
    const pusher = new Pusher('163441d70eec4f84205f', {
      cluster: 'eu',
    });
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        // Only process messages for the specific SenderID and ReceiverID
        if ((data.SenderID === SenderID && data.ReceiverID === ReceiverID) ||
            (data.SenderID === ReceiverID && data.ReceiverID === SenderID)) {
            // Append new message to the messages div
            const messageDiv = document.createElement(`p`);
            messageDiv.className = `${data.SenderID !== SenderID ? 'sender rounded-3 px-5  text-end mt-3' : 'receiver rounded-3 text-white px-5 ms-auto text-start mt-3'}`;
            messageDiv.innerHTML = ` ${data.Content}`;
            document.getElementById('messages').appendChild(messageDiv);
        }
    });

    // Fetch friends initially
    fetchFriends();

    // Clean up function to unsubscribe and disconnect pusher
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [SenderID, ReceiverID]);
  
  const fetchFriends = async () => {
    try {
      const response = await axios.post('https://ertdemo.azurewebsites.net/api/Chat/usernames2', {
        ID: SenderID
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      setfriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const addMessage = async () => {
    try {
      const response = await axios.post('https://ertdemo.azurewebsites.net/api/Chat/AddMessage1', {
        Content: newMessage,
        SenderID,
        ReceiverID
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      
      setNewMessage(''); 
      
      // Fetch friends after adding a message
      await fetchFriends(); 

      const pusher = new Pusher('163441d70eec4f84205f', {
        cluster: 'eu',
      });
      const channel = pusher.subscribe('my-channel');
      channel.trigger('my-event', response.data);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMessage();
    }
  };

  const handleClick = async (e, userId)  => {
    localStorage.setItem('reciver', userId);
    try {
      const response = await axios.post('https://ertdemo.azurewebsites.net/api/Chat/GetMessages', {
        SenderID,
        ReceiverID
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <>
      <UserNav />
      <div className="chat vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 ">
              <div className="item  overflow-scroll p-5 overflow-x-hidden">
                {friends.map((friend, index) => (
                  <div id='with' key={index} onClick={(e) =>{handleClick(e, friend.userId)}}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: ReceiverID === friend.userId ? '#E9EAEC' : 'white',
                  }} className="friend border-0 rounded-4 p-3 d-flex flex-nowrap">
                   <img src={friend.profileImage} className='w-25 rounded-4' alt="" />
                   <h3 className='ms-3 '>{friend.username}<br/><span>{friend.lastMessage.content}</span></h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-8">
              <div className="item flex-wrap d-flex">
                <div id='messages' className="messages overflow-scroll  overflow-x-hidden p-4 h-75 w-100">
                  {messages.map((message, index) => (
                    <p key={index} className={message.senderID !== SenderID ? 'sender  rounded-3 px-5  text-end mt-3' : 'receiver rounded-3 text-white px-5 ms-auto text-start mt-3'}>
                      {message.content}
                    </p>
                  ))}
                </div>
                <div className="msg d-flex align-items-center w-100 p-3 rounded-5 text-white ">
                  <i onClick={addMessage} className="fa-solid me-2 fa-paper-plane"></i>
                  <input
                    type="text"
                    id='Add'
                    className='form-control border-0 w-75  d-inline'
                    placeholder='Message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} // Update state on input change
                    onKeyPress={handleKeyPress} // Call addMessage on Enter key press
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
