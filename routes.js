const express = require('express');
const routes = express.Router();


//Petición GET //
routes.get('/', (req, res)=>{
    req.getConnection((error, conn)=>{
        if(error) res.status(500).send('Error de servidor');

        conn.query('SELECT * FROM habitantes', (err,rows)=>{
            if(err) res.status(404).send('Habitantes no encontrados');
            res.status(200);
            var result = Object.values(JSON.parse(JSON.stringify(rows)))
            res.json(result);
            console.log(result);
        });
    });
});


//Petición Get un solo habitante //
routes.get('/:idhabitante',(req,res)=>{
    req.getConnection((error,conn)=>{
        let gID = req.params.idhabitante;
        let qr = `SELECT * FROM habitantes where idhabitante = ${gID}`;
            conn.query(qr,(err,result)=>{
                if(err){console.log(err);}
                res.send({
                    message:'Mostrando un solo habitante',
                    data:result
                });
            });
    });
});

//Petición POST agregar un nuevo habitante//

routes.post('/',(req,res)=>{
    console.log(req.body,'createdata');

    req.getConnection((err, conn)=>{
        let nombrehabit = req.body.nombrehabit;
        let apellido1 = req.body.apellido1;
        let apellido2 = req.body.apellido2;
        let edad = req.body.edad;
        let genero = req.body.genero;
        let num_casa = req.body.num_casa;
        let calle = req.body.calle;
        let telefono = req.body.telefono;
        let correo = req.body.correo;
        let pass = req.body.pass;
        let esthabit = req.body.esthabit;

        let qr = `insert into habitantes(nombrehabit,apellido1,apellido2,
                    edad,genero,num_casa,calle,telefono,correo,pass,esthabit)
                    values('${nombrehabit}','${apellido1}','${apellido2}','${edad}','${genero}','${num_casa}','${calle}',
                    '${telefono}','${correo}','${pass}','${esthabit}')`;
    
        console.log(qr,'qr')
        conn.query(qr,(err,result)=>{
            if(err){console.log(err);}
            console.log(result,'result')
            res.send({
                message:'Habitante registrado',
            });
        });
    });
});

// Petición PUT actualizar un habitante //
routes.put('/:idhabitante',(req,res)=>{
    req.getConnection((err, conn)=>{
        console.log(req.body,'updatedata');

        let gID = req.params.idhabitante;
        let nombrehabit = req.body.nombrehabit;
        let apellido1 = req.body.apellido1;
        let apellido2 = req.body.apellido2;
        let edad = req.body.edad;
        let genero = req.body.genero;
        let num_casa = req.body.num_casa;
        let calle = req.body.calle;
        let telefono = req.body.telefono;
        let correo = req.body.correo;
        let pass = req.body.pass;
        let esthabit = req.body.esthabit;

        let qr = `update habitantes set nombrehabit='${nombrehabit}',apellido1='${apellido1}',apellido2='${apellido2}',
                edad='${edad}',genero='${genero}',num_casa='${num_casa}',calle='${calle}',telefono='${telefono}',
                correo='${correo}',pass='${pass}',esthabit='${esthabit}' where idhabitante=${gID}`;
        conn.query(qr,(err,result)=>{
            res.send({
                message: 'Habitante modificado'
            });
        });
        
    });
});


//Petición Delete //
routes.delete('/:idhabitante',(req,res)=>{
    req.getConnection((error,conn)=>{
        let qID = req.params.idhabitante;
        let qr = `DELETE from habitantes where idhabitante='${qID}'`;
        conn.query(qr,(err,result)=>{
            if(err){res.send(404).send("Error al eliminar habitante");}
            res.send({
                message: 'Habitante eliminado'
            });
        });
    });
});

module.exports = routes;