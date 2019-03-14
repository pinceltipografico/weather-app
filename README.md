# React Weather App
Access Link: https://www.frame3.com.br/weather/

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