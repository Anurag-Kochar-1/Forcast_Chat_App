import React, { useContext } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { AppContext } from "../../context/AppContextProvider";

interface IProps {
  // isHamBurgerMenuVisible: boolean
  // setIsHamBurgerMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode;
}

const HamBurgerMenu = ({ children }: IProps) => {
  const { isHamBurgerMenuVisible, setIsHamBurgerMenuVisible } =
    useContext(AppContext);
  return (
    <div
      className={`z-40 fixed top-0 left-0 h-full w-[100%] bg-white flex flex-col items-start justify-between ${
        isHamBurgerMenuVisible ? "translate-x-0" : "translate-x-full"
      } ease-in-out duration-500`}
    >
      <div className="w-full h-20 flex flex-col justify-center items-center px-4 py-4 bg-brand">
        <div className="w-full flex justify-start items-center space-x-2">
          {!isHamBurgerMenuVisible ? (
            <div className="flex justify-center items-center w-10 h-10 bg-Darkest rounded-full ">
              <RxHamburgerMenu
                className="w-6 h-6 text-white  hover:cursor-pointer"
                onClick={() =>
                  setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)
                }
              />
            </div>
          ) : (
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-Darkest">
              <RxCross1
                className="w-6 h-6 text-white  hover:cursor-pointer"
                onClick={() =>
                  setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)
                }
              />
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default HamBurgerMenu;
