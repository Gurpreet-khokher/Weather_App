import React, { useEffect, useState } from 'react'
import "./Weather.css"
import forest from '../assets/view.jpeg'


const Weather = () => {

    const [data, setData] = useState(null);
    const [coord, setCoord] = useState(null);
    const [city, setCity] = useState("");

    const [lat, setLat] = useState(30.7333);
    const [log, setLog] = useState(76.7794);


    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=013bc85a45c9f1d338c944408df013b0`

    const latlong = `https://api.opencagedata.com/geocode/v1/json?q=${city}&units=metric&key=018c3a66aa804172b84f002684f2ca48`

   

    useEffect(() => {
        fetch(url).
            then(res => res.json()).
            then(data => setData(data)).
            catch((error) => console.log(error))
    }, [url, city])

    useEffect(() => {
        fetch(latlong).
            then(data => data.json()).
            then(data => {
                setCoord(data)
                setLat(data.results[0].geometry.lat)
                setLog(data.results[0].geometry.lng)
            }).
            catch(error => console.log(error))
    }, [city])

    console.log(data);

    console.log(lat, " ", log);


    return (
        <div className='container'>
            {data &&
                <div className="weather">
                    <img src={forest} alt="" />
                    <div className="box">
                        <div className="search-bar">
                            <input type="text" placeholder='Search' value={city} onChange={(e) => setCity(e.target.value)}  />
                            <button onClick={() => search(current.value)}><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                        <p className='temperature'>{(data.main.temp - 273).toFixed("")}°c</p>
                        <p className='location'>{city}</p>
                        {data && <div className="weather-data">
                            <div className="col">
                                <i class="fa-solid fa-droplet"></i>
                                <p>{/*81%*/}{data.main.humidity}%<span> Humidity</span></p>
                            </div>
                            <div className="col">
                                <i class="fa-solid fa-wind"></i>
                                <p>{/*3.6km/h*/} {data.wind.speed}km/h<span>Wind Speed</span></p>

                            </div>
                        </div>}
                    </div>
                </div>
            }
        </div>
    )
}

export default Weather