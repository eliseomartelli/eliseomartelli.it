---
title: "Unsubscribe Newsletter"
---

Are you sure you want to unsubscribe from the newsletter?

<form action="/api/newsletter/unsubscribe/" method="POST" style="margin-top: 1.5rem; max-width: 500px;">
  <input type="hidden" name="uuid" id="unsub-uuid-field" value="" />

  <p id="unsub-info">Click the button below to confirm unsubscribing.</p>

  <button type="submit" style="padding: 0.75rem 1.5rem; border-radius: 4px; background: #90151f; color: #fff; border: none; font-weight: bold; cursor: pointer;">
    Unsubscribe
  </button>
</form>

<script>
  // Parse ?uuid= from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get('uuid');
  if (uuid) {
    document.getElementById('unsub-uuid-field').value = uuid;
  }
</script>
