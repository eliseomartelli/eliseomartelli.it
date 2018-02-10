---
title: My Cheap Smart Home Setup - Wall Mounted Controller
categories: iot automation diy
permalink: /iot/automation/diy/2017/11/15/wall-mount-controller-homeassistant.html
---
**Smart Homes** (or bedrooms) are a **great conversation starters**, that's true only if **you're the one that controls them.**
When your **guests** aren't able to use your smart home setup **it ain't fun for them.**
The **solution**-route I decided to take is the one that includes a **_Wall Mounted Panel._**



<img src="https://i.imgur.com/Z06ipnW.jpg?1" style="max-width: 400px"/>

___

### Guide

To **make** this project you need:

#### Hardware

- **IKEA PLUTTS** (0.99$) [[LINK]](http://www.ikea.com/us/en/catalog/products/80347101/);
- Wall Adapter (Free with the tablet);
- El Cheapo **Android Tablet** (5$ from [Subito.it](http://subito.it), an italian Craiglist-like site).

#### Software (Raspberry Pi Side)

- **Home Assistant** (check out the guide [here](http://www.eliseomartelli.it/iot/automation/2017/11/09/cheap-smart-home-setup_1.html)).

#### Software (Android Tablet Side)

- [Google Chrome;](https://play.google.com/store/apps/details?id=com.android.chrome)
- [Hide System Bar.](https://play.google.com/store/apps/details?id=com.dreamori.hidebar)

_P.S.:_ You'll need to **root** your Android Tablet if you want to **hide the system bar.**

#### Installation of AppDaemon

**AppDaemon** is a sandboxed environment for writing **apps for Home Assistant.**  
You can find the documentation [here](http://appdaemon.readthedocs.io/en/latest/).

Here're the steps to install AppDaemon:

- We first need to **retrieve** the "appdaemon" package. You can use **pip3** to retrieve and install it.
  ```
  $ sudo pip3 install appdaemon
  ```
- Now we need to **create a file** called _appdaemon.yaml_  somewhere.  
  I decided to put it in my Home Assistant Configuration directory.
  ```
  cd /path/to/homeassistant/dir
  mkdir appdaemon
  cd appdaemon
  touch appdaemon.yaml
  ```
- Then we need to **edit** the appdaemon **configuration file**.  
  ```
  nano appdaemon.yaml
  ```  
  The **minimal** configuration is something like that:
  ```
  AppDaemon:
    disable_apps: 1
    threads: 10
  HASS:
    ha_key: YOUR_HOMEASSISTANT_PASSWORD
    ha_url: YOUR_HOMEASSISTANT_URL
  ```
  You can copy-paste it and change the values accordingly to your needs.

Now that we have AppDaemon installed we need to **daemonize** it.

To daemonize it you need to:

- **Create** a new file inside _/etc/systemd/system/_.
  ```
  $ sudo touch /etc/systemd/system/appdaemon.service
  ```
- Now we need to **edit** that file with the editor of our choice and describe our service.
  ```
  [Unit]
  Description=AppDaemon service for Home Assistant

  [Service]
  ExecStart=/usr/local/bin/appdaemon -c /path/to/homeassistant/dir

  [Install]
  WantedBy=multi-user.target
  ```
- We're almost done. We need to **activate our service.** To do so you've to type:
  ```
  $ sudo systemctl daemon-reload
  $ sudo systemctl enable appdaemon.service --now
  ```
- We're able to **start** the service now.
  ```
  $ sudo service appdaemon start
  ```

#### Installation of HADashboard

**HADashboard** will be the heart of our wall mounted panel.

To install it you need to:

- **Edit** the _appdaemon.yaml_ configuration file.
   Open it with the text editor of your choice.  
   Now we need to **append** to that file the HADashboard configuration.
   ```
   HADashboard:
     dash_url: http://YOUR_HA_IP:5050
   ```
- Now you've to **create some folders** inside the configuration directory.
  ```
  mkdir compiled
  mkdir compiled/css
  mkdir compiled/javascript
  mkdir compiled/html
  ```
- Finally we have to **make another folder** to store our dashboards.
  ```
  mkdir dashboards
  ```
- Now we've to **relaunch** the appdaemon service. We can do it by sending this command:
  ```
  $ sudo service appdaemon restart
  ```
- Fire up your browser and try to **load the dashboard url**, you should see a warning page.

You're all set! Now we have to **build our dashboards**. To learn how, follow this guide [[LINK]](http://appdaemon.readthedocs.io/en/latest/DASHBOARD_CREATION.html).

#### Creation of the wall mount

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed//fgMB4wWaEBU' frameborder='0' allowfullscreen></iframe></div>
#### Ready To Rock

Here're the **last steps!**

- **Snap** your tablet in your tablet mount;
- **Launch** Google Chrome and to to your dashboard URL;
- **Open** the menu and **click** "add to homescreen";
- **Close** Chrome and **launch** Hide System Bar;
- **Click** the "Hide System Bar" menu entry;
- **Close** Hide System Bar;
- **Click** on the dashboard shortcut.

You're **all set!**  
You've a **great** wall mounted house controller and your **friends and family will love it!**

___

**I'll** surely **post more** guides like this one when I'll get my hands on more **awesome devices.**

___

_Let me know what you think_ of this dashboard and this article using the **comments** below or by hitting me up on [**Twitter**](http://twitter.com/eliseomartelli).
