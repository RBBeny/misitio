/*
    Nombre del autor: Benjamin Ramirez Bolaños
    Objetivo del Archivo: Se manda llamar a los microservicios
    y en este tambien se llamas a los tres en agregar uno nuevo
    Fecha: 7/12/2020
*/
var express = require('express');
var router = express.Router();
var request = require('request');


var mensaje = '';
var data1= [];
var data2= [];
var local= 'https://microserviciosunidad3.herokuapp.com/'; //Esta es la direccion de los microservicios

//listado
router.get('/', function (req, res, next) {
    request.get(local+"registros", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        res.render('registros/index', {
            mensaje: mensaje,
            title: 'Listado de registros',
            data: JSON.parse(body)
        });
    });
});

router.get('/add', (req, res) => {
    mensaje = 'Agregando Registro';

    /*
    request.get("http://localhost:4000/videojuegos", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        data1= JSON.parse(body);
        
    });

    request.get("http://localhost:4000/jugadores", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        data2= JSON.parse(body);
        
    });
    */
   request.get(local+"jugadores", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        
        data2 = JSON.parse(body);
        console.log(data2);
        
    });
    request.get(local+"videojuegos", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        
        data1 = JSON.parse(body);
        console.log(data1);
        
    });
    res.render('registros/add', {
        mensaje: mensaje,
        title: 'Agregar Registro',
        datos1: data1,
        datos2: data2
       
    });
    
});

router.post('/add', function (req, res, next) {
    //Extrae los datos enviados por la forma
    let IdRegistro = req.body.IdRegistro;
    let IdVideojuego = req.body.IdVideojuego;
    let IdJugador = req.body.IdJugador;
    let HorasJugadas = req.body.HorasJugadas;
    let Calificacion = req.body.Calificacion;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos de la forma
        var datosForma = {
            IdRegistro: IdRegistro,
            IdVideojuego: IdVideojuego,
            IdJugador: IdJugador,
            HorasJugadas: HorasJugadas,
            Calificacion: Calificacion
        }
        //Invoca al Microservicio
        request.post({ url: local+"registros", json: datosForma }, (error, response, body) => {

            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/registros'); //Redirige a Listado de videojuegos
        });
    }
});


router.get('/delete/:idregistro', (req, res) => {
    console.log('eliminando');

    id = req.params.idregistro;
    mensaje = 'Eliminando registro con id: ' + id;
    console.log(mensaje);

    if (id) {

        URI = local+"registros/" + id;
        request.delete(URI, (error, response, body) => {
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/registros');
        });
    }

});

//Modificar
router.get('/update/:idregistro', (req, res) => {
    id = req.params.idregistro;
    mensaje = 'Modificando registro con id: ' + id;
    console.log(mensaje);
    var VideojuegoFind;
    //Busca si existe el videojuego de acuerdo al id
    URI = local+"registros/" + id;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Registro Encontrado ===>");
        console.log(body);
        //Despliega pantalla para modificar de Estudiante

        res.render('registros/edit', {
            mensaje: mensaje,
            title: 'Modificando registro', //Título de la página
            IdRegistro: JSON.parse(body).IdRegistro,
            IdVideojuego: JSON.parse(body).IdVideojuego,
            IdJugador: JSON.parse(body).IdJugador,
            HorasJugadas: JSON.parse(body).HorasJugadas,
            Calificacion: JSON.parse(body).Calificacion
        });
    });

});

router.post('/update', function (req, res, next) {
    console.log('Modificando un Videojuego');
    //Extrae los datos enviados por la forma
    let IdRegistro = req.body.IdRegistro;
    let HorasJugadas = req.body.HorasJugadas;
    let Calificacion = req.body.Calificacion;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos provenientes de la forma
        var datosForma = {
            IdRegistro: IdRegistro,
            HorasJugadas: HorasJugadas,
            Calificacion: Calificacion
        }
        //Invoca al Microservicio de modificar
        request.put({ url: local+"registros", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/registros'); //Redirige a Listado de registros
            });
    }
});


module.exports = router;
