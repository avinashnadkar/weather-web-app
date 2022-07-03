import { useState, useEffect } from "react";
import DayTab from "../Components/DayTabs/DayTab";
import SearchBar from "../Components/Search/SearchBar";
import styles from "./Home.module.css";
import cloudy from "../Assets/Icons/cloudy.png"
import sunny from "../Assets/Icons/sun.png"
import rainy from "../Assets/Icons/rain.png"
import DayChart from "../Components/ChartTab/DayChart";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import cities from "../city.json";
import SearchSuggestions from "../Components/Search/SearchSuggestions";

const Home = () => {

    //state for search baar
    const [searchFeild, setSearchField] = useState("Mumbai, Maharashtra")
    const [location, setLocation] = useState({lat : "0", lon : "0"})
    const [weatherDetails, setWeatherDetails] = useState({main:{feels_like: ""
        ,humidity: ""
        ,pressure: ""
        ,temp: ""
        ,temp_max: ""
        ,temp_min: ""},
        weather : [
           { main : ''}
        ],
        sys : {sunrise:'',sunset:''}
    })
    const [dailyForcast, setDailyForcast] = useState([])
    const [hourlyForcast, setHourlyForcast] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    //handle search
    const handleSearch = (e) => {
        setSearchField(e.target.value)
        setIsSearching(true)
    }

    //handleClick
    const handleClick = (val,lat,lon) => {
        setSearchField(val)
        setIsSearching(false)
        setLocation({lat:lat,lon:lon})
    }

    //get geolocation
    useEffect(()=>{
        axios.get('http://ip-api.com/json')
        .then((res)=>{
            setLocation({lat: res.data.lat, lon : res.data.lon})
            // console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    //convert to date
    const convertDate = (num,output) => {
        let newDate = new Date(num * 1000);
        let day = newDate.getDay()
        let date = newDate.getDate();
        let hours = newDate.getHours();
        let min = newDate.getMinutes();
        let time;
        if(hours >= 13){
            time = `${Math.abs(12 - hours)}.${min}pm`
        }else{
            time = `${hours}.${min}am`
        }
       
        if(output == 'day'){
            return day
        }else if(output == 'date'){
            return date
        }else if(output == 'time'){
            return time
        }
    }

    //wether img 
    const weatherImg = (w) => {
          if(w == 'Rain'){
            return rainy
          }else if(w == 'Sun'){
            return sunny
          }else{
            return cloudy
          }
    }

    //fetch weather details
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then((res)=>{
            let sunsetTime = convertDate(res.data.sys.sunset, 'time')
            let sunriseTime = convertDate(res.data.sys.sunrise,'time')
            
            setWeatherDetails({...res.data,sys:{sunrise:sunriseTime,sunset:sunsetTime}})
            // console.log(sunriseTime,sunsetTime)
        }).catch((err)=>{
            console.log(err)
        })

        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutelyalerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then((res)=>{
            // setWeatherDetails({...weatherDetails,daily:[...res.data.daily]})
            let newArr = res.data.daily
            console.log(res.data, '-----')
            let weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
            for(let i=0;i<newArr.length;i++){
                let day = convertDate(newArr[i].dt,'day')
                let date = convertDate(newArr[i].dt,'date')
                newArr[i].dt = [weekDays[day],date]
            }

            //set hourly forcast
            let hourly = []
            for(let j=0;j<res.data.hourly.length;j++){
                hourly[j] = Math.ceil(res.data.hourly[j].temp)
            }

            setDailyForcast([...newArr])
            setHourlyForcast([...hourly])
        }).catch((err)=>{
            console.log(err)
        })

    },[location])

    return(
        <div className={styles.mobileLayout}>
           <SearchBar searchField={searchFeild} onChange={(e)=>handleSearch(e)} />
           <div className={styles.searchResult} style={{display:isSearching?"block":"none"}}>
           {
            cities.map((el)=>{
                let flag = true
                for(let i=0;i<searchFeild.length;i++){
                if(searchFeild[i] != el.city[i] && i != 0) flag = false
                if(searchFeild[0].toUpperCase() != el.city[0]) flag = false
                }
                if(flag)  return <SearchSuggestions city={el.city} onClick={()=>handleClick(el.city, el.lat, el.lng)} key={uuid()}/>
            })
           }
           </div>

           <div className={styles.weekDays}>
            {
                dailyForcast.map((el)=>{
                    let today = new Date();
                    if(today.getDate() == el.dt[1]){
                        return <DayTab active={true} day={el.dt[0]} temperature={Math.ceil(el.temp.max) + '°' +Math.ceil(el.temp.min) + '°'} img={weatherImg(el.weather[0].main)} weather={el.weather[0].main} key={uuid()}/>
                    }else{
                        return <DayTab active={false} day={el.dt[0]} temperature={Math.ceil(el.temp.max) + '°' +Math.ceil(el.temp.min) + '°'} img={weatherImg(el.weather[0].main)} weather={el.weather[0].main} key={uuid()}/>
                    }

                })
            }
           </div>

           <DayChart temp={Math.ceil(weatherDetails.main.temp) + "° C"} img={weatherImg(weatherDetails.weather[0].main)} pressure={weatherDetails.main.pressure} humidity={weatherDetails.main.humidity} hourly={hourlyForcast} sunriseTime={weatherDetails.sys.sunrise} sunsetTime={weatherDetails.sys.sunset}/>
           
        </div>
    )
}

export default Home;