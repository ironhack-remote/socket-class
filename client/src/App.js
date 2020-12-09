import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000").then((response) => {
      console.log("response:", response);
    });

    // socket.on("people-connected", (data) => {
    //   console.log("data:", data);
    // });/e-id-fbds,nmsdbfnmgdfsnmgdfsm,
    socket.on("message", (data) => {
      console.log("data:", data);
    });
  }, []);

  function onChange(e) {
    setMessage(e.target.value);
    socket.emit("new-message", {
      user: { username: "Andre", message: e.target.value },
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={message} onChange={onChange} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
