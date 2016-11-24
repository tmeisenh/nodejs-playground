# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "vagrant-docker-node"

  config.vm.box_check_update = true 
  config.vm.network :forwarded_port, guest: 3000, host: 3000, host_ip: "127.0.0.1"

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "2048"
  end

  ## Provision docker-engine
  ## @see https://docs.docker.com/engine/installation/linux/ubuntulinux/
  ## May have to `vagrant plugin install vagrant-vbguest` on host
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y apt-transport-https ca-certificates
    apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
    echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" >> /etc/apt/sources.list.d/docker.list
    apt-get update
    apt-get purge lxc-docker
    apt-cache policy docker-engine
    apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
    apt-get install -y docker-engine
    usermod -aG docker vagrant
  SHELL

  config.vm.provision "shell", inline: <<-SHELL
    apt-get install build-essential cmake
    apt-get install python-dev python3-dev
  SHELL

  config.vm.provision "shell", privileged: false,  inline: <<-SHELL
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
  SHELL
end
