const fs = require('fs');

const vapid = require('./vapid.json');
const webpush = require('web-push');
const URLSafeBase64 = require('urlsafe-base64');
let suscripciones = require('./subs-db.json');

webpush.setVapidDetails(
    'mailto:carlos_gtz8@hotmail.com',
    vapid.publicKey,
    vapid.privateKey
);

module.exports.getKey = () => {
    return URLSafeBase64.decode(vapid.publicKey);
};

module.exports.AddSubscription = (suscripcion) => {
    suscripciones.push(suscripcion)

    // console.log(suscripciones);

    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
};

module.exports.sendPush = (post) => {
    console.log('Mandando PUSHES');

    const notificacionesEnviadas = [];

    suscripciones.forEach((suscripcion, i) => {
        const pushProm = webpush.sendNotification(suscripcion, JSON.stringify(post))
            .then(console.log('Notificacion enviada'))
            .catch((err) => {
                console.log('Notificacion fallo');

                // Si ya no existe la suscripcion creamos la propiedad borrar en true
                if (err.statusCode === 410) { //GONE, ya no existe
                    suscripciones[i].borrar = true;
                }
            });

        notificacionesEnviadas.push(pushProm);
    });

    Promise.all(notificacionesEnviadas).then(() => {
        suscripciones = suscripciones.filter(subs => !subs.borrar);

        fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
    });
};