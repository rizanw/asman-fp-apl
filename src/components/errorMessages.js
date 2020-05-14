import React from "react";

const ErrorMessages = ({ message }) => {
  return (
    <span className="text-danger" style={{ fontSize: "0.7em" }}>
      {message}
    </span>
  );
};

export default ErrorMessages;
