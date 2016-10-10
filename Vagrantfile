# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 80, host: 8082
  config.vm.network "forwarded_port", guest: 5432, host: 5435

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.customize ["modifyvm", :id, "--memory", "1024"]
    vb.customize ["modifyvm", :id, "--cpus", "1"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
    vb.name="social-app-api.local"
  end

  config.vm.provision "shell", path: "provision/provision.sh"

end
