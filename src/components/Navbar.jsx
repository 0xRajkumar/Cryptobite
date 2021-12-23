import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import Image from 'next/image'
function Navbar({ setsidebar, sidebar }) {
    return (
        <nav className="h-16 flex items-center px-4 justify-between  sticky top-0 bg-gray-900">
            {
                sidebar &&
                <div className="h-screen w-screen bg-gray-900 opacity-75 inset-0 fixed lg:hidden" onClick={() => { setsidebar(false) }}></div>
            }
             <Link href='/'><a className="flex flex-row items-center justify-center gap-x-2 h-16 lg:hidden">
                <Image src="/cryptocurrency.png" alt="ok" height={42} width={42} />
                <h1 className="font-semibold  text-2xl">
                    CRYPTOBITE
                </h1>
            </a></Link>
            <GiHamburgerMenu className="text-2xl cursor-pointer lg:hidden" onClick={() => { setsidebar(!sidebar) }} />
        </nav>
    )
}

export default Navbar
