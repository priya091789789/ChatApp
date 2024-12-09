import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useSocket from "../hooks/useSocket";
import Chat from "../components/Chat";

function RoomPage() {
  const { roomId } = useParams();
  const { auth } = useContext(AuthContext);
  const socket = useSocket(auth.token);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", roomId);

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing", (data) => {
      setIsTyping(data.sender);
    });

    socket.on("stop-typing", () => {
      setIsTyping("");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, roomId]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-y-scroll bg-gray-100 p-4">
        {messages.map((msg, index) => (
          <Chat key={index} sender={msg.sender} message={msg.message} />
        ))}
        {isTyping && <p>{isTyping} is typing...</p>}
      </div>
    </div>
  );
}

export default RoomPage;
