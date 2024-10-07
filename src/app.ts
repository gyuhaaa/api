import express from "express";

const app = express(); 
app.get("/status", (req, res, next) => {
    console.log("Request status API success!!");

    res.send('GOOD!');
});

export default app;