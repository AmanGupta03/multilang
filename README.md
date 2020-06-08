## Introduction
- It is docker based sandbox to run untrusted *Javascript*, *PHP*, *Python* scripts.
- Currently support **Python-3.8**, **Php-7.4**, **Node v14.0.0**. 

## Installation
* Navigate to multilang directory and execute **setup.sh** i.e run `./setup.sh`
* Add current user to docker group -:
   ```
   sudo groupadd docker
   sudo usermod -aG docker $(whoami) 
   newgrp docker 
   ```
* Enable cgroup swapping,
   - This can be done by adding
 `   GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1` to grub configuration file
     and then run `sudo update-grub`. 
     Reboot host device after that.
     For detailed description visit [https://www.serverlab.ca/tutorials/containers/docker/how-to-limit-memory-and-cpu-for-  docker-containers/] 
   

* Start server by `node server.js` 
  - If everything has been setup correctly, you will see the following message on your terminal
    ```
    Running at http://0.0.0.0:8000
    ```

## Supported OS
* Ubuntu 16.04, 18.04 LTS

## API Usage Examples
* **for dry running any code**
	- Post API
	- **http://52.249.249.121:5000/dryRun**
```
{
 "code":"a=$a  \n a; \n",
 "lang":"python",
 "vars":{"$a":2,"$b":3}
 }
 ```


* **For uploading Script**
	- Post API
	- **http://52.249.249.121:5000/uploadCode**
 ```
 {
    	"id":"5",
    	"varObj":["$a"],
    	"code":"<?php \n$value=$a; \n $a;?>",
    	"lang":"php"
	
 }
 ```
	

* **For running Script using its ID**
	- Post API
	- **http://52.249.249.121:5000/runInFlow**
```
{
    "id":"5",
    "vars":{"$a":2}	
}
```
