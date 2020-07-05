var request=require('request');

//callback function
var Forecast=(latitude,longitude,callback)=>{
    var URL='http://api.weatherstack.com/current?access_key=8f35c144b12694ec497948efd9f7229f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';
    request({url: URL, json: true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined);
        }else if(response.body.success==false){
            callback('Check The Co-ordinates!',undefined);
        }else{
            callback(undefined,'The weather is '+response.body.current.weather_descriptions+'. It is currently '+response.body.current.temperature+' degrees out.   It feels like '+response.body.current.feelslike+' degrees out.  The humidity is '+response.body.current.humidity+' grams per cubic meter and the wind speed is '+response.body.current.wind_speed+' meters per second');
        }
    })
}

module.exports=Forecast;


//normal function: 
// var URL='http://api.weatherstack.com/current?access_key=8f35c144b12694ec497948efd9f7229f&query=37.8267,-122.4233&units=s';
// //units= s for scientific (kelvin),f for Fahrenheit and m for metric(celsius) 
// request({url: URL, json: true},(error,response)=>{
// //    console.log(response.body.current);
//     if(error){
//         console.log('Unable to connect to weather service!');
//     }
//     else if(response.body.success==false){
//         console.log('Unable to find location');
//     }
//     else{
//         console.log(response.body.current.weather_descriptions+' It is currently '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out.');
//     }
// });