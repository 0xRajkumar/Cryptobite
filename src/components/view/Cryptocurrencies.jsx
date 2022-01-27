import React, { useState, useEffect } from 'react'
import { CoinList } from '@/src/config/api'
import { useSelector } from 'react-redux';
import axios from 'axios'
import Link from 'next/link'
function Cryptocurrencies() {
    const show = 10;
    const [Counter, setCounter] = useState(1);
    const [Pagination, setPagination] = useState({
        start: 0, end: show
    });
    const [Name, setName] = useState('');
    const [Coins, setCoins] = useState(null);
    const currency = useSelector(state => state.currency.value)
    async function fetchcoins(currency) {
        try {
            const { data } = await axios.get(CoinList(currency))
            setCoins(data)
        } catch (err) {
        }
    }

    useEffect(() => {
        const total = show * Counter
        const start = total - show
        const end = total
        setPagination({ start, end })
    }, [Counter]);

    useEffect(() => {
        fetchcoins(currency)
    }, [currency]);

    return (
        <div className=' space-y-3 py-5 bg-slate-900 text-white  w-full lg:real-width px-4' >
            <h1 className='sm:text-4xl mb-2 md:text-5xl font-bold font-mono text-xl'>Crypto-Currencies</h1>
            <div className=''>
                <input type="text" value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='Search with name' className='border-2 mb-4  sticky top-20 text-gray-500 border-slate-900  w-full outline-none rounded-lg px-3 py-2 ' />
                <div className='mb-4'>
                    <table className=' w-full ' >
                        <thead className='bg-blue-500  py-4'>
                            <tr className=''>
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
                                Coins &&
                                Coins.slice(Pagination.start, Pagination.end).filter((data) => {
                                    if (Name == "") {
                                        return data
                                    } else {
                                        return data.name.toLowerCase().includes(Name.toLowerCase())
                                    }
                                }).map((data, index) => {
                                    const { name, id, symbol, total_supply, price_change_percentage_24h, image, current_price } = data
                                    return (
                                        <tr key={index} className=' hover:bg-gray-800 duration-300 '>
                                            <td className='p-3'>
                                                <Link href={`/cryptocurrencies/${id}`} ><a className='text-left flex gap-x-2 p-2'>
                                                    <img src={image} alt="" className='h-12 w-12 rounded-full' />
                                                    <div className='flex flex-col'>
                                                        <span> {symbol.toUpperCase()}</span>
                                                        <span className='text-sm'>{name}</span>
                                                    </div>
                                                </a></Link>
                                            </td>
                                            <td className='p-3 text-right'>
                                                <Link href={`/cryptocurrencies/${id}`}><a >
                                                    {current_price ?? "Nothing"} {currency.toUpperCase()}
                                                </a></Link>
                                            </td>
                                            <td className='p-3  text-right'>
                                                <Link href={`/cryptocurrencies/${id}`}><a >
                                                    {price_change_percentage_24h > 0 ? <span className='text-green-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span> : <span className='text-red-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span>}
                                                </a></Link>
                                            </td>
                                            <td className='text-right p-3'>
                                                <Link href={`/cryptocurrencies/${id}`}><a >
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
                <div className='flex justify-between'>
                    <button onClick={() => { if (Counter === 1) { setCounter(10) } else { setCounter(Counter - 1) } }} className='px-4 py-2 bg-cyan-700 m-1 rounded-2xl hover:bg-cyan-600 duration-300 active:translate-y-1 border-2 border-cyan-900 text-white'>Left</button>
                    <button onClick={() => { if (Counter === 10) { setCounter(1) } else { setCounter(Counter + 1) } }} className='px-4 py-2 bg-cyan-700 m-1 rounded-2xl hover:bg-cyan-600 duration-300 active:translate-y-1 border-2 border-cyan-900 text-white'>Rigth</button>
                </div>
            </div>
        </div>
    )
}

export default Cryptocurrencies

