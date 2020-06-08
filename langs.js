'use strict';

const settings = require('./settings').settings;

const mem = settings.memoryLimit;
const net = settings.network;

exports.langs = {
  python: {
    ext: '.py',
    addStdout : (code) => {
          let lastLine = code.substring(code.lastIndexOf('\n') + 1).replace(/(;|\s)+$/g, '');
          const lastToken = 'print(' + lastLine.split(';').pop() + ')';
          lastLine = lastLine.substring(0, lastLine.lastIndexOf(';')+1) + lastToken;
          return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastLine;
      },
    cmd: (dir) => {
          return `docker run --rm  --network=${net} --memory=${mem} --memory-swap=${mem} -v ${dir}:/prog python:3.8-slim-buster python /prog/prog.py`;
      }
  },

  javascript: {
    ext: '.js',
    addStdout : (code) => {
          let lastLine = code.substring(code.lastIndexOf('\n') + 1).replace(/(;|\s)+$/g, '');
          const lastToken = 'console.log(' + lastLine.split(';').pop() + ')';
          lastLine = lastLine.substring(0, lastLine.lastIndexOf(';')+1) + lastToken;
          return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastLine;
      },
    cmd: (dir) => {
          return `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${dir}:/prog node:14 node /prog/prog.js`;
      }
  },

  php: {
    ext: '.php',
    addStdout : (code) => {
          code = code.substring(0, code.lastIndexOf('?')).trim();
          let lastLine = code.substring(code.lastIndexOf('\n') + 1).replace(/(;|\s)+$/g, '');
          const lastToken = 'echo(' + lastLine.split(';').pop() + ')';
          lastLine = lastLine.substring(0, lastLine.lastIndexOf(';')+1) + lastToken;
          return code.substring(0, code.lastIndexOf('\n')) + '\n' + lastLine + '\n?>';
      },
    cmd: (dir) => {
          return `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${dir}:/prog php:7.4-cli php /prog/prog.php`;
      }
  }
}
