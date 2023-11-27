import React from 'react'
import { useNavigate } from 'react-router-dom';

type NavLinkProps = {
    text: string,
    url: string,
    onClick?: ()=> void
} 
const NavLink: React.FC<NavLinkProps> = ({text,url}:NavLinkProps) => {
    const navigate = useNavigate();
    const handleClick = (url:string) => {
        if(url == '/'){
            localStorage.removeItem("accessToken");
        }
        navigate(url);
    } 
    return (
<li className="cursor-pointer hover:text-slate-400" onClick={() =>handleClick(url)}>{text}</li>
    );
}

export default NavLink