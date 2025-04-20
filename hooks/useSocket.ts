import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { io, type Socket } from "socket.io-client";

interface IMessagePayload {
  [key: string]: string
}
interface ISendMessageEvent {
  sendMessage: (data: IMessagePayload) => void
}
interface IGetMessages {
  getMessages: (data: string) => void
}
interface IJoinRoomEvent {
  joinRoom: (data: string) => void
}

type TypeSocketEvent = ISendMessageEvent & IJoinRoomEvent & IGetMessages

const socketInstance: Socket<TypeSocketEvent> = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  withCredentials: true,
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
      toast('Server is broken, please try again!', {
        type: 'error',
      })
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
