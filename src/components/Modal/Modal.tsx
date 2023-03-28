import React, { MouseEvent, useContext, useEffect, useRef } from "react";

interface IProps {
  children: React.ReactNode
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ children, isModalOpen, setIsModalOpen }: IProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOverlayClick = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (e.target === containerRef.current && e.target !== modalRef.current) {
      setIsModalOpen(false)
    }
  };

  if (!isModalOpen) return null;
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
