import React, { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface IMenuDropdown {
  children: React.ReactNode;
  icon?: any;
}

const MenuDropdown = ({ children, icon }: IMenuDropdown) => {
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-10 h-10 flex justify-center items-center">
      <div className="relative inline-block text-left">
        {!icon && (
          <BiDotsVerticalRounded
            onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
            className="text-xl text-white hover:cursor-pointer"
          />
        )}

        {icon && (
          <div onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}>
            {icon}
          </div>
        )}

        {isMenuDropdownOpen && (
          <div
            ref={menuRef}
            className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white focus:outline-none "
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDropdown;
