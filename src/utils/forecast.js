const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c956ff4d81580e59ed875c35ca2e06d3&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, data) => {
        if (error) {
            return callback(error);
        }
        if (data) {
            callback(undefined, data.body.current);
        }
    })
}

module.exports = forecast

