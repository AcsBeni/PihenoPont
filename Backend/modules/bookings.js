const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');

//foglalás lehívása
router.get("/", (req, res)=>{
    
    query(`SELECT * FROM bookings` ,[], (error, results) =>{
        if(error) return res.status(500).send({ errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})

//foglalás view table lehívása 
router.get("/fulldata", (req, res)=>{
    
    query(`SELECT * FROM bookingfull` ,[], (error, results) =>{
        if(error) return res.status(500).send({ errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})

//foglalás lehívása id-vel
router.get("/:id", (req, res)=>{
    let id = req.params.id;
    query(`SELECT * FROM bookings WHERE id=?` ,[id], (error, results) =>{
        if(error) return res.status(500).send({errno: error.errno, msg:"Hiba fordult elő "}) ;
      
        res.status(200).json(results)
    },req);
})
//foglalás view table lehívása id-vel
router.get("/fulldata/:id", (req, res)=>{
    let id = req.params.id;
    query(`SELECT * FROM bookingfull WHERE id=?` ,[id], (error, results) =>{
        if(error) return res.status(500).send({errno: error.errno, msg:"Hiba fordult elő "}) ;
      
        res.status(200).json(results)
    },req);
})
//foglalás view table lehívása uid-vel
router.get("/fulldataUID/:uid", (req, res)=>{
    let uid = req.params.uid;
    query(`SELECT * FROM bookingfull WHERE userId=?` ,[uid], (error, results) =>{
        if(error) return res.status(500).send({errno: error.errno, msg:"Hiba fordult elő "}) ;
      
        res.status(200).json(results)
    },req);
})
//foglalás hozzáadása
router.post("/", (req, res)=>{
    const {userId,accommodationId, startDate, endDate, persons, totalPrice, status} = req.body;
    query(`INSERT INTO bookings(userId,accommodationId,startDate,endDate,persons,totalPrice,status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)` ,
        [userId,accommodationId, startDate, endDate, persons, totalPrice, status], (error, results) =>{
        if(error) return res.status(500).send({ errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})
//foglalás update id alapján
router.patch("/:id", (req, res)=>{
    let id = req.params.id 
    const { accommodationId, startDate, endDate, persons, totalPrice, status} = req.body;
    query(`UPDATE bookings SET accommodationId=?,startDate=?,endDate=?,persons=?,totalPrice=?,status=? WHERE id =?` ,
        [  accommodationId, startDate, endDate, persons, totalPrice, status, id], (error, results) =>{
        if(error) return res.status(400).json({errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})

//foglalás törlése id alapján
router.delete("/:id", (req, res)=>{
    let id = req.params.id;
    query(`DELETE FROM bookings WHERE id=?` ,[id], (error, results) =>{
        if(error) return res.status(500).send({errno: error.errno, msg: "Nem sikerült törölni a foglalást"}) ;
      
        res.status(200).json(results)
    },req);
})

module.exports = router;