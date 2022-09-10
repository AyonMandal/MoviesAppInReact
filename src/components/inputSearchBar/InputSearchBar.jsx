import React from "react";
import { Button } from "../button/Button";
import "./InputSearchBar.scss";

const InputSearchBar = (props) => {
  return (
    <>
      <div className="input_holder">
        <input
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
        <Button className="small" onClick={props.onClick}>
          Search
        </Button>
      </div>
    </>
  );
};

export default InputSearchBar;
