import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import Game from "./screens/game";
import { useEffect, useRef, useState } from "react";
import { Message } from "./models/message";
import { Alert, Snackbar } from "@mui/material";

const isLocal = () => process.env.ENVIRONMENT === 'local';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocket = useRef<WebSocket>();
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    webSocket.current = new WebSocket(isLocal() ? "ws://localhost:8081" : `${window.location.protocol}//${window.location.host}`);
    webSocket.current.onerror = () => {
      setOpen(true)
    };
    webSocket.current.onmessage = (message) => {
      const mes = JSON.parse(message.data) as Message;

      setMessages((prev) => [...prev, mes]);
    };
    return () => webSocket.current?.close();
  }, []);

  const sendMessage = (message: Message) => {
    if (webSocket?.current?.readyState === WebSocket.OPEN) {
      webSocket.current?.send(JSON.stringify(message));
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home messages={messages} sendMessage={sendMessage} />}
        />
        <Route
          path="/game/:id"
          element={<Game messages={messages} sendMessage={sendMessage} />}
        />
      </Routes>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error connecting to server!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
