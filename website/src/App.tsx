import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import Game from './screens/game';
import { useEffect, useRef, useState } from 'react';
import { Message } from './models/message';
import { Action } from './models/action';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocket = useRef<WebSocket>()
  
  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8081');
    webSocket.current.onmessage = (message) => {
      const obj = JSON.parse(message.data);
      const mes = {
        action: Action[obj.action],
        data: obj.data
      };
      setMessages(prev => [...prev, mes]);
    }
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
        <Route path="/" element={<Home messages={messages} sendMessage={sendMessage}/>} />
        <Route path="/game/:id" element={<Game messages={messages} sendMessage={sendMessage}/>} />
      </Routes>
    </div>
  );
}


export default App;
