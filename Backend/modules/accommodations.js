const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');



//szállások lehívása
router.get("/", (req, res)=>{
    
    query(`SELECT * FROM accommodations` ,[], (error, results) =>{
        if(error) return res.status(500).send({ errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})

//szállás lehívása id-vel
router.get("/:id", (req, res)=>{
    let id = req.params.id;
    query(`SELECT * FROM accommodations WHERE id=?` ,[id], (error, results) =>{
        if(error) return res.status(500).send({errno: error.errno, msg:"Hiba fordult elő "}) ;
      
        res.status(200).json(results)
    },req);
})
//Szállás hozzáadása
router.post("/", (req, res)=>{
    const { name, description, address, capacity, basePrice, active} = req.body;
    query(`INSERT INTO accommodations(name,description,address,capacity,basePrice,active) VALUES (?, ?, ?, ?, ?, ?)` ,
        [name, description, address, capacity, basePrice, active], (error, results) =>{
        if(error) return res.status(500).send({ errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})
//szállás update id alapján
router.patch("/:id", (req, res)=>{
    let id = req.params.id 
    const { name, description, address, capacity, basePrice, active} = req.body;
    query(`UPDATE accommodations SET name=?,description=?,address=?,capacity=?,basePrice=?,active=? WHERE id =?` ,
        [ name, description, address, capacity,basePrice,active, id], (error, results) =>{
        if(error) return res.status(400).json({errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})

//szállás törlése id alapján
router.delete("/:id", (req, res)=>{
    let id = req.params.id;
    query(`DELETE FROM accommodations WHERE id=?` ,[id], (error, results) =>{
        if(error) return res.status(500).send({errno: error.errno, msg: "Nem sikerült törölni a szállást"}) ;
      
        res.status(200).json(results)
    },req);
})


module.exports = router;