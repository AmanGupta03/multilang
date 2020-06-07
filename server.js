'use strict';

const express = require('express');
const cors = require('cors');
const execute = require('./sandbox').execute; 
const { uuid } = require('uuidv4');

// Constants
const PORT =  process.env.PORT || '8000';
const HOST = '0.0.0.0';

//App
const app = express();

// ***connection with DB ***

//Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {  
  req.id = uuid();  //assign unique id to each request
  next();
});

//Routes
app.post('/dryRun', async(req, res) => {
  const {code,lang,vars} = req.body;
  res.send(await execute(code, lang, vars, req.id));
});

app.post('/runInFlow',asyns(req, res)=>{
//   req.body._id will be id for the given code(flow id)
//    const code = from DB
//    const lang = from DB
   const vars = req.body.vars;
   res.send(await execute(code, lang, vars, req.id));
});
app.post('/uploadCode', async(req, res)=>{
  const code = req.body.code //code in string
  const lang = req.body.lang //string
  const flowStepId = req.body._id //flowid + stepid
//   save(req.body) in mongo
  
})

app.listen(PORT, HOST, () => {
  console.log(`Running at http://${HOST}:${PORT}`);
});
