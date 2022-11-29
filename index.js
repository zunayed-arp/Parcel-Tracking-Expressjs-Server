import express from "express";

const port = 3000;
const app = express();
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Hello World" + req.query.id)
});

app.post("/",(req,res)=>{
    const body = req.body;
    res.send("Hi this from post data "+body.message )
})


/**
 * 1. up and running the express server
 * 2. configure the express server
 * 3. handle the routing of the server
 * 
 */


app.listen(port,()=>{
    console.log("Listening to port " + port);
})