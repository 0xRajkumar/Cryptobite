import React, { useState, useEffect } from 'react'
import { CoinList } from '@/src/config/api'
import { useSelector } from 'react-redux';

import axios from 'axios'
function Cryptocurrencies() {
    const [Name, setName] = useState('');
    const [Coins, setCoins] = useState(null);
    const currency = useSelector(state => state.currency.value)
    async function fetchcoins(currency) {
        try {
            const { data } = await axios.get(CoinList(currency))
            setCoins(data)
            console.log(data)
        } catch (err) {
        }
    }
    useEffect(() => {
        fetchcoins(currency)
    }, [currency]);

    return (
        <div className=' space-y-3 py-2 bg-blue-900 text-white  w-full lg:real-width px-2' >
            <h1 className='sm:text-4xl text-xl'>CryptoCurrency</h1>
            <input type="text" value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='Search with name' className='border-2 sticky top-20 text-gray-500 border-blue-800  w-full outline-none rounded-lg px-2 py-1 ' />
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
                            Coins &&
                            Coins.filter((data) => {
                                if (Name == "") {
                                    return data
                                } else {
                                    return data.name.toLowerCase().includes(Name.toLowerCase())
                                }
                            })
                                .map((data, index) => {
                                    const { name, symbol, total_supply, price_change_percentage_24h, image, current_price } = data
                                    return (
                                        <tr key={index} className=' hover:bg-gray-800 duration-300 '>
                                            <td className='text-left flex gap-x-2 p-2'>
                                                <img src={image} alt="" className='h-12 w-12 rounded-full' />
                                                <div className='flex flex-col'>
                                                    <span> {symbol.toUpperCase()}</span>
                                                    <span className='text-sm'>{name}</span>
                                                </div>
                                            </td>
                                            <td className='text-right'> {current_price ?? "Nothing"} {currency.toUpperCase()}
                                            </td>
                                            <td className='text-right'> {price_change_percentage_24h > 0 ? <span className='text-green-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span> : <span className='text-red-500'>{Math.floor(price_change_percentage_24h * 1000) / 1000} %</span>}
                                            </td>
                                            <td className='text-right p-2'> {total_supply ?? "Don't know"}
                                            </td>
                                        </tr>
                                    )
                                })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cryptocurrencies

