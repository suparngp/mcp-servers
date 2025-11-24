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
 * [Context](#context)
 * [Method](#method)
 * [Variance Reduction](#variance-reduction)
 * [Bias Removal](#bias-removal)
 * [Implementation](#implementation)
 * [CUPED availability](#cuped-availability)
 * [Model](#model)
 * [CUPED on the Results tab](#cuped-on-the-results-tab)
 * [Advanced topics](#advanced-topics)
 * [Covariate adjustment](#covariate-adjustment)
 * [Causal inference](#causal-inference)
 * [Covariate-adjusted means](#covariate-adjusted-means)
 * [Frequentist and Bayesian approaches](#frequentist-and-bayesian-approaches)
 * [SQL implementation](#sql-implementation)
 * [References](#references)
##### This guide includes advanced concepts
This section includes an explanation of advanced statistical concepts. We provide them for informational purposes, but you do not need to understand these concepts to use CUPED for covariate adjustment.
## Overview
This guide explains the methodology and usage of CUPED (Controlled experiments Using Pre-Experiment Data) for covariate adjustment in LaunchDarkly Experimentation results.
_Covariate adjustment_ refers to the use of variables unaffected by treatment, known as _covariates_ , for:
 * **Variance reduction** : reduces the variance of experiment lift estimates, which increases measurement precision and experiment velocity.
 * **Bias removal** : removes the conditional bias of experiment lift estimates, which increases measurement accuracy.
In mainstream statistics, covariate adjustment is typically performed using [Fisher’s (1932)](https://www.google.com/books/edition/Statistical_Methods_for_Research_Workers/GmNAAAAAIAAJ) _analysis of covariance_ (ANCOVA) model. In the context of online experimentation, [Deng et al. (2013)](https://exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf) introduced CUPED (short for Controlled Experiments Using Pre-Experiment Data), which can be thought of as a special case of ANCOVA with the pre-period version of the modeled outcome as a single covariate.
In this guide, we use the terms _covariate adjustment_ , _analysis of covariance_ (ANCOVA), and CUPED interchangeably.
## Context
In a randomized experiment, there are three types of variables defined for each experiment unit, such as “user,” in a user-randomized experiment:
 * **Treatment** : a variable indicating treatment for the unit. For example: 1 if the unit is assigned to the “treatment” variation, and 0 if assigned to the “control” variation.
 * **Outcomes** : post-treatment variables that we want to measure experiment performance on, such as experiment revenue.
 * **Covariates** : pre-treatment variables that we use to improve our measurement of the outcomes, typically for segmentation and variance reduction, such as pre-experiment revenue.
Outcomes are post-treatment variables. These are variables potentially affected by the treatment, or measured after the treatment is assigned. An example is revenue measured after the user enters the experiment.
Covariates must be pre-treatment variables, which are variables measured before the treatment is assigned, or variables unaffected by treatment. Examples include revenue measured before a user enters the experiment, which is measured before treatment, and gender, which is unaffected by the treatment.
## Method
The goal of covariate adjustment is to improve the measurement of an experiment outcome, such as experiment revenue, through the use of prognostic covariates. Prognostic covariates are covariates predictive of the outcome. Pre-experiment revenue is an example of a prognostic covariate, which is typically predictive of experiment revenue. The ANCOVA model, and CUPED in particular, does this by leveraging the correlation, which is the strength of linear relationship, between an outcome and a set of covariates, with the goal of improving measurement precision and accuracy.
### Variance Reduction
We illustrate this with a simple example of an outcome YYY, such as experiment revenue, and a covariate XXX, such as pre-experiment revenue.
In this example, there is a strong linear relationship between them for both treatment and control variations, shown in the scatter plot on the left below:
![Left: A scatter plot of outcome versus covariate with sample mean prediction lines. Right: A density plot of errors relative to control mean, showing large variance.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/138eda789ffbf52105f7b9b2b95a05a95d9efc473c41da911608f19541d22015/assets/images/__not_from_LD_app_UI/cuped-cov-adj-plot1.png)
Left: A scatter plot of outcome versus covariate with sample mean prediction lines. Right: A density plot of errors relative to control mean, showing large variance.
Predicting the observations in the treatment and control variations with, respectively, the sample means YˉT\bar{Y}_TYˉT​ and YˉC\bar{Y}_CYˉC​ results in a large variance for the errors, as illustrated in the plot on the right above.
However, we can leverage the linear relationship between YYY and XXX by predicting the observations in the treatment and control variations with, respectively, the regression predictions Y^T=α^T+β^TX\hat{Y}_T = \hat{\alpha}_T + \hat{\beta}_T XY^T​=α^T​+β^​T​X and Y^C=α^C+β^CX\hat{Y}_C = \hat{\alpha}_C + \hat{\beta}_C XY^C​=α^C​+β^​C​X, as shown in the scatter plot on the left below:
![Left: A scatter plot of outcome versus covariate with regression prediction lines. Right: A density plot of errors relative to the control regression prediction, showing smaller variance.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/78a9a13ca3767e66125bf3bbe88e1eea590af75282a0a843f74bc68d9369efac/assets/images/__not_from_LD_app_UI/cuped-cov-adj-plot2.png)
Left: A scatter plot of outcome versus covariate with regression prediction lines. Right: A density plot of errors relative to the control regression prediction, showing smaller variance.
This results in smaller variance for the errors, as shown in the density plot on the right above. The above two scatter plots were inspired by those shown in [Huitema (2011)](https://www.google.com/books/edition/The_Analysis_of_Covariance_and_Alternati/6dxwep5_ZxAC?hl=en).
The correlation, which is the strength of the linear relationship between the outcome YYY and the covariate XXX, determines how much the error variance is reduced. The larger the correlation, the larger the variance reduction.
Specifically, if we denote the original error variance estimates for the two variations by, respectively, sT2s_T^2sT2​ and sC2s_C^2sC2​, and the new error variance estimates using CUPED by, respectively, sT,CUPED2s_{T, CUPED}^2sT,CUPED2​ and sC,CUPED2s_{C, CUPED}^2sC,CUPED2​, and the outcome-covariate correlations by, respectively, rTr_TrT​ and rCr_CrC​, then the following holds approximately:
sT,CUPED2≈sT2(1−rT2)sC,CUPED2≈sC2(1−rC2) \begin{aligned} s_{T, CUPED}^2 &\approx s_T^2 \left(1 - r_T^2 \right) \\\ s_{C, CUPED}^2 &\approx s_C^2 \left(1 - r_C^2 \right) \end{aligned}sT,CUPED2​sC,CUPED2​​≈sT2​(1−rT2​)≈sC2​(1−rC2​)​
The proportional reduction in error variance is approximately the square of the correlations:
1−sT,CUPED2sT2≈rT21−sC,CUPED2sC2≈rC2 \begin{aligned} 1 - \frac{s_{T, CUPED}^2}{s_T^2} &\approx r_T^2 \\\ 1 - \frac{s_{C, CUPED}^2}{s_C^2} &\approx r_C^2 \end{aligned}1−sT2​sT,CUPED2​​1−sC2​sC,CUPED2​​​≈rT2​≈rC2​​
If the correlations in both variations are 60%60\%60%, the error variance will be reduced by 60%2=36%60\%^2 = 36\%60%2=36%, and if they are 70%70\%70%, the error variance will be reduced by 70%2=49%70\%^2 = 49\%70%2=49%. The proportional reduction in the error variance translates to about the same proportion reduction in the variance of the experiment lift estimate, which translates to the same proportional reduction in experiment duration on average. Therefore, when the correlations are 60%60\%60%, the experiment duration will be reduced by as much as 36%36\%36% on average, and when they are 70%70\%70%, the experiment duration will be reduced by as much as 49%49\%49% on average. In other words, this can cut experiment duration nearly in half.
### Bias Removal
In addition to reducing the variance of lift estimates, CUPED applies an adjustment to the sample means YˉT\bar{Y}_TYˉT​ and YˉC\bar{Y}_CYˉC​ to produce the following covariate-adjusted means:
YˉT,CUPED=YˉT−βT^(XˉT−Xˉall)YˉC,CUPED=YˉC−βC^(XˉC−Xˉall) \begin{aligned} \bar{Y}_{T, CUPED} &= \bar{Y}_T - \hat{\beta_T} \left(\bar{X}_T - \bar{X}_{all} \right) \\\ \bar{Y}_{C, CUPED} &= \bar{Y}_C - \hat{\beta_C} \left(\bar{X}_C - \bar{X}_{all} \right) \end{aligned}YˉT,CUPED​YˉC,CUPED​​=YˉT​−βT​^​(XˉT​−Xˉall​)=YˉC​−βC​^​(XˉC​−Xˉall​)​
Where XˉT\bar{X}_TXˉT​ and XˉC\bar{X}_CXˉC​ denote the covariate means for, respectively, the treatment and control variations, and Xˉall\bar{X}_{all}Xˉall​ denote the covariate mean over all experiment variations. Although the unadjusted means YˉT\bar{Y}_TYˉT​ and YˉC\bar{Y}_CYˉC​ are unbiased estimators of the variation averages over many realizations of the experiment, for a specific experiment there could be some conditional bias. Conditional bias may occur due to the random imbalances between the treatment and control variation covariate means XˉT\bar{X}_TXˉT​ and XˉC\bar{X}_CXˉC​. As long as the linear regression model is correct, the adjustments −βT^(XˉT−Xˉall)- \hat{\beta_T} \left(\bar{X}_T - \bar{X}_{all} \right)−βT​^​(XˉT​−Xˉall​) and −βC^(XˉC−Xˉall)- \hat{\beta_C} \left(\bar{X}_C - \bar{X}_{all} \right)−βC​^​(XˉC​−Xˉall​) control for these imbalances and remove the conditional bias.
## Implementation
In this section we discuss the scope and model for the CUPED implementation in the LaunchDarkly Experimentation product.
### CUPED availability
CUPED is available for experiments when the following criteria have been met:
 * **Average metrics** : CUPED can be applied to metrics using the [“average” analysis method](/docs/home/metrics/metric-analysis#analysis-method), including conversion metrics and continuous numeric metrics. CUPED is not applied to metrics using a percentile analysis method.
 * **Metrics with historical data** : CUPED can only be applied to a metric that has received events within the seven days prior to the start of the experiment. This is because CUPED requires historical metric data to compare current metric data to.
 * **Experiments that have been running for at least 90 minutes** : CUPED is not available for experiments receiving events for less than an hour and a half, due to the longer time it takes to compute the covariate-adjusted means and their standard errors (SEs) in the data pipeline. Results before the first hour and a half are not covariate-adjusted, even if the above CUPED criteria have been met.
### Model
The covariate adjustment model implemented is characterized by the following two features:
 * **Feature 1—Most General Model** : LaunchDarkly uses the most general ANCOVA model, which allows for unequal covariate slopes and unequal error variances by experiment group. Using the convention of [Yang and Tsiatis (2001)](https://www.jstor.org/stable/2685694), we refer to this model as the ANCOVA 3 model. To learn more, read [Covariate adjustment](/docs/guides/statistical-methodology/cuped#covariate-adjustment).
 * **Feature 2—Single Pre-period Covariate** : LaunchDarkly restricts the model to use only one covariate. We used the pre-period version of the modeled outcome, which is the covariate proposed by [Deng et al. (2013)](https://exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf) for the CUPED model and by [Soriano (2019)](https://arxiv.org/pdf/1711.00562.pdf) for the PrePost model.
Besides giving us the most general model, another advantage of Feature 1 is that we can implement the ANCOVA model by fitting separate linear regression models by variation. This means we fit one for each experiment variation, which simplifies implementation. One advantage of Feature 2 is that we can fit the linear regression models using simple analytical formulas without needing to use specialized statistical software for linear regression. Combining Features 1 and 2 yields a very simple SQL implementation that you can apply to big data with computational efficiency.
Some may express concern about our using only one covariate in the model when we could potentially include more. In practice, using only the single pre-period covariate is advantageous from both the data collection and model fit points of view:
 * **Data collection** : it simplifies the data collection process because we do not need to gather more covariates. Instead, we only need to collect data for the current outcome in the pre-period to obtain the pre-period covariate.
 * **Model fit** : in practice, the pre-period covariate used is typically the covariate with the largest correlation with the experiment-period outcome. When such a highly correlated covariate is included in the model, including additional covariates typically does not improve the overall fit. In other words, the R-squared of the linear regression model would not increase by much.
The pre-period covariate is measured over a seven-day lookback window before the start of the experiment. Precedent for using only seven days is established by the implementation of the PrePost model for covariate adjustment for YouTube experiments, mentioned in [Soriano (2019)](https://arxiv.org/pdf/1711.00562.pdf), which is the basis for our implementation.
There is also a tradeoff between using shorter versus longer windows in terms of relevance versus sufficiency. Shorter windows may have more relevance due to the recency of the information measured, but may not have captured all the information to optimize the outcome-covariate correlation. Longer windows capture more information, but risk including irrelevant information from older events, which may decrease the outcome-covariate correlation.
## CUPED on the Results tab
Each LaunchDarkly experiment indicates whether CUPED is enabled or disabled on its **Results** tab above the [“Exposures” graph](/docs/home/experimentation/size#the-exposures-graph).
![An experiment's CUPED status.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a0d26185ab84d6eb767033bb5d044e92bea3c8b8e12699963148f19c5be5b5d8/assets/images/__toPlaywright_newIA/experiment-results-statistics.png)
An experiment's CUPED status.
The CUPED statuses indicate:
 * **CUPED Disabled:** CUPED is disabled for your experiment because all of its metrics are percentile metrics.
 * **CUPED Enabled:** If CUPED is enabled, the experiment can be in one of three states:
 * CUPED is enabled, but no metrics are covariate-adjusted yet. This can be because the experiment has been receiving results for less than 90 minutes, or because there is no pre-experiment data in the seven days before the experiment started.
 * Only some of the metrics are covariate-adjusted.
 * All of the metrics are covariate-adjusted.
## Advanced topics
For those interested, we will cover some advanced topics in the following sections.
### Covariate adjustment
For a two-variation experiment, you can formulate the ANCOVA 3 model implemented at LaunchDarkly as a single model. For example:
Yi=αA+βAXi+ϵiϵi∼Normal(0,σA2) \begin{aligned} Y_i &= \alpha_A + \beta_A X_i + \epsilon_i \\\ \epsilon_i &\sim Normal\left(0, \sigma_A^2 \right) \end{aligned}Yi​ϵi​​=αA​+βA​Xi​+ϵi​∼Normal(0,σA2​)​
where A=TA = TA=T if unit iii is in the treatment variation and A=CA = CA=C if unit iii is in the control variation.
The original ANCOVA model introduced by [Fisher (1932)](https://www.google.com/books/edition/Statistical_Methods_for_Research_Workers/GmNAAAAAIAAJ) makes the following assumptions:
 * **Assumption 1—Equal Slopes** : equal covariate slope βA\beta_AβA​ for all experiment variations, that is, βT=βC\beta_T = \beta_CβT​=βC​ in the example above.
 * **Assumption 2—Equal Variances** : equal error variance σA2\sigma_A^2σA2​ for all experiment variations, that is, σT2=σC2\sigma_T^2 = \sigma_C^2σT2​=σC2​ in the example above.
[Yang and Tsiatis (2001)](https://www.jstor.org/stable/2685694) referred to this original model as the ANCOVA 1 model. If we remove Assumption 1 to allow for unequal covariate slopes, that is, allowing for βT≠βC\beta_T \neq \beta_CβT​=βC​, then we have what [Yang and Tsiatis (2001)](https://www.jstor.org/stable/2685694) calls the ANCOVA 2 model, also known as [Lin’s (2013)](https://projecteuclid.org/journals/annals-of-applied-statistics/volume-7/issue-1/Agnostic-notes-on-regression-adjustments-to-experimental-data--Reexamining/10.1214/12-AOAS583.full) model or the ANHECOVA (ANalysis of HEterogeneous COVAriance) model of [Ye et al. (2021)](https://www.tandfonline.com/doi/full/10.1080/01621459.2022.2049278).
However, in practice it can be convenient to relax Assumption 2 in addition to Assumption 1, which allows for unequal error variances, that is, σT2≠σC2\sigma_T^2 \neq \sigma_C^2σT2​=σC2​. This gives us what we call the ANCOVA 3 model.
This can be implemented in two ways:
 * **Single model** : a single _generalized least squares_ (GLS) model, which allows for error variances that vary by experiment group. This can be fitted using, for example, the `nlme::gls` function in R.
 * **Separate models** : an equivalent, but simpler, way to implement ANCOVA 3 is to fit one separate regression model for each experiment variation.
Fitting separate models has the advantage of fitting very simple regression models when there is only one covariate. This makes for a simple SQL implementation without leveraging additional software, which improves computational efficiency, especially on big data. We give an example of a simple SQL implementation of the ANCOVA 3 model in the section [SQL Implementation](/docs/guides/statistical-methodology/cuped#sql-implementation).
### Causal inference
In a comparative study, whether a randomized experiment or an observational study, the goal is to perform _causal inference,_ which includes estimating the causal effect of a treatment, for example, the causal effect of a new product feature on revenue.
Under the Neyman-Rubin potential outcomes framework for causal inference, we begin with _individual potential outcomes_ (IPOs) Yi(1)Y_i\left(1 \right)Yi​(1) and Yi(0)Y_i\left(0 \right)Yi​(0) for, respectively, receiving the treatment and not receiving the treatment, for each individual iii. The _individual treatment effect_ (ITE) for individual iii is given by:
ITEi=Yi(1)−Yi(0) \begin{aligned} ITE_i &= Y_i\left(1 \right) - Y_i\left(0 \right) \end{aligned}ITEi​​=Yi​(1)−Yi​(0)​
One estimand for the causal effect of treatment is the _average treatment effect_ (ATE), which is the average of the ITEs:
ATE=E(ITEi)=E(Yi(1)−Yi(0))=E(Yi(1))−E(Yi(0)) \begin{aligned} ATE &= E \left( ITE_i \right) \\\ &= E \left( Y_i\left(1 \right) - Y_i\left(0 \right) \right) \\\ &= E \left( Y_i\left(1 \right) \right) - E \left( Y_i\left(0 \right) \right) \end{aligned}ATE​=E(ITEi​)=E(Yi​(1)−Yi​(0))=E(Yi​(1))−E(Yi​(0))​
This is the difference between the _average potential outcomes_ (APOs) E(Yi(1))E \left( Y_i\left(1 \right) \right)E(Yi​(1)) and E(Yi(0))E \left( Y_i\left(0 \right) \right)E(Yi​(0)) of receiving and not receiving the treatment, respectively. An alternate causal estimand is the _relative average treatment effect_ (RATE):
RATE=E(Yi(1))E(Yi(0))−1 \begin{aligned} RATE &= \frac{E \left( Y_i\left(1 \right) \right)}{E \left( Y_i\left(0 \right) \right)} - 1 \end{aligned}RATE​=E(Yi​(0))E(Yi​(1))​−1​
In the LaunchDarkly Experimentation product, we estimate the APO E(Yi(a))E \left( Y_i\left(a \right) \right)E(Yi​(a)) for each experiment variation aaa for every combination of analysis time, experiment iteration, metric, and attribute. We then perform causal inference based on estimating the RATE for each treatment variation versus control.
### Covariate-adjusted means
To perform causal inference, we first estimate the IPOs by their respective linear regression predictions for the treatment and control variations using the ANCOVA 3 model described earlier:
Yi(1)=Y^T,i=α^T+β^TXiYi(0)=Y^C,i=α^C+β^CXi \begin{aligned} Y_i \left(1 \right) &= \hat{Y}_{T, i} = \hat{\alpha}_T + \hat{\beta}_T X_i \\\ Y_i \left(0 \right) &= \hat{Y}_{C, i} = \hat{\alpha}_C + \hat{\beta}_C X_i \end{aligned}Yi​(1)Yi​(0)​=Y^T,i​=α^T​+β^​T​Xi​=Y^C,i​=α^C​+β^​C​Xi​​
The APOs are estimated by averaging the IPOs over all available units. In this case, the units are in both the treatment and control variations:
E^(Yi(1))=1n∑i=1nYi(1)=1n∑i=1n(α^T+β^TXi)=α^T+β^TXˉallE^(Yi(0))=1n∑i=1nYi(0)=1n∑i=1n(α^C+β^CXi)=α^C+β^CXˉall \begin{aligned} \hat{E} \left(Y_i \left(1 \right)\right) &= \frac{1}{n} \sum_{i=1}^n Y_i \left(1 \right) = \frac{1}{n} \sum_{i=1}^n \left( \hat{\alpha}_T + \hat{\beta}_T X_i \right) = \hat{\alpha}_T + \hat{\beta}_T \bar{X}_{all} \\\ \hat{E} \left(Y_i \left(0 \right)\right) &= \frac{1}{n} \sum_{i=1}^n Y_i \left(0 \right) = \frac{1}{n} \sum_{i=1}^n \left( \hat{\alpha}_C + \hat{\beta}_C X_i \right) = \hat{\alpha}_C + \hat{\beta}_C \bar{X}_{all} \end{aligned}E^(Yi​(1))E^(Yi​(0))​=n1​i=1∑n​Yi​(1)=n1​i=1∑n​(α^T​+β^​T​Xi​)=α^T​+β^​T​Xˉall​=n1​i=1∑n​Yi​(0)=n1​i=1∑n​(α^C​+β^​C​Xi​)=α^C​+β^​C​Xˉall​​
where Xˉ\bar{X}Xˉ denotes the average of the covariate over all units in both variations. Because the linear regression models have only one predictor, the estimated regression intercepts are given by:
α^T=YˉT−β^TXˉTα^C=YˉC−β^CXˉC \begin{aligned} \hat{\alpha}_T &= \bar Y_T - \hat\beta_T\bar{X}_T \\\ \hat{\alpha}_C &= \bar Y_C - \hat\beta_C\bar{X}_C \\\ \end{aligned}α^T​α^C​​=YˉT​−β^​T​XˉT​=YˉC​−β^​C​XˉC​​
Therefore, the estimated APOs are given by:
E^(Yi(1))=YˉT−β^TXˉT+β^TXˉall=YˉT−β^T(XˉT−Xˉall)=YˉT,adjE^(Yi(0))=YˉC−β^CXˉC+β^CXˉall=YˉC−β^C(XˉC−Xˉall)=YˉC,adj \begin{aligned} \hat{E} \left(Y_i \left(1 \right)\right) &= \bar{Y}_T - \hat{\beta}_T \bar{X}_T + \hat{\beta}_T \bar{X}_{all} = \bar{Y}_T - \hat{\beta}_T \left( \bar{X}_T - \bar{X}_{all} \right) = \bar{Y}_{T, adj} \\\ \hat{E} \left(Y_i \left(0 \right)\right) &= \bar{Y}_C - \hat{\beta}_C \bar{X}_C + \hat{\beta}_C \bar{X}_{all} = \bar{Y}_C - \hat{\beta}_C \left( \bar{X}_C - \bar{X}_{all} \right) = \bar{Y}_{C, adj} \end{aligned}E^(Yi​(1))E^(Yi​(0))​=YˉT​−β^​T​XˉT​+β^​T​Xˉall​=YˉT​−β^​T​(XˉT​−Xˉall​)=YˉT,adj​=YˉC​−β^​C​XˉC​+β^​C​Xˉall​=YˉC​−β^​C​(XˉC​−Xˉall​)=YˉC,adj​​
We refer to YˉT,adj\bar{Y}_{T, adj}YˉT,adj​ and YˉC,adj\bar{Y}_{C, adj}YˉC,adj​ as covariate-adjusted means. They are the unadjusted sample means YˉT\bar{Y}_{T}YˉT​ and YˉC\bar{Y}_{C}YˉC​, minus the adjustments β^T(XˉT−Xˉall)\hat{\beta}_T \left( \bar{X}_T - \bar{X}_{all} \right)β^​T​(XˉT​−Xˉall​) and β^T(XˉC−Xˉall)\hat{\beta}_T \left( \bar{X}_C - \bar{X}_{all} \right)β^​T​(XˉC​−Xˉall​). This removes conditional bias due to the randomized imbalances between the covariate means XˉT\bar{X}_TXˉT​ and XˉC\bar{X}_CXˉC​ for both the treatment and control variations, respectively.
You can compute the estimated regression slopes with the following formulas:
β^T=rTsY,TsX,Tβ^C=rTsY,CsX,C \begin{aligned} \hat{\beta}_T &= r_T \frac{s_{Y, T}}{s_{X, T}} \\\ \hat{\beta}_C &= r_T \frac{s_{Y, C}}{s_{X, C}} \end{aligned}β^​T​β^​C​​=rT​sX,T​sY,T​​=rT​sX,C​sY,C​​​
where:
 * sY,Ts_{Y, T}sY,T​ and sY,Cs_{Y, C}sY,C​ are the sample standard deviation (SD) for the outcome in the treatment and control variations, respectively
 * sX,Ts_{X, T}sX,T​ and sX,Cs_{X, C}sX,C​ are the sample SD for the covariate in the treatment and control variations, respectively, and
 * rTr_TrT​ and rCr_CrC​ are the outcome-covariate correlation in the treatment and control variations, respectively.
We can show that the estimated SEs for the covariate-adjusted means for both the treatment and control variations are:
SE^(YˉT,adj)=sY,T1−rT2nT−1nT−21nT+(XˉT−Xˉall)2(nT−1)sX,T2SE^(YˉC,adj)=sC,T1−rC2nC−1nC−21nC+(XˉC−Xˉall)2(nC−1)sX,C2 \begin{aligned} \hat{SE} \left(\bar{Y}_{T, adj} \right) &= s_{Y, T} \sqrt{1 - r_T^2}\sqrt{\frac{n_T - 1}{n_T - 2}}\sqrt{\frac{1}{n_T} + \frac{ (\bar{X}_T - \bar{X}_{all})^2 }{\left(n_T - 1 \right)s_{X, T}^2} } \\\ \hat{SE} \left(\bar{Y}_{C, adj} \right) &= s_{C, T} \sqrt{1 - r_C^2}\sqrt{\frac{n_C - 1}{n_C - 2}}\sqrt{\frac{1}{n_C} + \frac{(\bar{X}_C - \bar{X}_{all})^2 }{\left(n_C - 1 \right)s_{X, C}^2} } \end{aligned}SE^(YˉT,adj​)SE^(YˉC,adj​)​=sY,T​1−rT2​​nT​−2nT​−1​​nT​1​+(nT​−1)sX,T2​(XˉT​−Xˉall​)2​​=sC,T​1−rC2​​nC​−2nC​−1​​nC​1​+(nC​−1)sX,C2​(XˉC​−Xˉall​)2​​​
where nTn_TnT​ and nCn_CnC​ are the sample sizes for the treatment and control variations, respectively.
When the sample sizes nTn_TnT​ and nCn_CnC​ are large and the imbalances XˉT−Xˉall\bar{X}_T - \bar{X}_{all}XˉT​−Xˉall​ and XˉC−Xˉall\bar{X}_C - \bar{X}_{all}XˉC​−Xˉall​ are negligible, the above SEs reduce to the following:
SE^(YˉT,adj)≈sY,T1nT1−rT2=SE^(YˉT)1−rT2SE^(YˉC,adj)≈sY,C1nC1−rC2=SE^(YˉC)1−rC2 \begin{aligned} \hat{SE} \left(\bar{Y}_{T, adj} \right) &\approx s_{Y, T}\sqrt{\frac{1}{n_T}}\sqrt{1 - r_T^2} = \hat{SE} \left(\bar{Y}_T \right) \sqrt{1 - r_T^2} \\\ \hat{SE} \left(\bar{Y}_{C, adj} \right) &\approx s_{Y, C}\sqrt{\frac{1}{n_C}}\sqrt{1 - r_C^2} = \hat{SE} \left(\bar{Y}_C \right) \sqrt{1 - r_C^2} \end{aligned}SE^(YˉT,adj​)SE^(YˉC,adj​)​≈sY,T​nT​1​​1−rT2​​=SE^(YˉT​)1−rT2​​≈sY,C​nC​1​​1−rC2​​=SE^(YˉC​)1−rC2​​​
Therefore, the proportional variance reduction for each is approximately equal to the squared correlation for the variation, as we showed earlier:
1−Var^(YˉT,adj)Var^(YˉT)≈rT21−Var^(YˉC,adj)Var^(YˉC)≈rC2 \begin{aligned} 1 - \frac{\hat{Var} \left(\bar{Y}_{T, adj} \right)}{\hat{Var} \left(\bar{Y}_T \right)} &\approx r_T^2 \\\ 1 - \frac{\hat{Var} \left(\bar{Y}_{C, adj} \right)}{\hat{Var} \left(\bar{Y}_C \right)} &\approx r_C^2 \end{aligned}1−Var^(YˉT​)Var^(YˉT,adj​)​1−Var^(YˉC​)Var^(YˉC,adj​)​​≈rT2​≈rC2​​
### Frequentist and Bayesian approaches
For frequentist estimates, the estimates of the APOs are the above covariate-adjusted means YˉT,adj\bar{Y}_{T, adj}YˉT,adj​ and YˉC,adj\bar{Y}_{C, adj}YˉC,adj​. In the Bayesian model, the APO estimates are regularized using empirical Bayes priors. To learn more, read [Experimentation statistical methodology for Bayesian experiments](/docs/guides/statistical-methodology/methodology-bayesian) and [Experimentation statistical methodology for frequentist experiments](/docs/guides/statistical-methodology/methodology-frequentist).
The Bayesian results without covariate adjustment through CUPED continue to use the normal-normal model for custom conversion count and custom numeric continuous metrics and the beta-binomial model for custom conversion binary, clicked or tapped, and page viewed metrics. However, the Bayesian results with covariate adjustment through CUPED will use the normal-normal model for all metrics using the “average” analysis method, including custom conversion binary metrics. Under this model, we assume the following prior distribution for the parameter estimated in variation AT,CA_{T, C}AT,C​ :
θprior,A∼Normal(μ0,A,σ0,A2) \begin{aligned} \theta_{prior, A} \sim Normal\left(\mu_{0, A}, \sigma_{0, A}^2 \right) \end{aligned}θprior,A​∼Normal(μ0,A​,σ0,A2​)​
For details on the prior mean μ0,A\mu_{0, A}μ0,A​ and σ0,A2\sigma_{0, A}^2σ0,A2​, read [Experimentation statistical methodology for Bayesian experiments](/docs/guides/statistical-methodology/methodology-bayesian).
LaunchDarkly provides a frequentist estimate θ^A\hat\theta_Aθ^A​ and its estimated standard error SE^(θ^A)\hat{SE}\left(\hat\theta_A \right)SE^(θ^A​). For the non-CUPED results, the estimate is the sample mean. For CUPED results, the estimate in the covariate-adjusted mean θ^A=YˉA,adj\hat\theta_A = \bar{Y}_{A, adj}θ^A​=YˉA,adj​, with details provided in the previous section.
We define precision as the inverse of the variance, which is equivalent to the inverse of the squared standard error. Therefore, the estimated precisions of the prior distribution and the frequentist estimate are, respectively:
Prec(θprior,A)=1σ0,A2Prec(θ^A)=1SE^(θ^A)2 \begin{aligned} Prec\left(\theta_{prior, A} \right) &= \frac{1}{\sigma_{0, A}^2} \\\ Prec\left(\hat\theta_A \right) &= \frac{1}{\hat{SE}\left(\hat\theta_A \right)^2} \end{aligned}Prec(θprior,A​)Prec(θ^A​)​=σ0,A2​1​=SE^(θ^A​)21​​
Define the following precision sum and weight:
S=Prec(θ^A)+Prec(θprior,A)w=Prec(θ^A)S \begin{aligned} S &= Prec\left(\hat\theta_A \right) + Prec\left(\theta_{prior, A} \right) \\\ w &= \frac{Prec\left(\hat\theta_A \right)}{S} \end{aligned}Sw​=Prec(θ^A​)+Prec(θprior,A​)=SPrec(θ^A​)​​
Then the posterior distribution of the estimated parameter is given by:
θposterior,A∼Normal(wθ^+(1−w)μ0,A,S−1) \begin{aligned} \theta_{posterior, A} \sim Normal \left(w \hat{\theta} + \left(1 - w\right)\mu_{0, A}, S^{-1} \right) \end{aligned}θposterior,A​∼Normal(wθ^+(1−w)μ0,A​,S−1)​
where the posterior mean is given by the precision-weighted average of the frequentist estimate θ^\hat{\theta}θ^ and the prior mean μ0,A\mu_{0, A}μ0,A​, and the posterior variance is the inverse of the sum of the frequentist estimate precision Prec(θ^A)Prec\left(\hat\theta_A \right)Prec(θ^A​) and the prior precision Prec(θprior,A)Prec\left(\theta_{prior, A} \right)Prec(θprior,A​).
### SQL implementation
Here is an example SQL implementation of the ANCOVA 3 model for covariate adjustment to demonstrate its simplicity.
Assume that we have fields `y` and `x` in a table named `UnitTable`, which is aggregated by experiment units, with fields for analysis time, experiment, metric, segment, and variation. The following simple query produces non-CUPED and CUPED estimates with corresponding SEs aggregated by combinations of analysis time, experiment, metric, segment, and variation:
ANCOVA 3 model
```
1
| WITH BasicStats AS (
---|--- 
2
| SELECT
3
| analysis_time,
4
| experiment,
5
| metric,
6
| segment,
7
| arm,
8
| COUNT(*) AS n,
9
| AVG(y) AS ybar,
10
| AVG(x) AS xbar,
11
| AVG(x) OVER (PARTITION BY analysis_time, experiment, metric, segment)
12
| AS xbar_all,
13
| STDEV_SAMP(y) AS s_y,
14
| STDEV_SAMP(x) AS s_x,
15
| CORR(x, y) AS r
16
| FROM UnitTable
17
| GROUP BY 1, 2, 3, 4, 5
18
| )
19
| SELECT
20
| analysis_time,
21
| experiment,
22
| metric,
23
| segment,
24
| arm,
25
| 'unadjusted' AS method,
26
| n AS exp_unit_count,
27
| ybar AS estimate,
28
| s_y / SQRT(n) AS estimate_std_error
29
| FROM BasicStats
30
| UNION ALL
31
| SELECT
32
| analysis_time,
33
| experiment,
34
| metric,
35
| segment,
36
| arm,
37
| 'covariate_adjusted' AS method,
38
| n AS exp_unit_count,
39
| ybar - (r * s_y / s_x) * (xbar - xbar_all) AS estimate,
40
| s_y * SQRT(1 - SQUARE(r)) * SQRT((n - 1) / (n - 2)) *
41
| SQRT(1 / n + SQUARE(xbar - xbar_all) / (SQUARE(s_x) * (n - 1)))
42
| AS estimate_std_error
43
| FROM BasicStats
```
The `BasicStats` common table expression (CTE) produces the following aggregated statistics needed to compute the unadjusted and covariate-adjusted means for each combination of analysis time, experiment, metric, segment, and variation:
 * **Sample means** : the sample means Yˉ\bar{Y}Yˉ and Xˉ\bar{X}Xˉ for the outcome and the covariate, respectively.
 * **Sample standard deviations** : the sample standard deviations sYs_YsY​ and sXs_XsX​ for the outcome and the covariate, respectively.
 * **Sample correlation** : the sample correlation rrr between the outcome and the covariate.
The outer query takes the aggregated statistics from the `BasicStats` CTE to compute the unadjusted and covariate-adjusted means and their SEs using the formulas we derived in the “[Covariate-adjusted means](/docs/guides/statistical-methodology/cuped#covariate-adjusted-means)” section.
## References
[Deng, Alex, Ya Xu, Ron Kohavi, and Toby Walker (2013)](https://exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf). “Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data.” _WSDM’13,_ Rome, Italy.
[Fisher, Ronald A. (1932)](https://www.google.com/books/edition/Statistical_Methods_for_Research_Workers/GmNAAAAAIAAJ). _Statistical Methods for Research Workers._ Oliver and Boyd. Edinburgh, 4th ed.
[Huitema, Bradley (2011)](https://www.google.com/books/edition/The_Analysis_of_Covariance_and_Alternati/6dxwep5_ZxAC?hl=en). _Analysis of Covariance and Alternatives: Statistical Methods for Experiments, Quasi-Experiments, and Single-Case Studies,_ 2nd ed. Wiley.
[Lin, Winston (2013)](https://projecteuclid.org/journals/annals-of-applied-statistics/volume-7/issue-1/Agnostic-notes-on-regression-adjustments-to-experimental-data--Reexamining/10.1214/12-AOAS583.full). “Agnostic Notes on Regression Adjustments to Experimental Data: Reexamining Freedman’s Critique.” _Annals of Applied Statistics,_ 7(1): 295-318.
[Soriano, Jacopo (2019)](https://arxiv.org/pdf/1711.00562.pdf). “Percent Change Estimation in Large Scale Online Experiments.” <https://arxiv.org/pdf/1711.00562.pdf>.
[Yang, Li and Anastasios A. Tsiatis. (2001)](https://www.jstor.org/stable/2685694). “Efficiency Study of Estimators for a Treatment Effect in a Pretest-posttest Trial.” _American Statistician,_ 55: 314-321.
[Ye, Ting, Jun Shao, Yanyao Yi, and Qingyuan Zhao (2023)](https://www.tandfonline.com/doi/full/10.1080/01621459.2022.2049278). “Toward Better Practice of Covariate Adjustment in Analyzing Randomized Clinical Trials.” _Journal of the American Statistical Association,_ 118(544): 2370-2382.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs