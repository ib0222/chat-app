import {auth,provider} from '../firebase-config/firebase'
import {signInWithPopup} from 'firebase/auth'

import  Cookies from 'universal-cookie';

const cookies = new Cookies()

export const Auth = () => {
    const signInWithGoogle = async () => {
      try{
        const result = await signInWithPopup(auth,provider);
        cookies.set("auth-token",result.user.refreshToken)
      }
        catch(error){
          console.log(error.message)
        }
    }

  return (



    <div className="auth">
      <p>Sign in in with google</p>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
};
