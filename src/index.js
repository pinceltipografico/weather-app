import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { weatherApi } from './constants/weatherapi';

const render = () => ReactDOM.render(
  <App apiKey={weatherApi.key} />,
  document.getElementById( 'root' )
)
render()
registerServiceWorker()

if ( module.hot && process.env.NODE_ENV==='development' ) {  
  module.hot.accept()
  render()
}