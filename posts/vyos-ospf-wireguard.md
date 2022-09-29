---
title: "IDK"
date: "2022-09-28"
excerpt: Static routes out, OSPF in
---

My home network is getting another friend, and I wanted to share the experience of setting everything up with you.  
I already had a site-to-site VPN setup using Wireguard between three sites, but there was a little problem: I had to set up static routes between these sites. (And maintaining static routes is a big chore, a task no network administrator would like to be involved in).

<img src="/posts/vyos-ospf-wireguard/cover.svg" alt="Three routers connected over WAN" className=""/>

## Meet OSPF

OSPF is a routing protocol that operates inside an autonomous system (AS). OSPF is a link-state protocol that means that every router in the network knows the entire topology of the network. Each router calculates the best next hops from itself to every other possible destination. The list of best next-hops gets appended to the routing table.

OSPF networks are broken apart into _areas_. Area 0 (also called backbone area) is a particular type of OSPF area to which all other areas are connected. Routers in an area form adjacencies when they detect each other.

OSPF supports different operation modes, depending on what interface it is running on. The default operation mode is _broadcast_. Wireguard is an L3 point-to-point tunnel, which means we can't use broadcast. We have to resort to using the ["point-to-point"](https://datatracker.ietf.org/doc/html/rfc2328#page-130) operation mode.

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

## A _sprinkle_ of OSPF

As we stated, we have to configure our interfaces to run OSPF In point-to-point mode. Get a shell onto your router and:

```
rtr-01 $ configure
rtr-01 # edit interfaces wireguard wg01
rtr-01 # set ip ospf network point-to-point
rtr-01 # top
rtr-01 # copy interfaces wireguard wg01 ip to interfaces wireguard wg02 ip
rtr-01 # commit; save; exit
```

Follow the same steps on your other routers. Now we are at the fun part!

We are adding the 0.0.0.0 area on every router, telling the OSPF daemon which point-to-point networks are part of this area, and telling what routes the router should redistribute to every other router.

You know the drill, SSH to your favorite router first, and tell it what to do! Then, configure the other routers like this first one.

```
rtr-01 $ configure
rtr-01 # edit protocols ospf area 0.0.0.0
rtr-01 # set network 192.168.69.0/30
rtr-01 # set network 192.168.69.4/30
rtr-01 # set network 192.168.69.8/30
rtr-01 # set redistribute connected
rtr-01 # commit; save; exit
```

I'm not covering how to set up your firewall here since your configuration might be different than mine (I'm using zone-based firewall policies). Remember to accept traffic (from and to) the previously defined Wireguard interfaces.

## Let's check if everything is in its place

We have to check:

TODO

1. if neighbor relationships are formed;
2. link state database (show IP OSPF database);
3. routes are injected in the routing table.

## Filtering routes

We can use a routing policy to filter the redistributed routes from our routers.
A route map allows us to match a network or an interface (or an as-path, an extcommunity, a metric, a peer, a community, etc.).
For our purposes, we will permit the redistribution of networks attached to some interfaces.

Let's create a new policy:

```
rtr-01 $ configure
rtr-01 # edit policy route-map FilteredRoutes
rtr-01 # set rule 10 action permit
rtr-01 # set rule 10 match interface eth1
rtr-01 # commit
```

And now apply this policy to the redistribution configuration of the OSPF daemon:

```
rtr-01 # top
rtr-01 # edit protocols ospf redistribute connected
rtr-01 # set route-map FilteredRoutes
rtr-01 # commit; save; exit
```

## Bonus: (s)NAT

TODO

## Final checks

TODO

## Conclusion

![An image of Adele the singer, with "Hello from your OSPF neighbor" superimposed](/posts/vyos-ospf-wireguard/hello-from-your-ospf-neighbor.jpg)

And we are golden!  
Enjoy your brand new site-to-site VPN, and forget about adding static routes manually. OSPF will take care of that for you.
