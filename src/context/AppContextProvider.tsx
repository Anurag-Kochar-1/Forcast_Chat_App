import React, { useState, createContext, useEffect } from "react";
import { supabase } from "../setup/supabase/client";

export interface IAppContextType {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails?: Object;
  setUserDetails?: any;
}

const defaultState: IAppContextType = {
  isAuthModalOpen: false,
  setIsAuthModalOpen: () => {},
  userDetails: {},
  setUserDetails: () => {},
};

export const AppContext = createContext(defaultState);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>({});

  const getUserProfile = async () => {
    const data = await supabase.auth.getUser();

    if (data.error === null && data.data.user) {
      // console.log(`Setting userDetails in context`);
      // console.log(data);
      setUserDetails(data.data.user);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session === null) {
        console.log(session);
      } else {
        setUserDetails(session);
      }
    });
  }, []);


  return (
    <AppContext.Provider
      value={{
        isAuthModalOpen,
        setIsAuthModalOpen,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
