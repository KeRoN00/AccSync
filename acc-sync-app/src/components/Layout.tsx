import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
    children: React.ReactNode
    user?: string
}

const Layout: React.FC<LayoutProps> = ({children, user}) => {
  return (
    <main className=" bg-zinc-700 min-h-screen mx-auto max-w-5xl flex flex-col items-center justify-center">
    {user && <Navbar user={user}/>}
    <div className=" flex flex-1 flex-col w-full">
    {children}
    </div>
    <Footer/>
    </main>
  )
}

export default Layout