"use strict";

const { Router } = require("express"); //Step (8)
const router = Router(); //Step (8)
const Image = require('../models/image'); //Step (15)
const path = require('path'); //Step(N+1)
const  { unlink } = require('fs-extra'); //Step(N)

//Service GET: Index view
router.get("/", async (req, res) => {
  //Step (9)
  // res.render('index');
   const images = await Image.find();
   res.render('index', {images});
//    console.log(images);
});
//Service GET: Upload view (form)
router.get("/upload", (req, res) => {
  //Step (10)
  return res.render('upload');
});
// Service POST: upload one image
router.post("/upload", async (req, res) => {
  //Step (11)
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = '/img/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;
 
  const newImage = await image.save();
// res.json({image: newImage});
    // redirect: Cuando ya existe una ruta y deseo
    // mostrar lo que contiene esa ruta.
  res.redirect('/');
});
// Service GET: get one image
router.get("/image/:id", async (req, res) => {
  //Step (13)
  const {id} = req.params;
  const image = await Image.findById(id);
  //res.render(): cuando ya tengo una vista creada
  // y me interesa mostrar lo que tengo en dicha vista.
  res.render('profile', {image});
//   res.json({image: imagen});
});
// Service GET: delete one image for id
router.get("/image/delete/:id", async (req, res) => {
  //Step (12)
  const {id} = req.params;
  const image = await Image.findByIdAndDelete(id);
  await unlink(path.resolve('./src/public'+image.path));
    res.redirect('/');
});

module.exports = router; //Step (8)
