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
 * [Formulas](#formulas)
 * [Data mean](#data-mean)
 * [Formulas without CUPED applied](#formulas-without-cuped-applied)
 * [Formulas with CUPED applied](#formulas-with-cuped-applied)
 * [Prior mean](#prior-mean)
 * [Precision weight](#precision-weight)
 * [Conclusion](#conclusion)
##### This guide includes advanced concepts
This section includes an explanation of advanced statistical concepts. We provide them for informational purposes, but you do not need to understand these concepts to use the formulas in the experiment results user interface (UI).
## Overview
LaunchDarkly displays analytic formulas for all experiment variation means. This guide explains the statistical methodology for these formulas for experiments using Bayesian statistics, and how they are useful for validating your results.
## Formulas
Using the Bayesian approach, the posterior means for all experiment variations and for any metric type, including conversion metrics and numeric metrics, can be represented by the following formula:
PosteriorMean=Weight⋅DataMean+(1−Weight)⋅PriorMean \begin{aligned} PosteriorMean = Weight \cdot DataMean + \left(1 - Weight \right) \cdot PriorMean \end{aligned}PosteriorMean=Weight⋅DataMean+(1−Weight)⋅PriorMean​
Where:
 * **Data mean:** the mean estimated from the data sample
 * **Prior mean:** the mean for the Bayesian prior distribution assumed for the experiment variation mean
 * **Weight:** the precision weight of the data mean, which is the precision of the data mean divided by the sum of the data mean precision and the prior precision
An experiment’s [results table](/docs/home/experimentation/bayesian-results) displays the posterior mean for all metrics. However, experiments using conversion metrics label this column “Conversion rate.” When you hover over the “Conversion rate” or “Posterior mean” heading in an experiment’s results table, you can view the posterior mean.
For the control variation, the precision weight is trivially 1 at sufficient sample sizes, so the posterior mean for the control variation is equal to the data mean. For the treatment variation, the posterior mean is a precision-weighted average of the data mean and the prior mean.
When you hover over an actual conversion rate or posterior mean value, you can view actual numbers in the formulas instead of descriptions.
We explain the data mean, prior mean, and precision weight in the following sections.
### Data mean
The formula for the data mean depends on whether LaunchDarkly has applied covariate adjustment through CUPED. To learn more, read [Covariate adjustment and CUPED methodology](/docs/guides/statistical-methodology/cuped).
#### Formulas without CUPED applied
When CUPED is not applied to an experiment metric, the data mean equals the observed sample mean.
The formula is different for conversion metrics and numeric metrics:
 * **Conversion metrics** , including custom conversion binary, custom conversion count, page viewed, and clicked or tapped metrics, use the total number of conversions divided by the total number of exposures: DataMean=SampleMean=Conversions/ExposuresDataMean = SampleMean = Conversions / ExposuresDataMean=SampleMean=Conversions/Exposures
 * **Numeric metrics** use the total value divided by the total number of exposures: DataMean=SampleMean=TotalValue/ExposuresDataMean = SampleMean = TotalValue / ExposuresDataMean=SampleMean=TotalValue/Exposures
When you hover over the “Conversion rate” and “Posterior mean” heading in an experiment’s results table, you can view the above formulas for the data mean when LaunchDarkly does not apply CUPED.
#### Formulas with CUPED applied
When CUPED is applied to an experiment metric, the estimated data mean equals the sample mean minus an adjustment, where the sample mean is either conversions over exposures or total value over exposures:
DataMean=(Conversions/Exposures)−Correlation⋅SDRatio⋅CovariateImbalanceDataMean=(TotalValue/Exposures)−Correlation⋅SDRatio⋅CovariateImbalance \begin{aligned} DataMean &= \left( Conversions / Exposures \right) - Correlation \cdot SDRatio \cdot CovariateImbalance \\\ DataMean &= \left( TotalValue / Exposures \right) - Correlation \cdot SDRatio \cdot CovariateImbalance \end{aligned}DataMeanDataMean​=(Conversions/Exposures)−Correlation⋅SDRatio⋅CovariateImbalance=(TotalValue/Exposures)−Correlation⋅SDRatio⋅CovariateImbalance​
Where the adjustment is the product of the following components:
 * **Correlation:** the correlation between the experiment outcome and the pre-period covariate in the CUPED model
 * **Standard deviation ratio:** the ratio of the standard deviation (SD) of the experiment outcome to that of the pre-period covariate
 * **Covariate imbalance:** the difference between the covariate mean for the experiment variation and the covariate mean for all variations, which is a random imbalance due to sampling variability
This adjustment explains why the estimated conversion rate for a conversion metric may not equal the number of conversions divided by the number of exposures, and why the estimated posterior mean for a numeric metric may not equal the total value divided by the number of exposures.
When you hover over the “Conversion rate” and “Posterior mean” headings, you can view the above formulas for the data mean when LaunchDarkly applies CUPED.
### Prior mean
For the control variation, the posterior mean equals the data mean, so there is no need to specify a prior mean. But for a treatment variation, the posterior mean is a precision-weighted average of a data mean and a prior mean, where the prior mean is the data mean for the control variation.
This is because we assume that the relative difference of the treatment variation mean above the control variation mean has a prior distribution centered at a zero mean. To learn more about the empirical Bayes prior for the relative difference, read [Experimentation statistical methodology for Bayesian experiments](/docs/guides/statistical-methodology/methodology-bayesian).
Therefore, the treatment variation posterior mean is a precision-weighted average of the treatment variation data mean and the control variation data mean.
### Precision weight
The precision weight is given by:
Weight=DataMeanPrecisionDataMeanPrecision+PriorPrecision \begin{aligned} Weight = \frac{DataMeanPrecision} {DataMeanPrecision + PriorPrecision} \end{aligned}Weight=DataMeanPrecision+PriorPrecisionDataMeanPrecision​​
This means the proportion of the total precision due to the data mean. However, the precision is defined differently depending on the statistical model used.
There are two statistical models for estimating the posterior mean of experiment metrics:
 * **Normal-normal model:** this model has a normal prior and normal likelihood, and is used for all average metrics when CUPED is applied, and all non-binary metrics when CUPED is not applied
 * **Beta-binomial model:** this model has a beta prior distribution and a binomial likelihood, and is used for binary metrics when CUPED is not applied
For the normal-normal model, precision is defined as the inverse of the variance, so that the precision weight is:
Weight=1/DataMeanVariance1/DataMeanVariance+1/PriorVariance \begin{aligned} Weight = \frac{1 / DataMeanVariance} {1 / DataMeanVariance + 1 / PriorVariance} \end{aligned}Weight=1/DataMeanVariance+1/PriorVariance1/DataMeanVariance​​
For the beta-binomial model, precision is defined as the number of units for the data sample and the number of pseudo-units for the beta prior distribution. You can consider the αprior\alpha_{prior}αprior​ and βprior\beta_{prior}βprior​ parameters of the beta prior distribution as, respectively, the number of converted pseudo-units and the number of non-converted pseudo-units, so that the number of pseudo-units for the prior distribution is αprior+βprior\alpha_{prior} + \beta_{prior}αprior​+βprior​. If we denote by nnn the number of units in the data sample, then the precision weight is given by:
Weight=nn+αprior+βprior \begin{aligned} Weight = \frac{n}{n + \alpha_{prior} + \beta_{prior}} \end{aligned}Weight=n+αprior​+βprior​n​​
## Conclusion
This guide explains the formulas LaunchDarkly uses to derive these experiment variation means in Bayesian experiments, and how they are useful for validating your results. To learn more about using the experiment **Results** tab, read [Bayesian experiment results](/docs/home/experimentation/bayesian-results).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs