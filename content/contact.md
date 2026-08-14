---
title: "Get in touch"
---

I'd love to hear from you and learn more about how we can work together. Let's start a conversation and see where it takes us!

Just fill out the contact form below or send me an [email](mailto:info@eliseomartelli.it), and I'll get back to you as soon as possible.

<form action="/api/contact/" method="POST" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
  <input type="url" name="website" tabindex="-1" autocomplete="off" style="position: absolute; left: -9999px; opacity: 0;" aria-hidden="true" />
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Email</strong>
    <input type="email" name="email" placeholder="john.doe@example.com" required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem;" />
  </label>
  
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Name</strong>
    <input type="text" name="name" placeholder="John Doe" required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem;" />
  </label>
  
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Message</strong>
    <textarea name="message" rows="5" placeholder="Hi Eliseo, I'd like to tell you..." required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; font-family: inherit;"></textarea>
  </label>
  
  <button type="submit" style="padding: 0.75rem; border-radius: 4px; background: var(--link-color, #a81d27); color: #fff; border: none; font-weight: bold; cursor: pointer;">
    Send
  </button>
</form>
