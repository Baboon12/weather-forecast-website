console.log('This is client side Javacript!');
//this method is used to fetch the information/data of the specified url and convert into json to display only relevant information to the user]

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((info)=>{ //.json converts the data to json
//         if(info.error){ //the info parameter is an object used to access its property 
//            console.log(info.error);
//         }
//         else{
//             console.log(info.location);
//             console.log(info.forecast);
//         }
//     });
// });

var weatherform=document.querySelector('#my_form');

var search=document.querySelector('#message');

var message1=document.querySelector('#para1');

var message2=document.querySelector('#para2');

weatherform.addEventListener('submit',(event)=>{

    event.preventDefault(); //to prevent refreshing of the page

    var place=search.value;

    message1.textContent='Loading...';
    
    message2.textContent='';
    fetch('http://localhost:3000/weather?address='+place).then((response)=>{
        response.json().then((info)=>{ 
            if(info.error){ 
                message1.textContent=info.error;
            }
            else{
                message1.textContent=info.location;
                message2.textContent=info.forecast;
             }
        });
    });
});