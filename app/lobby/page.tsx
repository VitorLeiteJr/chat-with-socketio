'use client'
import React, {  FormEvent, useEffect, useState } from 'react'
import io,{ Socket } from 'socket.io-client';
import ModalComp from '../components/modal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useRoom } from '../context/RoomContext';

  let socket: Socket;

const Lobby: React.FC = () => {

    const [rooms,setRooms] = useState<string[]>([]);
    const [isOpenModal,setIsOpenModal]  = useState<boolean>(false);
    const {setRoom} = useRoom();
    const router = useRouter();


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

        socket.on('userDisconnected', (userId: string)=>{
          toast.error("User disconnected: "+userId);
        });

      return () => {
         socket.disconnect();
      };

    },[]);


    const createRoom = (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const nameRoom = formData.get("roomName") as string;
      setRoom(nameRoom);
      router.push('/chat');
  };

    const handleModalClose = () => {
      setIsOpenModal(false);
    };
    const handleJoinRoom = (nameRoom: string) => {
      if(socket)

      socket.emit("joinRoom", nameRoom);
      setRoom(nameRoom);
      router.push("/chat");
      
    }

  return (
      <div>
       
        <div className="min-h-screen flex-1 bg-gray-200 p-4 flex justify-center items-center">
        {isOpenModal ? (
          <ModalComp
          handleCreateRoom={createRoom}
          handleModalClose={handleModalClose}
          />
        ) : <></>}
          
              <div className="bg-white w-full md:max-w-4xl rounded-lg shadow">
              <div className="h-12 flex justify-between items-center border-b border-gray-200 m-4">
                <div >
                <div className="text-xl font-bold text-gray-700">Lobby</div>
                <div className="text-sm font-base text-gray-500">List of rooms</div>
                </div>
              </div>
              <div className="px-6">

                {rooms.map((rooms,index)=>(
                       <div key={index} className="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                       <div className="flex items-center">
                         <img className="rounded-full h-12 w-12" src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png" alt="Logo" />
                       <div className="ml-2">
                         <div className="text-sm font-semibold text-gray-600">{rooms}</div>
                         <div className="text-sm font-light text-gray-500">Level 6 - Warlock</div>
                       </div>
                       </div>
                       <div className='flex space-x-2'>
                         
                        <button onClick={()=>handleJoinRoom(rooms)}className= "bg-green-400 hover:bg-green-500 p-2 rounded-full shadow-md flex justify-center items-center">
                            <p>JOIN</p>
                         </button>
                       </div>
                     </div>
                ))}                

                <div className="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded-lg  shadow-inner">
                  <div className="flex items-center border border-gray-400 p-2 border-dashed rounded cursor-pointer">
                  <div>
                    <svg className="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  </div>
                    <div onClick={()=>setIsOpenModal(true)}className="ml-1 text-gray-500 font-medium">Create a room</div>
                  </div>
                </div>
              </div>
              </div>
    </div></div>

  )
}

export default Lobby

