'use strict';

const exec = require('child_process').exec;
const fse = require('fs-extra');
const langs = require('./langs').langs;
const settings = require('./settings').settings;

//Limits
const tl = settings.timeLimit;
const maxbuf = settings.maxBufferSize;

//Stringify each value in varObj
const stringifyVarObj = (varObj) => {
  for (let key in varObj) {
    varObj[key] = JSON.stringify(varObj[key]);
  }
  return varObj;
}

/* 
    * @description: This function replaces flow constants with their value, 
    * and add suitable statement to get output of last line.
*/
const prepareCode = (code, lang, varObj) => {
  varObj = stringifyVarObj(varObj);
  console.log("varObj->",varObj)
  code = code.replace(/\$\w+\b/g, match => varObj[match]||match).trim();
  console.log("removed $->",code)
  return langs[lang].addStdout(code);
}

/* 
    * @description: This function produces a folder that contains the source file, 
    * this folder is mounted to our Docker container when we run it.
*/
const prepare = async(code, lang, varObj, id) => {
  console.log("initail->",code)
  code = prepareCode(code, lang, varObj);
  console.log("final->",code)
  const fileDir = __dirname + `/space/${id}`;
  const fileName = fileDir + '/prog' + langs[lang].ext;
  await fse.outputFile(fileName, code);
  return fileDir;
}

/*
    * @description: This function run the Docker container and execute script inside it. 
    * return the output generated and delete the mounted folder.
*/
exports.execute = async(code, lang, varObj, id) => {
  try {
    console.log("***Started***",Date(Date.now()))
    const fileDir = await prepare(code, lang, varObj, id);
    const cmd = langs[lang].cmd(fileDir);
    const result = await new Promise((resolve, reject) => {
      exec(cmd, {timeout:tl, maxBuffer:maxbuf}, (error, stdout, stderr) => { 
        if (stderr) {
          resolve({status: 'error', output:stderr});
        }
        else if (error) {
          const msg = (error.signal=='SIGTERM') ? 'time limit exceed':'runtime error';
          resolve({status: 'error', output:msg});
        }
        else {
          resolve({status:'success', output: stdout});
        }        
      });
    });
    await fse.remove(fileDir);
    console.log("***Done***",Date(Date.now()))
    return result;
  }
  catch (error) {
    console.log(error)
    return {status:'error', output:'something went wrong'};
  }
}
