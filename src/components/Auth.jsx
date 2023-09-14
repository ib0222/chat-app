import { auth, provider } from "../firebase-config/firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth">
      <button onClick={signInWithGoogle}>
        <GoogleIcon fontSize="large"/>
        Sign in in with google
      </button>
    </div>
  );
};
