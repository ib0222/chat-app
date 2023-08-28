import { useState,useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room,setRoom] = useState(null);

  const roomInputRef = useRef(null);
  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }
  return (
    <div>
      {room ? (
        <div><Chat room={room}/></div>
      ) : (
        <div className="room" style={{display:"flex",justifyContent:'center',flexWrap:'wrap'}}>
          <label style={{display:'flex',alignItems:'center',fontSize:'30px',color:'white',marginBottom:'20px',marginTop:'20px'}}>Enter room name</label>
          <input ref={roomInputRef} style={{padding:'10px',fontSize:'20px'}}/>
          <button onClick={() => setRoom(roomInputRef.current.value)} style={{fontSize:'20px',padding:'10px',marginTop:'20px',borderRadius:'10px'}}>Enter chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
