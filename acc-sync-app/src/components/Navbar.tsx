import React from "react";
import AdminNavList from "./AdminNavList";

type NavbarProps = {
  user: string;
};
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
    <div className="w-full justify-center items-center flex flex-col">
      <div className="p-3"><AdminNavList/></div>
    </div>
      <hr className="h-1 p-1 w-full" />
    </>
  );
};

export default Navbar;
