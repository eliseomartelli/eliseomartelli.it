---
title: "IDK"
date: "2022-09-28"
excerpt: Static routes out, OSPF in
---

My home network is getting another friend, and I wanted to share the experience of setting everything up with you.  
I already had a site-to-site VPN setup using Wireguard between three sites, but there was a little problem: I had to set up static routes between these sites. (And maintaining static routes is a big chore, a task no network administrator would like to be involved in).

## Meet OSPF

OSPF is a routing protocol that operates inside an autonomous system (AS). OSPF is a link-state protocol that means that every router in the network knows the entire topology of the network. Each router calculates the best next hops from itself to every other possible destination. The list of best next-hops gets appended to the routing table.

It looks like the perfect candidate for our purposes. Another option we could use is RIP which has some advantages over OSPF in terms of resource utilization on the machine(s) running it but consumes more bandwidth since it transmits the entire routing table every 30 seconds. OSPF, on the other hand, sends only the entries of the routing table that changed.

## Network topology

The network has three routers in three different sites, connected with Wireguard over the internet. Each router connects to several networks. Only a subset of these networks should be advertised to other routers.

diagram here.

## Preparation

First things firsts, we have to establish the needed Wireguard tunnels.
We are adding an interface for each router pair for a specific reason: we need to set `AllowedIPs` to `0.0.0.0/0` for every peer. Wireguard [doesn't support](https://lists.zx2c4.com/pipermail/wireguard/2018-December/003704.html) having the same `AllowedIPs` on multiple peers on the same interface.

Quoting Wireguard's homepage:

> ...when sending packets, the list of allowed IPs behaves as a sort of routing table, and when receiving packets, the list of allowed IPs behaves as a sort of access control list....

Since we have three routers, we have to configure six interfaces, two for each router, spanning three point-to-point subnets.

As a first step, we decide on our subnets respecting [RFC1918](https://datatracker.ietf.org/doc/html/rfc1818). In my case, I can start playing with `192.168.69.0/24`.

```
                                             V
192.168. 69.  0    11000000.10101000.01000101.00000000

# Let's make 3 /30 subnets
                                                    V
192.168. 69.  0    11000000.10101000.01000101.000000 00
192.168. 69.  4    11000000.10101000.01000101.000001 00
192.168. 69.  8    11000000.10101000.01000101.000010 00
```

We can now start configuring our VyOS routers (I'm assuming you already have SSH or console access to the router and a WAN connection).

SSH to rtr-01:

```bash
rtr-01 $ generate wireguard named-keypairs link_01_to_02
rtr-01 $ generate wireguard named-keypairs link_01_to_03

# Take note of the pubkeys
rtr-01 $ show wireguard keypairs pubkey link_01_to_02
rtr-01 $ show wireguard keypairs pubkey link_01_to_03

rtr-01 $ configure

rtr-01 # edit interfaces wireguard wg01
rtr-01 # set address 192.168.69.1/30
rtr-01 # set private-key link_01_to_02
rtr-01 # set port 7878
rtr-01 # set description link_01_to_02
rtr-01 # set peer rtr-02 allowed-ips 0.0.0.0/0
rtr-01 # set peer rtr-02 pubkey <link_02_to_01 pubkey>

rtr-01 # top

rtr-01 # edit interfaces wireguard wg02
rtr-01 # set address 192.168.69.5/30
rtr-01 # set private-key link_01_to_03
rtr-01 # set port 7879
rtr-01 # set description link_01_to_03
rtr-01 # set peer rtr-02 allowed-ips 0.0.0.0/0
rtr-01 # set peer rtr-02 pubkey <link_03_to_01 pubkey>

rtr-01 # commit; save; exit
```

Now SSH to the other routers and apply the "same" configuration, changing addresses, ports and keys. To streamline the task, you can use your preferred automation tool. I'm using [Ansible](https://www.ansible.com).

Don't forget to allow the used ports on your firewall configuration.

At this time, you should be able to ping other routers connected at the other end of the tunnels. If everything is working, we can get to the OSPF configuration.
