const express = require('express')
const app = express()
const exec = require("child_process").exec; 
const port =  process.env.PORT || '8000'

app.get('/execute', (req, res) => {
  
  cmd = req.query.lang + ' ' + req.query.script   //command to run script

  exec(cmd, (error, stdout, stderr) => {
    if (stderr) res.send({status:'fail', error:stderr})
    res.send({status:'success', output:stdout})
  })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))