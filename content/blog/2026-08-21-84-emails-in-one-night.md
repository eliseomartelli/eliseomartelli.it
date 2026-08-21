---



title: "84 Emails in One Night"
date: "2026-08-21 13:30:00+02:00"
excerpt: "My honeypot failed, so my site mailed me all night. Here is the postmortem."
tags:
  - Programming
  - Misc
description: "My honeypot failed, so my site mailed me all night. Here is the postmortem."
---

Last night the Mail app on my Mac woke me. The subject line was always the
same: "New message from Test". Again. And again. Eighty-four times.

This is the postmortem. All times are CEST. Quotes come from the saved emails
and from commit `4c9c425`.

| Time | Event |
| ---- | ----- |
| Wed 19, 19:52 | One probe message arrives. The name is "Victorina Cable". |
| Thu 20, 21:26 | The flood starts. |
| Fri 21, 01:54 | Seventy-seven messages later, the wave stops. |
| Fri 21, 02:01–02:21 | Six more messages slip through. |
| Fri 21, 02:46 | I push the fix, `chore: update honeypot`. |
| Fri 21, 03:15 | I go back to bed. |

This site is a static Hugo build on Vercel. Three forms POST to serverless
functions: `/api/contact/`, `/api/contact/feedback/`, and
`/api/newsletter/subscribe/`. Each function calls `sendEmail()` in
`api/_utils.js`. That helper sends mail through my SMTP relay with nodemailer.

The only defense was a honeypot field:

```html
<input type="url" name="website" tabindex="-1" autocomplete="off"
  style="position: absolute; left: -9999px; opacity: 0;" aria-hidden="true" />
```

Human visitors do not see the field. Bots see it and fill it. Or that was the
theory. The server checked the trap:

```js
if (payload.website) {
  return res.redirect(303, "/msg-sent/");
}
```

If `payload.website` contained text, the server skipped the send and showed a
fake success page. The bot read "success" and moved on. Neat design, on paper.

These bots did not fill every field. They filled exactly three: name, email,
and message. The name was "Test". The `website` field stayed empty. The trap
never fired.

So each submission produced one real email through my own relay. SPF passed.
DMARC passed. Of course they passed. The mail came from my infrastructure, and
my infrastructure is a legitimate sender. iCloud delivered the messages to the
inbox. My Mac made its little sound each time.

The content was boring. The bodies advertised a traffic service,
`boost-traffic.netlify.app`. Every message carried a different `Reply-To`
address. The addresses pointed to unrelated companies and domains. I did not
click the link, and I did not reply.

Commit `4c9c425`. I wrote it half asleep:

1. Rename the hidden field from `website` (type `url`) to `email`
   (type `email`).
2. Rename the visible email input to `user_contact_email`.
3. Point the server check at the new trap: `if (payload.email)`.
4. Read the real visitor address from `payload.user_contact_email`.
5. Apply the change to `/contact/`, `/feedback/`, and the newsletter box.
6. Switch on Vercel bot protection for the deployments.

The logic inverts the old trick. A bot must fill fields that look like an
email field, because the reply address is the whole point of form spam. A
hidden field named `email` now sits directly in the path. If the bot fills it,
the server shows the fake success page and drops the message.

This fix does not stop every bot. A careful bot reads the CSS, finds the
hidden field, and skips it. Then my inbox burns again. Vercel bot protection
now sits in front of the forms. A rate limit per IP address is the layer after
that.
