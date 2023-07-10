import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
  } from "firebase/firestore";

import "../styles/Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = ({room}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id});
            });
            console.log(messages);
            setMessages(messages);
        });

        return () => unsuscribe();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };

  return (
    <div className="chat-app">
        <div className="header">
            <h1>Welcome to: {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
            <ScrollToBottom className="message-container">
            {messages.map((message) => (
            <div key={message.id} className="message">
                <span className="user">{auth.currentUser.displayName===message.user ? <span>You</span> : message.user}:</span> {message.text}
            </div>
            ))}
            </ScrollToBottom>
        </div>
        <form  onSubmit={handleSubmit} className="typebar">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="new-message-input"
                placeholder="Type your message here..."
            />
            
            <button type="submit" class="btn-pink" id="btn">
                Send
            </button>
        </form>
    </div>
  );
}



export default Chat;