---
title:  "A Little Hack For Android Dimensions"
date:   2016-05-26 12:46:35 +0100
categories: android development
permalink: /android/development/2016/05/26/android_dimensions_hack.html
---

If you write a lot of **UI** layouts for **Android** and your goal is making a [responsive Android App](https://medium.com/google-developers/building-a-responsive-ui-in-android-7dc7e4efcbb3), you surely faced the need of having something like “match_parent” or “wrap_content” in your Android Dimension Resources.

You might think of typing this:

![](https://cdn-images-1.medium.com/max/800/1*wD14kgt4YSNntMhEkLBxbg.png)

But it doesn’t work like this. And the compiler will let you know that **it doesn’t like what you’ve typed. 😡**

![](https://cdn-images-1.medium.com/max/800/1*PGdZAhA-41RikTV5wBeZUw.png)

We’ve to go a **little bit deeper** and see **how** the Android Source Code **manages LayoutParams.**

Looking to the [source code](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/java/android/view/ViewGroup.java) you can see that:

_MATCH_PARENT_ and _WRAP_CONTENT_ are two static final ints and they’re set respectively to -1 and -2.

When you set the width or the height to a view, **the value is stored in an _int_** (using px as a measurement unit).

**Px isn’t the only measurement unit.** Android uses a lot of them (dp, sp, mm) but most of them depends on other things such as the screen density. **Px is density independent and this is good for us!**

At this point you can **try putting -1px in place of match_parent** in one of your layouts and it will work as expected!

Observing this we can say that:
- MATCH_PARENT equals to -1px,
- WRAP_CONTENT equals to -2px.
Nice, uh?

## What you can do using this trick?

Using this trick you can build responsive apps exploiting the dimension resources xml file and resize things to reach your screen boundaries without recurring to Java but only using xml.

### Example:

![](https://cdn-images-1.medium.com/max/800/1*788-mHtIgkGtiUYXeM9uLA.png)

Go and **spread the word** 'cause we need to #BuildBetterApps!
