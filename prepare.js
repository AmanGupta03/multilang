const fs = require('fs')

var obj = {"$p":'2', "$q":'3', "$r":1, "$s":6, "$obj":{"con":'5', "val":7}}

fs.readFile('test.js', (error, data)=> {
  body = {
    "code": data.toString(),
    "lang": "javascript",
    "vars": obj 
  }
  console.log(JSON.stringify(body))
})