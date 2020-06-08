const mongoose = require("mongoose");
const varObj = new mongoose.Schema({..}, { strict: false });
const codeSchema = new mongoose.Schema({id: { type: String, index: true },lang: String,code: String,varObj:varObj});
// compile model from schema
exports.codeSchema = mongoose.model("file", codeSchema,"file");
