const exec = require('child_process').exec
const fse = require('fs-extra')
const langs = require('./langs').langs
const settings = require('./settings').settings

const tl = settings.timeLimit
const maxbuf = settings.maxBufferSize


const stringifyVarObj = (varObj) => {
  for (let key in varObj) {
    varObj[key] = JSON.stringify(varObj[key])
  }
  return varObj
}


const prepareCode = (code, lang, varObj) => {
  varObj = stringifyVarObj(varObj)
  code = code.replace(/\$\w+\b/g, match => varObj[match]||match).trim()
  return langs[lang].addStdout(code)
}


const prepare = async(code, lang, varObj, id) => {
  code = prepareCode(code, lang, varObj)
  const fileDir = __dirname + `/space/${id}`
  const fileName = fileDir + '/prog' + langs[lang].ext
  await fse.outputFile(fileName, code)
  return fileDir
}


exports.execute = async(code, lang, varObj, id) => {
  try {
    const fileDir = await prepare(code, lang, varObj, id)
    const cmd = langs[lang].cmd(fileDir)
    return await new Promise((resolve, reject) => {
      exec(cmd, {timeout:tl, maxBuffer:maxbuf}, (error, stdout, stderr) => { 
        if (stderr) {
          resolve({status: 'error', output:stderr})
        }
        else if (error) {
          msg = (error.signal=='SIGTERM') ? 'time limit exceed':'runtime error'
          resolve({status: 'error', output:msg})
        }
        else {
          resolve({status:'success', output: stdout})
        }        
      })
    })
  }
  catch (error) {
    return {status:'error', output:'something went wrong'}
  }
}