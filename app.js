const express=require('express');
const app=express();
const https=require("https");
const bodyParser=require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
const PORT=process.env.PORT || 3000;


app.get('/', function(req, res){
    const url=`https://api.thecatapi.com/v1/images/search?api_key=${process.env.API_KEY}`;
    https.get(url, function(response){
        response.on('data', function(data){
            const cat_data=JSON.parse(data);
            res.render("home", {imgData:cat_data[0].url});
        });
    });


    
});




app.listen(PORT, function(){
    console.log(`App connected to ${PORT}`);
});