---
layout: post
title: My Cheap Smart Home Setup - How do I get the public transport status?
categories: iot automation diy
---

Turin is a great city and I'm enjoying it.  
The only problem is that I use public transport for almost anything.  
Finding out that there's an unexpected public transports strike is always a pain.

I had to solve this problem.

Since I'm working on my Smart Home, I decided to include "strike data" into it so when I wakeup in the morning and I look at my [Wall Mounted Controller](http://www.eliseomartelli.it/iot/automation/diy/2017/11/15/wall-mount-controller-homeassistant.html), I'll never get a nasty surprise.

<img style="max-width: 500px" src="https://i.imgur.com/QWWLoaP.png"/>

### The Route

Public transportation in Turin is mainly managed by [GTT (Gruppo Torinese Trasporti)](http://www.gtt.to.it/cms/) and they've a nice [page](http://www.gtt.to.it/cms/avvisi-e-informazioni-di-servizio) where they publish line changes, news and strikes.  
They also offer an RSS feed of this page [here](http://www.gtt.to.it/cms/avvisi-e-informazioni-di-servizio?format=feed&amp;type=rss).

Now we need to decide how to get the data to out Home Assistant instance.  
I decided to take the IFTTT way 
