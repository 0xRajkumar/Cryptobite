import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Exchanges } from '@/src/config/api'


function Exchange() {
    const [exchanges, setexchanges] = useState(null);
    async function fetchExchanges() {
        const { data: exchanges } = await axios.get(Exchanges())
        setexchanges(exchanges)
        console.log(exchanges)
    }
    useEffect(() => {
        fetchExchanges()
    }, []);
    return (
        <div className=' space-y-3 py-2 bg-blue-900 text-white  w-full lg:real-width px-2' >
            <h1 className='text-5xl'>Exchanges</h1>
            <div className=''>
                <div className='px-2'>
                    <table className=' w-full ' >
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
                                exchanges &&
                                exchanges
                                    .map((data, index) => {
                                        const { name, description, image, url } = data
                                        return (
                                            <tr key={index} className=' hover:bg-gray-800 duration-300 '>
                                                <td className='text-left flex gap-x-2 p-2'>
                                                    <img src={image} alt="" className='h-12 w-12 rounded-full' />
                                                    <h1 className=''>
                                                        {name.toUpperCase()}
                                                    </h1>
                                                </td>
                                                <td className='text-right'> {description}
                                                </td>
                                                <td className='text-right'>
                                                </td>
                                                <td className='text-right p-2'>
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
