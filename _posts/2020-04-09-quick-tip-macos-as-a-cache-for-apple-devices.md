---
title: "Quick Tip: macOS as a cache for Apple Devices"
categories: home_networking
published: true
---
A cache server is a great tool to **speed up** recurring network requests (example: system updates) and reduce the overall used internet bandwidth. 

Today we'll see how to set-up a cache server for our Apple devices.

Let's say that you have multiple Apple devices on your network and you happen to have a macOS device **always powered on** (or a macOS vm, ed.), you can use the after-mentioned device as a cache for your other devices.

To **check** if it's possible to use your Mac as a caching server, run this command:

```bash
$ AssetCacheManagerUtil canActivate
```

If you get a "**yes**" as a response, you can set-up your cache server via this simple command:

```bash
$ sudo AssetCacheManagerUtil activate
```

Your devices will now discover this cache server automatically after a **reboot**.

\
You can find more information about this macOS feature [here](https://support.apple.com/guide/mac-help/manage-content-caching-command-line-mac-mchla6d4541e/mac).

- - -

Do you want to talk to me about projects, fun stuff and other things that might be interesting?

Hit me up on [Twitter](https://twitter.com/eliseomartelli).