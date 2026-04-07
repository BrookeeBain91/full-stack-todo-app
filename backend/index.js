//importing using common js
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

//importing using es module
// import express from "express";

const app = express();

// setting up middleware

app.use(express.json()); //
app.use(express.urlencoded({extended: true}));


app.use(cors("*"));

//Importing model
const TodoModel = require("./model/Todo");


const connectionString = "mongodb+srv://brookeebain91:MercynGRACE4eva@cluster0.slkxo43.mongodb.net/todoDB"; //we added name of the database at the end of the string

mongoose
    .connect(connectionString)
    .then(() => {
        console.log("Connected to database")
        app.listen(3000, function(){
            console.log("server running at port 3000");
})
})
.catch((err) => console.log(err))


// CRUD operations

//get method
app.get("/todos", async (req, res) => {
    // res.send("Hello Friends!")
    try {
        const response = await TodoModel.find({})
        // console.log(response);
        res.json(response)
    } 
    catch (err) {
        console.log(err)
    }
});

// create method
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body);

        const todo = req.body;

        // add the new item to the database 
        const newItem = await TodoModel.create(todo);
        // res.send("Your Post method is working");
        res.status(200).send("Successful")
    } 
    catch(error) {
        console.log(error);
        res(500).send("Server Error")
    }
});

// delete method 
app.delete("/todos/:id", async(req, res) => {
    try{
        let id = req.params.id;

        console.log(id)
        const deletedItem = await TodoModel.deleteOne({
            _id: id
        })

        res.status(200).send("Delete Successful")
    }
    catch(error) {
        console.log(error);
        res(500).send("Server Error")
    }
})

// update method
app.put("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        
        const { text } = req.body;

        const updatedOptions = {text: text};
        const updateItem = await TodoModel.findByIdAndUpdate(id, updatedOptions);

        res.status(200).send("Updated Items")
       

    }
    catch(error) {
        console.log(error);
        res(500).send("Server Error")
    }
})







