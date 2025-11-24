`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Data mean](#data-mean)
 * [Formulas without CUPED applied](#formulas-without-cuped-applied)
 * [Formulas with CUPED applied](#formulas-with-cuped-applied)
 * [Conclusion](#conclusion)
##### This guide includes advanced concepts
This section includes an explanation of advanced statistical concepts. We provide them for informational purposes, but you do not need to understand these concepts to use the formulas in the experiment results user interface (UI).
## Overview
LaunchDarkly displays analytic formulas for all experiment variation means. This guide explains the statistical methodology for these formulas for experiments using frequentist statistics, and how they are useful for validating your results.
## Data mean
Whether an experiment’s results table displays the conversion rate or mean is dependent on the kind of metrics you’re using, and whether LaunchDarkly has applied [covariate adjustment through CUPED](/docs/guides/statistical-methodology/cuped). Experiments using conversion metrics display the conversion rate, and experiments using numeric metrics display the mean.
### Formulas without CUPED applied
When CUPED is not applied to an experiment metric, the data mean equals the observed sample mean.
The formula is different for conversion metrics and numeric metrics:
 * **Conversion metrics** , including custom conversion binary, custom conversion count, page viewed, and clicked or tapped metrics, use the total number of conversions divided by the total number of exposures: DataMean=SampleMean=Conversions/ExposuresDataMean = SampleMean = Conversions / ExposuresDataMean=SampleMean=Conversions/Exposures
 * **Numeric metrics** use the total value divided by the total number of exposures: DataMean=SampleMean=TotalValue/ExposuresDataMean = SampleMean = TotalValue / ExposuresDataMean=SampleMean=TotalValue/Exposures
When you hover on the “Conversion rate” and “Mean” headings in an experiment results table, the above formulas for the data mean display.
### Formulas with CUPED applied
When CUPED is applied to an experiment metric, the estimated data mean equals the sample mean minus an adjustment, where the sample mean is either conversions over exposures or total value over exposures:
DataMean=(Conversions/Exposures)−Correlation⋅SDRatio⋅CovariateImbalanceDataMean=(TotalValue/Exposures)−Correlation⋅SDRatio⋅CovariateImbalance \begin{aligned} DataMean &= \left( Conversions / Exposures \right) - Correlation \cdot SDRatio \cdot CovariateImbalance \\\ DataMean &= \left( TotalValue / Exposures \right) - Correlation \cdot SDRatio \cdot CovariateImbalance \end{aligned}DataMeanDataMean​=(Conversions/Exposures)−Correlation⋅SDRatio⋅CovariateImbalance=(TotalValue/Exposures)−Correlation⋅SDRatio⋅CovariateImbalance​
where the adjustment is the product of the following components:
 * **Correlation:** the correlation between the experiment outcome and the pre-period covariate in the CUPED model
 * **Standard deviation ratio:** the ratio of the standard deviation (SD) of the experiment outcome to that of the pre-period covariate
 * **Covariate imbalance:** the difference between the covariate mean for the experiment variation and the covariate mean for all variations, which is a random imbalance due to sampling variability
This adjustment explains why the estimated conversion rate for a conversion metric may not equal the number of conversions divided by the number of exposures, and why the estimated mean for a numeric metric may not equal the total value divided by the number of exposures.
When you hover over the “Conversion rate” and “Mean” headings in an experiment results table, the above formulas for the data mean display.
## Conclusion
This guide explains the formulas LaunchDarkly uses to derive experiment variation means in frequentist experiments, and how they are useful for validating your results.
To learn more about the statistical methods we use in frequentist experiments, read [Experimentation statistical methodology for frequentist experiments](/docs/guides/statistical-methodology/methodology-frequentist).
To learn how to interpret the experiment results page, read [Frequentist experiment results](/docs/home/experimentation/frequentist-results).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs