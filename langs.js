const settings = require('./settings').settings

const mem = settings.memoryLimit
const net = settings.network

exports.cmd = {
  python: `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${__dirname}/space/pyscript/{name}:/prog python:3.8-slim-buster python /prog/prog.py`,
  javascript: `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${__dirname}/space/jsscript/{name}:/prog node:12.18.0-buster-slim node /prog/prog.js`,
  php: `docker run --rm --network=${net} --memory=${mem} --memory-swap=${mem} -v ${__dirname}/space/phpscript/{name}:/prog php:7.4-cli php /prog/prog.php`
}
