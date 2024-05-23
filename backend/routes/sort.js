var express = require('express');
var router = express.Router();

const Restaurant=require('../models/Restaurant')


router.get('/data',async (req,res)=>{
    Restaurant.find().then((elem)=>{
        elem.map((e)=>{
            console.log(e.category);
        })
    })

})


module.exports = router;