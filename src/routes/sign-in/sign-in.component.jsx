import {
  signInWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

function SignIn() {
  const logGoogleUSer = async () => {
    const { user } = await signInWithGoogle();

    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h1>Sign In</h1>
      <button onClick={logGoogleUSer}>Sign In</button>
    </>
  );
}

export default SignIn;
