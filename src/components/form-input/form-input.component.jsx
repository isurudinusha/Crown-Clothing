import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  // Extract value from otherProps to use it for label className condition
  const { value } = otherProps;

  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        // Use value to check if it has any length for applying the 'shrink' class
        <label
          className={`${
            value && value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
