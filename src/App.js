import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';




function App() {
    const [cityName, setCityName] = useState('')
    const [weather, setWeather] = useState('')
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    
    const apiKeys = '9fe8b43d782660b15864e7148e7c24f6'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKeys}`
 
    const getData = async () =>{
      
      try {
        setLoading(false)
        const response = await axios.get(url)
        setWeather(response.data);
        
      } catch (error) {
        setLoading(false)
        console.log(error);
        setError(error.message)
      }
    }



  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(weather)
    getData()
  } 

  if(loading) return <p className='weather-div'>loading...</p>
  if(error) return <p className='weather-div'>{error}</p>

  return (
    <div className="App">
      <div className='weather-div'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='city name'
            value={cityName}
            onChange={(e) => {setCityName(e.target.value)}}
          ></input>
          <button type='submit'>search</button>
        </form>
         {weather? 
            <div className='data-div'>
                  <h1>{weather.name}</h1>
                  <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='icon'></img>
                  <p>Temparature: {Math.floor(weather.main.temp)} °C</p>
                  <p>Weather Description: {weather.weather[0].description}</p>
                  <p>Wind Speed: {weather.wind.speed}km/h</p>
            </div>
          : <p>loading...</p> }
          
      </div>
    </div>
  );
}

export default App;
