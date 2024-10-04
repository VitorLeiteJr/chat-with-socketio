'use client'
import React, {  useEffect, useState } from 'react'
import io,{ Socket } from 'socket.io-client';

let socket: Socket;

const Lobby: React.FC = () => {

    const [room,setRoom] = useState<string>("");
    const [rooms,setRooms] = useState<string[]>([]);


    useEffect(()=>{
        socket= io();      
        //socket.emit('getRooms');
   
         // Listen for the room list from the server
    socket.on('roomList', (rooms: string[]) => {
      setRooms(rooms);
      console.log(rooms);
    });

    // Request the room list when component loads
    socket.emit('getRooms');


      return () => {
        socket.disconnect();
      };

    },[room]);


    const createRoom = () =>{
     socket.emit("joinRoom",room);
      //setRoom("");

  };


  return (
    <div className=''>
        List of Rooms
       
        <input value={room}onChange={(e)=>setRoom(e.target.value)}className="border-l-pink-500"></input>
        <button onClick={createRoom} className="border-spacing-3 bg-red-300" >CREATE ROOM</button>
        
        <div>
        {rooms.map((list,index)=>(
             
             <div key={index}>{list}
                 <button className='bg-gray-200'>join</button>
             </div>
   
        ))}
             </div>
        
    </div>
  )
}

export default Lobby