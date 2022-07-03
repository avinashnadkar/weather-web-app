import Chart from 'react-apexcharts';
import styles from './SunriseChart.module.css';

const SunRiseAndSetChart = ({sunriseTime,sunsetTime},props) => {

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
        categoreis : ['6am','1pm','6pm']
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
        data: [10,40,10]
      }
    ]
  }
     
    return(
      <div>
        <div className={styles.sunriseAndSunsetTab}>
          <div>
            <p>Sunrise</p>
            <p>{sunriseTime}</p>
          </div>
          <div>
            <p>Sunset</p>
            <p>{sunsetTime}</p>
          </div>
        </div>

        <Chart
          options={data.options}
          series={data.series}
          type="area"
          width="400"
          height="100"
        />
        
        </div>
    )
}

export default  SunRiseAndSetChart;