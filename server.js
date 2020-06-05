const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sandbox = require('./sandbox') 

const port =  process.env.PORT || '8000'
const app = express()

//middlewares
app.use(cors())
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//routes
app.post('/run', (req, res) => {
  try {
    let loc = sandbox.prepare(req.body.code, req.body.lang, req.body.vars)
    console.log(loc)
    res.send("done")
  }
  catch(e) {
    console.log(e)
  }
  // cmd = req.query.lang + ' ' + req.query.script   //command to run script

  // exec(cmd, (error, stdout, stderr) => {
  //   if (stderr) res.send({status:'fail', error:stderr})
  //   res.send({status:'success', output:stdout})
  // })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))