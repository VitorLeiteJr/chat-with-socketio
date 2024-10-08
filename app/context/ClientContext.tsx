'use client'

import { ReactNode, useContext, useState,createContext } from 'react'

interface ClientContextType {
    name: string,
    setName: (name: string) => void
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

    export const ClientProvider = ({children}: {children: ReactNode})=>{

        const [name, setName] = useState<string>('');

        return (
            <ClientContext.Provider value={{name, setName}}>
                {children}
            </ClientContext.Provider>
        );
    };

    export const useClientContext = () =>{
        const context = useContext(ClientContext);
        if(context === undefined){
            throw new Error('useClient must be used within a ClientProvider')
        } 
        return context;

    };

