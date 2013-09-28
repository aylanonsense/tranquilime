var mongoose = require('mongoose');

var stressorSchema = new mongoose.Schema({
	dateCreated: { type: Date, default: Date.now },
	text: { type: String },
	origin: { type: String }
});
stressorSchema.virtual('id').get(function() {
	return this._id;
});
var Stressor = mongoose.model('Stressor', stressorSchema);

var comfortSchema = new mongoose.Schema({
	dateCreated: { type: Date, default: Date.now },
	text: { type: String },
	stressorId: { type: mongoose.Schema.Types.ObjectId }
});
comfortSchema.virtual('id').get(function() {
	return this._id;
});
var Comfort = mongoose.model('Comfort', comfortSchema);

exports.Stressor = Stressor;
exports.Comfort = Comfort;