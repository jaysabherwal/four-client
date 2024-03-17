"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Message } from "../models/message";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import useProvideSocket from "../hooks/useProvideSocket";

const isLocal = () => process.env.NODE_ENV === "development";

const SocketContext = createContext<SocketContextValue>(null!);

export interface SocketContextValue {
  socket: WebSocketHook<Message> | undefined;
  connect: () => void;
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  
  const socket = useProvideSocket(socketUrl);

  const connect = useCallback(() => {
    setSocketUrl(isLocal() ? process.env.NEXT_PUBLIC_BACKEND_URL! : `wss://${window.location.host}`);
  }, []);

  const value: SocketContextValue = {
    socket,
    connect,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
