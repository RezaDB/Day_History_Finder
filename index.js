import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("index.ejs", {dayHistory: "The history of provided day will be presented here", eventYear: "-" , eventTitle: "-"});
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
        const eventDate= randomEvent.year+"."+selectedMonth+"."+selectedDay;
        console.log(eventDate);
        const eventTitle= randomEvent.wikipedia[0].title;
        console.log(eventTitle);
        res.render("index.ejs", { dayHistory: randomEvent.description, eventYear: eventDate, eventTitle: eventTitle });
    } catch (error){
        console.log(error.message);
        res.render("index.ejs", {dayHistory: "The chosen date is not valid or the API does not work at the moment.", eventYear: "-", eventTitle: "-"});
    }
});

app.listen(port, ()=>{
    console.log(`The app is running on port ${port}`);
});