---
title: Using Home Assistant to control computers through SSH
categories: iot automation diy
---

![](https://image.ibb.co/gispJp/Screenshot-2018-10-14-at-12-06-28.png)

Home Assistant is starting to take a nice shape here in my college bedroom and I'm trying to add even more commodities to it.  
The last one? Opening apps on my Mac Mini when I'm laying in bed at night.

Yesterday I was researching on how I could control my Mac remotely, but then I thought: "what if I use the tools that Apple baked in macOS?". SSH became the obvious choice.

That's the steps I took to make it possible:

1. Enable SSH on your computer. On a Mac you do this with _System Preferencess.app_

```
System Preferences.app > Sharing > Remote Login
```

2. On the machine that runs Home Assistant, generate a new key pair using the user that runs Home Assistant.

```
$ > ssh-keygen -t rsa
```

3. Then, appended the generated public key to the Mac authorized_keys file.

```
$ > cat .ssh/id_rsa.pub | ssh <mac_user>@<mac_ip> 'cat >> .ssh/authorized_keys'
```

4. Add something like that to your Home Assistant configuration file:

```
shell_command:
  open_website_fullscreen: ssh <mac_user>@<mac_ip> "open -a Google\ Chrome -n --args -app=<website_url>  --start-fullscreen"
```

5. Restart Home Assistant

Now you'll see the shell scommand expsed as a service.  
From now on you can add this service to your frontend, call it from your smart speaker or use it inside your automations.