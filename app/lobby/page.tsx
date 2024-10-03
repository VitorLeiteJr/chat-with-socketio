'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import { io,Socket } from 'socket.io-client';

let socket: Socket;

const Lobby = () => {

    const [room,setRoom] = useState<string>("");
    const [rooms,setRooms] = useState<string[]>([]);

    const createRoom = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const formData  = new FormData(e.currentTarget);
        const roomName = formData.get("nameRoom") as string;
        setRoom(roomName);        

    }

    useEffect(()=>{

        socket= io();

        socket.emit('getRooms');
        socket.on('roomList', (rooms: string[]) => {
        setRooms(rooms);
            //console.log(rooms);
      });

      if(room!=="")socket.emit("joinRoom",room);

    },[room]);


  return (
    <div className=''>
        List of Rooms
        <form onSubmit={createRoom}>
        <input className="border-l-pink-500"name="nameRoom"></input>
        <button className="border-spacing-3 bg-red-300" type='submit'>CREATE ROOM</button>
        </form>
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