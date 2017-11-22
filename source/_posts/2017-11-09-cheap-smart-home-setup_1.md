---
title: "My Cheap Smart Home Setup - Intro & Installation"
categories: iot automation
permalink: /iot/automation/2017/11/09/cheap-smart-home-setup_1.html
---
Oh, Hi! Welcome!  
This is my first **_"real"_** article after a long time.  
Today I'll talk about a topic I'm really enjoying lately.

**Smart Home** & Smart Home devices.

My journey in smart home technologies started a while ago but since I _moved to a new apartment_ (_#UniversityLife_), I had to _re-do_ and _re-think_ a lot of things.

My new setup should be: **portable** (so it can move with me), **unintrusive** ('cause it should blend in the environment) and **cheap** ('cause money aren't unlimited).

### Hardware Side
I've decided to use a _hardly-constrained_ hardware platform. A **Raspberry Pi Zero W**.

The **Raspberry Pi Zero W isn't** what I define a _"power-house"_.
It's a **great** little device and it has great **potentialities for its price**.

<img src="https://c2.staticflickr.com/4/3735/33209069075_99e08d84ec_b.jpg" style="max-width: 400px"/>

**If you aren't familiar** with its **specs** the list below should help you understand its capabilities.
- 1GHz, **single-core CPU**;
- 512MB **RAM**;
- Mini HDMI and USB On-The-Go ports;
- Micro USB power;
- **40-pin header**;
- Composite video and reset headers;
- CSI camera connector.

And for the **wireless** side:
-  **802.11 b/g/n** wireless LAN;
-  **Bluetooth** 4.1;
-  Bluetooth Low Energy (BLE).

As you can see the RPi Zero W is a great little device and its ports are a _godsend_ for my Smart Home needs.

### Software Side

After years of [**OpenHab**](https://www.openhab.org), I finally _decided to switch_ platform.  
My new platform of choice is [**Home Assistant**](http://home-assistant.io).

#### What's Home Assistant?
**Home Assistant** is an _open-source_ smart home platform written in **Python**.
It's a really _cool_ piece of software and you can **extend it endlessly**.

It's _Raspberry Pi-Friendly_ and it has a great _material design inspired_ web interface.

The only **downside** is that it's _configuration-files heavy_ and it's not so _beginner friendly_.

If you _wrap your head_ around it you can build **a lot of great things** with it.

#### Installation

After figuring out the software we need, it's time to **install it**.

Since **I want to run other things on my Raspberry Pi**, I decided to take the [Hassbian](https://home-assistant.io/docs/installation/hassbian/) route.

**Hassbian** is a special flavor of Raspbian that's already _configured_ and _optimized_ to run Home Assistant.

_This guide is valid for November 2017, please reefer to the [official guide](https://home-assistant.io/docs/installation/hassbian/installation/)._

To install **Hassbian** you need:
- A Raspberry Pi;
- A Computer (I'm using a Linux machine);
- A Micro SD Card (>= 4Gb).

So here are the **steps** to follow:

1. **Download** the Raspbian image from the Home Assistant site. [[Direct Link]](https://github.com/home-assistant/pi-gen/releases/latest);
2. **Plug** the Micro SD card to your computer;
3. **Write the Image** to the Micro SD card.
  - On a Mac/Linux you can use dd as follows:
  ```
  dd if=<raspbian_img_file> of=<your_device> bs=4M
  ```
  - On Windows you can use Win32DiskImager or Etcher. Follow the official guide.
4. Now you've to decide how to **connect** your RPi to the network.
  - If you wanna take the **ethernet** way just plug your cable.
  - If you wanna take the **Wi-Fi**, follow the guide below.
5. **Boot** your Raspberry Pi;
6. Wait Home Assistant to **install** itself.

##### Connect to a Wi-Fi network
1. **Mount** your Micro SD card "boot" partition on your machine;
2. Create a new _wpa_supplicant.conf_ file and put in it:
  ```
    country=<YOUR_COUNTRY_CODE>
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1

    network={
      ssid="YOUR_SSID"
      psk="YOUR_PASSWORD"
    }
  ```
3. **Save** the file;
4. **Put** the Micro SD in your PI.

Now that you have Home Assistant **installed** on your Pi you can play with it by reading the [**documentation**](https://home-assistant.io/docs/).

#### A little intro to my setup
My setup right now is _pretty basic_.  

I have a *DHT22* sensor connected to my Raspberry Pi Zero W that's able to monitor *temperature* and *humidity* of my bedroom.

The *outlets* I use to control my appliances are some generic **433Mhz** ones.  
You can buy a 3-pack of them for around 20€.
It's fairly easy to control them using a **433Mhz transmitter** connected to the PI.

To control my main bedroom light I use a **433Mhz lamp holder.**

The **cost** of this "smart-home" project floats around 45€ (including the RPi Zero W).

As you can see it's **simple** to bring down the _entry point_ of smart home devices.

Considering that a [**Philips Hue Kit**](http://amzn.to/2jdcaJa) **costs** around **80€** and after that you're __locked__ down to only a platform, **the benefits** of running your Home Automation Hub **are pretty clear**.

_I'll write more_ about my home automation project explaining things in depth when _I'll reach a "ready for production" state._

___

_Let me know what you think_ of Home Assistant and this article using the **comments** below or by hitting me up on [**Twitter**](http://twitter.com/eliseomartelli).
