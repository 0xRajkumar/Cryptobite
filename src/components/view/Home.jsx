import React, { useEffect, useState } from 'react'
import { Exchanges, TrendingCoins, CoinList } from '@/src/config/api'
import { useSelector } from 'react-redux';
import axios from 'axios'
import Link from 'next/link'
function Home() {
    const [Coins, setCoins] = useState(null);
    const currency = useSelector(state => state.currency.value)
    const [trendingCoins, settrendingCoins] = useState(null);
    const [exchanges, setexchanges] = useState(null);
    async function fetchExchanges() {
        const { data: exchanges } = await axios.get(Exchanges())
        setexchanges(exchanges)
    }
    async function fetchcoins(currency) {
        try {
            const { data } = await axios.get(CoinList(currency))
            setCoins(data)
            console.log(data)
        } catch (err) {
        }
    }
    async function fetchTrendingCoin() {
        try {
            const { data: trendingCoins } = await axios.get(TrendingCoins(currency))
            settrendingCoins(trendingCoins)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTrendingCoin()
        fetchExchanges();
        fetchcoins(currency)
    }, [currency]);
    return (
        <div className=' bg-gray-900 px-4 w-full lg:real-width py-8 ' style={{ minHeight: "calc(100vh - 192px)" }} >
            {
                exchanges && trendingCoins && Coins ?
                    <>
                        <h1 className='text-xl font-mono sm:text-3xl flex justify-between items-end mb-2'><span>Exchanges</span> <Link href="/exchanges"><a><span className=' underline-offset-2  underline'>More</span> </a></Link></h1>
                        <div className='flex flex-row px-3 py-3 gap-2 rounded-2xl mb-8 bg-blue-900 overflow-x-scroll scrollbar-hide'>
                            {
                                exchanges ? exchanges.slice(0, 10).map((inData, index) => {
                                    const { image, name, description, url } = inData
                                    return (
                                        <a className='p-2 bg-slate-900 flex rounded-xl gap-x-2' href={url} rel="noreferrer" target="_blank" key={index} style={{ minWidth: "200px" }}>
                                            <img src={image} className='rounded-xl' alt="" />
                                            <div className='space-y-1'>
                                                <h1 className='text-xs text-gray-300'>{name}</h1>
                                                <p className='truncate text-white'>{description && description.substring(0, 10) + '...'}</p>
                                            </div>
                                        </a>

                                    )
                                })
                                    : ""
                            }
                        </div>
                        <h1 className='text-xl font-mono sm:text-3xl mb-2'>Trending cryptocurrencies</h1>
                        <div className='flex flex-row px-3 mb-8 py-3 gap-2 rounded-2xl bg-blue-900 overflow-x-scroll scrollbar-hide'>
                            {trendingCoins && trendingCoins.map((data, index) => {
                                const { image, name, id, symbol, current_price, price_change_percentage_24h } = data
                                return (
                                    <Link key={index} href={`/cryptocurrencies/${id}`}>
                                        <a className='flex flex-row gap-x-2 bg-slate-900 rounded-xl p-2 cursor-pointer   items-center' style={{ minWidth: "230px" }}>
                                            <img src={image} alt="" className="rounded-full w-14 h-14" />
                                            <div className=''>
                                                <h1><span className='capitalize'>{symbol.toUpperCase()}</span> {price_change_percentage_24h > 0 ? <span className='text-green-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span> : <span className='text-red-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span>} </h1>
                                                <p className=''>{Math.floor(current_price * 1000000) / 1000000} {currency.toUpperCase()}  </p>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                        <h1 className='text-xl sm:text-3xl mb-2 flex font-mono justify-between items-end'><span>Cryptocurrencies</span> <Link href="/cryptocurrencies"><a><span className=' underline-offset-2 underline'>More</span> </a></Link> </h1>
                        <div className='flex flex-row px-3 mb-8 py-3 gap-2 rounded-2xl bg-blue-900 overflow-x-scroll scrollbar-hide'>
                            {Coins && Coins.slice(0, 20).map((data, index) => {
                                const { image, name, symbol, current_price, price_change_percentage_24h, id } = data
                                return (
                                    <Link key={index} href={`/cryptocurrencies/${id}`}>
                                        <a className='flex  flex-row gap-x-2 cursor-pointer bg-slate-900 rounded-xl p-2   items-center' style={{ minWidth: "230px" }}>
                                            <img src={image} alt="" className="rounded-full w-14 h-14" />
                                            <div className=''>
                                                <h1><span className='capitalize'>{symbol.toUpperCase()}</span> {price_change_percentage_24h > 0 ? <span className='text-green-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span> : <span className='text-red-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span>} </h1>
                                                <p className=''>{Math.floor(current_price * 1000000) / 1000000} {currency.toUpperCase()}  </p>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                    :
                    <>
                        <div className='flex h-full  w-full  justify-center justify-items-center items-center' style={{ minHeight: "calc(100vh - 192px)" }}>
                            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-white '>
                            </div>
                        </div>
                    </>
            }
        </ div >
    )
}

export default Home
