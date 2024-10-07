'use client'
import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the shape of your context state
interface WebSocketContextProps {
  socket: Socket | null;
  sendMessage: (message: string) => void;
}

// Create WebSocket context
const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

// WebSocket Provider Component
export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socketInstance = io({ path: '/api/socketio' });
    socketRef.current = socketInstance;
    setSocket(socketInstance);

    // Clean up the socket connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to send messages to the server
  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.emit('message', message);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocketContext
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
