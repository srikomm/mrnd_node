const request = require('request');

const Weather = require("../../src/002_js_async/Weather.js");

const getWeatherByCityName = function (cityName,callback) {
    const queryParams = { q:cityName, APPID:'6a56e45751151c2322727cd275197b4e' };

    request({url:"https://api.openweathermap.org/data/2.5/weather", qs:queryParams}, function(err, response, body) {
        callback(err,response,body);
    });
};

describe("Weather module test suite", function() {

    it("Should find temperature of a city by name", function(done) {

        const self = this;
        let expectedTemperature = 0;
        try {
            Weather.findCurrentTemperatureByCityName("Delhi,IN", function(err, temperature) {
                try {
                    expect(err).toBe(null);

                    getWeatherByCityName("Delhi,IN",function(err,response,weather){

                        if(!err){
                            weather = JSON.parse(weather);

                            if(weather && weather["main"] && weather["main"]["temp"]){
                                expectedTemperature = weather.main.temp - 273.15;
                            }
                            else{
                                self.fail(Error("test failed as it was not able to fetch the required temperature data to test"));
                            }
                            expect(temperature).toBe(expectedTemperature);
                        }
                        else{
                            self.fail(Error("test failed as it was not able to fetch the required data to test"));
                        }

                        done();
                    })

                } catch(e) {
                    self.fail(Error("test failed due to "+JSON.stringify(e)));
                }
            });
        } catch(e) {
            self.fail(Error("test failed due to "+JSON.stringify(e)));
            done();
        }
    });

    it("Should return appropriate error for invalid city name", function(done) {

        const self = this;

        try {
            Weather.findCurrentTemperatureByCityName("", function(err, temperature) {
                try {
                    expect(err).not.toBe(null);
                    expect(temperature).toBe(null);
                    expect(err.code).toBe("502");
                } catch(e) {
                    self.fail(Error("test failed due to "+JSON.stringify(e)));
                }
                done();
            });
        } catch(e) {
            self.fail(Error("test failed due to "+JSON.stringify(e)));
            done();
        }
    });

});