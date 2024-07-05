import React from "react";
import "./toggleSwitch.css";

const ToggleSwitch = ({ key, value, checked, onChange }) => {
  return (
    <div className="container">
      ใช้งาน
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          key={key}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label className="label" htmlFor={key}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;