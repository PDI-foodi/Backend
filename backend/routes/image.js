var express = require('express');
var router = express.Router();


const images=require('../image')

router.get("/naver", async (req, res) => {
    
    try {
        const query = req.query.value;
        const new_images=images.filter((data)=>{
            const key = Object.keys(data)[0];
            return key === query;
        })
        
        res.json(new_images[0])

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        return;
    }
});

module.exports = router;