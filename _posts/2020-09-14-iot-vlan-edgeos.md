---
title: IoT device segregation on EdgeOS
categories: networking
published: true
---

![Network Equipment](https://p0.pikist.com/photos/309/174/network-equipment-hardware-internet-data-server-communication-connection-datacenter.jpg)

Having a good firewall in place when building a home network is something that now is more important than ever. Traditionally, home firewalls were made to **protect** the internal **local network** from connection that could originate from the internet (That's what you expect from an ISP provided modem/router combo). In this day and age, thanks to the **fast rise** of **smart home** gadgets, our home networks are becoming more and more occupied by little computers usually running firmware that is **not possible to check** or manage. A firewall can help us mitigate the [potential issues](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=upnp) that can occur by using this kind of devices.

The intent of this article is to provide a **sensible** baseline **configuration** that you can expand to suit your own needs. These concepts can be applied on a variety of SOHO routers (check yor router for VLAN tagging support and firewall capabilities between different networks).

The router I've chosen to use for this post is the small and mighty [**Ubiquiti EdgeRouter X**](https://amzn.to/2FtPBv9), a five port router that's plenty capable of handling a medium-to-large home network without *breaking the bank*. This router runs a fork of Vyatta called **EdgeOS** as the stock operating system.
I've paired this device with a [**Unifi Access Point**](https://amzn.to/2DXEkm6) to satisfy all my Wi-Fi needs.

## High-level overview

The steps you need to take care of are the following:

1. **Create** a new **virtual interface** and assing it an IP address;
2. **Attach** the virtual interface to an ethernet port;
3. **Setup a firewall** to isolate this new interface from the rest of your network.

## EdgeOS specific configuration

To configure the EdgeRouter we are going to use the CLI. We are going to **start** a configuration session by typing "configure" into the shell.

1. **Create** a network group that targets [**RFC1918**](https://tools.ietf.org/html/rfc1918) networks:

    ```bash
    set firewall group network-group RFC1918 description 'RFC1918 ranges'
    set firewall group network-group RFC1918 network 192.168.0.0/16
    set firewall group network-group RFC1918 network 172.16.0.0/12
    set firewall group network-group RFC1918 network 10.0.0.0/8
    ```

2. Setup the firewall to **block** traffic to RFC1918 networks but allow DNS and DHCP:

    ```bash
    set firewall name IOT_IN_LOCAL default-action accept
    set firewall name IOT_IN_LOCAL description 'IOT In and Local ruleset.'
    ```

    2.1 We are going to **allow established and related** network traffic so that we can access the IOT devices from other networks.

    ```bash
    set firewall name IOT_IN_LOCAL rule 10 action accept
    set firewall name IOT_IN_LOCAL rule 10 description 'allow established/related'
    set firewall name IOT_IN_LOCAL rule 10 protocol all
    set firewall name IOT_IN_LOCAL rule 10 state established enable
    set firewall name IOT_IN_LOCAL rule 10 state related enable
    ```

    2.2 We can't forget to allow **DHCP** requests so that our devices can get an IP address. 
    It might be useful to allow **DNS** requests originating from our IOT VLAN too.

    ```bash
    set firewall name IOT_IN_LOCAL rule 20 action accept
    set firewall name IOT_IN_LOCAL rule 20 description 'Allow DNS'
    set firewall name IOT_IN_LOCAL rule 20 destination port 53
    set firewall name IOT_IN_LOCAL rule 20 protocol tcp_udp

    set firewall name IOT_IN_LOCAL rule 30 action accept
    set firewall name IOT_IN_LOCAL rule 30 description 'Allow DHCP'
    set firewall name IOT_IN_LOCAL rule 30 destination port 67
    set firewall name IOT_IN_LOCAL rule 30 protocol udp
    ```

    2.3 The last firewall rule we are going to setup is the one that **blocks** traffic going to our other private network(s).

    ```bash
    set firewall name IOT_IN_LOCAL rule 40 action drop
    set firewall name IOT_IN_LOCAL rule 40 description 'Drop RFC1918'
    set firewall name IOT_IN_LOCAL rule 40 destination group network-group RFC1918
    set firewall name IOT_IN_LOCAL rule 40 protocol all
    ```

3. **Create** a new **virtual interface** for the VLAN intended to be used by our IOT devices:

    ```bash
    set interfaces ethernet eth1 vif 32 address 10.0.32.1/24
    set interfaces ethernet eth1 vif 32 description IOT_VLAN
    set interfaces ethernet eht1 vif 32 mtu 1500
    ```

4. **Assign** the firewall ruleset to the *in* and *local* sides of the firewall.

    ```bash
    set interfaces ethernet eth1 vif 32 firewall in name IOT_IN_LOCAL
    set interfaces ethernet eth1 vif 32 firewall local name IOT_IN_LOCAL
    ```

5. Setup the **DHCP** server to listen to the requests coming from the new VLAN:

    ```bash
    set service dhcp-server shared-network-name IOT_VLAN authoritative disable
    set service dhcp-server shared-network-name IOT_VLAN subnet 10.0.32.0/24 default-router 10.0.32.1
    set service dhcp-server shared-network-name IOT_VLAN subnet 10.0.32.0/24 dns-server 10.0.32.1
    set service dhcp-server shared-network-name IOT_VLAN subnet 10.0.32.0/24 lease 86499
    set service dhcp-server shared-network-name IOT_VLAN start 10.0.32.10 stop 10.0.32.100
    ```

6. Setup the **DNS** forwarder to listen on this virtual interface:

    ```bash
    set service dns forwarding listen-on eth1.32
    ```

7. Configure the **mDNS repeater** to enable mDNS resolution from our other networks (useful for devices like the Chromecast).

    ```bash
    set service mdns repeater interface eth1
    set service mdns repeater interface eth1.32
    ```

8. **Save** your configuration with "commit" and then "save".

At this point you should now have a new VLAN that cannot see your other networks but can still access the internet.

---

Do you want to talk to me about projects, fun stuff and other things that might be interesting?

Hit me up on **[Twitter](http://twitter.com/eliseomartelli)**.

*Disclosure: this post contains one (or more) affiliate link. If you buy something through one of those links you won't pay anything more but I'll get a small commission that helps me mantaining this blog.*
