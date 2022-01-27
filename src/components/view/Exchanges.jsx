import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Exchanges } from '@/src/config/api'


function Exchange() {
    const [exchanges, setexchanges] = useState(null);
    const [Name, setName] = useState('');
    async function fetchExchanges() {
        const { data: exchanges } = await axios.get(Exchanges())
        setexchanges(exchanges)
    }
    useEffect(() => {
        fetchExchanges()
    }, []);
    return (
        <div className=' space-y-3 py-2 bg-blue-900 text-white  w-full lg:real-width px-2' >
            <h1 className='sm:text-4xl mb-2 md:text-5xl font-bold font-mono text-xl'>Crypto-Currencies</h1>
            <div className=''>
                <input type="text" value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='Search with name' className='border-2 mb-4  sticky top-20 text-gray-500 border-slate-900  w-full outline-none rounded-lg px-3 py-2 ' />
                <div className='px-2'>
                    <table className=' w-full ' >
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
                                exchanges.filter((data) => {
                                    if (Name == "") {
                                        return data
                                    } else {
                                        return data.name.toLowerCase().includes(Name.toLowerCase())
                                    }
                                }).map((data, index) => {
                                    const { name, description, image, url, trust_score_rank, trade_volume_24h_btc } = data
                                    return (
                                        <tr key={index} className=' hover:bg-gray-800 duration-300 '>
                                            <td className='text-left flex gap-x-2 p-2'>
                                                <img src={image} alt="" className='h-12 w-12 rounded-full' />
                                                <h1 className=''>
                                                    {name.toUpperCase()}
                                                </h1>
                                            </td>
                                            <td className='text-right'> {trust_score_rank}
                                            </td>
                                            <td className='text-right'>{trade_volume_24h_btc}
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Exchange
