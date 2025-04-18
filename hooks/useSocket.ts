import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from "socket.io-client";


interface ISendMessageEvent {
  sendMessage: (data: string) => void
}

type TypeSocketEvent = ISendMessageEvent

const socketInstance: Socket<TypeSocketEvent> = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  withCredentials: true,
});

export const useSocket = () => {
  const socketRef = useRef<Socket<TypeSocketEvent>>(socketInstance)
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"], // Best practice: force WebSocket if possible
      withCredentials: true,
    });

    socketRef.current = socket;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleError = () => setIsError(true)

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
