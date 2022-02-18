const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 3,
    },
    content: {
        type: String,
        required: true,
        unique: false,
    },
    userEmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;