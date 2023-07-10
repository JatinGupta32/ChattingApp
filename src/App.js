import './App.css';
import React, { useState, useEffect } from "react";
import Chat from "./components/Chat.js";
import {Auth} from "./components/Auth.js";
import {AppWrapper} from "./components/AppWrapper";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if(!isAuth){
    return(
      <AppWrapper 
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className='room'>
          <label className='label'>Type room name: </label>
          <input placeholder='Enter room name' onChange={(e) => setRoom(e.target.value)} />
          <button className='button3 btn3'
            onClick={() => {
              setIsInChat(true);
            }}
          >Submit</button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default App;
