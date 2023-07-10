import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css";


const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
          } catch (err) {
            console.error(err);
          }
    };

  return (
    <div className="auth">
        <p className="signin"> Sign In With Google To Continue </p>
        <button onClick={signInWithGoogle} className="button3"> Sign In With Google </button>
    </div>
  );
};
