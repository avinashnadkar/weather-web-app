import { useState, useEffect } from "react";
import DayTab from "../Components/DayTabs/DayTab";
import SearchBar from "../Components/Search/SearchBar";
import styles from "./Home.module.css";
import cloudy from "../Assets/Icons/cloudy.png"
import sunny from "../Assets/Icons/sun.png"
import DayChart from "../Components/ChartTab/DayChart";
import axios from "axios";


const Home = () => {

    //state for search baar
    const [searchFeild, setSearchField] = useState("Mumbai, Maharashtra")
    const [location, setLocation] = useState({lat : "", lon : ""})

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

    return(
        <div className={styles.mobileLayout}>
           <SearchBar searchField={searchFeild} onChange={e => setSearchField(e.target.value)} />

           <div className={styles.weekDays}>
              <DayTab day="Fri" temperature="21 18" img={sunny} weather="sunny"/>
              <DayTab day="Sat" temperature="21 29" img={sunny} weather="sunny"/>
              <DayTab day="Sun" temperature="21 23" img={cloudy} weather="cloudy"/>
              <DayTab day="Mon" temperature="21 30" img={cloudy} weather="cloudy"/>
           </div>

           <DayChart temp={"26 C"} img={sunny}/>
           <p>{location.lat}, {location.lon}</p>
        </div>
    )
}

export default Home;