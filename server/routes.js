// Routes.js - Módulo de rutas
const express = require('express');
const push = require('./push');

const router = express.Router();

const mensajes = [
  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Mensaje de spiderman'
  }
]





// Get mensajes
router.get('/', function (req, res) {
  //res.json('Obteniendo mensajes');
  res.json(mensajes);
});

// Post mensaje
router.post('/', function (req, res) {
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  }

  mensajes.push(mensaje);
  console.log(mensajes);

  res.json({
    ok: true,
    mensaje
  });
});


// Almacenar suscripcion
router.post('/subscribe', (req, res) => {
  const suscripcion = req.body;

  // console.log(suscripcion);

  push.AddSubscription(suscripcion);


  res.json('subscribe');
});

// Obtener la llave publica
router.get('/key', (req, res) => {
  const key = push.getKey();

  res.send(key);
});

// Enviar una notificacion PUSH a las personas que nosotros queramos
// ES ALGO que se controla del lado del server
router.post('/push', (req, res) => {
  const post = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  };

  push.sendPush(post);

  res.json(post);
});

module.exports = router;