import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
function Navbar({ setsidebar, sidebar }) {
    return (
        <nav className="h-16 flex items-center px-4 justify-end  sticky top-0 bg-zinc-900">
            {
                sidebar &&
                <div className="h-screen w-screen bg-gray-900 opacity-75 inset-0 fixed lg:hidden" onClick={() => { setsidebar(false) }}></div>
            }
            <GiHamburgerMenu className="text-2xl cursor-pointer" onClick={() => { setsidebar(!sidebar) }} />
        </nav>
    )
}

export default Navbar
