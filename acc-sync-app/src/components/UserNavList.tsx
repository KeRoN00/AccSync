import React from 'react'
import NavLink from './NavLink'


const UserNavList: React.FC = () => {
  return (
    <nav>
            <ul className="list-none flex gap-3 sticky top-0">
                <NavLink text="Wyloguj" url="/"/>
                <NavLink text="User" url="/user-dashboard" />
                <NavLink text="Admin" url="/admin-dashboard" />
            </ul>
          </nav>
  )
}

export default UserNavList