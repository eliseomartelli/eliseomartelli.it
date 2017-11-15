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
- Now we need to create a file called _appdaemon.yaml_  somewhere.  
  I decided to put it in my Home Assistant Configuration directory.
  ```
  cd /path/to/homeassistant/dir
  mkdir appdaemon
  cd appdaemon
  touch appdaemon.yaml
  ```
- Then we need to edit the appdaemon Configuration file.  
  ```
  nano appdaemon.yaml
  ```  
  The minimal configuration is something like that:
  ```
  AppDaemon:
    threads: 10
  HASS:
    ha_key: YOUR_HOMEASSISTANT_PASSWORD
    ha_url: YOUR_HOMEASSISTANT_URL
  ```
  You can copy-paste it and change the values accordingly to your needs.

Now that we have AppDaemon installed we need to daemonize it.

To daemonize it you need to:

//TODO: Here

Now we need to install HADashboard.

HADashboard will be the heart of our wall mounted panel.

To install it you need to:

- Edit the _appdaemon.yaml_ configuration file.
   Open it with the text editor of your choice.  
   Now we need to append to that file the HADashboard configuration.
   ```
   HADashboard:
     dash_url: http://YOUR_HA_IP:5050
   ```
