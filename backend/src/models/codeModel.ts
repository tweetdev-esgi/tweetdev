import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
});

const CodeModel = mongoose.model('Code', codeSchema);

export default CodeModel;
