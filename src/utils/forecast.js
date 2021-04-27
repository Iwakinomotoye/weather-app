const request = require('request');

function forecast(latitude, longitude, callback) {
    let url = `http://api.weatherstack.com/current?access_key=b1f85ee137eca204820c89075ecf7c93&query=${latitude},${longitude}`;

    request({ url , json: true, }, (error, { body } = {}) => {
        if (error) {
            return callback("Unable to connect to the weather service!");
        }
    
        if (body.error) {
            return callback(body.error.info);
        }

        const {weather_descriptions, temperature, feelslike} = body.current;

        callback(undefined, weather_descriptions[0] + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out.");
    })
}


module.exports = forecast;