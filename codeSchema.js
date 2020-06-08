const mongoose = require("mongoose");
const codeSchema = new mongoose.Schema({id: { type: String, index: true },lang: String,code: String,varObj:[String] });
// compile model from schema
exports.codeSchema = mongoose.model("file", codeSchema,"file");
