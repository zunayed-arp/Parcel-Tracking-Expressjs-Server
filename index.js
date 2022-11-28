import express from "express";

const port = 3000;
const app = express();
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Hello World" + req.query.id)
});

app.post("/",(req,res)=>{

    const body = req.body;
    res.send("Hi this from post data "+ JSON.stringify(body))
})


app.listen(port,()=>{
    console.log("Listening to port " + port);
})