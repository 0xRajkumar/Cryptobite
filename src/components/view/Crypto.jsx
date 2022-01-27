import React, { useState, useEffect } from 'react';
import { SingleCoin, HistoricalChart } from "../../config/api"
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser'
import { Line } from "react-chartjs-2";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function Crypto({ id }) {
    const [historicData, sethistoricData] = useState(null);
    const [Coin, setCoin] = useState(null);
    const [days, setdays] = useState(1);
    const [Heart, setHeart] = useState(null);
    const currency = useSelector(state => state.currency.value)
    async function fetchsingleCoin() {
        try {
            const { data: coin } = await (axios.get(SingleCoin(id)))
            setCoin(coin)
            const coins = localStorage.getItem("coins")
            const heart = JSON.parse(coins).filter(data => { if (data == coin.id) { setHeart(true) } })
        } catch (error) {
            console.log(error)
        }
    }

    async function chartData() {
        try {
            const { data } = await (axios.get(HistoricalChart(id, days, currency)))
            sethistoricData(data.prices)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchsingleCoin();
        chartData()
    }, [currency, days]);
    function handleRemove() {
        if (Heart) {
            const coins = JSON.parse(localStorage.getItem("coins"))
            let index = coins.indexOf(Coin.id)
            coins.splice(index, 1)
            localStorage.setItem("coins", JSON.stringify(coins))
            setHeart(false)
        }
    }
    function handleHeart() {
        if (!Heart) {
            const coins = JSON.parse(localStorage.getItem("coins"))
            if (!coins) {
                coins = []
            }
            coins.push(Coin.id)
            localStorage.setItem("coins", JSON.stringify(coins))
            setHeart(true)
        }
    }
    function heart() {
        if (Heart) {
            return (
                <AiFillHeart className='absolute w-10 h-10 right-10' onClick={handleRemove} />
            )
        } else {
            return (
                <AiOutlineHeart className='absolute w-10 h-10 right-10' onClick={handleHeart} />
            )
        }
    }
    return (
        <div className='  py-5 bg-slate-900 text-white  w-full lg:real-width px-4' style={{ minHeight: "calc(100vh - 192px)" }}>
            {
                heart()
            }
            {Coin &&
                <div className='text-center'>
                    <div className=''>
                        <img src={Coin.image.large} alt="crypto_image" className='rounded-full m-auto mb-2' />
                        <h1 className='sm:text-6xl text-4xl font-mono font-bold mb-2'>{Coin.name}</h1>
                        <p className='text-gray-400 mb-2'>{ReactHtmlParser(Coin.description.en.split(". ")[0])}</p>
                        <p className=' sm:text-xl text-base'>Rank: {Coin.market_cap_rank}</p>
                        <p className='mb-2 sm:text-xl text-base'>
                            <span>Price: {Coin.market_data.current_price[currency.toLowerCase()]}</span> <br />  &nbsp;&nbsp;&nbsp;
                            <span>MarketCap: {Coin.market_data.market_cap[currency.toLowerCase()]}</span>
                        </p>
                    </div>
                    {
                        historicData &&

                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                    }
                    <div className='py-4'>
                        {[
                            {
                                label: "24 Hours",
                                value: 1
                            },

                            {
                                label: "30 Days",
                                value: 30
                            },
                            {
                                label: "3 Months",
                                value: 90
                            },
                            {
                                label: "1 Year",
                                value: 365
                            },
                        ].map((data, index) => {
                            return (
                                <button key={index} className='px-3 py-1 m-1 bg-slate-700 hover:bg-slate-800 duration-300 rounded-xl' onClick={() => { setdays(data.value) }}>
                                    {data.label}
                                </button>
                            )
                        })}
                    </div>
                </div>}
        </div>
    );
}

export default Crypto;
