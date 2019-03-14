import React from 'react';
import PropTypes from 'prop-types';
import styles from './BannerComponent.scss';
import { imagesMap } from '../../constants/imagemap';
import dayjs from 'dayjs';

export const BannerComponent = (props) => {
  const {todayWeather} = props;
  const date = dayjs(todayWeather.dt_text).format('MMMM DD, HH:hh');
  const weather = todayWeather.weather[0];
  const {temp_max, temp_min, temp, humidity} = todayWeather.main;
  const wallPaper = imagesMap[weather.id].wallPaper || props.defaultWallPaper;
  const icon = imagesMap[weather.id].icon;
  
  return (
    <section className={styles.banner}
      style={{
        backgroundImage: `url(${wallPaper})`
      }}>
      <div className={styles['weather-data']}>
        <span className={styles.date}>{props.city} - {date}</span>
        <div className={styles.widget}>
          <div>
            <span>Day {temp_max}&#176; - Night {temp_min}&#176;</span>
            <h1>{temp}<small>&#176;F</small></h1>
            <span>air humidity {humidity}</span>
          </div>

          {/* it would be cool draw some custom icons here */}
          {/* because the provider icon from the api is so small */}
          <div className={styles.icon}>
            <img src={icon} alt="mostly sunny"/>
            <span>{weather.description}</span>
          </div>

        </div>
      </div>
    </section>
  )
}

BannerComponent.defaultProps = {
  defaultWallPaper: imagesMap[801].wallPaper,
  todayWeather: null
};

BannerComponent.propTypes = {
  city: PropTypes.string.isRequired,
  defaultWallPaper: PropTypes.string.isRequired,
  todayWeather: PropTypes.object
};