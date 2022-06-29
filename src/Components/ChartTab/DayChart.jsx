import styles from "./Chart.module.css";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DayChart = (props) => {

    const data = {
        label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
              id: 1,
              label: '',
              data: [5, 6, 7, 10, 3],
            }
          ],
    }

    return(
        <div className={styles.chartContainer}>
           <div className={styles.temperature}>
               <h2>{props.temp}</h2>
               <img src={props.img} alt="weather icon"/>
           </div>
          
          <Line data={data} />

           <div className={styles.row}>
               <div className={styles.pressureTab}>
                     <p>Pressure</p>
                     <p>{props.pressure} hpa</p>
               </div>
               <div className={styles.humidityTab}>
                     <p>Humidity</p>
                     <p>{props.humidity} %</p>
               </div>
           </div>

        </div>
    )
}

export default DayChart;