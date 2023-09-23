// import { createContext } from "react";
import React, { useState, createContext } from "react";
import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Sidebar from "./layout/Sidebar";
import { Form, Row, Col } from "react-bootstrap";

const CreateToggle = createContext();

export default function Toggl_provider({ children }) {
  // console.log(children);
  const [toggle, setToggle] = useState(true);
  const handlehide = () => {
    setToggle(true);
  };
  const handleshow = () => {
    setToggle(false);
  };
  return (
    <>
      <CreateToggle.Provider value={{ toggle, handlehide, handleshow }}>
        {children}
      </CreateToggle.Provider>
    </>
  );
}

export { CreateToggle };
