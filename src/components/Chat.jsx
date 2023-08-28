import { useEffect, useState } from "react";
import "../styles/Chat.css";
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
      room
    });
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to :{room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        <div>
          {messages.map((message) => (
            <div className="message" key={message.id}>
              <div style={{display:'flex'}}>
                <img src={message.photoUrl} className="profile-photo"/>
                <p className="user">{message.user}</p>
                <p style={{display:'flex', flexWrap:'wrap'}}>{message.text}</p>
              </div>
              <div style={{display:'flex',justifyContent:'center'}}>
              <button onClick={() => deleteMessage(message.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
