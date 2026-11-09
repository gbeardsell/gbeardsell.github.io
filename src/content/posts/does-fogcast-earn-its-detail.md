---
title: "Part 5. Is the neural network better, or does it just draw pretty maps?"
pubDatetime: 2026-11-07T12:00:00Z
description: "Testing Fogcast against three baselines."
draft: true
categories:
  - Fogcast
tags:
  - satellite-imagery
  - forecast-verification
  - machine-learning
series:
  name: "Fogcast notes"
  slug: fogcast-notes
  order: 5
---

## A sharper map needs evidence

A forecast on a fine 500 m grid can look persuasive, with enough detail to suggest that the model knows what will happen at that scale. But this has yet to be established quantitatively.

In the [previous post](/writing/which-inputs-actually-help/), I selected a three-seed blend of Model I: the original residual U-Net with a wider input domain. Most of the other variations failed to show a clear benefit. Now I wanted to answer a practical question: does the resulting network improve on various baselines, including forecasts already available?

On the TEST set, it does. Model I3 has lower Brier scores than persistence, climatology, and direct weather guidance at every evaluated horizon, day and night. The rest of this post explains that comparison and what it can tell us about the forecast’s finer detail and probabilities.

## Three forecasts to beat

The first reference is **persistence**: take the current cloud pattern, the same one supplied to the neural network, and hold it fixed for all ten forecast hours. It assumes cloud cover will not change.

Persistence is simple, but it performs surprisingly well one hour ahead. The latest satellite image can offer a better guide to the immediate future than an older weather forecast.

The second reference is climatology: the historical frequency of clear conditions at each location for the target month and hour, estimated using only TRAIN labels. It captures, for example, how the probability of clear skies at Dolores Park differs between 1 p.m. in July and 4 p.m. in October. It knows nothing about today’s cloud bank.

The third is NOAA’s **National Blend of Models (NBM)**, used directly. The forecasted total sky cover $C$, expressed as a percentage, is converted into a clear-sky score:

$$
p_{\mathrm{clear}} = 1 - \frac{C}{100}
$$

