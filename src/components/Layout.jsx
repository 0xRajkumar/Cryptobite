import React from 'react'
import Head from 'next/head'

function Layout({ children }) {
    return (
        <main>
            <Head>
                <title>Cryptobite</title>
                <meta name="description" content="Cryptobite" />
                <link rel="icon" href="/cryptocurrency.png" />
            </Head>
            {children}
        </main>
    )
}

export default Layout
