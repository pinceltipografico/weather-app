# React Weather App
This app consists in fetch the forecasts weather of diferent cities using the openweather api. To include new cities change the file src/constants/citieslist.js:

```js
export const citiesList = [
  'Vancouver',
  'São Paulo',
  'New York',
  'London',
  'Moscou',
  'Tokyo'
]
```

Access the demo: https://www.frame3.com.br/weather/

## Run in development mode
To run in development mode first install all dependencies:
Using NPM: 
```
npm install && npm run start
```

Using Yarn:
```
yarn && yarn start
```

## To test you app
To run the tests run the command.
```
yarn test
```

## Docker Production Mode
To run the app on docker production, build the image running the commnad: 
```
docker build -t react-weather-app .
```
Then, after the image was built, run the command:
```
docker run -it --rm -p 5000:5000 --name weatherapp react-weather-app
 ```
 After that, access http://localhost:5000 to see the app running in production mode