import { IMessage, IMessagePayload } from '@/lib/model/message';
import { useEffect, useState } from 'react';
import { io, type Socket } from "socket.io-client";

interface ClientToServerEvents {
  sendMessage: (data: IMessagePayload) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  typing: (data: { roomId: string, userId: string }) => void;
  reactMessage: (data: IMessagePayload) => void;
}
interface ServerToClientEvents {
  getMessages: (message: IMessage) => void;
  userTyping: (userId: string) => void;
  onlineUsers: (users: string[]) => void;
  updateLastMessage: (data: { roomId: string, lastMessage: IMessage }) => void;
  updateLastMessageWithReaction: (data: { roomId: string, lastMessage: IMessage }) => void;
}

export type TypeSocketEvent = ClientToServerEvents & ServerToClientEvents

const socketInstance: Socket<TypeSocketEvent> = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

export const useSocket = () => {
  const [socket] = useState(socketInstance)
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => {
      setIsConnected(false)
    }
    const handleError = () => {
      setIsError(true)
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, []);

  return { socket, isConnected, isError };
}



