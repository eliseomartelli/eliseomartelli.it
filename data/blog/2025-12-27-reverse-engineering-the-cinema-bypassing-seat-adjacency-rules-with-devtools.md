---
title: 'Reverse Engineering the Cinema: Bypassing "Seat Adjacency" Rules with DevTools'
date: "2025-12-27 14:33:00"
excerpt: "Don't tell me where to sit!"
tags:
  - Misc
---

The Christmas season is here, and with it the tradition of gathering the family
for a movie.  
We have all been there: you navigate to the cinema’s booking
site, find that perfect row in the center of the theater, and click to select
your seats.

But instead of confirming, the website throws an error: "You cannot leave a
single seat empty" or "Please select adjacent seats."

It is a case of aggressive business logic interfering with user experience. The
site was enforcing a "no orphan seat" rule, forcing me to sit next to
strangers or pick a worse row, even though the seats I wanted were available.

So, instead of changing my seats, I changed the code. Here is how I used the
browser's debugger to get the seats I actually wanted.

## The Problem: Client-Side Validation

Websites often use JavaScript to validate user input before sending it to the
server. In this case, the cinema site was using JavaScript to check the
"geometry" of my seat selection in real-time.

The logic was simple: check the seats to the left and right of my selection. If
my choice created an "orphan" (a single empty gap), the function returned
`false`, triggering an error and preventing the seats from being added to the
cart.

Since this validation was happening entirely in my browser, I had full control
over it. I just needed to find the switch.

## The Hunt: Search, Trace, Locate

I searched the frontend source code for the specific Italian localization
string of the error message I was seeing. Once I found the error string, I
looked for the specific conditional statement that triggered it. That trigger
led me backwards to a specific validation function in the JavaScript bundle:
`scope.ic.checkJacketSeat`.

```javascript
// Original function snippet with added comments.
scope.ic.checkJacketSeat = function(seatIds) {
  // ...omitted code...
  var prevFree = false;
  var fromLeft = true;

  // Sort the row to scan usually
  row.sort(function (a, b) { return a.colonna - b.colonna; });
  
  for (var i = 0; i < row.length; i++) {
      // If we hit a selected seat, and the previous seat was "free" (a gap)
      // Then we are not anchored to the left.
      if (selectionIds[row[i].idposto] && prevFree) {
          fromLeft = false;
      }
      // "prevFree" is true if the seat is neither selected nor busy
      prevFree = !selectionIds[row[i].idposto] && !row[i].busy;
  }

  // ... (The code then repeats this logic for the Right side)

  // If we have gaps on BOTH sides, block the purchase.
  // THIS IS THE KEY CHECK WE WANT TO BYPASS!
  if (!fromRight && !fromLeft) {
      return false;
  }

  return true;
};
```

The logic is surprisingly simple. It scans the row from both directions. If
your selection is preceded by a "gap" (a seat that is neither sold nor selected
by you) on both the left and the right, it flags you as an invalid selection.

## The Fix: Bypass the Check

With the function located, I could now override it. Using the browser's DevTools.

1. I opened the Sources tab in DevTools and located checkJacketSeat.
2. I set a breakpoint right inside the function.
3. When I clicked my desired seat, the browser paused execution.
4. I stepped through the code until I reached the final check.
5. Just before the function returned, I modified the return value to `true`.

The UI immediately updated, marking the seats as valid (blue). The server,
trusting the client's validation, accepted the order without complaint.

If you are a developer, this is a gentle reminder: Client-side validation is a
suggestion, not a "law".

It is excellent for User Experience (giving instant feedback), but it is
useless for security or strict business logic enforcement. If you have strict
rules about seat spacing, they must be enforced on the server. Otherwise, a
user with a debugger is only a breakpoint away from sitting wherever they want.
