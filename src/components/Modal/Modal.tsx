import React, { MouseEvent, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { useNavigate } from "react-router-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AppContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOverlayClick = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (e.target === containerRef.current && e.target !== modalRef.current) {
        setIsAuthModalOpen(false)
    }
  };

  if (!isAuthModalOpen) return null;
  return (
    <div
      className="z-30 fixed inset-0 w-full h-screen bg-black/[.50] flex justify-center items-center"
      ref={containerRef}
      onClick={(e) => handleOverlayClick(e)}
    >
      <div
        className={`bg-white rounded-md overflow-x-hidden overflow-y-auto`}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
