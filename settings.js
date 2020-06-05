exports.settings = {
  memoryLimit: '10M',  //memory limit of docker container
  timeout: 10000,  //time limit  in millisecond for code execution
  network: 'none', //network access inside docker container
  maxBufferSize: 1024*200, //buffer size in bytes
}