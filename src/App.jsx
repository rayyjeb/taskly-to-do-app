import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Tasks from "./Tasks";
function App() {
  return (
    <>
      <Navbar />
      <Tasks />
    </>
  );
}

export default App;
