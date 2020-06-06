const settings = require('./settings').settings

const mem = settings.memoryLimit
const net = settings.network

//commands to run codes in docker container
exports.cmd = {
  python: `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${__dirname}/space/pyscript/{name}:/prog python:3.8-slim-buster python /prog/prog.py`,
  javascript: `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${__dirname}/space/jsscript/{name}:/prog node:12.18.0-buster-slim node /prog/prog.js`,
  php: `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${__dirname}/space/phpscript/{name}:/prog php:7.4-cli php /prog/prog.php`
}

//functions to add statement for stdout in code string
exports.addStdout = {

  python: (code) => {
    let lastToken = code.substring(code.lastIndexOf('\n') + 1).split(';')[0];
    lastToken = 'print(' + lastToken + ')'
    return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastToken;
  },

  javascript: (code) => {
    let lastToken = code.substring(code.lastIndexOf('\n') + 1).split(';')[0];
    lastToken = 'console.log(' + lastToken + ')'
    return code.substring(0, code.lastIndexOf("\n")) + '\n' + lastToken;
  },

  php: (code) => {
    code = code.substring(0, code.lastIndexOf('?')).trim()
    let lastToken = code.substring(code.lastIndexOf('\n') + 1).split(';')[0];
    lastToken = 'echo(' + lastToken + ')'
    return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastToken + '\n?>'
  }
}

//extensions of file
exports.ext = {
  python: '.py',
  javascript: '.js',
  php: '.php' 
}