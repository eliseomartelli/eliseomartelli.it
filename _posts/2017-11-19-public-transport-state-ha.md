---
title: My Cheap Smart Home Setup - How do I get the public transport status?
categories: iot automation diy
permalink: /iot/automation/diy/2017/11/19/public-transport-state-ha.html
---

Turin is a **great city** and I'm enjoying it.  
The only problem is that **I use public transport** for almost anything.  
Finding out that there's an _unexpected_ public transports _strike_ is always a **pain.**

**I had to solve this problem.**

Since I'm working on my Smart Home project, I decided to **include "strike data"** into it so when I wake-up in the morning and I look at my [Wall Mounted Controller](http://www.eliseomartelli.it/iot/automation/diy/2017/11/15/wall-mount-controller-homeassistant.html) I'll get to know the **status of the service**, I'll never get a nasty surprise.

<img style="max-width: 500px" src="https://i.imgur.com/QWWLoaP.png"/>

### The Route

**Public transportation in Turin** is mainly managed by [**GTT** (Gruppo Torinese Trasporti)](http://www.gtt.to.it/cms/) and they've a nice [page](http://www.gtt.to.it/cms/avvisi-e-informazioni-di-servizio) where they publish line changes, news and strikes.  
They also offer an **RSS feed** of this page [here](http://www.gtt.to.it/cms/avvisi-e-informazioni-di-servizio?format=feed&amp;type=rss).

Now we need to decide **how to get the data** to our Home Assistant instance.  
I decided to take the **IFTTT way.**

If you don't know IFTTT, well, **IFTTT** is a **easy** and **free** web-service you can use to create chains of conditional statements called **applets**.

Today we'll use two IFTTT **services**:

- RSS Feed;
- Web Hooks.

The first one will **read** the RSS feed, the second one will **post the data** to our Home Assistant instance.

### Setup

_You should be registered to IFTTT to continue_

1. **Open** [ifttt.com](http://ifttt.com) and login to your account;
2. **Click** on your account name on the top right and choose "New Applet";
3. **Click** on the "this" button;

  ![Imgur](https://i.imgur.com/oKNJoCD.png)
4. **Click** the "RSS Feed" tile;
5. **Click** the "New feed item matches" tile;
6. **Set** the keyword to the one used by your public transit company (in my case I use: "sciopero");
7. **Set** the Feed URL to the one your company publishes the info on;
8. **Click** on "Create trigger";
9. **Click** on the "that" link;
10. **Click** on the "Webhooks" tile;
11. **Click** on the "Make a web request" tile;
12. **Set** the URL to your Home Assistant API endpoint:
```
http://<YOUR HOMEASSISTANT IP>:8123/api/states/sensor.<YOUR SENSOR NAME>?api_password=<YOUR HOMEASSISTANT PASSWORD>
```
13. **Set** the method to "POST";
14. **Set** the Content Type to "application/json";
15. **Set** the body to:
```
    {
      "state": "{% raw %}{{EntryTitle}}{% endraw %}",
      "attributes": {
        "friendly_name": "<YOUR SENSOR FRIENDLY NAME>",
        "icon": "mdi:bus"
      }
    }
```
16. **Click** the "Create action" button;
17. You're **ready** to go!

The **next time** your public transportation company **posts** a strike notice you'll **get the info** in your Home Assistant instance.

<img style="max-width: 300px" src="https://i.imgur.com/JA5IxyC.png"/>
<br><br>

As you can see **IFTTT blends perfectly** with Home Assistant.

These two platforms can bring us **endless possibilities.**

You can **check** my Home Assistant configuration **files** [here](https://github.com/eliseomartelli/HomeAssistant-Config).

___

_Let me know what you think_ of this project and this article using the **comments** below or by hitting me up on [**Twitter**](http://twitter.com/eliseomartelli).
