var express = require('express');
var router = express.Router();
var nombres = ['Benjamin','Isabel','Cesar','Fany','Daniel','Jose','Miguel','Sergio','Maria'];

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi primera practica', name: 'Benjamin Ramirez Bolaños', nombres});
});
*/
router.get('/', function(req, res, next) {
  res.render('index', {page: 'Home', menuId: 'home' });
});
/* Ruta nueva al Ubicación*/

router.get('/ubicacion', function(req, res, next) {
  res.render('pages/ubicacion', {page: 'ubicacion', menuId: 'ubicacion' });
});
router.post('/', function(req, res){
  res.send('Te doy un saludo con POST de parte de Benjamin')
});
router.put('/greeting', function(req, res){
  res.send('Te doy un saludo con Greeting de parte de Benjamin')
});
router.delete('/hello', function(req, res){
  res.send('Te doy un saludo con DELETE de parte de Benjamin')
});

module.exports = router;
