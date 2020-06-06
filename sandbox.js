const exec = require('child_process').exec
const fse = require('fs-extra')
const langs = require('./langs')
const settings = require('./settings').settings

const tl = settings.timeLimit
const maxbuf = settings.maxBufferSize

body = {
  "code": "let a = '2', b = '3', c = 2, d = 3\nlet str = \"xyz\"\nlet x = `this is ${a}`\nk = $p+$q\nl = $r+$s\ncon = {val:k+l, stat:'p', 'con':3}\ncon\n\n",
  "lang": "javascript",
  "vars": {
      "$p": "2",
      "$q": "3",
      "$r": 1,
      "$s": 6,
      "$obj": {
          "con": "5",
          "val": 7
      }
  }
}


const stringifyVarObj = (varObj) => {
  for (let key in varObj) {
    varObj[key] = JSON.stringify(varObj[key])
  }
  return varObj
}


const prepareCode = (code, lang, varObj) => {
  varObj = stringifyVarObj(varObj)
  code = code.replace(/\$\w+\b/g, match => varObj[match]||match).trim()
  return langs.addStdout[lang](code)
}


const prepare = async(code, lang, varObj, id) => {
  code = prepareCode(code, lang, varObj)
  let fileName = __dirname + `/space/${id}/prog` + langs.ext[lang]
  await fse.outputFile(fileName, code)
  return fileName
}


exports.execute = async(code, lang, varObj, id) => {
  fileName = await prepare(code, lang, varObj, id)
  console.log(fileName)
}
//   let fileName = __dirname + `/space/${id}/prog` + langs.ext[lang]
//   fse.outputFile(fileName, code)
//     .then(() => {
//       console.log('saved')
//     })
//     .then(()=> {
//       console.log('file name i know', fileName)
//     })
// }


this.execute(body.code, body.lang, body.vars, '1')
//console.log('done')
// for (let key in varObj) {
//   varObj[key] = JSON.stringify(varObj[key])
// }

// console.log(varObj)

// const escapeRegExp = (string) => {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// }

// str = escapeRegExp("$a + $b + $a + $c?$a$c$c()")
// console.log(str)

// console.log(str.replace(/\$a|\$b/g, '2'))

// const data = 2
// console.log({data:JSON.stringify(data)})

// const str = "  $a + $b + $a + $c?$a$c$c$d?a  ?a  "
// const res = str.replace(/\$\w+\b/g, match => data[match]||match).trim()

// console.log(res)

// str = escapeRegExp("I love ? and then !yu??mdsk!mkdk[]{}")
// console.log(str)

// stripped //"I love my ! s are great"


// console.log(stripped) //"I love my ! Dogs are great"

// function init() {
//   console.log(1);
//   sleep(1000);
//   console.log(2);
// }

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }   

// init()
// sleep(500)
// console.log('pp')

// exports.prepare = (code, lang, vars) => {
//   console.log (typeof code)
//   return 'loc'
// }

//console.log(cmd.python.replace('{name}', 'sample_0'))
//console.log(cmd.javascript.replace('{name}', 'sample_1'))
// console.log('joke')


// //time sudo docker run --rm --network=none --memory='10M' --memory-swap='10M' -v /home/aman/pyscript:/app rp python /app/script.py

// cmd = 'node test.js'
//console.log(cmd['python'])
// let st = cmd.python.replace('{name}', 'sample_0')

// exec(st, {timeout:tl, maxBuffer:maxbuf}, (error, stdout, stderr) => {
//   if (error) console.log(error)
//   if (stderr) console.log(stderr)
//   else console.log(stdout)
// })
