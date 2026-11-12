---
title: "Part 4. Which inputs actually help?"
pubDatetime: 2026-11-05T12:00:00Z
description: "Testing which satellite inputs, weather forecasts, geographic maps, and model changes improve Fogcast’s ten-hour predictions."
draft: false
categories:
  - Fogcast
tags:
  - satellite-imagery
  - neural-networks
  - machine-learning
series:
  name: "Building Fogcast"
  slug: fogcast-notes
  order: 4
---

## Which ideas survived the test?

A previous satellite image might reveal cloud movement. A forecast uncertainty map might tell the network when to distrust the weather guidance. Attention might help it connect patterns across the map. Each addition sounded useful. Most did not produce a clear improvement.

In the [last post](/writing/model-architecture/), I described Model A: a residual U-Net that combines current satellite observations, NOAA’s National Blend of Models (NBM) cloud-cover forecasts, and geographic maps to predict the next ten hours around San Francisco. Here, I test which parts of that recipe matter and whether adding more information helps. The experiments compare ten architectures, including A, and two three-model blends.

The clearest evidence came from taking inputs away. Removing satellite observations, NBM guidance, or geography made the forecast worse. Adding inputs or attention was harder to justify. The most promising refinement combined a wider input domain with an average of three trained models, improving the nighttime forecast.

## How I compared the models

Each architecture changes one aspect of A. I trained every variant from scratch with the same learning-rate and regularization recipe, then selected checkpoints by validation binary cross-entropy (BCE). This approach compares the changes under a common training setup; it does not independently find the best settings for each architecture.

The evaluation uses all 5,219 TEST forecast issues, drawn from historical data spanning January 2023 to July 2026. The predicted clear-sky probabilities are scored with the Brier score, the mean squared difference between a probability $p$ and its corresponding label $y$, where 1 means clear and 0 means cloudy:

$$
\operatorname{Brier} = \frac{1}{N}\sum_{i=1}^{N}(p_i-y_i)^2.
$$

I chose the Brier score because it is the mean squared error (MSE) of the predicted probabilities. Taking its square root gives the root mean squared error (RMSE), expressed on the same scale as the probabilities themselves. Lower is better, with zero indicating a perfect match to the labels. The reported means weight all ten forecast horizons equally, from +1 to +10 hours.

For reference, a model that always predicts a 50% chance of cloud receives a Brier score of 0.25. Beating that is a basic requirement; improving on an existing weather forecast is the more meaningful test.

