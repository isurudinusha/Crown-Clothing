import { useState, useRef, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-up.styles.scss";
import Button from "../button/button.component";

function SignUpForm() {
  const [formData, setFormData] = useState({});

  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const signUpUser = async (formData) => {
    const { email, password, displayName } = formData;
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);

      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName: displayName,
      });
    } catch (error) {
      console.error("User creation encountered an error", error);
    }
  };

  useEffect(() => {
    // Ensure formData is not empty or in its initial state if needed
    if (Object.keys(formData).length > 0) {
      signUpUser(formData);
    }
  }, [formData]); // Dependency array, useEffect runs when formData changes

  const handleSubmit = (event) => {
    event.preventDefault();

    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setFormData({ displayName, email, password });
    // Clear the form fields
    displayNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" ref={displayNameRef} type="text" />
        <FormInput label="Email" ref={emailRef} type="email" />
        <FormInput label="Password" ref={passwordRef} type="password" />
        <FormInput
          label="Confirm Password"
          ref={confirmPasswordRef}
          type="password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
