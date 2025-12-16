---
title: "Built and deployed a newsletter in an afternoon"
date: "2023-12-02 00:00"
excerpt: "If you are a long-time reader of this blog, you might remember I already had a newsletter. It was built upon Revue. Revue was a platform that allowed users to..."
tags:
  - Programming
---


If you are a long-time reader of this blog, you might remember I already had
a newsletter. It was built upon Revue.

Revue was a platform that allowed users to build a newsletter effortlessly. It
had a user-friendly UI and, as a great plus, it offered an API, so you could
build custom interfaces and integrate them with your site.

Revue was later acquired by Twitter on January 26, 2021. After Elon Musk
~destroyed~ bought Twitter for the meme, and he decided to close it down.

Subsequently, I tried to find an alternative to my rather modest newsletter
needs, but couldn't find any that satisfied all my points.

At the start of this year, I added "build a newsletter" to my to-do list, but
never had some spare "mental bandwidth" to do it. Until the 1st of December 2023.

## The requirements

The list of requirements for this project is rather small:

- Users should be able to subscribe and unsubscribe easily;
- I should be able to Create Remove Update Delete (CRUD) a mail draft;
- I ultimately decide when to send the email;
- Users should be able to browse past issues.

Now it was time to sketch the inner workings.

![A working schematic](/posts/2023-12-02-newsletterquick/schematic.png)

## Deciding the stack

After laying down the foundation, it was now time to decide which tools to use
to build the product.

Since this site is built using the full-stack framework Next.JS, and content
is managed through Contentlayer, I just had to decide what to use to store
subscriptions and how to present past issues to the users.

At this time, I'm deploying this site on Vercel. Vercel offers a suite of
products to meet user needs, one of the products that caught my attention
is [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres).

Vercel Postgres is a managed PostgreSQL database. Since I'm familiar with
Postgres, I decided to add it to the mix. This project is pretty small, and I
didn't need an ORM, but, with the idea of building other features for this site,
I decided to go with Prisma because it has a type-safe query builder, and it
handles database migrations for me.

## Building

How simple can you make the database? Yes.

![Database](/posts/2023-12-02-newsletterquick/db.png)

It's just two tables, with one column each. No relationships.
I told you I had basic requirements.

The Prisma models are rather simple.

```prisma title="schema.prisma"
...
model Subscriber {
  email     String   @id
}

model LastSent {
  sent      String   @unique
}
...
```

Now I had to add a Contentlayer source to handle the issues.
I purposefully decided to use the filename of the issue to indicate the date
to minimize the number of custom fields needed (I just needed the title, later used as the email's subject).

```typescript title="contentlayer.config.js"
export const Newsletter = defineDocumentType(() => ({
  name: "Newsletter",
  filePathPattern: `newsletter/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
}));
```

From this point, building the past issues list was trivial.

```ts
const newsletterList = allNewsletters
  .sort((a, b) => {
    if (a._id < b._id) {
      return -1;
    }
    if (a._id > b._id) {
      return 1;
    }
    return 0;
  })
  .reverse()
  .map((newsletter, i) => (
    <Link
      href={`/${newsletter._id}`}
      key={i}
    >
      <p>{newsletter.title}</p>
    </Link>
  ))
```

You can find all the relative UI code [here](https://github.com/eliseomartelli/eliseomartelli.it/tree/b1a8d0e0abc8e3cbeffa1218a1326194a5ab27a6/src/app/newsletter).

It was time to tie it all together and start sending emails.

Firstly, I added three (well, to be honest, four) API routes to my next app:

- `/api/newsletter/subscribe/[email]`
- `/api/newsletter/unsubscribe/[email]`
- `/api/newsletter/send`
- `/api/newsletter/test`

Then I started writing some logic to make the newsletter work.

After retrieving the last newsletter from Contentlayer, I check if the email was already sent.

```ts
const sent = await prisma.lastSent.findFirst({
  where: {
    sent: { equals: newsletter._id },
  },
});
```

Consequently, I retrieve the list of subscribers and send the newsletter.

```ts
subscribers.map(async (e) => {
  await transporter.sendMail({
    from,
    to: e.email,
    subject: newsletter.title,
    html: newsletter.body.html,
  });
});
```

Similar logic is used for subscribe and unsubscribe API routes, obviously
changing the checks.

You can find the full code for the API routes [here](https://github.com/eliseomartelli/eliseomartelli.it/tree/b1a8d0e0abc8e3cbeffa1218a1326194a5ab27a6/src/app/api/newsletter).

Now I can own my newsletter infrastructure and I don't have to pay attention to
commercial decisions by millionaires.
