const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require('../Schema/toDoSchema')


const Todo = new mongoose.model("Todo", todoSchema)


//GEt All todos.
router.get('/', async(req, res)=>{

});

//Get a Todo ID....
router.get('/:id', async(req, res)=>{});

// Post Todo...
router.post('/', async(req, res)=>{});

//POst multiple Todo...
router.post('/all', async(req, res)=>{});

//PUT Todo
router.put('/:id', async(req, res)=>{});

// DElete todp
router.delete('/:id', async(req, res)=>{});


module.exports = router;