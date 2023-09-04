import { useContext, useState } from "react";
import "./Input.scss";
import { context } from "../../Hook/UseContext";

function Input({
  label,
  value,
  eventSet,
  error,
  passwordConfirm,
  type,
  setType,
  icon,
  onChangeErrors
}) {
  const { setPasswordsMatch } = useContext(context);

  return (
    <div className="group">
      <div className="show">
        <input
          required=""
          type={type ?? "text"}
          className="input"
          value={value}
          onChange={(e) => {
            eventSet(e.target.value);
            setPasswordsMatch(e.target.value === passwordConfirm);
            onChangeErrors('')
          }}
        />{" "}
        {icon}

      </div>
      <span className="highlight">{error}</span>
      <span className="bar"></span>
      <label>{label}</label>
    </div>
  );
}

export default Input;
