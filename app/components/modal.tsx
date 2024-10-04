import React, { FormEvent } from 'react'

interface modal {
    handleCreateRoom: (e: FormEvent<HTMLFormElement>) => void,
    handleModalClose: ()=> void
}

const ModalComp = ({handleCreateRoom,handleModalClose}: modal) => {
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">type the nome room on the input</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <form onSubmit={handleCreateRoom}>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            
            <div className="flex flex-col">
              <label className="leading-loose">Room name</label>
              <input name="roomName"type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="room name"/>
            </div>
           
            <div className="flex items-center space-x-4">                          
            </div>
           
          </div>
          <div className="pt-4 flex items-center space-x-4">
              <button onClick={handleModalClose} className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
              </button>
              <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ModalComp