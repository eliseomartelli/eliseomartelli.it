---
title: How to segregate internet of things devices using an ubnt edgerouter.
categories: networking
published: true
---

Having a good firewall in place when building a home network is something that now is more important than ever. Traditionally, home firewalls were made to protect the internal local network from connection that could originate from the internet (That's what you expect from an ISP provided modem/router combo). In this day and age, thanks to the fast rise of smart home gadgets, our home networks are becoming more and more occupied by little computers usually running firmware that is not possible to check or manage. A firewall can help us mitigate the [potential issues](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=upnp) that can occur by using this kind of devices.

The intent of this article is to provide a sensible baseline configuration that you can expand to suit your own needs. These concepts can be applied on a variety of SOHO routers (check for VLAN tagging support and firewall capabilities between different networs).

The router I've chosen to use for this post is the small and mighty [Ubiquiti EdgeRouter X](https://amzn.to/2FtPBv9), a five port router that's plenty capable of handling a medium-to-large home network without breaking the bank. This router runs a fork of Vyatta called EdgeOS as the stock operating system.
I've paired this device with a [Unifi Access Point](https://amzn.to/2DXEkm6) to satisfy all my Wi-Fi needs.

## High-level overview

The steps you need to take care of are the following:

1. Create a new virtual interface and assing it an IP address;
2. Attach the virtual interface to an ethernet port;
3. Setup a firewall to isolate this new interface from the rest of your network.

## EdgeOS specific configuration

Create a network group RFC1918
Firewall blocking RFC1918 but allowing dhcp and dns
Assign firewall to interface side
(bonus) setup traffic limitations.

---

Do you want to talk to me about projects, fun stuff and other things that might be interesting?

Hit me up on **[Twitter](http://twitter.com/eliseomartelli)**.

*Disclosure: this post contains one (or more) affiliate link. If you buy something through one of those links you won't pay anything more but I'll get a small commission that helps me mantaining this blog.*
