---
title: "Netflix Payments reminder with the help of Home Assistant"
categories: finance home-automation
published: true
---

Today's project aims at tracking the _invoices_ of a shared account thanks to [Home Assistant](https://home-assistant.io).  
For those of you that don't know what Home Assistant is, well, Home Assistant is a versatile home automation software that can integrate a lot of different devices. It's starting to become an essential part of my living areas thanks to its possibilities.  
And sometimes you _just_ wish that you could use it to automate people (just kiddin').

## Prerequisites

If you're reading this, it's probably too late and you've already got your feet wet with Home Assistant. Otherwise, you need an installation of Home Assistant. You can install it following the official documentation [here](https://www.home-assistant.io/getting-started/).  
You also need a Telegram bot, you can create one using Telegram's [@botfather](https://telegram.me/BotFather).

## Counting in Home Assistant

Home Assistant has a built-in way of counting _things_: the [counter](https://www.home-assistant.io/integrations/counter/) integration.  
This integration offers a way of storing an integer number and changing its value.  
We're going to setup this integration in our configuration.yaml file (situated in the root of our Home Assistant configuration folder).

```yaml
counter:
  netflix_user_0:
    initial: 0
    step: 4
    name: Mario
  netflix_user_1:
    initial: 0
    step: 4
    name: Luigi
  netflix_user_2:
    initial: 0
    step: 4
    name: Wario
```

## Scheduling counter's increments

In a _nutshell_, Home Assistant makes things happen through automations.
Automations are *pieces of code* that will run when something triggers it and/or some conditions are met.  
In a home automation system, they are the glue that can tie all of our devices together.  
Today we’ll use them to create a recurring task dedicated to incrementing our newly added counters.

{% raw %}

```yaml
automation:
  - alias: Increment Counter
    trigger:
      - platform: time
        at: "10:00:00"
    condition:
      - condition: template
        value_template: "{{ now().day == 25 }}"
    action:
      - service: counter.increment
        entity_id:
          - counter.netflix_user_0
          - counter.netflix_user_1
          - counter.netflix_user_2
```

{% endraw %}

As for the above example, our automation will be composed by three distinct parts:

1. A trigger;
2. A condition;
3. An action.

This automation will **check** every day at 10:00 am if the current day is the 25th of the month, if the **condition** is **true**, it will execute the **action** of incrementing the counters with the predefined step.

## Notify the people in the sharing group

An important part of this project is **notifying** your friends if there's a change on their "debts".
This part is tied to the messaging service of your choice.  
I consider myself lucky that our "sharing group" is on Telegram, widely supported by the official Home Assistant [integration](https://www.home-assistant.io/integrations/telegram/).

So, you might have guessed it, we're using **Telegram** today.

To configure this integration you have to put the following inside your configuration.yaml:

```yaml
telegram_bot:
  - platform: polling
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - YOUR_CHAT_ID
      - GROUP_CHAT_ID

notify:
  - name: NOTIFIER_NAME
    platform: telegram
    chat_id: GROUP_CHAT_ID
```

_You can get chat ids using [@chatid_echo_bot](https://t.me/chatid_echo_bot)._

## Sending messages to a Telegram group

After the setup of the Telegram platform we need to find a way to send notifications to our group.  
Let's assume we decide to send a message to our group every time we increment the counters.  
To do so we just need to **edit** our previous automation and add the following **action**:

{% raw %}

```yaml
- service: notify.netflix_group
  data_template:
    message: >
      ⚠️ Status:  

      {{ states.counter.netflix_user_0.name }}: € {{ states.counter.netflix_user_0.state }}  

      {{ states.counter.netflix_user_1.name }}: € {{ states.counter.netflix_user_1.state }}  

      {{ states.counter.netflix_user_2.name }}: € {{ states.counter.netflix_user_2.state }}
```

{% endraw %}

We're using **templates** so we can **dynamically** generate the message.

Reached this point, we can _call it a day_ and the basics of our system are now working. But at the moment we have no way to track _"automatically"_ if a user paid its _debt_.

## User input from Telegram inline keyboard

One of the options given by Telegram to interact with bots is the **inline keyboard**.  
Inline keyboards are a set of buttons _attached_ to a message sent by a bot.  
Each button _triggers_ a callback (to which Home Assistant can respond).

### Adding an inline keyboard to a message

![Screenshot of a Telegram chat showing the inline keyboard](https://i.ibb.co/xHLSbbQ/Screenshot-20200302-001437-01.jpg)

Adding an inline keyboard to a message is a _trivial_ operation, we just need to define our keyboard in our message.  
It can be done by editing the previous action by adding:

```yaml
data:
  inline_keyboard:
    - "User0:/dec0"
    - "User1:/dec1"
    - "User2:/dec2"
```

The **resulting action** will look something like that:

{% raw %}

```yaml
- service: notify.netflix_group
  data_template:
    message: >
      ⚠️ Status:  

      {{ states.counter.netflix_user_0.name }}: € {{ states.counter.netflix_user_0.state }}  

      {{ states.counter.netflix_user_1.name }}: € {{ states.counter.netflix_user_1.state }}  

      {{ states.counter.netflix_user_2.name }}: € {{ states.counter.netflix_user_2.state }}
    data:
      inline_keyboard:
        - "User0:/dec0"
        - "User1:/dec1"
        - "User2:/dec2"
```

{% endraw %}

### Reacting to Telegram callbacks

**We're almost there!** We have counters, buttons, automations and messages.  
Now we should let our friends notify our system with the buttons mentioned above.  
We have to **react** to their callbacks: according to the [official documentation](https://www.home-assistant.io/integrations/telegram_bot#sample-automations-with-callback-queries-and-inline-keyboards), we need another automation to react to the callbacks.

Our automation is gonna look like this one:

{% raw %}

```yaml
alias: Other Netflix Decrement Counter
trigger:
  - platform: event
    event_type: telegram_callback
    event_data:
      chat_id: GROUP_CHAT_ID
condition:
  - condition: template
    value_template: >
      {{ "/dec" in trigger.event.data.command }}
action:
  - service: counter.decrement
    data_template:
      entity_id: >
        counter.netflix_user_{{ trigger.event.data.command | replace("/dec", "") }}
```

{% endraw %}

The **condition** is there to **check** if the command that we received contains the string: "/dec".  
In the action we see another **template**, this one is used to get the right counter based on the button that got pressed.

### Updating the message

A possible solution to notify of the decrement is to send another message, but I'm not using this solution because it appears quite _"chatty"_ to me and I don't want to annoy my friends.  
Since Telegram supports **editing of messages**, I've opted to use this solution.
We just need to add another action to the previous automation.

{% raw %}

```yaml
- service: telegram_bot.edit_message
  data_template:
    message_id: "{{ trigger.event.data.message.message_id }}"
    chat_id: "{{ trigger.event.data.chat_id }}"
    title: "*Message edit*"
    message: >
      ⚠️ Status:  

      {{ states.counter.netflix_user_0.name }}: € {{ states.counter.netflix_user_0.state }}  

      {{ states.counter.netflix_user_1.name }}: € {{ states.counter.netflix_user_1.state }}  

      {{ states.counter.netflix_user_2.name }}: € {{ states.counter.netflix_user_2.state }}
    inline_keyboard:
      - "User0:/dec0"
      - "User1:/dec1"
      - "User2:/dec2"
```

{% endraw %}

## Final Steps

We're ready to deploy!  
Add your _new, and fresh baked_ Telegram bot to your sharing group.  
Your friends will be grateful for this simple and effective reminder 😇.
