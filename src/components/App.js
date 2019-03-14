import React, { Component } from 'react';
import { HeaderComponent } from './header/HeaderComponent';
import PropTypes from 'prop-types';
import styles from './App.scss';
import { BannerComponent } from './banner/BannerComponent';
import { WeatherListComponent } from './weatherlist/WeatherListComponent';
import { WeatherProvider } from '../contexts/weatherContext';
import { weatherApi } from '../constants/weatherapi';
import dayjs from 'dayjs';


class App extends Component {

  static propTypes = {
    apiKey: PropTypes.string.isRequired
  };

  state = {
    weatherList: [],
    currentCity: 'Vancouver',
    todayWeather: null,
    fetching: true
  };

  async componentDidMount () {
    await this.fetchWeathers('Vancouver');
  }

  /**
   * GROUP LIST BY DAY
   * TO SHOW MORE CONCISE ITEMS
   */
  formmatResults = (results) => {
    if(!results) {
      return
    }
    const {list} = results;
    const result = []
    const weatherList = list.reduce((previews, next) => {
      if(!previews.length) {
        return result
      }
      const day = dayjs(next.dt_txt).$D
      const group = previews.filter(i => dayjs(i.dt_txt).$D === day)
      if(group.length) {
        result.push(group)
      }
      return previews.filter(i => dayjs(i.dt_txt).$D !== day)
    }, list );

    this.setState({
      weatherList,
      todayWeather: weatherList[0][0],
      fetching: false
    })
  }

  /**
   * FETCH FROM API
   */
  fetchWeathers = async (city = 'London') => {
    const {endpoint, key} = weatherApi;
    const toGet = `${endpoint}?q=${city}&appid=${key}&units=imperial`;

    try {
      const response = await fetch(toGet,{
        method: 'GET'
      });
      const jsonResult = await response.json()
      return this.formmatResults(jsonResult);
    } catch (error) {
      this.setState({error});
    }
  }

  render () {

    const provider = {
      ...this.state,
      fetchWeathers: this.fetchWeathers.bind(this)
    };

    const {weatherList, fetching} = this.state

    return (
      <WeatherProvider value={provider}>

        <HeaderComponent title="Weather App" />

        {fetching &&
        <div style={{color: "#28a9b6", margin: '120px auto'}}>
            loading forecasts...
        </div>
        }

        {(!fetching && weatherList.length) &&
        <React.Fragment>

          <BannerComponent city={this.state.currentCity}
            todayWeather={this.state.todayWeather} />

          <section className={styles['weather-view']}>
            <WeatherListComponent list={this.state.weatherList}/>
          </section>
          
        </React.Fragment>
        }

      </WeatherProvider>
    )
  }
}

export default App
