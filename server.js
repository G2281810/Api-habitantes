const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes');

const app = express();

//Asignación del puerto y conexión a base de datos//
app.set('port', process.env.PORT || 7000)
    dbOption = {
        host: "database-1.cd0ithle1pfb.us-east-1.rds.amazonaws.com",
	    user: "admin",
	    password: "xvP5&$cr0R3o",
	    database: "crudfra",
    }

//middlewares//
app.use(myconn(mysql, dbOption, 'single'))
app.use(express.json())

//Routes
app.get('/',(req,res)=>{
    res.send('Bienvendio a fraccionamiento GALE')
});

app.use('/api/v1/habitantes', routes)

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto', app.get('port'))
})