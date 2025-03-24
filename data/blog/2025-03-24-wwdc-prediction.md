---
title: "ML model to guess WWDC dates"
date: "2025-03-24 17:30:00"
excerpt: "Guesssing the date of an event that Apple schedules with a calendar"
tags:
  - Apple
  - Misc
---

Hello my fellow Apple nerds, or, as Tim Cook would've said: "Good Morning."

Today, I'm proud to present my completely unnecessary and unasked-for adventure
into predicting Apple's WWDC dates using machine learning.  Because nothing
says *"I have free time"* like building a RandomForest model to guess when Tim
Cook will send out an email invitation.

Apple's WWDC is like Christmas for developers—if Christmas moved around
slightly each year and required a ticket.  

After checking out [this
post](https://mastodon.social/@_Davidsmith/114218113961193279) where David
Smith compiled a list of WWDC dates for past years, I thought:  

> *"Why not use machine learning to predict the next one?"*  

So, I casually imported half the Python data science ecosystem and started
working on this *marvelous* task.

```py
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score, LeaveOneOut
```

I'm using a whopping 21 data points to train my ML models. Data scientists
worldwide are collectively facepalming. But hey, it's all the WWDC data we
have!

With this _massive_ dataset, I decided on using Leave-One-Out Cross Validation
which trains on (N-1) samples and tests on the remaining one, repeating for all
points. It's computationally intensive but maximizes the training data for
small datasets.

I'm training two different models (RandomForest and Ridge) for each target
variable (day, month, lead time, weekday) and picking the winner based on Mean
Absolute Error scores. It's like Masterchef, but for regression models. The
results? RandomForest dominated in most categories:

```
Day - ridge: MAE = 4.67 (LOSER)
Month - rf: MAE = 0.20 (WINNER)
Lead_time - rf: MAE = 13.75 (WINNER)
Weekday - rf: MAE = -0.00 (TIE)
```

Since WWDC keynotes always happen on Mondays, I adjusted my predictions to
prevent ridiculous results like “Sunday WWDC”, which would make Apple fans
faint.

```
weekday_diff = (target_weekday - temp_date.weekday()) % 7
if weekday_diff != 0:
    temp_date += timedelta(days=weekday_diff)
```

Finally, the model has spoken! WWDC 2025 is predicted to be on Monday, June 09,
2025, with the announcement coming on Tuesday, April 01, 2025!

Lead time: 69 days between announcement and event. Nice.

Stay tuned for my next project, where I'll use a transformer neural network to
predict what color Tim Cook's sweater will be during the keynote! (Spoiler
alert: it's blue or grey with 94.3% confidence).

Have a look at the code for yourself
[here](https://gist.github.com/eliseomartelli/58d288e41286b35198a91c37d54fa146)
