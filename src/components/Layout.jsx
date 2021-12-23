import React, { useState } from 'react'
import Head from 'next/head'
import { Sidebar, Navbar, Footer } from '@/src/components'
function Layout({ children }) {
    const [sidebar, setsidebar] = useState(false)
    return (
        <main>
            <Head>
                <title>Cryptobite</title>
                <meta name="description" content="Cryptobite" />
                <link rel="icon" href="/cryptocurrency.png" />
            </Head>
            <div className="flex flex-row overflow-y-hidden h-screen bg-gray-900 text-white font-Roboto">
                <Sidebar setsidebar={set => setsidebar(set)} sidebar={sidebar} />
                <div className="flex-1 overflow-y-auto">
                    <Navbar setsidebar={set => setsidebar(set)} sidebar={sidebar}/>
                    {children}
                    <Footer />
                </div>
            </div>
        </main>
    )
}

export default Layout
