import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { RiWechatChannelsLine } from "react-icons/ri";


const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat}) => {

    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
        setIsInChat(false);
    };

    return(
      <div className="App">
        <div className="app-header">
        <RiWechatChannelsLine className="icon"/>
            <h1  className="logo"> Chat App </h1>
            {isAuth && (
             <div className="sign-out">
                <button class="button" id="button-1" onClick={signUserOut}>
                <p className="a">Sign out</p>
                <div id="spin"></div>
                </button>
            </div> 
            
        )}
        </div>

        <div className="app-container">{children}</div>

      </div>
    );

};