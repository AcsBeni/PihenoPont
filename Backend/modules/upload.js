
const express = require('express');
const router = express.Router();
const multer =require('multer')
const path = require('path')
const fs = require('fs');
const {query} = require('../utils/database');
const { error } = require('console');


const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });


router.get("/:imagePath", (req, res)=>{
    let imagePath = req.params.imagePath;
    query(`SELECT * FROM accommodation_images WHERE imagePath=?` ,[imagePath], (error, results) =>{
        if(error) return res.status(500).send({ errno: error.errno, msg: "Hiba fordult elő"}) ;
      
        res.status(200).json(results)
    },req);
})

router.post('/', upload.single('image'), (req, res)=>{
    if (!req.file){
        return res.status(500).json({ error: 'Nincsfálj feltöltve!' });
    }
    res.status(200).json({
        message: 'Fájl feltöltve!',
        filename: req.file.filename,
        path: '/uploads'
    });
});

//Kép hozzáadása a szálláshoz
router.post("/:id", upload.single('image'), (req, res) => {
  const accommodationId = Number(req.params.id);

  if (!req.file) {
    return res.status(400).json({ error: "Nincs fájl feltöltve!" });
  }

  const newImagePath = `/uploads/${req.file.filename}`;

  query(
    'SELECT imagePath FROM accommodation_images WHERE accommodationId = ?',
    [accommodationId],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length > 0 && results[0].imagePath) {
        const oldImagePath = path.join(
          __dirname,
          '..',
          results[0].imagePath
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Hiba a régi kép törlésekor:", err);
            }
          });
        }
      }

      const sql =
        results.length > 0
          ? 'UPDATE accommodation_images SET imagePath = ? WHERE accommodationId = ?'
          : 'INSERT INTO accommodation_images (accommodationId, imagePath) VALUES (?, ?)';

      const params =
        results.length > 0
          ? [newImagePath, accommodationId]
          : [accommodationId, newImagePath];

      query(sql, params, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            msg: "Hiba az adatbázis mentésekor"
          });
        }

        res.status(200).json({
          message: results.length > 0
            ? "Kép sikeresen frissítve"
            : "Kép sikeresen feltöltve",
          imagePath: newImagePath,
          filename: req.file.filename
        });
      });
    }
  );
});


module.exports = router;