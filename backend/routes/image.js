var express = require('express');
var router = express.Router();
const axios =require('axios');


router.get("/naver",async (req,res)=>{
    const query=req.query.value;
    const response=await axios.get(`https://map.naver.com/p/api/search/allSearch?query=${query}+성수역+&type=all&searchCoord=127.054066%3B37.539591&boundary==`)
    const data=response.data.result.place.list[0];
    const urls=data.thumUrls

    res.json(urls);
   

})


module.exports = router;