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
        <div className=' space-y-3 py-2 bg-blue-900 text-white  w-full lg:real-width px-2' >
            {
                heart()
            }
            {Coin &&
                <div>
                    <div className='text-center'>
                        <img src={Coin.image.large} alt="" className='rounded-full m-auto' />
                        <h1 className='text-5xl  font-Space font-medium'>{Coin.name}</h1>
                        <p>{ReactHtmlParser(Coin.description.en.split(". ")[0])}</p>
                        <p>{Coin.market_cap_rank}</p>
                        <p>
                            <span>Price: {Coin.market_data.current_price[currency.toLowerCase()]}</span> <br />
                            <span>MarketCap: {Coin.market_data.market_cap[currency.toLowerCase()]}</span>
                        </p>
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
                        <div>
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
                                    <button key={index} className='px-3 py-1 m-1 bg-slate-800 rounded-xl' onClick={() => { setdays(data.value) }}>
                                        {data.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default Crypto;