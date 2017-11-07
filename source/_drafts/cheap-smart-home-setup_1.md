---
layout: post
title: "My Cheap Smart Home Setup - Intro"
categories: iot automation
---
Oh, Hi! Welcome!  
This is my first **_"real"_** article after a long time.  
Today I'll talk about a topic I'm really enjoying lately.

**Smart Home** & Smart Home devices.

My journey in smart home technologies started a while ago but since I moved to a new apartment (_#UniversityLife_), I had to re-do and re-think a lot of things.

My new setup should be: portable (so it can move with me), unintrusive ('cause it should blend in the environment) and cheap ('cause money aren't unlimited).

### Hardware Side
I've decided to use a hardly - constrained hardware platform. A Raspberry Pi Zero W.

The Raspberry Pi Zero W isn't what I define a "power-house".
It's a great little device and it has great potentialities for its price.

If you aren't familiar with its specs the list below should help you understand its capabilities.
- 1GHz, single-core CPU;
- 512MB RAM;
- Mini HDMI and USB On-The-Go ports;
- Micro USB power;
- 40-pin header;
- Composite video and reset headers;
- CSI camera connector.

And for the wireless side:
-  802.11 b/g/n wireless LAN;
-  Bluetooth 4.1;
-  Bluetooth Low Energy (BLE).

As you can see the RPi Zero W is a great little device and its ports are a godsend for my Smart Home needs.

### Software Side

After years of [OpenHab](https://www.openhab.org), I finally decided to switch platform.  
My new platform of choice is [Home Assistant](http://home-assistant.io).

#### What's Home Assistant?
Home Assistant is an open-source smart home platform written in Python.
It's a really cool piece of software and you can extend it endlessly.

It's Raspberry Pi - Friendly and it has a great material-design inspired web interface.

The only downside is that it's "configuration-files heavy" and it's not so beginner friendly.

If you wrap your head around it you can build a lot of great things with it.

#### Installation

After figuring out the software we need it's time to install it.

Since I want to run other things on my Raspberry Pi I decided to take the [Hassbian](https://home-assistant.io/docs/installation/hassbian/).

Hassbian is a special flavor of Raspbian that's already configured and optimized to run Home Assistant.