[Figure 1](#figure-1) shows score differences relative to a single training run of Model A. Negative values indicate lower error. The bars show approximate 95% uncertainty intervals that account for both weather sampling and variation across training seeds. An interval crossing zero means the comparison does not clearly establish whether the change helps or hurts. The [uncertainty note](#a-note-on-the-uncertainty) explains the assumptions.

![Brier-score differences from A42 for eleven variants and blends, evaluated separately during daytime and at night or under low Sun. Removing NBM or all satellite observations causes the largest increases in error. I3’s nighttime interval lies entirely below zero.](../../assets/figures/which-inputs-actually-help/model-differences.png "Figure 1. Mean TEST Brier-score differences relative to A. Gold: daytime. Blue: night or low Sun. Bars show approximate 95% intervals combining weather-sampling and training-seed uncertainty. A3 and I3 average three models’ probabilities.")

## Start with the satellite observations

Model B removes both current satellite inputs and their validity masks. It still receives NBM forecasts, geographic maps, and solar and seasonal context, but loses its direct view of the current clouds.

The penalty is clear: mean Brier score rises by 0.0105 in daytime and 0.0162 at night relative to A. As can be seen in [Figure 2](#figure-2), the gap is largest at short leads, when a recent observation should be most useful.

Model D asks a narrower question: how much does the fine imagery add? It removes the 500 m B2-derived clear score and its validity mask while keeping the 2 km CSM observations. Daytime error rises by 0.0028, with an interval entirely above zero. The nighttime difference is small and unresolved.

Keeping coarse satellite observations therefore preserves much of A’s performance. The fine daytime imagery provides a further benefit when evaluated against the fine daytime labels.

For reference, the plots also show **direct NBM**: the NBM cloud-cover forecast used on its own, converted to a clear-sky score as $1 - \mathrm{cloud\ cover}/100$.

![Brier scores from one to ten hours ahead for A, B, D, and direct NBM. Removing all satellite observations raises error most strongly at short leads. Removing only fine B2 raises daytime error, while the nighttime A and D curves nearly overlap.](../../assets/figures/which-inputs-actually-help/satellite-inputs.png "Figure 2. Current satellite observations improve the forecast, especially at short leads. Left: daytime, evaluated against fine B2-derived labels. Right: night or low Sun, evaluated on native CSM footprints. Keeping CSM while removing fine B2 (Model D) preserves much of Model A’s performance, however with a clear daytime penalty.")

## A satellite snapshot is not enough for ten hours

Model K keeps the satellite observations but removes all eleven NBM cloud-cover forecast maps. I expected the forecast to suffer, especially at longer leads.

For the first few hours, Model K still beats direct NBM. Around four to five hours ahead, that advantage disappears, and its error rises much faster than A’s. Across the ten horizons, removing NBM increases mean Brier score by 0.0327 in daytime and 0.0245 at night, the largest penalties in these experiments.

The observations provide a detailed starting point; NBM provides guidance about what happens next. Both contribute to the combined forecast.

![Brier-score curves for A, K, and direct NBM over ten forecast hours. K initially beats direct NBM but crosses it around hours four to five. A has lower error than both throughout the daytime and nighttime evaluations.](../../assets/figures/which-inputs-actually-help/nbm-guidance.png "Figure 3. Without NBM guidance, Model K loses its advantage over direct NBM around the fourth to fifth forecast hour. Model A combines observations and guidance and has lower error than both at every evaluated horizon. Left: daytime. Right: night or low Sun.")

## Geography helps, too

Model J removes two geographic inputs: land fraction, the proportion of each cell covered by land, and elevation. These maps give the network context for interpreting cloud patterns, which may evolve differently over the ocean than over Mount Tamalpais.

Removing both maps raises the mean Brier score by 0.0026 in daytime and 0.0029 at night, with both uncertainty intervals entirely above zero. The experiment does not explain how the network uses geography, but it supports keeping them in the model.

## Three plausible additions without a clear gain

Model C adds the previous hour’s satellite fields and validity masks. The intuition was that feeding the model two snapshots might help the network infer cloud movement, growth, and dissipation. Instead, its scores are slightly worse than Model A’s, with both intervals crossing zero. The experiment did not establish a benefit. NBM may already provide some of the useful information about cloud evolution, but this comparison cannot confirm that explanation.

Model E adds NBM ensemble sky-cover spread and a validity mask, giving the network a measure of disagreement in the weather guidance. Model F adds probabilities of a cloud ceiling below 3,000 ft, supplementing A’s total cloud-cover forecasts. Neither produces a conclusive improvement under the common training recipe.

## Does more spatial context help?

Through its convolution paths, Model A can draw on inputs up to roughly 43 km away in each cardinal direction. Near the domain edges, those paths can encounter padding instead of observations, potentially affecting a substantial portion of the map. Yet that reach is still much smaller than the domain’s 200 km width, limiting interactions between distant regions. I tested two changes to address these limitations.

Model G adds four-head spatial attention at the bottleneck, allowing features at distant locations to interact directly. Nighttime Brier score rises by 0.0026, with an uncertainty interval entirely above zero. The daytime difference remains unresolved.

The learning curves offer a clue ([Figure 4](#figure-4)). Model G eventually reaches lower training loss but higher validation loss than A, consistent with overfitting. The common training recipe may also be poorly suited to G; these experiments do not establish whether different settings would make attention useful.

![Training and validation BCE over thirty epochs for A and G. G eventually reaches slightly lower training loss but higher validation loss. Stars mark the selected checkpoints.](../../assets/figures/which-inputs-actually-help/attention-learning-curves.png "Figure 4. Adding attention lowers eventual training loss but raises validation loss. Dashed curves: training. Solid curves: validation. The combined objective is fine BCE + 0.25 × coarse BCE, averaged over ten horizons. Stars mark checkpoints selected by validation BCE.")

Model I expands the input domain instead. It adds a 50 km margin on every side, so the network sees 300 × 300 km while forecasting the central 200 × 200 km. This margin exceeds the approximate convolutional reach, giving predictions near the output boundary access to surrounding observations.

Model I’s nighttime point score is lower, but its uncertainty interval relative to A still crosses zero. The result is promising, although it does not establish that the wider domain improves the forecast or that padding was hurting the baseline.

## Can three models do better than one?

I trained Models A and I with three random seeds each, then averaged their clear-sky probabilities at every location and forecast hour to produce two blends, A3 and I3. I score the averaged predictions, rather than averaging the members’ scores.

Averaging can reduce error when the members make different mistakes, although the blend will not necessarily outperform the best member on every sample.

Both blends have lower estimated Brier scores than the single-run Model A reference. For A3, the uncertainty intervals for the score differences cross zero in both regimes. I3 shows clearer evidence of improvement at night, where its interval lies entirely below zero. Its daytime difference remains unresolved.

![Brier-score curves for Model I trained with seed 42 and the three-seed blend I3. The blend has lower point errors at all ten displayed horizons in both evaluation regimes.](../../assets/figures/which-inputs-actually-help/three-seed-blend.png "Figure 5. Averaging three Model I probability maps lowers point errors at every displayed horizon compared with the single run. Solid curves: daytime. Dashed curves: night or low Sun.")

I chose I3 for the final model: the wider input domain, with predictions averaged across three training seeds. It is a modest refinement of A, with the strongest evidence of improvement at night.

The experiments also support the original choice of inputs. Current satellite observations, NBM guidance, and geography all improve the forecast. Solar and seasonal context remain in the recipe, although I did not test removing them. Most additions fail to show a clear gain under this training setup.

With those choices made, the next question is practical: how much better is the forecast than existing weather guidance, or simply assuming the clouds will stay where they are? That is the focus of [Part 5. Is the neural network better, or does it just draw pretty maps?](/writing/does-fogcast-earn-its-detail/).

## The experiment ledger

<p id="table-1">Table 1. Each change is relative to Model A. Values are mean TEST Brier-score differences from Model A, followed by approximate 95% intervals. A3 and I3 report scores of averaged probability maps. The remaining variants each use one training run.</p>

<div class="table-scroll" role="region" aria-labelledby="table-1" tabindex="0">

| Model | Change from A                              | Daytime difference [95% interval] | Night / low-Sun difference [95% interval] |
| ----- | ------------------------------------------ | --------------------------------- | ----------------------------------------- |
| A3    | Blend three A probability maps             | −0.0005 [−0.0018, +0.0008]        | −0.0009 [−0.0021, +0.0003]                |
| B     | Remove both satellite inputs + masks       | +0.0105 [+0.0066, +0.0144]        | +0.0162 [+0.0126, +0.0198]                |
| C     | Add previous-hour satellite inputs + masks | +0.0011 [−0.0010, +0.0032]        | +0.0005 [−0.0016, +0.0025]                |
| D     | Remove fine B2 score + mask; keep CSM      | +0.0028 [+0.0007, +0.0049]        | +0.0004 [−0.0017, +0.0025]                |
| E     | Add NBM ensemble sky-cover spread + mask   | −0.0004 [−0.0028, +0.0020]        | −0.0003 [−0.0025, +0.0018]                |
| F     | Add NBM low-ceiling probabilities + masks  | −0.0009 [−0.0034, +0.0016]        | +0.0004 [−0.0017, +0.0026]                |
| G     | Add four-head bottleneck attention         | +0.0015 [−0.0009, +0.0040]        | +0.0026 [+0.0004, +0.0048]                |
| I     | Expand input domain to 300 × 300 km        | +0.0001 [−0.0020, +0.0023]        | −0.0015 [−0.0035, +0.0004]                |
| I3    | Blend three I probability maps             | −0.0014 [−0.0034, +0.0006]        | −0.0030 [−0.0049, −0.0012]                |
| J     | Remove land fraction + elevation           | +0.0026 [+0.0004, +0.0048]        | +0.0029 [+0.0007, +0.0051]                |
| K     | Remove all eleven NBM cloud-cover maps     | +0.0327 [+0.0255, +0.0399]        | +0.0245 [+0.0190, +0.0300]                |

</div>

## A note on the uncertainty

The approximate 95% intervals combine two sources of uncertainty and aim to be conservative. Weather-sampling uncertainty is estimated from 10,000 paired TEST resamples, stratified by season. Each model is evaluated on the same weather selections, allowing the comparison to track how their score difference varies across resamples.

Training-seed uncertainty is estimated from three runs each of Models A and I. Their pooled seed-variance estimate is also applied to variants trained only once. Assuming independent, additive weather and seed effects, I add the two variance estimates to calculate the combined standard error.

Each interval is the paired score difference ± 2.78 times that standard error. The multiplier comes from [Student’s t distribution](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm) with four degrees of freedom, corresponding to the pooled seed-variance estimate.
