import React from 'react'
import { useQuery } from 'react-query'
import { Exchnages } from '@/src/config/api'
import axios from 'axios'
function Home() {
    const getExchanges = async () => await axios.get(Exchnages());
    const { data: exchanges } = useQuery('exchanges', () => getExchanges())
    console.log(exchanges ? exchanges.data : "NOT")
    return (
        <div className="bg-orange-500 text-white items-center justify-center flex" >
            <div className=' space-y-4 bg-gray-900 p-2 w-full lg:real-width ' >
                <h1 className='text-4xl flex justify-between'><span>Exchanges</span> <span>MORE!</span> </h1>
                <div className='flex flex-row px-3 py-3 gap-2 rounded-2xl bg-gray-600 overflow-x-scroll scrollbar-hide'>
                    {
                        exchanges && exchanges.data.map((inData, index) => {
                            const { image, name, description, url } = inData
                            return (
                                <a className='p-2 bg-slate-800 flex rounded-xl gap-x-2' href={url} rel="noreferrer" target="_blank" key={index} style={{ minWidth: "200px" }}>
                                    <img src={image} className='rounded-xl' alt="" />
                                    <div className='space-y-1'>
                                        <h1 className='text-xs text-gray-300'>{name}</h1>
                                        <p className='truncate text-white'>{description && description.substring(0, 10) + '...'}</p>
                                    </div>
                                </a>

                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Home
