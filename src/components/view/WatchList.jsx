import React, { useState, useEffect } from 'react'
import Link from "next/link";
import axios from 'axios';
import { CoinList } from '../../config/api';
import { useSelector } from 'react-redux';

function WatchList() {
    const currency = useSelector(state => state.currency.value)
    const [wishitem, setwishitem] = useState(null);

    useEffect(() => {
        const coins = localStorage.getItem("coins")
        axios.get(CoinList(currency)).then(({ data }) => {
            const wishlist = data.filter(data => coins.includes(data.id))
            setwishitem(wishlist)
        })
    }, []);

    return (
        <div div className='  py-5 px-4 bg-slate-900 text-white  w-full lg:real-width ' style={{ minHeight: "calc(100vh - 192px)" }
        }>
            <h1 className='sm:text-4xl mb-2 md:text-5xl font-bold font-mono text-xl'>Watchlist</h1>
            <div className='mb-4 overflow-x-auto' >
                <table className=' w-full ' style={{ minWidth: "500px" }} >
                    <thead className='bg-blue-500 rounded-full py-4'>
                        <tr>
                            <th className='text-left p-3 '>Coin
                            </th>
                            <th className='text-right p-3'>Price
                            </th>
                            <th className='text-right p-3'> 24h Change
                            </th>
                            <th className='text-right p-3'> Market Cap
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishitem &&
                            wishitem.map((data, index) => {
                                const { name, id, symbol, total_supply, price_change_percentage_24h, image, current_price } = data
                                return (
                                    <tr key={index} className=' hover:bg-gray-800 duration-300 '>
                                        <td className=''>
                                            <Link href={`/cryptocurrencies/${id}`} ><a className='text-left flex gap-x-2 p-2'>
                                                <img src={image} alt="" className='h-12 w-12 rounded-full' />
                                                <div className='flex flex-col'>
                                                    <span> {symbol.toUpperCase()}</span>
                                                    <span className='text-sm'>{name}</span>
                                                </div>
                                            </a></Link>
                                        </td>
                                        <td className='text-right'> <Link href={`/cryptocurrencies/${id}`}><a >
                                            {current_price ?? "Nothing"} {currency.toUpperCase()}
                                        </a></Link>
                                        </td>
                                        <td className='text-right'>      <Link href={`/cryptocurrencies/${id}`}><a >
                                            {price_change_percentage_24h > 0 ? <span className='text-green-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span> : <span className='text-red-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span>}
                                        </a></Link>
                                        </td>
                                        <td className='text-right p-2'>  <Link href={`/cryptocurrencies/${id}`}><a >
                                            {total_supply ?? "Don't know"}
                                        </a></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default WatchList
