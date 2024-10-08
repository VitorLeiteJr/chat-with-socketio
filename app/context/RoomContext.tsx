
'use client'
import { createContext, useState, ReactNode, useContext } from 'react';


interface RoomContextType {
  room: string;
  setRoom: (room: string) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<string>(''); // Default room name

  return (
    
    <RoomContext.Provider value={{ room, setRoom }}>
      {children} 
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};