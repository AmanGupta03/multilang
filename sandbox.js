const settings = require('./settings').settings
const exec = require('child_process').exec; 
const cmd = require('./langs').cmd

const tl = settings.timeLimit
const maxbuf = settings.maxBufferSize



exports.prepare = (code, lang, vars) => {
  return 'loc'
}

//console.log(cmd.python.replace('{name}', 'sample_0'))
//console.log(cmd.javascript.replace('{name}', 'sample_1'))
// console.log('joke')


// //time sudo docker run --rm --network=none --memory='10M' --memory-swap='10M' -v /home/aman/pyscript:/app rp python /app/script.py

// cmd = 'node test.js'
//console.log(cmd['python'])
let st = cmd.python.replace('{name}', 'sample_0')

exec(st, {timeout:tl, maxBuffer:maxbuf}, (error, stdout, stderr) => {
  if (error) console.log(error)
  if (stderr) console.log(stderr)
  else console.log(stdout)
})
