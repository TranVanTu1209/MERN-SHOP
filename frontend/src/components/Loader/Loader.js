import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "60px",
        height: "60px",
        margin: "2rem auto",
        display: "block",
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
