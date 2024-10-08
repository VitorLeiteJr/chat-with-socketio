'use client'
import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useRoom } from "../context/RoomContext";
import { useRouter } from "next/navigation";
import { useClientContext } from "../context/ClientContext";
let socket: Socket;

const Chat: React.FC = () => {
  
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const {room} = useRoom();
  const {name} = useClientContext();
  const router = useRouter();

  useEffect(() => {
    // Connect to the WebSocket server
    if(room==='') router.push('/lobby')
     socket= io();

      socket.emit("joinRoom",room);
    // Listen for incoming messages, and get the message and set in array of messages
    socket.on("message", (newMessage: string) => {
      //console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    
    if (message.trim() === "") return;    
    const msg = name+": "+message;
    setMessages((prevMessages) => [...prevMessages, msg]);
    socket.emit("sendMessageToRoom", {room,msg});
    setMessage("");
   };


   const leaveRoom = ()=>{
    router.push('/lobby')
   }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Real Time Chat</h2> 
        <h2 className=" font-bold mb-4">Room name: {room}</h2>
        <div className="h-64 overflow-y-auto bg-white p-2 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-blue-100 rounded mb-2">
              {msg}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="w-full p-2 border rounded mb-2"
        required/>
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white p-2 rounded"
        > send msg here
        </button>
        <div className="py-2">
        <button
          onClick={leaveRoom}
          className="w-full bg-blue-500 text-white p-2 rounded"
        > leave room
        </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;