import { React, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

Modal.propType = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModelContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        &#x2718;
      </div>
    </div>
  );
};

ModelContent.propType = {
  onClose: PropTypes.func,
};

export default Modal;
