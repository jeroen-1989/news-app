import React, {useState, useEffect} from "react"
import axios from "axios"
import styles from "./Weather.module.css"
import WeatherIcons from "./WeatherIcons"

function Weather() {
    const [weatherData, setWeatherData] = useState(null)


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=Schijndel,nl&units=metric&&APPID=0e36665434960c9dffd4e7e69ffda27c&lang=nl")
                setWeatherData(result.data)
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, [])
    console.log(weatherData)

    return (
        <>
            {weatherData &&
            <div className={styles.container}>
                <p className={styles.left}>Het weer in Schijndel: </p>
                <svg className={styles.icons}>{WeatherIcons(weatherData.weather[0].main)}</svg>
                <p className={styles.right}>{Math.round(weatherData.main.temp)} °C • Luchtvochtigheid: {weatherData.main.humidity}%</p>
                <div className={styles.rest}/>
            </div>}
        </>

    )
}

export default Weather;