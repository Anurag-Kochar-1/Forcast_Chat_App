import React, {useState, createContext} from 'react'


export interface IAppContextType {
    isAuthModalOpen: boolean
    setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultState: IAppContextType = {
    isAuthModalOpen: false,
    setIsAuthModalOpen: () => {}
} 

export const AppContext = createContext(defaultState)

const AppContextProvider = ( {children}: {children: React.ReactNode} ) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState <boolean> (false)

  return (
    <AppContext.Provider value={{
        isAuthModalOpen,
        setIsAuthModalOpen
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider