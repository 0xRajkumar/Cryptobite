import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHome, FaNewspaper } from 'react-icons/fa'
import { BsCurrencyBitcoin, BsCurrencyExchange } from 'react-icons/bs'
import { useRouter } from 'next/router'

function Sidebar({ setsidebar, sidebar }) {
    const [activeRoute, setactiveRoute] = useState(null)
    const { pathname } = useRouter();
    useEffect(() => {
        setactiveRoute(pathname)
    }, [pathname])
    return (
        <aside className={`${sidebar ? "left-0" : "-left-96"} z-10 w-64 lg:static fixed bg-gray-900 h-screen  duration-500`}>
            <Link href='/'><a className="flex flex-row items-center justify-center gap-x-2 h-16">
                <Image src="/cryptocurrency.png" alt="ok" height={42} width={42} />
                <h1 className="font-semibold  text-2xl">
                    CRYPTOBITE
                </h1>
            </a></Link>
            <ul className=" flex flex-col gap-y-1">
                <li><Link href='/'><a onClick={() => { setsidebar(false) }} className={`${activeRoute === "/" ? "bg-indigo-700" : ""} flex items-center gap-x-2 pl-6 py-3 text-xl`} ><FaHome /> Home</a></Link></li>
                <li><Link href='/cryptocurrencies'><a onClick={() => { setsidebar(false) }} className={`${activeRoute === "/cryptocurrencies" ? "bg-indigo-700" : ""} flex items-center gap-x-2 pl-6 py-3 text-xl`}  ><BsCurrencyBitcoin /> Cryptocurrencies</a></Link></li>
                <li><Link href='/exchanges'><a onClick={() => { setsidebar(false) }} className={`${activeRoute === "/exchanges" ? "bg-indigo-700" : ""} flex items-center gap-x-2 pl-6 py-3 text-xl`}  ><BsCurrencyExchange /> Exchanges</a></Link></li>
                <li><Link href='/watchlist'><a onClick={() => { setsidebar(false) }} className={`${activeRoute === "/watchlist" ? "bg-indigo-700" : ""} flex items-center gap-x-2 pl-6 py-3 text-xl`}  ><FaNewspaper /> WatchList</a></Link></li>
            </ul>
        </aside>
    )
}

export default Sidebar
