const express = require('express');
const hbs = require('hbs');
const path = require("path")
const fs= require('fs');

var  app =express();
// hbs.registerPartial('/views/partials')

app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.static(path.join(__dirname , "../" , "/public")));
app.use((req ,res,next)=>{
   var now = new Date().toString();
   var log = `${req.method} ${now} ${req.url}`;
console.log(log);

fs.appendFile('server.log',log + '\n',err => {
   if (err){
       console.log('unable tolog error has been occured');

   }
    next();
});

});
hbs.registerHelper('getcurrentyear',()=>{
   return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req,res)=>{
    // res.send('hello express');
    res.render('home.hbs',{
        pageName:'home',
        welcome:'welcome',
        curentdate:new Date().getFullYear()
    });

});


app.get('/bad',(req,res)=>{
   res.send({
       error:'fail message'
   });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
      pageName:'about',
      curentdate:new Date().getFullYear()
  })
});

app.listen(3000);