//Requires
var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var video= require('../models/video');

//iniciar variables
var app = express();
// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {
    var tipo = req.params.tipo;
    var id = req.params.id;

     // tipos de colección
    var tiposValidos = ['ficheros'];
        
    if (tiposValidos.indexOf(tipo) < 0) {    
        res.status(400).json({
            ok: false,
            msg: 'Tipo de colección no es válida',
            errors: { message: 'Tipo de colección no es valida'}
        });
    }
    
    if (!req.files) {        
        res.status(400).json({
            ok: false,
            msg: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar un video'}
        });
    }

    //obtener nombre del archivo
    var archivo= req.files.video;
    var nombreTroceado = archivo.name.split('.');
    var extArchivo = nombreTroceado[nombreTroceado.length - 1];

    // extensiones aceptadas
    var extValidas = ['mpeg','mp4'];  

    if (extValidas.indexOf(extArchivo) < 0 ) {                   
        return res.status(400).json({
            ok: false,
            msg: 'Extension no válida',
            errors: { message: `Las extensiones válidas son ${extValidas.join(', ')}`}
        });
    }

    // Nombre del archivo personalizado
    // 12635451-143.png
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extArchivo}`;

    //Mover el archivo del temporal a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;      
    archivo.mv(path, err => {
        if (err) {            
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover archivo',
                errors: err
            });
        }        
        uploadByType (tipo, id, nombreArchivo, res);
    });   
});

function uploadByType (tipo, id, nombreArchivo, res) {   
    if (tipo  === 'ficheros') {
        
        video.findById(id, (err, video) => {

            if (!video) {
                return res.status(400).json({
                    ok: false,
                    msg: 'video no existe',
                    errors: { message: 'video no existe' }
                });
            }
                       
            var oldPath = './uploads/ficheros/' + video.fichero;

            // Si existe, elimina la imagen anterior
            if( fs. existsSync(oldPath)) {
                fs.unlink( oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error al sobrescribir archivo',
                            errors: err
                        });
                    }
                });
            }

            video.fichero = nombreArchivo;

            video.save((err, videoActualizado) => {                
                videoActualizado.password = '******';

                return res.status(200).json({
                    ok: true,
                    msg: "video de usuario actualizado",
                    videos: videoActualizado
                });
            });
        });
    }
}

module.exports = app;