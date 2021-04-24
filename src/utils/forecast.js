const request = require('request')

const forecast = (langtitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8b2cdd3acd345b107c8d25a2bb634e4a&query='+ langtitude +','+ longtitude +'&units=f'
    request({url, json: true},(error, { body }) => {
        if (error){
            callback('unable to connect to weather application', undefined)
        }else if(body.error) {
            callback('unable to find location', undefined)
        }else {
            callback(undefined,body.current.weather_descriptions[0]+'. its is current '+ body.current.temperature+' degree out. there is a '+ body.current.feelslike+ '% chance of rain. humidity is ' + body.current.humidity)
        }            
    })
}

module.exports = forecast