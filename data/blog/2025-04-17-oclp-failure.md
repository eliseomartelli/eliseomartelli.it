---
title: "OCLP on my parent's Mac mini: a failure story"
date: 2025-04-17 17:00
excerpt: Please, don't make dumb decisions during holidays
tags:
  - Apple
  - Short
---

I returned home for the holidays a few days ago and decided to update my
parents' Mac mini, which was stuck on macOS 12 Monterey, to macOS Sequoia using
Open Core Legacy Patcher (having successfully done so on other Macs).

Unfortunately, yesterday, I made a foolish decision to update to macOS 15.4.1
via OTA. After the usual reboots, I was unable to get past the login screen on
the Mac mini because it crashed every time I tried to enter the password.

After some troubleshooting steps and reading the helpful and well-detailed
Dortania's Open Core guide, I booted into recovery mode, mounted the EFI
partition, and began editing the Open Core's config.plist. I first added the
argument `-igfxvesa` to the boot args because I noticed that on the login
window, transparencies were not working, so I thought it might be an issue with
the iGPU.

I booted back into recovery mode and tried `resetpassword` to set a shorter
password to at least attempt to gain access during the brief flashes of the
login screen. However, this didn't work either.

After some Google searches, I found this post [from the MacOS community on
Reddit](https://www.reddit.com/r/MacOS/comments/112qu36/macbook_pro_2019_16_safe_mode_login_screen_loop/),
that made me recall that my mother's profile picture is a Memoji, everything
suddenly _made sense_.

After hours of trial and error, countless reboots, and an ever-growing sense of
despair, I finally admitted defeat. As I type this, I'm reinstalling macOS
Monterey, defeated, because I was unable to change my mother's profile picture.
