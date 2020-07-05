var path=require('path');
var express=require('express');
var hbs=require('hbs');
var geocode=require('./utils/geocode');
var forecast=require('./utils/forecast')
const { response } =require('express');
var app=express();

//defining paths for express configuration //dirname points to source directory!
var public=path.join(__dirname,'../public');
var views=path.join(__dirname,'../templates/views');
var partials=path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs'); //to set handlebars in express.js
app.set('views',views);
hbs.registerPartials(partials);

//setup static directory
app.use('/public',express.static(public)); //to integrate public folder

app.get('/',(request,response)=>{
    response.render('index',{
        title: 'Weather',
        name: 'Bhavya Sura'
    });
});

app.get('/about',(request,response)=>{
    response.render('about',{
        title:'About Me',
        name:'Bhavya Sura'
    });
});

app.get('/help',(request,response)=>{
    response.render('help',{
        title: 'Help!',
        name: 'Bhavya Sura'
    });
});

app.get('/weather',(request,response)=>{
    if(!request.query.address){
         response.send({
            error: 'Address is mandatory'
        });
    }else{
           geocode(request.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return response.send({
                    error: error
                });
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return response.send({
                        error: error, 
                    });
                }
                response.send({
                    location: location,
                    address: request.query.address,
                    forecast: forecastData
                });
            });
        });
    }
});

app.get('/products',(request,response)=>{
    if(!request.query.search){
            response.send({
            error: 'you must provide a search term'
        })
    } else{
            response.send({
            products: []
         });
    }
});

app.get('/help/*',(request,response)=>{ // * = wildcard character
    response.render('404',{
        title: '404',
        name: 'Bhavya Sura',
        error: 'Help Page Not Found'
    });
});

app.get('*',(request,response)=>{ // * is symbol for any url that we didn't define. This function is to be defined at the last i.e before we start the web server   
    response.render('404',{
        title: '404',
        name: 'Bhavya Sura',
        error: 'Page Not Found'
    })
});

//to start up the web server, the listen method is used,3000 is the port number
app.listen(3000,()=>{
    console.log('Server is running'); //callback function
});    