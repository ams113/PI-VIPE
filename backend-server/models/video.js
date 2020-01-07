var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema =new Schema({
    nombre: { type: String,	required: [true, 'El nombre	es necesario']	},
    tipo: { type: String },
    categoria: { type: String},
    director: { type: String},
    descripcion: { type: String},
    fichero: {type: String, required: false },
    img: { type: String, required: false },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'videos' });

module.exports = mongoose.model('Video', videoSchema);