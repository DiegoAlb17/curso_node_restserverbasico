const mongoose = require('mongoose');

const connection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log('Conexion con la BBDD realizada correctamente');
    } catch (err) {
        throw new Error('Ha ocurrido un error al conectar con la base de datos');
    }
}

module.exports = { connection };