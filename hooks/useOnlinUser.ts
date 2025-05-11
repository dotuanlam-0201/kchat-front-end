import { useQueryOnlineUsers } from '@/lib/actions/user.query';
import { useEffect, useState } from 'react';
import { useSocket } from './useSocket'; // Import your useSocket hook

export const useOnlineUsers = () => {
  const { socket } = useSocket();
  const { data: { data } } = useQueryOnlineUsers()
  const [onlineUsers, setOnlineUsers] = useState<string[]>(data);

  useEffect(() => {
    const handleOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };
    socket.on('onlineUsers', handleOnlineUsers);
    return () => {
      socket.off('onlineUsers', handleOnlineUsers);
    };
  }, [socket]); // Include socket in dependencies

  return { onlineUsers };
};