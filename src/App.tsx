import "./App.css";
import { useState, useContext, useEffect } from "react";
import Layout from "./Layout/Layout";
import { supabase } from "./setup/supabase/client";
import AppContextProvider, { AppContext } from "./context/AppContextProvider";
import AppRoutes from "./setup/routes-manager/index";
import { BrowserRouter } from "react-router-dom";
import {
  SessionContextProvider,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./components/Modal/Modal";

function App() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
        {/* <button
          onClick={() => {
            setIsAuthModalOpen(!isAuthModalOpen)
            console.log(isAuthModalOpen)
          }}
          className="w-32 h-10 border-2 border-black m-5"
          >
          Open Modal
        </button>
        
        <Modal>
        <div className="w-72 h-72 bg-white"> {isAuthModalOpen ? "OPEN" : "CLOSE"} </div>
        </Modal>

        
      <h1 className="text-5xl font-bold"> {isAuthModalOpen ? "OPEN" : "CLOSE"} </h1> */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
