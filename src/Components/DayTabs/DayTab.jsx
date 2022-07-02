import styles from "./Tab.module.css";

const DayTab = (props) => {
    return(
        <div className={styles.tab} style={{border:props.active ?   "2px solid rgb(80, 169, 221)" : "none"}}>
           <p className={styles.day}>{props.day}</p>
           <p className={styles.temperature}>{props.temperature}</p>
           <img src={props.img} alt="weather-icon" className={styles.weatherIcons}/>
           <p className={styles.dayWeather}>{props.weather}</p>
        </div>
    )
}

export default DayTab