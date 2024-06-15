import { useState, useRef } from "react";

function SignUpForm() {
  const [formData, setFormData] = useState(null);

  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
  };

  return (
    <>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input type="text" ref={displayNameRef} required />

        <label>Email</label>
        <input type="email" ref={emailRef} required />

        <label>Password</label>
        <input type="password" ref={passwordRef} required />

        <label>Confirm Password</label>
        <input type="password" ref={confirmPasswordRef} required />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;
