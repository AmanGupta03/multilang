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

## Supported OS -:
* Ubuntu 16.04, 18.04 LTS