var express = require('express');
var router = express.Router();
const User = require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


/*  LOGIN */
router.post("/", function(req, res, next) {
  
  var user = new User({
    nombre: req.body.nombre,  
    apellidos: req.body.apellidos,
    email:req.body.email,
    numero:req.body.numero,
    mensaje: req.body.mensaje
  });

  //Guarda un registro en Mongo
  /*
  user.save((err, response) => {
      if (err) {res.status(400).send(err);
        res.redirect('/ubicacion')}
      res.status(200).send(response);
  });
  */
 

  user.save((err, response) => {
     if (err) {
     res.redirect('/ubicacion')}else{
    
     res.redirect('/videos');}
     
    
  });
  //Busca un registro mediante el email
  /*
  User.findById(req.body.email, (err, user) => {
      if (err) res.status(400).send(err);
      res.status(200).send(user);
  });
  */
});
