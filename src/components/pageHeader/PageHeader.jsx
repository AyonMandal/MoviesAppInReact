import React from "react";
import bgImage from "../../assets/footer-bg.jpg";
import "./PageHeader.scss";

const PageHeader = (props) => {
  return (
    <>
      <div
        className="page__header"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h2>{props.children}</h2>
      </div>
    </>
  );
};

export default PageHeader;
