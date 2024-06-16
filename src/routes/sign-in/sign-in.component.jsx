import { useState, useEffect, useRef } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  signInWithGoogle,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up.component";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-in.styles.scss";

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

  const [formData, setFormData] = useState({});

  const emailRef = useRef();
  const passwordRef = useRef();

  const signInUser = async (formData) => {
    const { email, password } = formData;
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("User creation encountered an error", error);
    }
  };

  useEffect(() => {
    // Ensure formData is not empty or in its initial state if needed
    if (Object.keys(formData).length > 0) {
      signInUser(formData);
    }
  }, [formData]); // Dependency array, useEffect runs when formData changes

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setFormData({ email, password });
    // Clear the form fields

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="container">
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label="Email" ref={emailRef} type="email" />
          <FormInput label="Password" ref={passwordRef} type="password" />
        </form>
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google sign in
          </Button>
          {/* <button onClick={signInWithGoogleRedirect}>
        Google Redirect Sign In
      </button> */}
        </div>
      </div>

      <SignUpForm />
    </div>
  );
}

export default SignIn;
