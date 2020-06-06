const settings = require('./settings').settings

const mem = settings.memoryLimit
const net = settings.network

exports.langs = {
  python: {
    ext: '.py',
    addStdout : (code) => {
          let lastToken = code.substring(code.lastIndexOf('\n') + 1).split(';')[0];
          lastToken = 'print(' + lastToken + ')'
          return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastToken;
      },
    cmd: (dir) => {
          return `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${dir}:/prog python:3.8-slim-buster python /prog/prog.py`
      }  
  },

  javascript: {
    ext: '.js',
    addStdout : (code) => {
          let lastToken = code.substring(code.lastIndexOf('\n') + 1).split(';')[0];
          lastToken = 'console.log(' + lastToken + ')'
          return code.substring(0, code.lastIndexOf("\n")) + '\n' + lastToken;
      },
    cmd: (dir) => {
          return `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${dir}:/prog node:12.18.0-buster-slim node /prog/prog.js`
      }
  },
  
  php: {
    ext: '.php',
    addStdout : (code) => {
          code = code.substring(0, code.lastIndexOf('?')).trim()
          let lastToken = code.substring(code.lastIndexOf('\n') + 1).split(';')[0];
          lastToken = 'echo(' + lastToken + ')'
          return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastToken + '\n?>'
      },
    cmd: (dir) => {
          return `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${dir}:/prog php:7.4-cli php /prog/prog.php`
      }
  }
}