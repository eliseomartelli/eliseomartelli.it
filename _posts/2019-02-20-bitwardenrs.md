---
title: 'How to self-host Bitwarden (with Docker)'
categories: tutorial privacy selfhost
published: false
---
<style>
    #header {
        background: #3c8dbc;
        width: 100vw;
        position: relative;
        min-height: 380px;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
    }
    #header svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
<div id="header">
    <svg width="252" height="252" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 960v-640h-448v1137q119-63 213-137 235-184 235-360zm192-768v768q0 86-33.5 170.5t-83 150-118 127.5-126.5 103-121 77.5-89.5 49.5-42.5 20q-12 6-26 6t-26-6q-16-7-42.5-20t-89.5-49.5-121-77.5-126.5-103-118-127.5-83-150-33.5-170.5v-768q0-26 19-45t45-19h1152q26 0 45 19t19 45z" fill="#fff"/></svg>
</div>

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