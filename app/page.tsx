'use client'
import React from 'react'
import { useClientContext } from './context/ClientContext'
import { useRouter } from 'next/navigation';

const HomePage = () => {

  const {setName}  = useClientContext();
  const router = useRouter();

  const toLobby = () => {
    router.push('/lobby');
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
	<div className="w-96 rounded border bg-white p-2 shadow">		
      fill the input below with your name
		<div className="flex items-center justify-between">
			<input onChange={(e)=>(setName(e.target.value))}type="text" className="mr-4 w-full rounded border bg-gray-100 p-2 focus:border-blue-500 focus:outline-none"/>

			<div className="flex items-center space-x-2">
				<button onClick={toLobby}className="rounded bg-blue-500 px-10 py-2  text-white hover:bg-blue-600">join</button>
			</div>
		</div>
	</div>
</div>
  )
}

export default HomePage