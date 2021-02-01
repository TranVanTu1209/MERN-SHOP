import React from "react";

const GoTop = () => {
  return (
    <button
      className='btn btn-sm btn-light rounded outline-none'
      style={{
        position: "absolute",
        bottom: 15,
        right: 20,
        zIndex: 5,
        padding: "0.25rem 0.5rem",
      }}
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
    >
      <i className='fas fa-chevron-up'></i>
    </button>
  );
};

export default GoTop;
