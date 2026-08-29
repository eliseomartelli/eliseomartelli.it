---
title: "Feedback"
---

# Feedback

<form action="/api/contact/feedback/" method="POST" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
  <input type="email" name="email" tabindex="-1" autocomplete="off" style="position: absolute; left: -9999px; opacity: 0;" aria-hidden="true" />
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Message</strong>
    <textarea name="message" rows="5" placeholder="Your message..." required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;"></textarea>
  </label>

  <button type="submit" style="padding: 0.75rem; border-radius: 4px; background: var(--link-color, #a81d27); color: #fff; border: none; font-weight: bold; cursor: pointer;">
    Send
  </button>
</form>

## Data collected

- The message you're sending.

I don't collect any more data than the message you are sending, by design.

## Why not something third party?

- Not fun enough. I like to build things.
- Privacy implications. You can check the [source code](https://github.com/eliseomartelli/eliseomartelli.it) of this web application to see what I'm collecting.

## Want to say hi?

There's a form for that! [Contact me](/contact/).
