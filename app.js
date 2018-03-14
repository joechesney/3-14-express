const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const animalRoutes = require("./routes/animals");


// the 'next' parameters is not always necessary. it is optional
const logParams = (req, res, next) =>{
  console.log('this is a middleware');
  console.log('req.params',req.params);
  console.log('req url of our middleware',req.url);
  next();  
}
const requestTime = (req, res, next) =>{
  req.requestTime = Date.now();
  next();
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(requestTime);
app.use(animalRoutes);

// app.use(express.static(__dirname + "/public"));
// 'use' will run on every single request no matter the url or route
// it will pipe all data through this function not matter the route

// The ORDER of these use/routes is very important, just like it was in angularJS
// it checks for the url route in a linear order.
// it will read true at the first one it gets to 
// app.use(logParams);

// you can also pass in a route for the 'use' method to use
app.use("/banana", logParams);

app.get("/chicken", (req,res)=>{
  res.send(`
    <h1>chups chickens, my mug</h1>
      <form method='POST'>
        <input type='text' name='chickenName'  >
      <button type='submit'>send</button>
    </form>`);
});
app.post("/chicken",(req,res)=>{
  console.log('posting a form for chickens', req.body);
  res.send(`<h2>Thanks for searching with ${req.body.chickenName}chikens</h2>`);
});

// respond with 'hello world' when a GET request is made to the homepage
// this only runs if the route matches the one in the 'get' function
app.get("/", (req, res)=>{
  res.send("hello world!");
});
  // app.get("/monkey", (req, res)=>{
  //   // res.send("hello monkey!");
  //   res.sendFile(__dirname + "/public/monkey.html");
  // });
  app.get("/profile/:userid", (req, res)=>{
    res.send("hello user!");
  });
  // app.post('/', cb);
  app.listen(8080, ()=>{
    console.log('listening on 8080');
  });
  app.use((error, req, res, next)=>{
    console.log('this is a middleware');
    // one error handler to rule them all
    // any error that happens in any app.use function will automatically
    // be sent to this function and this function will deal with it
  });
  app.use((req,res, next)=>{
    let error = new Error("Not found, as hell");
    error.status = 404;
    next(error);
  });
// REQUESTS AND RESPONSES ARE SENT AS STREAMS
// ANYTHING WE DO TO THEM IS A STREAM
// Transforms are middleware
