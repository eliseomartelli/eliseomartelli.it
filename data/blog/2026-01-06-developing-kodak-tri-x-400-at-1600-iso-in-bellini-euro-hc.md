---
title: Developing Kodak Tri-X 400 at 1600 ISO in Bellini Euro HC
date: "2026-01-06 09:20:00"
excerpt: "Breaking Bad in the Darkroom"
tags:
  - Photography
---

Many of you might know that I've recently started shooting more film, and I've 
fallen in countless deep rabbit holes, like [scanning](/blog/2025-11-12-scanning-workflow). 
But one of the most exciting aspect of film photography, for me, is the darkroom
process itself.

I've already experimented developing Harman's Kentmere 400 but I have to
perfect my process for it. Today I want to share my approach to developing
Kodak Tri-X 400 pushed to 1600 ISO.

I develop in a [Lab-Box](https://www.ars-imago.com/en/lab-box). It’s partly
similar to the [Agda Rodinax (link in
italian)](https://www.gerardobonomo.it/2020/08/03/sviluppiamo-una-pellicola-con-la-tank-daylight-agfa-rondinax-in-pieno-sole/),
that solves the darkroom-less problem, but since I want to save water and
chemicals, I opted to introduce a new variable: **continuous agitation**, that
changes the way the chemistry interacts with the silver in the film.

### The Calculation

There's no standard time for Tri-X in [Bellini Euro
HC](https://www.bellinifoto.it/wp-content/uploads/2021/10/EURO-HC.pdf)
(Dilution B). What I did was to go to [Massive Dev Chart](https://www.digitaltruth.com/devchart.php?Film=Kodak+Tri-X+400&Developer=HC-110%25&mdc=Search&TempUnits=C&TimeUnits=D) for Kodak Tri-X and
find the time for HC-110 at 1600 ISO, wich is **16:00** at 20°C, dilution B,
with standard agitation. But continuous agitation increases the chemical
activity. The developer is always fresh against the emulsion, so the process
happens faster. Also the push of 2 stops means we need to extend the time.

To compensate, I used my [film calculator](/tools/filmcalc) to find the right
development time.

<FilmCalculator
  name="Development"
  step="Bellini Euro HC"
  dilution="1+31 - Dilution B"
  time="6:20"
  temp={20}
  push={2}
  agitation="Continuous rotation"
/>

*The mix: **10ml** Euro HC + **290ml** Water. Need help with the ratios? Check the [dilution tool](/tools/dilution).*

For the stop bath, I keep it simple. Water. 3 cycles of rotation to ensure the
development is fully halted across the entire roll.

<FilmCalculator
  name="Stop Bath"
  step="Water"
  time="1:00"
  temp={20}
  interactive={false}
  agitation="3 cycles of 20 seconds rotation"
/>

Then, the fixer. [Bellini
FX-100](https://www.bellinifoto.it/wp-content/uploads/2020/03/BWFX-100-2.pdf). It’s
fast and reliable.

<FilmCalculator
  name="Fixer"
  step="Bellini FX-100"
  dilution="1+4"
  time="3:00"
  temp={20}
  interactive={false}
  agitation="Continuous rotation"
/>

*The mix: **60ml** Fixer + **240ml** Water.*

Washing in a Lab-Box can be water-intensive if you aren't careful. I use the
"Ilford Method," adapted for rotation. It’s efficient and ensures archival
stability without wasting liters of water.

<FilmCalculator
  name="Wash"
  step="Water"
  time="3:30"
  temp={20}
  interactive={false}
  agitation="3 cycles: 30s, 1m, 2m rotation"
/>

Finally, the wetting agent. This is the finishing touch, ensuring the final
negatives are clean and streak-free. I use [Bellini
Stab](https://www.bellinifoto.it/wp-content/uploads/2020/03/BWSTAB1-1.pdf).

<FilmCalculator
  name="Wetting Agent"
  step="Bellini Stab"
  dilution="1+299"
  time="2:00"
  temp={20}
  interactive={false}
  agitation="Gentle rotation"
/>

*The mix: **1ml** Stab + **300ml** Water.*

### The Results

Since I’m not patient enough to wait for natural evaporation I hung the film to
dry in a room with a dehumidifier running.

The negatives look promising. The contrast is punchy, and the highlights are
dense without being blocked up. Most importantly, the edge markings are crisp
and legible. In the darkroom, legibility is the definitive proof of your
development time. If the text is clear, the chemistry worked.
