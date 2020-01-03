
var express = require('express');
var Video = require('../models/video');
var mAuth = require('../middlewares/autenticacion');

//iniciar variables
var app = express();

// ===================================================
//  Obtener video
// ===================================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Videos.find({})
    .populate('usuario', 'nombre email')
    .skip(desde)
    .limit(5)
    .exec(
         (err, videos) => {
            if (err) {
                return res.status(500).json({
                    ok: fasle,
                    msg: 'Error cargando Video!',
                    errors: err
                });
            }

            Videos.count({}, (err, num) => {

                res.status(200).json({
                    ok: true,
                    videos: videos,
                    total: num
                });
            });
    });    
} );

// ===================================================
//  Obtener video
// ===================================================

app.get('/:id', (req, res) => {
    var id = req.params.id;

    Video.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, video) => {
            if (err) {
                return res.status(500).json({
                     ok: false,
                     msg: 'Error al buscar video',
                     errors: err
                });
            }
            if (!video) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El video con el id ' + id + ' no existe',
                    errors: {message: 'No existe un video con ese ID'}
                });
            }
            res.status(200).json({
                ok: true,
                video:video
            });
        });

});

// ===================================================
//  Actualizar video
// ===================================================

app.put('/:id', mAuth.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Video.findById( id, (err, video) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al buscar video!',
                errors: err
            });
        } 
        if(!video) {
            return res.status(400).json({
                ok: false,
                msg: `El video con el id ${id} no existe`,
                errors: { message: 'No existe un video con ese ID'}
            });
        }

        video.nombre = body.nombre;
        video.usuario = req.usuario._id;
        console.log(video);

        video.save( (err, videoGuardado) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al actualizar video',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                video: videoGuardado
            });
        }); 
    });
});

// ===================================================
//  Crear video
// ===================================================

app.post('/', mAuth.verificaToken, (req, res) => {

    var body = req.body;

    var video = new video({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    console.log(video);

    video.save( (err, hospitalGuardado) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear video',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            video: hospitalGuardado
        });

    } ); 
});

// ===================================================
//  Borrar video
// ===================================================

app.delete('/:id', mAuth.verificaToken, (req, res) => {

    var id = req.params.id;
    
    Video.findByIdAndRemove(id, (err, videoBorrado) => {
        if(err) {
            return res.status(500).json({
                ok: fasle,
                msg: 'Error al borrar video',
                errors: err
            });
        } 
        if(!videoBorrado) {
            return res.status(400).json({
                ok: false,
                msg: `El video con el id ${id} no existe`,
                errors: { message: 'No existe un video con ese ID'}
            });
        }

        res.status(200).json({
            ok: true,
            video: videoBorrado
        });
    });
});

module.exports = app;