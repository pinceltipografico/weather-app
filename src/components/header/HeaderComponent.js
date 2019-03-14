import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import styles from './HeaderComponent.scss';
import PropTypes from 'prop-types';
import { Selects } from '../select/Selects';
import { citiesList } from '../../constants/citieslist';
import { WeatherConsumer } from '../../contexts/weatherContext';


class HeaderComponent extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />  
      <h2 className={styles.title}>{this.props.title}</h2>
      
      <WeatherConsumer>
        { ({ fetchWeathers }) => (
          <Selects onChange={(value) => fetchWeathers(value)}
            label="Select a city"
            list={citiesList}/>
        )}
      </WeatherConsumer>
    </header>
    )
  }
}

export {
  HeaderComponent
}