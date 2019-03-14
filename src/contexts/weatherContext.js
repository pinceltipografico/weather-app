import React from 'react'

const weatherContext = React.createContext({
  fetchWeathers: (city) => {},
  weatherList: [],
  currentCity: 'São Paulo'
})
weatherContext.displayName = 'WeatherContext'

export const WeatherConsumer = weatherContext.Consumer
export const WeatherProvider = weatherContext.Provider