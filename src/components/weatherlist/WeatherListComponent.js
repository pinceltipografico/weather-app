import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './WeatherListComponent.scss'
import dayjs from 'dayjs';
import { imagesMap } from '../../constants/imagemap';

const returnFormatedDay = (day, showHour) => {
  return dayjs(day).format(showHour ? 'HH:hh' : 'dddd')
}

const ListItem = (props) => {
  const {item, showHour} = props
  const day = returnFormatedDay(item.dt_txt, showHour)
  const {temp} = item.main
  const weather = item.weather[0]
  const icon = imagesMap[weather.id].icon

  return (
    <React.Fragment>
      <span className={styles.day}>{day}</span>
      <span className={styles.degree}>{temp}&#176;</span>
        {icon &&
          <img src={icon} alt="" className={styles.icon}/>
        }
    </React.Fragment>
  )
}

export class WeatherListComponent extends Component {
  state = {
    selectedDay: null
  }

  componentDidMount () {
    this.setState({
      selectedDay: this.props.list[0]
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      selectedDay: newProps.list[0]
    })
  }

  render () {
    const {selectedDay} = this.state
    return (
      <React.Fragment>
        <ul className={styles.list}>
          {this.props.list.map( (item, index) => {
            const first = item[0]
            const isActive = selectedDay && selectedDay[0].dt === first.dt
            const activeClass = isActive
             ? styles.active
             : ''
            const isSubMenu = isActive ? styles['is-sub-menu'] : '  '

            return (
              <li key={index} className={activeClass}
                onClick={() => this.setState({selectedDay: item})}>
                <ListItem item={first} />

                {isActive &&
                <ul className={`${styles['forecasts-list']} ${isSubMenu}`}>
                  {item.map((subitem, subindex) => (
                    <li key={subindex}>
                      <ListItem item={subitem} showHour={true}></ListItem>
                    </li>
                  ))}
                </ul>
                }

              </li>
            )
          })}
        </ul>

        {selectedDay &&
        <div className={styles.forecasts}>
          <h2>forecasts for: {returnFormatedDay(selectedDay[0].dt_txt)} </h2>
          <ul className={styles['forecasts-list']}>
            {selectedDay.map((item, index) => (
              <li key={index}>
                <ListItem item={item} showHour={true}></ListItem>
              </li>
            ))}
          </ul>
        </div>
        }
      </React.Fragment>
    )
  }
}

WeatherListComponent.propTypes = {
  list: PropTypes.array.isRequired
}