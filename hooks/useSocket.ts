import { IMessage, IMessagePayload } from '@/lib/model/message';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

const socketInstance: Socket<TypeSocketEvent> = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  // withCredentials: true,
});

export const useSocket = () => {
  const socketRef = useRef<Socket<TypeSocketEvent>>(socketInstance)
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false)
  const router = useRouter();


  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"], // Best practice: force WebSocket if possible
      withCredentials: true,
    });

    socketRef.current = socket;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => {
      setIsConnected(false)
    }
    const handleError = () => {
      router.push("/")
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

  return { socket: socketRef.current, isConnected, isError };
}



