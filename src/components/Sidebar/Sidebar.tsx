import React from "react";

const Sidebar = () => {
  return (
    <aside className="hidden md:inline-flex w-1/4 h-full bg-blue-200">
      <nav className="p-4">
        <ul>
          <li>
            <p>Link 1</p>
          </li>
          <li>
            <p>Link 2</p>
          </li>
          <li>
            <p>Link 3</p>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
