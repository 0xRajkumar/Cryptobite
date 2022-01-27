import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Exchanges } from '@/src/config/api'


function Exchange() {
    const show = 10;
    const [Counter, setCounter] = useState(1);
    const [Pagination, setPagination] = useState({
        start: 0, end: show
    });
    const [exchanges, setexchanges] = useState(null);
    const [Name, setName] = useState('');
    async function fetchExchanges() {
        const { data: exchanges } = await axios.get(Exchanges())
        setexchanges(exchanges)
    }
    useEffect(() => {
        const total = show * Counter
        const start = total - show
        const end = total
        setPagination({ start, end })
    }, [Counter]);


    useEffect(() => {
        fetchExchanges()
    }, []);
    return (
        <div className=' space-y-3 py-5 bg-slate-900 text-white  w-full lg:real-width px-4' style={{ minHeight: "calc(100vh - 192px)" }} >
            <h1 className='sm:text-4xl mb-2 md:text-5xl font-bold font-mono text-xl'>Exchanges</h1>
            <div className=''>
                <input type="text" value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='Search with name' className='border-2 mb-4  sticky top-20 text-gray-500 border-slate-900  w-full outline-none rounded-lg px-3 py-2 ' />
                <div className='mb-4 overflow-x-auto' >
                    <table className=' w-full ' style={{ minWidth: "500px" }} >
                        <thead className='bg-blue-500 rounded-full py-4'>
                            <tr>
                                <th className='text-left p-3 '>Coin
                                </th>
                                <th className='text-right p-3'>trust_score_rank
                                </th>
                                <th className='text-right p-3'>trade_volume_24h_btc
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exchanges &&
                                exchanges.slice(Pagination.start, Pagination.end).filter((data) => {
                                    if (Name == "") {
                                        return data
                                    } else {
                                        return data.name.toLowerCase().includes(Name.toLowerCase())
                                    }
                                }).map((data, index) => {
                                    const { name, description, image, url, trust_score_rank, trade_volume_24h_btc } = data
                                    return (
                                        <tr key={index} className=' hover:bg-gray-800 duration-300 '>
                                            <td className=' p-3'>
                                                <a href={url} className='text-left flex gap-x-2'>
                                                    <img src={image} alt="" className='h-12 w-12 rounded-full' />
                                                    <h1 className='text-sm '>
                                                        {name.toUpperCase()}
                                                    </h1>
                                                </a>
                                            </td>
                                            <td className='text-right p-3'>
                                                <a href={url}>
                                                    {trust_score_rank}
                                                </a>
                                            </td>
                                            <td className='text-right p-3'>
                                                <a href={url}>
                                                    {trade_volume_24h_btc}
                                                </a>
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

export default Exchange
