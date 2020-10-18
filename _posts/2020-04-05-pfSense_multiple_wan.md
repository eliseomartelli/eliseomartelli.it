---
title: How to use pfSense to load balance between two ISPs
categories: networking
published: true
---

Today's post aims at helping people that are working/studying from home and don't have a stable internet conection.  
Since me and my family are currently _staying at home_ we are __taxing our ADSL2+__ connection very hard with multiple simultaneous video conferences, so I had to find a way to keep all my family online.  
The way I've chosen to do that is using __multiple WANs__, one of them being over __LTE__.

<a href="https://ibb.co/DWQNfqz"><img src="https://i.ibb.co/LR1MdGY/Untitled-Artwork.png" alt="Untitled-Artwork" border="0"></a>

## Prerequisites

1. A pfSense box with __3+ network interfaces__;
2. A WAN and a LAN interface already configured inside pfSense;
3. A **4G/LTE modem** that connects over ethernet.

If you already have the prerequisites sorted out, let's get to balancing!

## Configure the additional interface

To start the _journey_ in load balancing, we'll start by telling our pfSense box where to find the interface that we will later use to connect our LTE router.

<a href="https://ibb.co/5TcLbHh"><img src="https://i.ibb.co/tBCDVrp/Screenshot-2020-04-05-at-21-36-07.png" alt="Screenshot-2020-04-05-at-21-36-07" border="0"></a>

To add an interface you need to open the **Assingnment** menu under **Interfaces**, select the desidered interface in the dropdown menu, and then click **add**.

<a href="https://ibb.co/rt33d3Z"><img src="https://i.ibb.co/wL77c7K/Screenshot-2020-04-05-at-21-36-51.png" alt="Screenshot-2020-04-05-at-21-36-51" border="0"></a>

We can now **configure** the chosen interface and assing it a name. In my case I had to setup the address of this interface with DHCP.

Now it's a right time to **plug** our 4G/LTE modem to our pfSense box.

At the bottom of the page I checked block private and bogus networks, then you can hit **save** and reload the configuration.

## Setup a multi-gateway

We're almost there!  
We have to **create a multi-gateway** that we'll later use to route our traffic through.  

<a href="https://ibb.co/0VXCMSH"><img src="https://i.ibb.co/yBR6y1H/Screenshot-2020-04-05-at-21-38-53.png" alt="Screenshot-2020-04-05-at-21-38-53" border="0"></a>

We need to set a network tier, remember that a **lower** number is **preferred**.  
If both interfaces share the same network tier, pfSense will balance packets on both of them.  
Remember to change the "Trigger Level" to "Packet Loss or High Latency" so you will always use the best connection. 

### Configure the firewall to use the multi-gateway

That's our **last step**! 
The last thing to do is to configure our LAN firewall to **route** connections to our new _gateway group_.  
We need to open the **Rules** page of our firewall, select our **LAN** interface.

Our rule will be a **"Pass"** rule that will be configured as following:

```
Interface: Lan
Protocol: Any
Source: Any
Destination: Any
```

<a href="https://ibb.co/fdqV7kv"><img src="https://i.ibb.co/4RKwx8d/Screenshot-2020-04-05-at-21-40-58.png" alt="Screenshot-2020-04-05-at-21-40-58" border="0"></a>

The last thing to do is going to the **advanced** section of our firewall rule and set the **gateway** to the previously created gateway group.

<a href="https://ibb.co/Jy7SPvd"><img src="https://i.ibb.co/Hxz9Qt2/Screenshot-2020-04-05-at-21-41-14.png" alt="Screenshot-2020-04-05-at-21-41-14" border="0"></a>

We're finally done!  
You can now go and test your load balanced network!

___ 

Do you want to talk to me about projects, fun stuff and other things that might be interesting?

Hit me up on [**Twitter**](http://twitter.com/eliseomartelli).

