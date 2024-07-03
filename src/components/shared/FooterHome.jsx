// eslint-disable-next-line no-unused-vars
import React from "react";

const getYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  return year;
};

export const FooterHome = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "10vh",
          maxHeight: "20vh",
          backgroundColor: "#FEFBF6",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            textAlign: "center",
            padding: "20px",
            margin: 0,
          }}
        >
          Made With ❣️ By © Shivansh Verma, {getYear()}
        </p>
      </div>
    </footer>
  );
};
