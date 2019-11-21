const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2d7e69fc61cc43374cf78266bb56bf9b/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.  There is a '
            + body.currently.precipProbability + '% chance of rain.')
        }
    }) 

}

module.exports = forecast