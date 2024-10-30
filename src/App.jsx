import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Tasks from "./Tasks";
import Sidebar from "./Components/Sidebar";
function App() {
  return (
    <>
      <Navbar />
          <Tasks />
    </>
  );
}

export default App;
