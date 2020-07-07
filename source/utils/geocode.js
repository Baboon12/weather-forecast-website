var request=require('request');
var key1=require('../../API-Keys/keys2');

//callback function of geocode: 
var Geocode=(address,callback)=>{
    var url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+key1+'&limit=1';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect!',undefined);
        }else if(response.body.features.length===0){
            callback('Unable to Find Location!',undefined);
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports=Geocode;

//normal function of geocode: 
//geocode converts a given location to its longitude and latitude
// var geocode='https://api.mapbox.com/geocoding/v5/mapbox.places/India.json?access_token=pk.eyJ1IjoiYmhhdnlhc3VyYSIsImEiOiJja2JrOXFsa2EwZ251MnlsY2V0ZWlxZW0xIn0.o0OmaORLTFEa6VudlrJ1TA&limit=1';
// request({url:geocode,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to connect!');
//     }else if(response.body.features.length==0){
//         console.log('Unable to Find Location!');
//     }else{
//         var longitude=response.body.features[0].center[0];
//         var latitude=response.body.features[0].center[1];
//         console.log(longitude,latitude);
//     }
// });
