var express = require('express');
var router = express.Router();
const Restaurant=require('../models/Restaurant')




router.get('/api/data',async (req,res)=>{
    const query=req.query.value;
    
    const hi = async (query) => {
        try {
            const results = await Restaurant.find({ name: { $regex: query } });
            return results;
        } catch (err) {
            console.error(err); 
        }
    };
    try{
        const result= await hi(query);
        res.json({result})
    }catch{
        res.status(500).json({ error: err.message });
    }
    
   
})

module.exports = router;








// module.exports = router;

//  let Board = require('../models/Restaurant');


//  router.post('/', async (req, res, next) => {

// console.log(req.body); 
// const board = await Board.create(req.body);
//  res.status(200).json(board);

//  });
