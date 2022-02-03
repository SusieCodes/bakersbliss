import React from "react";

export const Input = (props) => {
  const {
    id,
    type = "text",
    value,
    onChange,
    label,
    required,
    maxLength,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        required={required}
        name={id}
        type={type}
        maxLength={maxLength}
        className="form-group__edit"
        onChange={onChange}
        id={id}
        value={value}
      />
    </div>
  );
};
