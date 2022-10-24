/**

 Refer the following link to understand how async works

 http://exploringjs.com/es6/ch_async.html

 For the purpose of this tutorial we have used the open weather API

 https://openweathermap.org/api

 To use the API, You need to have a appID

 Create an account at http://home.openweathermap.org/users/sign_in and refer to the API keys tab for your appID

 Try various cases with the API to see its behaviour

 */

/**
 Utility function used to find the weather of a city by name.

 cityName is given as an input.

 appID is the corresponding API Key

 Returns the JSON of weather data in the callback in error first way.
 */
const getWeatherByCityName = function (cityName, appID, callback) {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const req = new XMLHttpRequest();
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + appID;
    req.open('GET', url, false);
    req.send(null);

    if(req.status === 200) {
        const res = JSON.parse(req.responseText);
        return callback(null, res);
    }
    else{
        const err = {};
        err.code = 502;
        return callback(err);
    }
};

/**
 Function used to find current temperature of a city in Celsius.

 Use getWeatherByCityName to fetch the weather details of a particular city

 cityName is given as an input.

 Return the temperature of a city in celsius in the callback in error first way.

 Handle the error scenarios appropriately and map the error message in response body to the error object
 */
exports.findCurrentTemperatureByCityName = function (cityName, callback) {
    if(cityName === ""){
        const err = {};
        err.code = '502';
        return callback(err, null);
    }
    getWeatherByCityName(cityName, '68410394bc6d84cbbac16d4419cf93a7', function(err, data){
        if(err){
            return callback(err);
        }
        //data = JSON.parse(data);//This must be uncommented if we use request method!
        if(data && data["main"] && data["main"]["temp"] !== undefined){
            const result = data.main.temp - 273.15;
            return callback(null, result);
        }
    });
};
