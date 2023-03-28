import {useContext, useState} from "react";
import { AppContext } from "../../context/AppContextProvider";
import Modal from "../Modal/Modal";

const Header = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AppContext)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false)


  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-brand text-white flex items-center justify-between z-10 px-10">
      <h1 className="text-2xl">My App</h1>

      <div className="flex justify-center items-center space-x-3">
        <button onClick={() => setIsSignUpModalOpen(!isSignUpModalOpen)}> Sign Up </button>
        <button onClick={() => setIsSignInModalOpen(!isSignInModalOpen)}> Sign In </button>
      </div>


      <Modal isModalOpen={isSignUpModalOpen} setIsModalOpen={setIsSignUpModalOpen}> <div className="w-32 h-32 bg-white text-black font-bold text-lg">Create Account   </div> </Modal>
      <Modal isModalOpen={isSignInModalOpen} setIsModalOpen={setIsSignInModalOpen}><div className="w-32 h-32 bg-white text-black font-bold text-lg"> Log in your Account </div> </Modal>
    </header>
  );
};

export default Header;
