import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  signInWithGoogle,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up.component";

function SignIn() {
  useEffect(() => {
    async function checkUserRedirect() {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }

    checkUserRedirect();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGoogle();

    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Google Popup Sign In</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Google Redirect Sign In
      </button> */}
      <SignUpForm />
    </>
  );
}

export default SignIn;
