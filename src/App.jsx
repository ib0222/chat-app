import { useState,useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room,setRoom] = useState(null);

  const roomInputRef = useRef(null);
  if (!isAuth) {
    return (
      <>
        <Auth />
      </>
    );
  }
  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div className="room">
          <label>Enter room name</label>
          <input ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
