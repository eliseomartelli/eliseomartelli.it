---
layout: post
title: My Cheap Smart Home Setup - Wall Mounted Controller
categories: iot automation diy
---
Smart Homes (or bedrooms) are a great conversation starters, only if you're the one that controls them.  
When your guests aren't able to use your smart home setup it ain't fun for them.
The solution-route I decided to take is the one that includes a Wall Mounted Panel.

___

### Guide

To make this project you need:

#### Hardware

- IKEA PLUTTS (0.99$) [[LINK]](http://www.ikea.com/us/en/catalog/products/80347101/);
- Wall Adapter (Free with the tablet);
- El Cheapo Android Tablet (5$ from [Subito.it](http://subito.it), an italian Craiglist-like site).

#### Software (Raspberry Pi Side)

- Home Assistant (check out the guide [here](http://www.eliseomartelli.it/iot/automation/2017/11/09/cheap-smart-home-setup_1.html)).

#### Software (Android Tablet Side)

- [Google Chrome;](https://play.google.com/store/apps/details?id=com.android.chrome)
- [Hide System Bar.](https://play.google.com/store/apps/details?id=com.dreamori.hidebar)

P.S.: You'll need to root your Android Tablet if you want to hide the system bar.

#### Installation of AppDaemon

AppDaemon is a sandboxed environment for writing apps for Home Assistant.  
You can find the documentation [here](http://appdaemon.readthedocs.io/en/latest/).

Here're the steps to install AppDaemon:

- We first need to retrieve the "appdaemon" package. You can use pip3 to retrieve and install it.
  ```
  $ sudo pip3 install appdaemon
  ```
