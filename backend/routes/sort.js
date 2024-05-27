var express = require('express');
var router = express.Router();

const Restaurant=require('../models/Restaurant')


// router.get('/data', async (req, res) => {
//     try {
        
//         const hi = await Restaurant.find().sort({ id: 1 });
//         hi.map((elem)=>{
//             console.log(elem.category);
//         })
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

router.get('/',async (req,res)=>{
    try{
        const all=await Restaurant.find();
        res.json(all);
    }catch{
        res.status(500).send(error);
    }
})

router.get('/korea',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const koreanFood=food.filter((elem)=>(elem.category)==="한식")
        res.json(koreanFood);
        
    }catch{
        res.status(500).send(error);
    }
})

router.get('/desert',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const desert=food.filter((elem)=>(elem.category)==="디저트")
        res.json(desert);

    }catch{
        res.status(500).send(error);
    }
})

router.get('/fast-food',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const fastfood=food.filter((elem)=>(elem.category)==="패스트푸드")
        res.json(fastfood);

    }catch{
        res.status(500).send(error);
    }
})

router.get('/western',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const western=food.filter((elem)=>(elem.category)==="양식")
        res.json(western);

    }catch{
        res.status(500).send(error);
    }
})

router.get('/flour',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const flour=food.filter((elem)=>(elem.category)==="분식")
        res.json(flour);

    }catch{
        res.status(500).send(error);
    }
})

router.get('/etc',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const etc=food.filter((elem)=>(elem.category)==="기타")
        res.json(etc);

    }catch{
        res.status(500).send(error);
    }
})

router.get('/japanese',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const japanese=food.filter((elem)=>(elem.category)==="일식")
        res.json(japanese);

    }catch{
        res.status(500).send(error);
    }
})

router.get('/chinese',async (req,res)=>{
    try{
        const food=await Restaurant.find();
        const chinese=food.filter((elem)=>(elem.category)==="중식")
        res.json(chinese);

    }catch{
        res.status(500).send(error);
    }
})

module.exports = router;