
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

    Video.find({})
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

            Video.countDocuments({}, (err, num) => {
                
                if (req.query.tipocontrato != 'TODO') {
                    videos = videos.filter(function(value, index, arr){          
                        return value.tipo === req.query.tipocontrato;                
                    });
                } 
                
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

app.put('/:id&:categoria&:director&:tipo', mAuth.verificaToken, (req, res) => {
    
    var id = req.params.id;
    var categoria = req.params.categoria;
    var director = req.params.director;
    var tipo = req.params.tipo;
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
        video.categoria = categoria;
        video.director =  director;
        video.tipo = tipo;
        video.usuario = req.usuario._id;
     
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
//  Actualizar video 2
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
        video.tipo = body.tipo;
        video.categoria = body.categoria;
        video.director =  body.director;
        video.descripcion = body.descripcion;
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

    var video = new Video({
        nombre: body.nombre,
        tipo: body.tipo,
        categoria: body.categoria,
        director: body.director,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    console.log(video);

    video.save( (err, videoGuardado) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear video',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            video: videoGuardado
        });

    } ); 
});

// ===================================================
//  Borrar video
// ===================================================

app.delete('/:id', mAuth.verificaToken, (req, res) => {

    var id = req.params.id;
    console.log("entro aqui");
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