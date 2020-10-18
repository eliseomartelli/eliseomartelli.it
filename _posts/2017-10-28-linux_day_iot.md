---
title:  "Linux Day IoT Talk"
date:   2017-10-28 12:46:35 +0100
categories: linux iot
permalink: /linux/iot/2017/10/28/linux_day_iot.html
---

This was my first [**Linux Day**](http://linuxdaytorino.org/2017/) in Turin, and I was _late_, like _very late_ (as always 😂  ).

I decided to attend the __IoT__ talk 'cause I'm interested about this topic.

The speaker, [@cesco_78](https://twitter.com/cesco_78), talked about how the tech companies are deploying a lot of devices, rapidly and they haven't so much worries about security and stuffs like that.

You can find the notes here:

### IoT
- It's a network of talking devices
- IoT devices are:
  - Sensors
  - Home Appliances
  - Vehicles
  - Thermostats
  - Complex Systems
- It's gaining a big momentum
- They aren't secure

### There're a lot of IoT devices
#### Problems
- IPv4 addresses aren't infinite.
- A lot of them are in mobility so 4G cells are full
- The range is a big problem

#### Solution
- SigFox
- LoRa

They're a Low Power Wide Area Network.
They use free frequencies.
The range is great.

LPWAN aren't Internet backed.

So a cluster of sensors is connected to a gateway. The gateway is then connected to internet.

#### SigFox
Less data and slow.

- Packets (Upstream) are of 12 bytes.
- Packets (Downstream) are of 8 bytes.

12 bytes/3 seconds

SigFox uses resellers and it's a commercial network.
The price is big and it's billed "per-device".

Western Europe is fully covered.

#### The advantages are:
- Low energy required;
- Free Roaming;
- Easy to use.

#### Compatible devices:
- MkrFox1200;
- Nettrotter BIB.

#### LoRa
- It's like SigFox for the tech specifications.
- It has unlimited data rates.
- It's an open standard.
- There are a lot of providers.

Choosing a low power, data service is difficult.
The decision has to be taken "per-project".

<hr>

### Alternatives
If you have a network (WiFi/3G/4G) and if you want to transfer data without using a lot of bandwidth you can use:

#### MQTT
Message Queue Telemetry Transport

- It has a little overhead;
- It uses the IP protocol;
- A lot of big players use it (Facebook, WhatsApp, ...).

It uses a broker, subscriber and publisher infrastructure.

- A broker lists topics.
- A subscriber can "subscribe" a topic.
- A publisher can "publish" on a topic.

Configuring a MQTT connection to/from a broker is dead simple.

<hr>

As you can see, IoT is a great thing.<br>
If we're able to avoid big manufactures we can get back our data.
