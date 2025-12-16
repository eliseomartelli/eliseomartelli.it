---
title: "How to self-host Bitwarden (with Docker)"
date: "2019-02-20"
excerpt: "A password manager is one of the most essential tools that a modern citizen of the internet should have. Learn how to self-host Bitwarden with Docker."
tags:
  - tutorial
  - privacy
  - selfhost
published: false
---




A **password manager** is one of the most essential tools that a modern *citizen* of the internet should have since 99.99% of services require one to provide a series of characters to later login.  
Managing passwords becomes more and more difficult if you want to meet **secure** standards. That's why, lately, password managers like Bitwarden, LastPass and 1Password are gaining traction with lots of users.  
My journey with password managers started a *long time ago* but now I've been using BitWarden for over an year and at the beginning of this month I've moved to a self hosted solution.

## The importance of self-hosting
Self-hosting, in this day and age, is an important practice that, if possible, should be adopted by more and more people.  
*It's not always fun and games* but tools like Docker can come to the rescue!  
There's nothing to loose going with a self hosted solution (ok, maybe time), but if you take a look at the vantages, worries should just fade away.

## Instructions

### 0. Requisites
- A computer or a NAS that you can use as a server;
- Some cli bravery;
- A router that can do port-forwarding (if you want to expose your instance to the internet).

### 1. Installing Docker

#### 1.1 On macOS (with Brew)
```
brew cask install docker
```
#### 1.2 On Windows (with Choco)
```
choco install docker-desktop
```
#### 1.3 On Linux
Every distro handles the installation of Docker in a slightly different way. Check out the [Docker's official doc](https://docs.docker.com/install/).

### 