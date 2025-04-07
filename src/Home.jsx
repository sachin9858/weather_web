import React, { useState } from 'react';
import './Home.css';

function Home() {

    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [data , setData] = useState(null);
    const API_KEY = '9fe9e45832db4e42bf0191100250704';

    const fetchWeather = async () => {
        setLoading(true);
        if(city==''){
            alert("Enter the proper city");
            setLoading(false);
            return;
        }

        try {
            const resource = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`)
            if(resource.status === 200){
                const data = await resource.json();
                setWeatherData(data);
            }
            else{
                alert("Enter correct city name");
            }
            
        } catch (error) {
            console.log(error);
        }
        
        setLoading(false);
    }

    return (
        <div className='wrapper'>
            <div className='container'>
                <h1 className='title'>Weather App</h1>

                <div className='input-section'>
                    <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter city name' className='input'/>
                    <button onClick={fetchWeather} className='button'>{loading?"Loading...":"Check"}</button>
                </div>

                {weatherData && (
                    <div className='card'>
                        <h2 className='city-name'>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
                        <p className='temp'>🌡️ {weatherData.current.temp_c}°C</p>
                        <p>💨 Wind: {weatherData.current.wind_kph} km/h</p>
                        <p>💧 Humidity: {weatherData.current.humidity}%</p>
                        <p>🌥️ Condition: {weatherData.current.condition.text}</p>
                        <p>🌫️ Air Quality AQI: {weatherData.current.air_quality.pm10}</p>
                    </div>
                )}
                {/* {data && (
                    <h2>avalible</h2>
                    // <p>{data}</p>
                )} */}
            </div>
        </div>
    );
}

export default Home;