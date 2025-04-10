---
title: Configuring Nebula, a simple overlay networking tool
date: "2020-05-01 00:00:00"
excerpt: Overlay networking that scaaaaaaaaaales
tags:
  - Network
---

VPNs are one of the preferred ways to tie-up multiple servers (and clients) together, but their nature becomes a **bottleneck** when the infrastructure to _link_ becomes larger.\
A solution to this problem comes in the form of a software defined network **(SDN)**.

**[Nebula](https://github.com/slackhq/nebula)** (from SlackHQ) addresses this problem by providing software that helps you build a point-to-point network between devices that can be situated (almost) anywhere in the world!

The communication between devices is encrypted using the [Noise Protocol Framework](https://noiseprotocol.org/), the same used by Signal.

And you know what's great? Nebula is completely **open source!**

## Nebula Vocabulary

Nebula's vocabulary is not so different from normal networking, you should only get accostumed to two terms:

- lighthouse;
- node.

**Lighthouse** is the term used by Nebula to address **nodes** that are publicly routable.\
A node connects first to the **lighthouse**, then it discovers the most efficent path to reach other nodes on the network.

## Configuring Nebula

Let's get to the fun part!

As stated earlier, to run a Nebula Lighthouse you need a machine with a **publicly routable** IP address, if you don't have one, a little 5\$ Droplet on [DigitalOcean](https://m.do.co/c/33e2f0a1e231) will do just fine.\
This guide will show you how to run Nebula **as a regular user**, in constrast with the official documentation that assumes you will run Nebula as the root user.

On the machines you'd like to attach to Nebula, you need to **download the binary** from the release page on GitHub and then extract it using _tar_.

```console
$ curl -OL https://github.com/slackhq/nebula/releases/download/v1.2.0/nebula-linux-amd64.tar.gz
$ tar xzvf nebula-linux-amd64.tar.gz
```

Now you need to **move the Nebula binary** to /usr/bin/ and set the right permissions.\
You can do it manually or you can use the _[install](https://man.cx/install)_ command.

```console
# install ./nebula /usr/bin
```

Since we don't want to run Nebula as root, it's the right time to add a _system_ user (so it's **hidden** from your login manager) for Nebula.\
This new user doesn't need a _home_ directory, so we're instructing the _useradd_ command to not create one.

```console
# useradd --system --no-create-home nebula
```

Following the [Filesystem Hierarchy Standard](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) that states that configuration files should reside in the /etc directory, we're going to **create the directories** to store configuration files and certificates that are related to Nebula.

```console
# mkdir /etc/nebula
# mkdir /etc/nebula/certs
```

To instantiate a Nebula network you have to **generate a Nebula Certificate authority**, preferably on another host so you can keep your private key secure. Remember to copy the certificate to your hosts!

```console
$ ./nebula-cert ca -name "My really cool organization"
$ scp ca.crt user@<hostname>:/etc/nebula/certs
```

Make sure to **keep the ca.key file in a safe place**, you will need it if you want to add other hosts to your network.

**Generate a keypair** for each host you'd like to connect to your Nebula network and copy the pair to your Nebula's hosts:

```console
$ ./nebula-cert sign -name "mylighthouse" -ip "192.168.100.1/24"
$ scp mylighthouse.crt user@<hostname>:/etc/nebula/certs
$ scp mylighthouse.key user@<hostname>:/etc/nebula/certs
```

It's time to configure Nebula!\
**Create a configuration file** inside the previously created directory and open it with your text editor of choice. I've deviced to put my configuration in /etc/nebula/config.yml.
The configuration will look a bit different depending by the node, for example, my Lighthouse node is sporting this configuration:

```yaml title="/etc/nebula/config.yml (lighthouse)"
pki:
  ca: /etc/nebula/certs/ca.crt
  cert: /etc/nebula/certs/mylighthouse.crt
  key: /etc/nebula/certs/mylighthouse.key

lighthouse:
  am_lighthouse: true

listen:
  host: 0.0.0.0
  port: 4242

punchy:
  punch: true

tun:
  dev: nebula1
  drop_local_broadcast: false
  drop_multicast: false
  tx_queue: 500
  mtu: 1300
  routes:
  unsafe_routes:

firewall:
  conntrack:
    tcp_timeout: 120h
    udp_timeout: 3m
    default_timeout: 10m
    max_connections: 100000

  outbound:
    # Allow all outbound traffic from this node
    - port: any
      proto: any
      host: any

  inbound:
    # Allow icmp between any nebula hosts
    - port: any
      proto: icmp
      host: any
```

On my other nodes, the configuration looks something like this:

```yaml title="/etc/nebula/config.yml (nodes)"
pki:
  ca: /etc/nebula/certs/ca.crt
  cert: /etc/nebula/certs/mynode.crt
  key: /etc/nebula/certs/mynode.key

static_host_map:
  "192.168.100.1": ["<lighthouse_public_ip>:4242"]

lighthouse:
  hosts:
    - "192.168.100.1"

punchy:
  punch: true

tun:
  dev: nebula1
  drop_local_broadcast: false
  drop_multicast: false
  tx_queue: 500
  mtu: 1300
  routes:
  unsafe_routes:

firewall:
  conntrack:
    tcp_timeout: 120h
    udp_timeout: 3m
    default_timeout: 10m
    max_connections: 100000

  outbound:
    # Allow all outbound traffic from this node
    - port: any
      proto: any
      host: any

  inbound:
    # Allow icmp between any nebula hosts
    - port: any
      proto: icmp
      host: any
```

Note that **nodes** need to **define their "Lighthouse".**

To make our "nebula" user the owner of the /etc/nebula directory, we have to change the ownership of it. We should also change the permissions of the certificats to something less permissive.

```console
# chown -R nebula:nebula /etc/nebula
# chmod 600 /etc/nebula/certs/*
```

We're almost done! The second-last thing to do is to add the _NET_CAP_ADMIN_ capability to the Nebula binary since it needs to be able to create a new interface on the system.

```console
# setcap cap_net_admin=+pe /usr/bin/nebula
```

For our last step, we run Nebula as the nebula user on our hosts.

```console
# su nebula
$ nebula -config /etc/nebula/config.yml
```

To **test Nebula** open a new shell and try to ping another machine on the Nebula network, _it's almost magical_.

## Nebula as a Systemd unit

A natural step to take after you've tested Nebula is to **run it as a service** so you don't need to start it manually each time you need it. Well, nothing could be simpler!\
You just have to create and edit a Systemd unit. An example can be found below:

```ini title="/etc/systemd/system/nebula.service"
[Unit]
Description=Nebula Service
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=nebula
ExecStart=/usr/bin/nebula -config /etc/nebula/config.yml

[Install]
WantedBy=multi-user.target
```

Note that this Systemd unit runs Nebula with the "nebula" user and starts just after reaching the network target.

Now you need to **reload** configuration files for the daemons on your system so Systemd can pick-up the new unit:

```console
# systemctl daemon-reload
```

You can now **enable** the Nebula service so it starts automatically after a reboot. If you're not going to reboot, remember to **start** the service manually. 😉

```console
# systemctl enable nebula.service
# systemctl start nebula.service
```

---

#### Update: Launchd on macOS

If you want to run Nebula as a daemon on **macOS**, create and edit a launchd plist file as follows:

```xml title="/Library/LaunchDaemons/com.nebula.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
      <key>Label</key>
      <string>/usr/local/bin/nebula</string>
      <key>LaunchOnlyOnce</key>
      <true/>
      <key>ProgramArguments</key>
      <array>
          <string>/usr/local/bin/nebula</string>
          <string>-config</string>
          <string>/etc/nebula/config.yml</string>
      </array>
      <key>RunAtLoad</key>
      <true/>
  </dict>
</plist>
```

Remember to load this new daemon:

```console
# sudo launchctl load /Library/LaunchDaemons/com.nebula.plist
```

Oh, nice to see you here!  
If you've reached the end of this post you can now enjoy your _freshly baked_ SDN!

<AffiliateDisclosure />
