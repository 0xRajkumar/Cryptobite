import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Sidebar, Navbar, Footer } from '@/src/components'
import { useRouter } from 'next/router'

function Layout({ children }) {
    const [sidebar, setsidebar] = useState(false)
    const [mounted, setMounted] = useState(false);

    const { pathname } = useRouter();
    useEffect(() => {
        setMounted(true)
        const scroolTOP = document.getElementById('scroolTOP')
        if (scroolTOP) {
            scroolTOP.scrollTop = 0;
        }
    }, [pathname])
    if (!mounted) return (
        <div className='flex justify-center items-center mr-6 h-screen w-screen bg-indigo-900'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-white'>
            </div>
        </div>
    );
    return (
        <main>
            <Head>
                <title>Cryptobite</title>
                <meta name="description" content="Cryptobite" />
                <link rel="icon" href="/cryptocurrency.png" />
            </Head>
            <div className="flex flex-row overflow-y-hidden h-screen bg-gray-900 text-white font-Roboto">
                <Sidebar setsidebar={set => setsidebar(set)} sidebar={sidebar} />
                <div className="flex-1 overflow-y-auto" id="scroolTOP">
                    <Navbar setsidebar={set => setsidebar(set)} sidebar={sidebar} />
                    {children}
                    <Footer />
                </div>
            </div>
        </main>
    )
}

export default Layout
