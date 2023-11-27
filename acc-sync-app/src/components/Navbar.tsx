import React from "react";
import AdminNavList from "./AdminNavList";
import UserNavList from "./UserNavList";

type NavbarProps = {
  user: string;
};
const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <>
    <div className="w-full justify-center items-center flex flex-col">
      <div className="p-3">{user === "admin" ? <AdminNavList/> : <UserNavList />}</div>
    </div>
      <hr className="h-1 p-1 w-full" />
    </>
  );
};

export default Navbar;
