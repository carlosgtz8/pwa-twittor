const fs = require('fs');

const vapid = require('./vapid.json');
const URLSafeBase64 = require('urlsafe-base64');
const suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return URLSafeBase64.decode(vapid.publicKey);
};

module.exports.AddSubscription = (suscripcion) => {
    suscripciones.push(suscripcion)

    console.log(suscripciones);

    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));

};