const request = require('postman-request')

const geocode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1IjoiYW5raXRhMjYwMyIsImEiOiJja2Fhd251b3UxMHF4MnRtdDRpYjU2YXU2In0.93McQYiXTph-60rUlA9u7g'
    debugger
    request({ url, json: true }, (error, data) => {
        if (error) {
            callback(error, {});
        }
        else if (data.body.message == 'Not Found') {
            callback('Location not found', {})
        } else {
            callback(undefined, { long: data.body.features[0].center[0], lat: data.body.features[0].center[1] })
        }
    })
}

module.exports = geocode
