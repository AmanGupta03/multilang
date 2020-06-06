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
  let fileDir = __dirname + `/space/${id}`
  let fileName = fileDir + '/prog' + langs[lang].ext
  await fse.outputFile(fileName, code)
  return fileDir
}


exports.execute = async(code, lang, varObj, id) => {
  try {
    fileDir = await prepare(code, lang, varObj, id)
    cmd = langs[lang].cmd(fileDir)
    console.log(fileDir, cmd)
    result = await new Promise((resolve, reject) => {
      exec(cmd, {timeout:tl, maxBuffer:maxbuf}, (error, stdout, stderr) => { 
        if (error) {
          msg = "tl/ml"
          resolve({status:'fail', output:msg})
        }
        else if (stderr) {
          resolve({status: 'fail', output:stderr})
        }
        else {
          resolve({status:'success', output: stdout})
        }        
      })
    })
    console.log(result)
    return result
  }
  catch (error) {
    console.log(error)
    return {status:'fail', output:'something went wrong'}
  }
}