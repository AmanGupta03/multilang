const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const execute = require('./sandbox').execute 
const { uuid } = require('uuidv4');

const port =  process.env.PORT || '8000'
const app = express()

//middlewares
app.use(cors())
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {  
  req.id = uuid()  //assign unique id to each request
  next()
})

//routes
app.post('/run', async(req, res) => {
  const {code,lang,vars} = req.body;
  res.send(await execute(code, lang, vars, req.id))
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))