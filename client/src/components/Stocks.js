import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Stocks = () => {

    const [stock, setStock] = useState([])

    const getPrice = async () => {
        const data = await axios.get('https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=ea78673d2f874e31bac386e6f08e3eca')
        setStock(data)

    }
    useEffect(() => {
        getPrice()
    }, [])

    console.log(stock)



    return (
        <div>Stocks</div>
    )
}

export default Stocks