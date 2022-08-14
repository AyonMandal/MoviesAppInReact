import React from "react";
import { ReactPropTypes } from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

Button.ReactPropTypes = {
  onClick: ReactPropTypes.func,
};

export default Button;
