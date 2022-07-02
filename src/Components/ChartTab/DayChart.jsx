import styles from "./Chart.module.css";
import  Chart  from "react-apexcharts";

const DayChart = (props) => {

    const data = {
        options: {
          chart: {
            id: "basic-bar",
            toolbar: {
                show: false
            },
            stroke: {
                curve: 'smooth',
            }
          },
          xaxis: {
            min: 0,
            max: 24,
            tickAmount: 4
          },
          yaxis: {
            show: true,
            min: 10,
            max: 40,
            tickAmount: 2
          }
        },
        
        series: [
          {
            name: "Temp throught the day",
            data: props.hourly
          }
        ]
      }

    return(
        <div className={styles.chartContainer}>
           <div className={styles.temperature}>
               <h2>{props.temp}</h2>
               <img src={props.img} alt="weather icon"/>
           </div>
          
           <Chart
                options={data.options}
                series={data.series}
                type="area"
                width="400"
                height="180"
            />

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