import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("index.ejs", {dayHistory: "The history of provided day will be presented here"});
});

app.post("/", async (req,res)=>{
    const selectedDay= req.body.dayInput;
    const selectedMonth= req.body.monthInput;
    const apiUrl= `https://byabbe.se/on-this-day/${selectedMonth}/${selectedDay}/events.json`;
    //console.log(apiUrl);
    try {
        const response= await axios.get(apiUrl);
        const result= response.data;
        const eventLength= result.events.length;
        const eventNum= Math.floor(Math.random()*eventLength);
        const randomEvent= result.events[eventNum]; 
        console.log(randomEvent);
        
        res.render("index.ejs", {dayHistory: randomEvent.description});
    } catch (error){
        console.log(error.message);
        res.render("index.ejs", {dayHistory: error.message});
    }
});

app.listen(port, ()=>{
    console.log(`The app is running on port ${port}`);
});