---
title: YouTube's PiP but with ⌥+P
date: 2023-04-27 22:00
excerpt: I don't want to right click on videos.
tags:
  - Misc
  - Short
---

I was watching a video on YouTube and I realized that there wasn't a way to invoke the picture-in-picture functionality with a shortcut (at least on Safari 16.4).  
My fingers rested on ⌥+P, so it made sense to add a shortcut to toggle the picture-in-picture with that key combination.

Since I'm already using UserScripts, the most straightforward thing to do was writing an userscript.

<Product title={<>
<img src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/c1/4f/47/c14f4735-d7be-1199-a6e7-6701e1d28bfa/AppIcon-85-220-4-2x.png/246x0w.webp" width="48rem" alt="UserScripts icon"/> UserScripts
</>}
link="https://apps.apple.com/it/app/userscripts/id1463298887" linkText="Open">
An open source Safari extension that lets you save and run arbitrary bits of JavaScript (and CSS) code for the websites you visit.
</Product>

The code is pretty simple, but it gets the job done and, most importantly, saves me a few clicks.

```js
/**
 * Key combination to use.
 *
 * @param {KeyboardEvent} e - Keyboard Event
 */
const KEY_COMBINATION = (e) => e.code === "KeyP" && e.altKey;

(function () {
  "use strict";
  const video = document.querySelector("video");
  document.onkeydown = (e) => {
    if (KEY_COMBINATION(e)) {
      const isPiP = document.pictureInPictureElement !== null;
      video.webkitSetPresentationMode(isPiP ? "inline" : "picture-in-picture");
    }
  };
})();
```

If you are using an extension that supports userscripts, you can install this extension using the box below.

<Product title="YouTube PiP Shortcut" link="https://raw.githubusercontent.com/eliseomartelli/UserScript-YouTube-PiP/main/yt-pip.js" linkText="Install">
Open PiP in YouTube with a shortcut
</Product>
