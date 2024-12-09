import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:9000", {
      query: { token },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [token]);

  return socket;
};

export default useSocket;
