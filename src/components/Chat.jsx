import { useEffect, useState, useRef } from "react";
import "../styles/Chat.css";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config/firebase";

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];

      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  async function deleteMessage(messageId) {
    const messageDocRef = doc(messagesRef, messageId);
    await deleteDoc(messageDocRef);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      photoUrl: auth.currentUser.photoURL,
      room,
    });
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to :{room.toUpperCase()}</h1>
      </div>
      <div className="messages" ref={chatContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className="message">
            <img src={message.photoUrl} className="profile-photo" />
            <div className="only-message">
              <p className="message-box">{message.text}</p>
              <button
                className="delete-btn"
                onClick={() => deleteMessage(message.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          <SendIcon fontSize="large" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
