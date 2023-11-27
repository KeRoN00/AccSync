import React from 'react'
import NavLink from './NavLink'


const AdminNavList: React.FC = () => {
    return (
    <nav>
            <ul className="list-none flex gap-5 sticky top-0">
                <NavLink  text="Wyloguj" url="/"/>
                <NavLink  text="Role" url="/roles" />
                <NavLink  text="Uprawnienia" url="/accesses" />
                <NavLink  text="Aplikacje" url="/apps" />
                <NavLink  text="Użytkownicy" url="/users" />
            </ul>
          </nav>
  )
}

export default AdminNavList