---
title: 'Using Ansible to deploy IoT devices'
categories: home-automation
published: true
---

This article is going to show you how an existing tool intended for completely different purposes can be used to automate the boring task of manually setting up and mantain a fleet of IoT devices.  
For those of you who don't know what [**Ansible**](https://www.ansible.com/) is, Ansible is an automation platform made for enterprises and for those in need of managing a big set of devices, usually servers.

## Getting our feet wet with Ansible

Ansible revolves around the concept of [_Infrastructure as Code_](https://en.wikipedia.org/wiki/Infrastructure_as_code) and provides a set of tools to manage said infrastructure.  
One advantage of pursuing to keep our configurations within Ansible is the ability to reproduce builds(configurations in our case).

## Ansible's basic concepts

For the sake of simplicity, we're going to focus on 4 core concepts:

1. Playbooks
2. Tasks
3. Modules
4. Inventory

### Playbooks

An Ansible Playbook is a YAML file that describes the state of the devices involved in the configuration and what tasks should be done.

### Tasks

Tasks in Ansible are the actions that will be executed.  
They run sequentially.

### Modules

Modules are used in tasks and they express the "type" of action that should be executed.

### Inventory 

An inventory is a file that expresses the hosts and the groups that should be targeted by our tasks. 

After this little introduction, let's get to it!

## Prerequisites



___ 

Do you want to talk to me about projects, fun stuff and other things that might be interesting?

Hit me up on [**Twitter**](http://twitter.com/eliseomartelli).
