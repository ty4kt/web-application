// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')
// Handle our routes
router.get('/',function(req, res, next){
    res.render('login.ejs')
})

router.get('/index',function(req, res, next){
    res.render('index.ejs')
})

router.get('/about',function(req, res, next){
    res.render('about.ejs')
})

router.get('/weather', function(req, res, next) {
    res.render('weather.ejs');
});

router.get('/city_weather', function(req, res, next) {
  let apiKey = 'efe9ce8321b74a217c902e42eae9b158';
  let city = req.query.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function(err, response, body) {
      if (err) {
          return next(err);
      }

      var weather = JSON.parse(body);
      if (weather.cod === 200) {
          var wmsg = `
              <link rel="stylesheet"  type="text/css" href="/main.css" />
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px auto;
               max-width: 600px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h1>Weather in ${weather.name}</h1>
                  <p>Temperature: ${weather.main.temp}°C</p>
                  <p>Humidity: ${weather.main.humidity}%</p>
                  <p>Weather: ${weather.weather[0].description}</p>
                  <div style="text-align: center;">
                      <button type="submit"><a href="/weather">Check another city</a></button>
                  </div>
              </div>
          `;
          res.send(wmsg);
      } else {
          res.send(`<p>City not found. Please try again. <a href="/weather">Go back</a></p>`);
      }
  });
});
// Export the router object so index.js can access it
module.exports = router