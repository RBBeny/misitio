var express = require('express');
var router = express.Router();
var request = require('request');


var mensaje = '';


var local= 'https://microserviciosunidad3.herokuapp.com/';
//listado
router.get('/', function (req, res, next) {
    request.get(local+"jugadores", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        res.render('jugadores/index', {
            mensaje: mensaje,
            title: 'Listado de Jugadores',
            data: JSON.parse(body)
        });
    });
});

router.get('/add', (req, res) => {
    mensaje = 'Agregando Jugador';

    res.render('jugadores/add', {
        mensaje: mensaje,
        title: 'Agregar Jugador',
        IdVideojuego: '',
        Nombre: '',
        Genero: '',
        Duracion: '',
        Plataforma: ''
    });
});

router.post('/add', function (req, res, next) {
    //Extrae los datos enviados por la forma
    let IdJugador = req.body.IdJugador;
    let NickName = req.body.NickName;
    let Nombre = req.body.Nombre;
    let Apellidos = req.body.Apellidos;
    let Edad = req.body.Edad;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos de la forma
        var datosForma = {
            IdJugador: IdJugador,
            NickName: NickName,
            Nombre: Nombre,            
            Apellidos: Apellidos,
            Edad: Edad
        }
        //Invoca al Microservicio
        request.post({ url: local+"jugadores", json: datosForma }, (error, response, body) => {

            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/jugadores'); //Redirige a Listado de videojuegos
        });
    }
});


router.get('/delete/:idjugador', (req, res) => {
    console.log('eliminando');

    id = req.params.idjugador;
    mensaje = 'Eliminando jugador con numero de Control' + id;
    console.log(mensaje);

    if (id) {

        URI = local+"jugadores/" + id;
        request.delete(URI, (error, response, body) => {
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/jugadores');
        });
    }

});

//Modificar
router.get('/update/:idjugador', (req, res) => {
    id = req.params.idjugador;
    mensaje = 'Modificando Jugador con id: ' + id;
    console.log(mensaje);
    var VideojuegoFind;
    //Busca si existe el videojuego de acuerdo al id
    URI = local+"jugadores/" + id;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Jugador Encontrado ===>");
        console.log(body);
        //Despliega pantalla para modificar de Estudiante
        
        res.render('jugadores/edit', {
            mensaje: mensaje,
            title: 'Modificando Jugador', //Título de la página
            IdJugador: JSON.parse(body).IdJugador,
            NickName: JSON.parse(body).NickName,
            Nombre: JSON.parse(body).Nombre,            
            Apellidos: JSON.parse(body).Apellidos,
            Edad: JSON.parse(body).Edad
        });
    });

});

router.post('/update', function (req, res, next) {
    console.log('Modificando un Jugador');
    //Extrae los datos enviados por la forma
    let IdJugador = req.body.IdJugador;
    let Nombre = req.body.Nombre;
    let Apellidos = req.body.Apellidos;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos provenientes de la forma
        var datosForma = {
            IdJugador: IdJugador,
            Nombre: Nombre,
            Apellidos: Apellidos
        }
        //Invoca al Microservicio de modificar
        request.put({ url: local+"jugadores", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/jugadores'); //Redirige a Listado de Jugadores
            });
    }
});


module.exports = router;
