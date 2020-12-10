
var express = require('express');
var router = express.Router();
var request = require('request');


var mensaje = '';

var local= 'https://microserviciosunidad3.herokuapp.com/';


//listado
router.get('/', function (req, res, next) {
    request.get(local+"videojuegos", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        res.render('videojuegos/index', {
            mensaje: mensaje,
            title: 'Listado de videojuegos',
            data: JSON.parse(body)
        });
    });
});

router.get('/add', (req, res) => {
    mensaje = 'Agregando Videojuego';

    res.render('videojuegos/add', {
        mensaje: mensaje,
        title: 'Agregar Videojuego',
        IdVideojuego: '',
        Nombre: '',
        Genero: '',
        Duracion: '',
        Plataforma: ''
    });
});

router.post('/add', function (req, res, next) {
    //Extrae los datos enviados por la forma
    let IdVideojuego = req.body.IdVideojuego;
    let Nombre = req.body.Nombre;
    let Genero = req.body.Genero;
    let Duracion = req.body.Duracion;
    let Plataforma = req.body.Plataforma;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos de la forma
        var datosForma = {
            IdVideojuego: IdVideojuego,
            Nombre: Nombre,
            Genero: Genero,
            Duracion: Duracion,
            Plataforma: Plataforma
        }
        //Invoca al Microservicio
        request.post({ url: local+"videojuegos", json: datosForma }, (error, response, body) => {

            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/videojuegos'); //Redirige a Listado de videojuegos
        });
    }
});


router.get('/delete/:idvideojuego', (req, res) => {
    console.log('eliminando');

    id = req.params.idvideojuego;
    mensaje = 'Eliminando videojuego con numero de Control' + id;
    console.log(mensaje);

    if (id) {

        URI = local+"videojuegos/" + id;
        request.delete(URI, (error, response, body) => {
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/videojuegos');
        });
    }

});

//Modificar
router.get('/update/:idvideojuego', (req, res) => {
    id = req.params.idvideojuego;
    mensaje = 'Modificando Videojuego con id: ' + id;
    console.log(mensaje);
    var VideojuegoFind;
    //Busca si existe el videojuego de acuerdo al id
    URI = local+"videojuegos/" + id;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Videojuego Encontrado ===>");
        console.log(body);
        //Despliega pantalla para modificar de Estudiante
        
        res.render('videojuegos/edit', {
            mensaje: mensaje,
            title: 'Modificando Videojuego yovkkk jj', //Título de la página
            IdVideojuego: JSON.parse(body).IdVideojuego,
            Nombre: JSON.parse(body).Nombre,
            Genero: JSON.parse(body).Genero,
            Duracion: JSON.parse(body).Duracion,
            Plataforma: JSON.parse(body).Plataforma
        });
    });

});

router.post('/update', function (req, res, next) {
    console.log('Modificando un Videojuego');
    //Extrae los datos enviados por la forma
    let IdVideojuego = req.body.IdVideojuego;
    let Nombre = req.body.Nombre;
    let Genero = req.body.Genero;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos provenientes de la forma
        var datosForma = {
            IdVideojuego: IdVideojuego,
            Nombre: Nombre,
            Genero: Genero
        }
        //Invoca al Microservicio de modificar
        request.put({ url: local+"videojuegos", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/videojuegos'); //Redirige a Listado de Estudiantes
            });
    }
});


module.exports = router;
