---
title: "Using Ansible to deploy IoT devices"
categories: home-automation
published: true
---

This article is going to show you how an existing tool intended for completely different purposes can be used to automate the boring task of manually setting up and **mantain a fleet of IoT devices.**  
For those of you who don't know what [**Ansible**](https://www.ansible.com/) is, Ansible is an automation platform made for enterprises and for those in need of managing a big set of devices, usually servers.

## Getting our feet wet with Ansible

Ansible revolves around the concept of [_Infrastructure as Code_](https://en.wikipedia.org/wiki/Infrastructure_as_code) and provides a set of tools to manage said infrastructure.  
One advantage of pursuing to keep our configurations within Ansible is the ability to reproduce builds (configurations, in our case).

## Ansible's basic concepts

For the sake of simplicity, we're going to focus on **4 core concepts:**

1. Playbooks
2. Tasks
3. Modules
4. Inventory

### Playbooks

An Ansible Playbook is a YAML file that **describes** the state of the devices involved in the configuration and what tasks should be done.

### Tasks

Tasks in Ansible are the **actions** that will be executed.  
They run sequentially.

### Modules

Modules are used in tasks and they express the **"type" of action** that should be executed.

### Inventory

An inventory is a file that contains the hosts and the **groups** that should be targeted by our tasks.

After this little introduction, let's get to it!

## Prerequisites

To follow this tutorial you need at least one device with [**Tasmota**](https://tasmota.github.io/) already connected to our WiFi network (preferably with a fixed IP address).  
You also need a computer with **Python** and **git** installed.

## Installing Ansible

Installing Ansible is quite easy, many Linux distributions have it inside their repositories, you can also use **pip**, and type this tiny command:

```bash
pip install ansible
```

## Creating an inventory

To create an inventory you should create an _inventory_ file and then edit it with your preferred file editor.

An example file will look something like that:

```
[plugs]
192.168.0.10

[lights]
192.168.0.11
```

As you can see we use square brackets to define host groups.

### Using the inventory to store variables

Another great feature of the inventory is the ability to **store variables** that can be used inside tasks.

```
[plugs]
192.168.0.10    friendly_name="Bathroom Fan"

[lights]
192.168.0.11    friendly_name="Kitchen Downlight"
```

## Setup the Tasmota integration

Since Tasmota is not the typical use of Ansible we need to install a custom role to use the two systems together.

The role we're going to use today is Tobias Richter's ["Tasmota"](https://galaxy.ansible.com/tobias_richter/tasmota).

The command to install this role is:

```bash
ansible-galaxy install tobias_richter.tasmota
```

## Writing the playbook

Now it's time to write the playbook!  
Create a new file named _playbook.yaml_ and then open it with your file editor.  
Now we have to create our first _play._

We start by defining the group of hosts we want to target and then we have to disable the _gather_facts_ function, as for the [documentation](https://github.com/tobias-richter/ansible-tasmota#fact-gathering) of the custom role.

```yaml
- hosts: all
  gather_facts: no
```

We can now create our first task and give it a name:

```yaml
tasks:
  - name: Ensure device reports status
```

Next, we have to define what module we're going to use. For this custom role, we have to use the _include_role_ module.  
Our task will become something like that:

```yaml
tasks:
  - name: Ensure device reports status
    include_role:
      name: ansible-tasmota
```

Now it's time to **define** the command we're going to send to our devices.  
Edit your task as follows:

```yaml
tasks:
  - name: Ensure device is present
    include_role:
      name: ansible-tasmota
    vars:
      tasmota_commands:
        - command: Status
```

The resulting _playbook.yaml_ will look like this:

```yaml
- hosts: all
  gather_facts: no
  tasks:
    - name: Ensure device is present
      include_role:
        name: ansible-tasmota
      vars:
        tasmota_commands:
          - command: Status
```

Now we can run our playbook like this:

```bash
ansible-playbook -i inventory playbook.yaml
```

You can use this as a base to create more complex playbooks.

## Another example

Let's say we want to configure the MQTT connection of our devices, we can use a playbook that looks something like this:

```yaml
- hosts: all
  gather_facts: no
  vars_files:
    - default.yaml
  tasks:
    - name: Ensure template is set
      include_role:
        name: ansible-tasmota
      vars:
        - name: Ensure mqtt configuration is present
          include_role:
            name: ansible-tasmota
          vars:
            tasmota_commands:
              - command: Backlog
                value: "mqttuser <mqttuser>; mqttpassword <mqttpass>; mqttport 1883; mqtthost <mqtthost>;"
```

As you can see, using Ansible to **configure** a fleet of Tasmota devices is an **easy** task to setup and will help you manage your growing collection of smart devices in the long run.