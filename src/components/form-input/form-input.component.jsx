import { forwardRef, useState } from "react";
import "./form-input.styles.scss";
function FormInput({ label, ...otherProps }) {
  const [input, setInput] = useState("");

  return (
    <div className="group">
      <input
        className="form-input"
        onChange={(e) => setInput(e.target.value)}
        {...otherProps}
        required
      />
      {label && (
        <label className={`${input.length ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
