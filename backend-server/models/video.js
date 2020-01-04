var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema =new Schema({
    nombre: { type: String,	required: [true, 'El nombre	es necesario']	},
    tipo: { type: String,	required: [true, 'El tipo	es necesario']	},
    descripcion: { type: String	},
	img: { type: String, required: false },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'videos' });

module.exports = mongoose.model('Video', videoSchema);