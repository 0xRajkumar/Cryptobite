import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Currencies } from '@/src/config/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrency } from '@/src/redux/slices/currencySlice'
function Navbar({ setsidebar, sidebar }) {
    const dispatch = useDispatch()
    const [AllCurrencies, setAllCurrencies] = useState(null);
    const [currencies, setcurrencies] = useState(null)
    const [dropdown, setdropdown] = useState(false)
    const currency = useSelector(state => state.currency.value)
    async function fetchcurrencies() {
        try {
            const { data: AllCurrencies } = await axios.get(Currencies());
            setAllCurrencies(AllCurrencies)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchcurrencies()
        let initialCurrency = 'inr';
        setcurrencies(initialCurrency)
        dispatch(updateCurrency(initialCurrency))
    }, [])

    return (
        <nav className="h-16 flex items-center px-4 justify-between  sticky top-0 bg-gray-900">
            {
                sidebar &&
                <div className="h-screen w-screen bg-gray-900 opacity-75 inset-0 fixed lg:hidden" onClick={() => { setsidebar(false) }}></div>
            }
            <GiHamburgerMenu className="text-2xl cursor-pointer lg:hidden" onClick={() => { setsidebar(!sidebar) }} />
            <div className="relative ml-auto">
                <div>
                    <button className="border border-gray-300 bg-white flex items-center justify-center w-full rounded-md  px-4 py-1 text-sm font-medium text-gray-700  focus:outline-none " onClick={() => { setdropdown(!dropdown) }}>
                        {currencies && currencies.toUpperCase()}
                    </button>
                </div>
                <div className={`${dropdown ? "block" : "hidden"} py-1 absolute right-0 z-20 mt-1 w-24 rounded-md shadow-lg bg-white`}>
                    <div className=" py-1 rounded-sm flex flex-col text-md text-gray-700   cursor-pointer overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
                        {AllCurrencies &&
                            AllCurrencies.map((name, index) => {
                                return <span key={index} className='hover:bg-gray-300 pl-3' onClick={() => { setcurrencies(name); setdropdown(false); dispatch(updateCurrency(name)) }}>
                                    {name.toUpperCase()}
                                </span>
                            })
                        }
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
