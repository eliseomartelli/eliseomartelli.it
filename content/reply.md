---
title: "Reply to Post"
---

<form action="/api/contact/" method="POST" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; margin-bottom: 2rem; max-width: 500px;">
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Replying to:</strong>
    <input type="text" id="reply-post-title" name="post_title" readonly style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; background: rgba(0,0,0,0.05); color: inherit;" />
  </label>

  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Name</strong>
    <input type="text" name="name" placeholder="John Doe" required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; background: transparent; color: inherit;" />
  </label>

  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Email</strong>
    <input type="email" name="email" placeholder="john@doe.com" required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; background: transparent; color: inherit;" />
  </label>

  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <strong>Message</strong>
    <textarea name="message" rows="5" placeholder="Hi Eliseo, I'd like to tell you..." required style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; background: transparent; color: inherit; font-family: inherit;"></textarea>
  </label>

  <button type="submit" style="padding: 0.75rem; border-radius: 4px; background: var(--link-color, #a81d27); color: #fff; border: none; font-weight: bold; cursor: pointer; align-self: flex-start;">
    Send Reply
  </button>
</form>

<div style="margin-top: 2rem;">
  <h3>Want to say hi?</h3>
  <p>There's a general contact form for that! <a href="/contact/">Contact me</a>.</p>
</div>

<script>
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  if (title) {
    document.getElementById('reply-post-title').value = title;
  }
</script>
