'use client'
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/components/providers/socket-provider";
import { Action } from "@/components/models/message";

export default function Home() {
  const router = useRouter();
  const { socket, connect } = useSocket();

  useEffect(() => {
    let message = socket?.lastJsonMessage;
    console.log("MESSAGE: " + JSON.stringify(message))
    if (message && message.action === Action.CREATE) {
      router.push(`/game?id=${message.data.id}`);
    }
  }, [socket?.lastJsonMessage]);

  const connectAndCreateGame = () => {
    connect();
    socket?.sendJsonMessage(
      {
        action: "game",
        data: {
            action: Action.CREATE
        }
      }
    )
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <Button variant="ghost" onClick={connectAndCreateGame}>
        START
      </Button>
    </div>
  );
}