I align the target-hour field with the verification grid and scored it as-is, without a learned correction. This is the weather guidance supplied to Fogcast, used on its own. [Figure 1](#figure-1) compares all three references with the retained model, I3.

![Daytime and nighttime Brier scores for Model I3, persistence, climatology, and direct NBM over one to ten forecast hours. I3 has the lowest score at every horizon. Persistence starts below NBM at one hour but worsens rapidly, while climatology stays nearly flat.](../../assets/figures/does-fogcast-earn-its-detail/reference-forecast-comparison.png "Figure 1. TEST performance from +1 to +10 hours. Lower Brier is better. Left: daytime, evaluated against fine B2-derived labels. Right: night or low Sun, evaluated on native GOES Clear Sky Mask (CSM) footprints. I3 has lower point scores than all three references at every evaluated horizon.")

## Compare what was available at the issue time

The age of the information matters. In this historical replay, NBM cycles are initialized at least two hours before the Fogcast issue time to allow for forecast availability. At 1 p.m., the preferred cycle is therefore 11 a.m. Its prediction for 2 p.m. is already a three-hour forecast, even though Fogcast calls that target “one hour ahead.”

Persistence uses the latest eligible satellite observations. Fogcast has those observations and the earlier NBM forecast. That difference helps explain the short-lead results: part of Fogcast’s task is to improve existing guidance using newer, finer observations.

## Score the confidence as well as the cloud outline

The main metric is the Brier score, the mean squared difference between a clear-sky probability and a binary label: 1 for clear, 0 for cloudy. If the label is clear, a forecast of 0.8 contributes $(0.8-1)^2 = 0.04$; a forecast of 0.2 contributes $(0.2-1)^2 = 0.64$. Confident mistakes are expensive, as they are under the binary cross-entropy loss used in training.

I scored the unthresholded probabilities. A hard clear/cloudy map discards the distinction between a tentative prediction and a confident one, which is part of what I wanted to assess.

For each horizon, I divided the total squared error by the total valid support, then averaged the ten horizon scores equally. The test data provides 380 million valid fine pixel–target pairs and 17 million native coarse pairs per horizon.

Daytime comparisons use valid 500 m B2-derived labels. At night and when the Sun is low, fine-grid forecast probabilities are averaged over native CSM footprints before scoring. As in the earlier posts, the dividing solar zenith angle is 82°, equivalent to the Sun being 8° above the horizon.

<p id="table-1">Table 1. Mean TEST Brier score over +1 through +10 hours, with equal weight for each horizon. Lower is better.</p>

<div class="table-scroll" role="region" aria-labelledby="table-1" tabindex="0">

| Forecast                        | Daytime · fine | Night · coarse |
| ------------------------------- | -------------: | -------------: |
| Persistence                     |         0.2183 |         0.2084 |
| Climatology                     |         0.2046 |         0.2103 |
| NBM predictions                 |         0.1156 |         0.1332 |
| Model I · three-seed blend (I3) |         0.0899 |         0.1057 |

</div>

## The combined forecast improves on the references

Direct NBM is the strongest reference when averaged across the ten horizons ([Table 1](#table-1)). Persistence has the edge over NBM at +1 hour, then deteriorates as the clouds evolve. Climatology stays nearly flat: advancing the forecast hour changes the historical lookup without giving it any new knowledge of today’s weather.

I3 has lower Brier scores than all three references at every evaluated horizon, day and night. Its advantage over direct NBM is largest near issue time and narrows toward +10 hours.

The pattern fits the ablations in the previous post. Removing satellite observations hurts most at short leads. Removing NBM hurts most at long leads. The combined forecast benefits from both sources across a window where their relative value changes.

## One sample up close

[Figure 2](#figure-2) shows a forecast issued on June 1, 2022, at 7 a.m. PDT. Persistence keeps repeating the morning’s cloud pattern. Climatology follows a typical day for that place and month. NBM provides the weather guidance issued at 5 a.m., and I3 combines that guidance with the satellite view. [Figure 3](#figure-3) shows the same fields as Figure 2, but zooming in on the San Francisco peninsula. It can be seen that both direct NBM and Model I3 predict a lifting of the coastal fog as the day progresses, as did happen as confirmed by the training labels.

![Five rows of Bay Area maps over ten forecast hours compare persistence, climatology, NBM, the three-seed Model I blend, and training labels. Persistence holds the morning cloud bank fixed, while the labels show it retreating through the day. I3 also forecasts substantial clearing.](../../assets/figures/does-fogcast-earn-its-detail/forecast-evolution-example.png "Figure 2. A sample forecast issued June 1, 2022, at 7 a.m. PDT, with targets from 8 a.m. to 5 p.m. (+1 to +10 hours). Blue: cloudy. Pale: clear. Gray: invalid label. The maps show binary thresholded results for visualization: I3 is clear at probability ≥0.5; NBM is clear at total cloud cover <36%. The row labeled Model I is the three-seed blend, as noted in the image.")

![Five rows of Bay Area maps, zooming in on the San Francisco peninsula, over ten forecast hours compare persistence, climatology, NBM, the three-seed Model I blend, and training labels. Persistence holds the morning cloud bank fixed, while the labels show it retreating through the day. I3 also forecasts substantial clearing.](../../assets/figures/does-fogcast-earn-its-detail/forecast-evolution-example-zoom.png "Figure 3. Same fields as Figure 2, but zooming on the San Francisco peninsula.")

## Does 70% clear mean clear about 70% of the time?

The [architecture post](/writing/model-architecture/) left this question open. A sigmoid produces a number between zero and one, but that alone does not make it a trustworthy probability.

A reliability diagram groups predictions with similar probabilities and compares their average with the observed clear frequency. If predictions near 70% clear correspond to clear labels roughly 70% of the time, that part of the curve lies near the diagonal.

[Figure 4](#figure-4) shows this check for the baseline, Model A. Its daytime curve tracks the diagonal fairly closely. The nighttime curve sits below it through much of the middle range: the model predicts clear conditions more often than the CSM labels support.

This agreement is encouraged by the training objective. Binary cross-entropy is a strictly proper scoring rule: its expected loss is uniquely minimized by predicting the true probability of a clear label, given the available inputs. If comparable situations are clear 70% of the time, the model does best on average by predicting 0.7. This gives it an incentive to produce meaningful probabilities. The reliability plot checks how closely that mathematical incentive translates into reliable predictions on held-out data.

![Model A reliability diagrams for daytime and night or low Sun, pooling all ten TEST horizons. The daytime curve follows the perfect-calibration diagonal closely. The nighttime curve lies below it through much of the middle probability range. Histograms show how predictions are distributed across probability bins.](../../assets/figures/does-fogcast-earn-its-detail/model_i3_reliability.png "Figure 4. Reliability for Model A on TEST, pooling all ten horizons into 5-percentage-point bins. The dashed line is perfect calibration; histograms show the share of valid forecast–target pairs in each bin. This diagram evaluates the baseline A, rather than the retained I3 blend.")

## How good is it then?

Compared with direct NBM, the strongest of the three baselines, I3 lowers root-mean-square error from about 34 to 30 percentage points during the day and from 36.5 to 32.5 points at night. That is an improvement of roughly four percentage points in both cases.

Combining recent satellite observations with NBM guidance therefore improved clear/cloud forecasting over persistence, climatology, and direct NBM. The gains extend across the ten-hour forecast window, with the largest advantage over NBM in the first few hours.

There are limits to what these results tell us. “Cloudy” means detectable cloud at any height, which does not necessarily mean fog at ground level. Daytime accuracy is measured against B2-derived labels, which have their own errors. At night, the coarse labels cannot independently verify every 500 m cloud edge within a CSM footprint with a nominal resolution of 2 km.

For planning an afternoon, though, I now have something more useful than replaying a satellite loop and guessing. I can follow the predicted clear probability at Ocean Beach through sunset, compare it with Dolores Park, and decide how much uncertainty I am willing to accept.

As I write this, I’m about to head out with my wife to explore the tide pools at Fitzgerald Marine Reserve. The predictions in [Figure 5](#figure-5) suggest we’ll get some sunshine!

![Model predictions for Moss Beach on November 7, 2026, at 2 p.m.](../../assets/figures/does-fogcast-earn-its-detail/model-predictions_Moss-beach.png "Figure 5. Model predictions for Moss Beach on November 7, 2026, at 2 p.m. Blue indicates pixels with a predicted cloud probability above 50%; white indicates those below 50%.")

The latest forecast is available at https://fogcast.today/ . Give it a try next time you’re planning an activity outside!
