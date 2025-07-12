# Documentación Completa

> **Generado:** 11/7/2025, 19:13:04
> **Archivos combinados:** 39
> **Herramienta:** Web Scraper to Markdown

## Tabla de Contenidos

1. [Blend Whitepaper](#sección-1---blend-whitepaper)
2. [Index](#sección-2---index)
3. [Media Kit](#sección-3---media-kit)
4. [Pool Creators Adding Assets Emissions](#sección-4---pool-creators-adding-assets-emissions)
5. [Pool Creators Adding Assets Interest Rates](#sección-5---pool-creators-adding-assets-interest-rates)
6. [Pool Creators Adding Assets Risk Parameters](#sección-6---pool-creators-adding-assets-risk-parameters)
7. [Pool Creators Backstop Bootstrapping](#sección-7---pool-creators-backstop-bootstrapping)
8. [Pool Creators General](#sección-8---pool-creators-general)
9. [Pool Creators Pool Management](#sección-9---pool-creators-pool-management)
10. [Pool Creators Required Infrastructure](#sección-10---pool-creators-required-infrastructure)
11. [Pool Creators Selecting An Oracle](#sección-11---pool-creators-selecting-an-oracle)
12. [Pool Creators Setting Backstop Take Rate](#sección-12---pool-creators-setting-backstop-take-rate)
13. [Pool Creators Setting Max Positions](#sección-13---pool-creators-setting-max-positions)
14. [Pool Creators Tutorial Setting Up A Pool](#sección-14---pool-creators-tutorial-setting-up-a-pool)
15. [Tech Docs Core Contracts Backstop Deposit Management](#sección-15---tech-docs-core-contracts-backstop-deposit-management)
16. [Tech Docs Core Contracts Backstop Drawing And Donating](#sección-16---tech-docs-core-contracts-backstop-drawing-and-donating)
17. [Tech Docs Core Contracts Backstop Emission Distribution](#sección-17---tech-docs-core-contracts-backstop-emission-distribution)
18. [Tech Docs Core Contracts Emitter Backstop Management](#sección-18---tech-docs-core-contracts-emitter-backstop-management)
19. [Tech Docs Core Contracts Emitter Blend Distribution](#sección-19---tech-docs-core-contracts-emitter-blend-distribution)
20. [Tech Docs Core Contracts Lending Pool Bad Debt Management](#sección-20---tech-docs-core-contracts-lending-pool-bad-debt-management)
21. [Tech Docs Core Contracts Lending Pool Emission Management](#sección-21---tech-docs-core-contracts-lending-pool-emission-management)
22. [Tech Docs Core Contracts Lending Pool Fund Management](#sección-22---tech-docs-core-contracts-lending-pool-fund-management)
23. [Tech Docs Core Contracts Lending Pool Interest Management](#sección-23---tech-docs-core-contracts-lending-pool-interest-management)
24. [Tech Docs Core Contracts Lending Pool Liquidation Management](#sección-24---tech-docs-core-contracts-lending-pool-liquidation-management)
25. [Tech Docs Core Contracts Lending Pool Pool Management](#sección-25---tech-docs-core-contracts-lending-pool-pool-management)
26. [Tech Docs Core Contracts Lending Pool Protocol Tokens](#sección-26---tech-docs-core-contracts-lending-pool-protocol-tokens)
27. [Tech Docs Core Contracts Pool Factory Lending Pool Deployment](#sección-27---tech-docs-core-contracts-pool-factory-lending-pool-deployment)
28. [Tech Docs General](#sección-28---tech-docs-general)
29. [Tech Docs Guides Deploying A Pool](#sección-29---tech-docs-guides-deploying-a-pool)
30. [Tech Docs Integrations Fee Vault](#sección-30---tech-docs-integrations-fee-vault)
31. [Tech Docs Potential Improvements](#sección-31---tech-docs-potential-improvements)
32. [Users Auctions](#sección-32---users-auctions)
33. [Users Backstopping](#sección-33---users-backstopping)
34. [Users Blnd Token](#sección-34---users-blnd-token)
35. [Users Choosing Pools](#sección-35---users-choosing-pools)
36. [Users General Faq](#sección-36---users-general-faq)
37. [Users Lending Borrowing Borrowing](#sección-37---users-lending-borrowing-borrowing)
38. [Users Lending Borrowing Lending](#sección-38---users-lending-borrowing-lending)
39. [Users Lending Borrowing Liquidations](#sección-39---users-lending-borrowing-liquidations)

---

## Sección 1 - Blend Whitepaper

### Blend Whitepaper | Blend

**URL:** https://docs.blend.capital/blend-whitepaper
**Fecha de extracción:** 2025-07-12T01:12:06.194Z

---

---

source: https://docs.blend.capital/blend-whitepaper
generated: 2025-07-12T01:12:06.194Z

---

Copy

### 📄Blend Whitepaper

##### [](#v2-differences)

V2 Differences

The below whitepaper is for Blend V1. Blend V1 and V2 are essentially the same protocol, V2 has minor technical improvements. The only one's we will mention here is the introduction of flash loans, the reduction of the backstop threshold to 100,000, the reduction of the backstop withdrawal queue time to 17 days, and the modification of the reward zone length to a set 50.

##### [](#flash-loans)

Flash Loans

Now users can borrow undercollateralized from lending pools as long as they have a valid health factor at the end of the transaction.

##### [](#backstop-threshold)

Backstop Threshold

The backstop threshold has been reduced to 100,000. This is to make Blend more accessible to more users and lower the barrier to entry.

##### [](#backstop-withdrawal-queue)

Backstop Withdrawal Queue

The backstop withdrawal queue has been reduced to 17 days from 21 days.

##### [](#reward-zone-length)

Reward Zone Length

The reward zone length has been set to a fixed 30. This has been increased from the original 10, and no longer increases every 3 months.

#### [](#blend-whitepaper)

Blend Whitepaper

- [Abstract](/blend-whitepaper#abstract)

- [Introduction](/blend-whitepaper#introduction)

- [Protocol Specification](/blend-whitepaper#protocol-specification)

  - [Isolated Lending Pools](/blend-whitepaper#isolated-lending-pools)

  - [Backstop Module](/blend-whitepaper#backstop-module)

  - [Lending and Borrowing](/blend-whitepaper#lending-and-borrowing)

  - [Interest Rates](/blend-whitepaper#interest-rates)

  - [Liquidations](/blend-whitepaper#liquidations)

- [Governance and Decentralization](/blend-whitepaper#governance-and-decentralization)

  - [Pool Management](/blend-whitepaper#pool-management)

  - [BLND Emissions](/blend-whitepaper#blnd-emissions)

- [References](/blend-whitepaper#references)

#### [](#abstract)

Abstract

This paper introduces a liquidity protocol primitive, Blend. A liquidity protocol primitive enables the permissionless creation of lending pools to quickly respond to emerging market needs. Applications, industries, and users can utilize this primitive to create isolated lending pools that best serve their niche. Blend is an ungoverned, modular, liquidity protocol primitive that does not compromise on security or capital efficiency.

#### [](#introduction)

Introduction

Decentralized money markets act as a cornerstone for healthy crypto-economic systems. They trustlessly facilitate the flow of capital to wherever it is most productive, increasing capital efficiency and generating interest along the way. Aave and Compound prove these products' value with their success in the Ethereum ecosystem. Since their inception during the early stages of decentralized finance (DeFi), they quickly became two of the industry’s largest and most used DeFi protocols. Aave remains one of the largest, peaking at approximately $30 billion in liquidity \[[1](https://github.com/aave/aave-v3-core/blob/master/techpaper/Aave_V3_Technical_Paper.pdf)\].

Despite their usefulness, current money markets fall short in terms of flexibility. Users want to utilize a wide range of their crypto assets in money markets. However, supporting risky assets, especially as collateral, can put protocol funds at risk. Aave and Compound forgo flexibility and have extensive governance systems that ensure any asset meets well-defined criteria before adding it to their markets \[[2](https://medium.com/gauntlet-networks/gauntlets-parameter-recommendation-methodology-8591478a0c1c), [3](https://docs.aave.com/risk/asset-risk/introduction)\]. Other protocols like Euler and Rari have novel approaches for managing permissionless listings that segment asset risk \[[4](https://docs.euler.finance/getting-started/white-paper#permissionless-listing)\]. Unfortunately, these approaches can lead to liquidity fragmentation and low capital utilization.

Blend represents a new, more primitive approach to decentralized money market protocols. It enables the permissionless creation of isolated lending pools, ensuring maximum flexibility and accessibility. Blend avoids the normal pitfalls of permissionless lending markets by using a market-driven backstop system to curate pools, ensuring appropriate risk levels, and using a dynamic interest rate model to preserve capital efficiency.

#### [](#protocol-specification)

Protocol Specification

##### [](#system-diagram)

System Diagram

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2Fgithub.com%2Fblend-capital%2Fdocs-v2%2Fblob%2Fmain%2F.gitbook%2Fassets%2FBlend%2520System%2520Diagram%403x.png&width=768&dpr=4&quality=100&sign=33a736&sv=2)

##### [](#isolated-lending-pools)

Isolated Lending Pools

Blend’s core component is its isolated lending pools. These pools facilitate lending and borrowing between users for a set of supported assets. Anyone can deploy an isolated pool using Blend, allowing the protocol to quickly adapt to the needs of constantly evolving digital economies. The deployer sets parameters that govern the pool’s supported assets, acceptable loan-to-value ratios, target utilization rates, and price oracle.

Blend ensures asset risk segmentation by logically separating positions in isolated pools from all other pools, meaning collateral and debt associated with one isolated pool does not apply to others. Thus, bad debt, liquidations, or bad oracles in one pool cannot spill over and harm users in another pool. As a result, the adaptability offered by Blend’s permissionless deployment does not expose protocol users to unknown risks.

There are two types of isolated pools, standard and owned:

###### [](#standard-pools)

Standard Pools

Standard pool parameters are immutable after deployment. As such, any parameters defined by the deployer, like the support assets, are fixed. This creates a trust-minimized money market environment, lowering the risk-surface for users.

###### [](#owned-pools)

Owned Pools

Owned pools are isolated lending pools where a delegated address can modify pool state and most pool parameters. Notably, they cannot modify the oracle contract address parameter or the backstop take rate parameter. This restriction prevents excessive damage to users by malicious or compromised pool owners. Owned pools are attractive choices for DAOs or platforms that want to offer their own lending market.

##### [](#blnd-token)

BLND Token

BLND is Blend’s protocol token; its primary purpose is backstopping and managing lending markets through the backstop module.

##### [](#backstop-module)

Backstop Module

The backstop module is a pool of funds that acts as first-loss capital for each isolated lending pool. Each pool's backstop funds are specific to themselves, and used extensively in pool management.

###### [](#depositing-and-withdrawing-funds)

Depositing and Withdrawing Funds

Users deposit 80/20 weighted BLND:USDC liquidity pool tokens into a backstop module for an isolated lending pool. BLND being 80% of the pool's weight, and USDC being 20. They can withdraw their deposits at any time. However, initiating a withdrawal places the funds into a withdrawal queue, where they remain for 21 days. Deposits that are queued for withdrawal will not earn backstop emissions. After the queue expires, users can withdraw their funds as long as the backstop module has no remaining bad debt. The queue period ensures the backstop module can effectively perform its function as lender insurance.

###### [](#lending-pool-interest-sharing)

Lending Pool Interest Sharing

In exchange for insuring pools, backstop module depositors receive a portion of the interest paid by pool borrowers. The percent of borrower interest paid to the backstop module depends on the BackstopTakeRate parameter, which is set on pool creation and validated such that the backstop cannot capture more than 100% of interest. The portion of interest paid to backstop module depositors should be set higher for high-risk pools and lower for low-risk pools, reflecting their differing insurance requirements.

###### [](#covering-bad-debt)

Covering Bad Debt

Pool backstop modules act as first-loss capital by paying off any bad debt the pool takes on. If a user has bad debt it’s transferred to the backstop module, which auctions off it’s holdings to pay it off. Any remaining bad debt is socialized among lenders if backstop module deposits are insufficient to cover it.

##### [](#lending-and-borrowing)

Lending and Borrowing

###### [](#lending-assets)

Lending Assets

Any asset supported by a given pool can be deposited into that pool. A deposit is represented by an ERC-20 token, or bToken, which entitles the holder to a share of the total deposited assets (similar to Compound’s cTokens \[[5](https://compound.finance/docs/ctokens)\]).

The lender receives bTokens for depositing amount of an asset based on the following exchange rate:

bTokens\=amountbTokenRatebTokens = \\frac{amount}{bTokenRate}bTokens\=bTokenRateamount​

The bTokenRate is an internal value that tracks how much interest has accrued to one bToken over the pool’s lifetime. For example, if 10% interest has been generated by a bToken, its bTokenRate will be 1.1.

###### [](#borrowing-assets)

Borrowing Assets

Any asset supported by the pool can be borrowed from the pool as long as the borrower has sufficient collateral deposited. In the event of a price change, borrowers risk liquidation if the collateral they have posted is no longer sufficient to cover their outstanding liabilities.

Borrowed assets are tracked with an ERC-20 token, or dToken (similar to Aave’s debtToken), which represents an outstanding liability for the holder against the pool for the borrowed token. These tokens are non-transferable and can only be removed by repaying the borrowed amount to the pool.

The borrower receives dTokens for borrowing amount of an asset from the pool based on the following exchange rate:

dTokenRate\=(bTokenTotalSupply∗bTokenRate−PoolAssetBalance)dTokenTotalSupplydTokenRate = \\frac{(bTokenTotalSupply \* bTokenRate - PoolAssetBalance)}{dTokenTotalSupply}dTokenRate\=dTokenTotalSupply(bTokenTotalSupply∗bTokenRate−PoolAssetBalance)​

dTokens\=amountdTokenRatedTokens=\\frac{amount}{dTokenRate}dTokens\=dTokenRateamount​

The value of assets a user can borrow from a pool is based on their Borrow Limit. Each collateral position in the pool increases their borrow limit by the value of the position multiplied by its Collateral Factor. Each liability position decreases their borrow limit by the value of the position divided by its Liability Factor. Each asset's collateral and liability factor is set on pool creation and bounded within \[0.00, 1.00\].

BorrowLimit\=∑(PositionValuecollateral∗AssetFactorcollateral)−∑(PositionValueLiabilityAssetFactorLiability)Borrow Limit = \\sum(PositionValue\_{collateral} \* AssetFactor\_{collateral}) -\\sum(\\frac{PositionValue\_{Liability}}{AssetFactor\_{Liability}})BorrowLimit\=∑(PositionValuecollateral​∗AssetFactorcollateral​)−∑(AssetFactorLiability​PositionValueLiability​​)

Supporting both a collateral and liability factor gives pool creators a large amount of flexibility regarding the level of leverage they permit for different positions. For example, if a pool creator wants to support high leverage for fiat borrows collateralized with fiat, but not crypto borrows collateralized with fiat, they can set all fiat collateral and liability factors to 0.98 and crypto collateral and liability factors to 0.765. This would give fiat borrowers using fiat as collateral up to 25x leverage, but crypto borrowers using fiat as collateral only up to 4x leverage. This level of flexibility is not possible using only collateral factors.

##### [](#utilization-caps)

Utilization Caps

To protect lenders from oracle instability or collateral asset exploits (infinite mints of a bridge asset etc.), pool creators can add utilization caps to assets primarily meant to be collateral assets. These caps prevent the asset from being borrowed above a certain utilization level. This safety feature, combined with backstop module first-loss capital, keeps lenders safe even in worst-case scenarios.

##### [](#interest-rates)

Interest Rates

Each pool algorithmically sets each of its assets’ interest rates based on each asset’s utilization ratio. The interest rate adjusts dynamically to stabilize the utilization to a constant target utilization ratio. The utilization ratio of an asset is defined by:

U\=1−BalancePoolbTokenTotalSupply∗bTokenRateU=1- \\frac{Balance\_{Pool}}{bTokenTotalSupply \* bTokenRate}U\=1−bTokenTotalSupply∗bTokenRateBalancePool​​

Each asset in the pool defines a target utilization rate and three initial interest rates: at the target utilization ratio $U\_T$, 95% utilization ratio, and 100% utilization ratio. The initial rates are used to calculate three slope values $R\_1$, $R\_2$, and $R\_3$. These values define an interest rate model, similar to Aave’s\[[6](https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf)\], but with three distinct legs:

IR(U)\={RM∗(Rbase+UUTR1)if U≤UTRM∗(Rbase+R1+U−UT0.95−UTR2)if UT<U≤0.95RM∗(Rbase+R1+R2)+U−0.950.05R3if 0.95<UIR(U)= \\begin{cases} RM\*(R\_{base}+\\frac{U}{U_T}R_1) & \\text{if } U\\leq U_T\\\\ RM\*(R\_{base}+R_1+\\frac{U-U_T}{0.95-U_T}R_2) & \\text{if } U_T\\lt U\\leq 0.95\\\\ RM\*(R\_{base}+R_1+R_2)+\\frac{U-0.95}{0.05}R_3 & \\text{if } 0.95\\lt U\\\\ \\end{cases}IR(U)\=⎩⎨⎧​RM∗(Rbase​+UT​U​R1​)RM∗(Rbase​+R1​+0.95−UT​U−UT​​R2​)RM∗(Rbase​+R1​+R2​)+0.05U−0.95​R3​​if U≤UT​if UT​<U≤0.95if 0.95<U​

whereRM\=Rate modifier for pool assetRbase\=Protocol’s base interest rate (0.01)R1,R2,R3\=Interest rate slope values for pool asset\\begin{align\*} \\text{where}\\\\ &RM =\\text{Rate modifier for pool asset}\\\\ &R\_{base} =\\text{Protocol's base interest rate (0.01)}\\\\ &R_1, R_2, R_3 =\\text{Interest rate slope values for pool asset} \\end{align\*}where​RM\=Rate modifier for pool assetRbase​\=Protocol’s base interest rate (0.01)R1​,R2​,R3​\=Interest rate slope values for pool asset​

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2Fgithub.com%2Fblend-capital%2Fdocs-v2%2Fblob%2Fmain%2F.gitbook%2Fassets%2Finterest_rate_model.png&width=768&dpr=4&quality=100&sign=f554b39b&sv=2)

_Figure 1: Interest rate curve examples for various asset classes where low curve has (U_T=0.9, R_1=0.03, R_2=0.2, R_3=1), medium curve has (U_T=0.75, R_1=0.05, R_2=0.5, R_3=1.5), high curve has (U_T=0.6, R_1=0.07, R_2=1, R_3=2), and the Rate Modifier is 1._

The Rate Modifier is a reactive value that adjusts the interest rate the pool charges for borrowing the asset to achieve a target utilization rate. The modifier slowly sums the error in utilization over time, compensating for any steady-state error as a result of the user-defined initial interest rates. The value is bounded between _\[0.1, 100\]_ to limit the effective interest rate change possible and avoid potential integral windup that could cause instability. The updated modifier is calculated as follows:

UtilRateError\=Δseconds∗(UT−U)Util Rate Error = \\Delta seconds \* (U_T-U)UtilRateError\=Δseconds∗(UT​−U)

RateModifiert\=UtilRateError∗ReactivityConstant+RateModifiert−1Rate Modifier_t = Util Rate Error \* Reactivity Constant + Rate Modifier\_{t-1}RateModifiert​\=UtilRateError∗ReactivityConstant+RateModifiert−1​

The Target Utilization Ratio and Reactivity Constant are constant values provided on pool creation for each asset supported by the pool. They are validated such that Target Utilization Rate is within _\[0, 0.95\]_ and Reactivity Constant is within _\[0, 10e-4\]_.

Interest rates are accrued discretely over the seconds since the last accrual has occurred. The following formula depicts how a loan value will get updated for a given interest rate, $R$:

LoanValue\=LoanValue∗(1+R∗ΔsecondsSecondsPerYear)Loan Value = Loan Value \* (1 + R \* \\frac{\\Delta seconds}{Seconds Per Year})LoanValue\=LoanValue∗(1+R∗SecondsPerYearΔseconds​)

Accruing discretely significantly lessens the gas required to accrue a given liability, and only slightly underestimates the full liability compared to a continuously compounding loan over a ten year time frame. Thus, it is an appropriate trade off for keeping contract calls cheap.

This dynamic interest rate model responds more efficiently to changing cost of capital in the crypto lending space than a traditional interest curve model. For example, if USDC borrowing rates fall in other protocols, we can also expect the utilization of USDC in Blend markets to fall. Thanks to the dynamic interest rate model, the Blend markets will automatically adjust their _Rate Modifier_ for USDC, lowering interest rates and driving utilization rates back up. Thus, Blend’s interest rate model enables markets to retain their goal utilization ratios and levels of capital efficiency without requiring any intervention from a governance system.

##### [](#liquidations)

Liquidations

In the event a borrower’s outstanding liabilities to a given pool exceed the borrowing capacity of their collateral in that pool, the borrower can be liquidated. This transfers a portion of the delinquent user's collateral and liability positions to a liquidator's account, where the liquidator can handle them as they wish. Liquidations are performed to reduce the chance a borrower defaults on their loan, causing a permanent loss of lender funds.

Blend uses gentle dutch auctions to liquidate borrowers without over-penalizing them or exposing them to oracle risk.

###### [](#auction-initiation)

Auction Initiation

Any user can initiate a liquidation auction on an account that has exceeded its borrow capacity for a pool. Liquidation initiators choose a percent,$L\_p$, of user liabilities to be auctioned off (the bid of the auction). Based on that percentage, the protocol will set a percentage of the user's collateral to also be auctioned (the lot of the auction). The collateral percentage, $C\_p$ is calculated using an estimated liquidator premium, $p$, the excess collateral value a liquidator is expected to demand in order to fill the auction:

p\=1−Cf‾∗Lf‾2+1p = \\frac{1-\\overline{C_f}\*\\overline{L_f}}{2}+1p\=21−Cf​​∗Lf​​​+1

Cp\=p∗Lp∗LoCoC_p = \\frac{p\*L_p\*L_o}{C_o}Cp​\=Co​p∗Lp​∗Lo​​

wherep\=Estimated Liquidator PremiumLf‾\=Average liability factor of the liability positionsCf‾\=Average collateral factor of the collateral positionsLo\=Total value of the user’s liabilities outstandingCo\=Total value of the user’s collateral outstandingLp\=Percent of liability positions being auctioned offCp\=Percent of collateral positions being auctioned off\\begin{align\*} \\text{where}\\\\ &p=\\text{Estimated Liquidator Premium}\\\\ &\\overline{L_f}=\\text{Average liability factor of the liability positions}\\\\ &\\overline{C_f}=\\text{Average collateral factor of the collateral positions}\\\\&Lo=\\text{Total value of the user's liabilities outstanding}\\\\ &C_o=\\text{Total value of the user's collateral outstanding}\\\\&Lp=\\text{Percent of liability positions being auctioned off}\\\\ &C_p=\\text{Percent of collateral positions being auctioned off}\\\\ \\end{align\*}where​p\=Estimated Liquidator PremiumLf​​\=Average liability factor of the liability positionsCf​​\=Average collateral factor of the collateral positionsLo\=Total value of the user’s liabilities outstandingCo​\=Total value of the user’s collateral outstandingLp\=Percent of liability positions being auctioned offCp​\=Percent of collateral positions being auctioned off​

When creating the liquidation, the protocol requires that the creator inputs an $Lp$ that ensures that if the liquidation is 100% cleared (all liability and collateral positions are transferred to the liquidator), after liquidation, the liquidated user's health factor is between 1.03 and 1.15.

###### [](#auction-duration)

Auction Duration

After the auction initiation, a lot modifier ($LM$) value begins scaling from zero to one based on how much time has passed since initiation. This value governs the percent of the auctioned user’s collateral the liquidator will receive upon filling the auction (1.00 being 100%). Once the lot modifier reaches one, a bid modifier ($BM$) value begins decreasing from one to zero. The bid modifier governs what percentage of the input liability amount the liquidator must repay when they fill the auction (1.00 being 100%). These modifiers are calculated based on the number of blocks that have passed since the auction was created:

LM(Δb)\={⌊Δb2⌋if Δb≤2001if Δb\>200,BM(Δb)\={1if Δb≤200⌊Δb2⌋if Δb\>200LM(\\Delta b)= \\begin{cases} \\lfloor \\frac{\\Delta b}{2} \\rfloor & \\text{if } \\Delta b\\leq 200\\\\ 1 & \\text{if } \\Delta b\\gt 200\\\\ \\end{cases}, \\hspace{2mm} BM(\\Delta b)= \\begin{cases} 1 & \\text{if } \\Delta b\\leq 200\\\\ \\lfloor \\frac{\\Delta b}{2} \\rfloor& \\text{if } \\Delta b\\gt 200\\\\ \\end{cases}LM(Δb)\={⌊2Δb​⌋1​if Δb≤200if Δb\>200​,BM(Δb)\={1⌊2Δb​⌋​if Δb≤200if Δb\>200​

whereΔb\=The number of blocks that have passed since the auction was initialized\\begin{align\*} \\text{where}\\\\ &\\Delta b=\\text{The number of blocks that have passed since the auction was initialized}\\\\ \\end{align\*}where​Δb\=The number of blocks that have passed since the auction was initialized​

###### [](#auction-fill)

Auction Fill

At any point, a liquidator can fill the auction and assume the bid modifier adjusted auction liability as well as the lot modifier adjusted auctioned collateral. After filling the liquidation, the liquidator must ensure their account is in a healthy state with a health factor greater than 1. This means they may need to repay the assumed liabilities or post more collateral.

###### [](#partial-liquidations)

Partial Liquidations

Blend supports partial liquidations - liquidators can opt to partially fill liquidation auctions, in which case the auction will be updated to reflect the remaining amounts to be liquidated. This lowers capital requirements for liquidating, allowing more parties to participate.

##### [](#price-oracles)

Price Oracles

Price oracles are used extensively to determine whether a borrower’s outstanding and potential liabilities are sufficiently collateralized. Each isolated lending pool specifies a price oracle to use on creation. The pool creator can select any deployed oracle contract as long as the oracle implements the expected BlendOracle trait, and all assets supported by the pool can fetch USD-denominated prices from the oracle.

#### [](#governance-and-decentralization)

Governance and Decentralization

##### [](#overview)

Overview

Blend is an ungoverned protocol. That is, no DAO or organization is required to manage the protocol and BLND does not have voting power. Instead, social governance and market forces surrounding backstop modules drive changes.

DAOs are historically bureaucratic, making it difficult for them to support the speed and flexibility required by the DeFi ecosystem. The primary reason DAOs are used by lending protocols is their ability to control and underwrite risk. Blend’s ungoverned model achieves similar levels of risk management using distributed market consensus rather than explicit DAO consensus. Thus, Blend can eschew the traditional DAO model in favor of a market-driven approach that allows it to respond much faster to market changes.

##### [](#pool-management)

Pool Management

Besides insuring pools, backstop modules are crucial for curating and managing pools. They perform this function by triggering modification of their pool’s state, which governs whether the pool is active (whether borrowing and depositing is allowed) or not.

###### [](#pool-state)

Pool State

Blend’s isolated lending pools have three possible states that determine how they function:

1.  _Active_: All operations are enabled

2.  _On Ice_: Only borrowing is disabled

3.  _Frozen_: Both borrowing and depositing are disabled

Pools start on ice, and their state can change depending on the state of their respective backstop module.

1.  _Active_ can be set if less than 25% of backstop module deposits are in the withdrawal queue and module deposits net queued withdrawals are above the backstop threshold.

2.  _On Ice_ can be set if 25% or more of the backstop module deposits are in the withdrawal queue or if module deposits, including queued withdrawals, are under the backstop threshold.

3.  _Frozen_ can be set if 50% or more of the backstop module deposits are in the withdrawal queue.

Pool state is modified based on Backstop module status because backstop module depositors are first-loss capital for pools and thus are the most exposed to pool risk levels. If pool risk levels change, it is expected backstop module depositors will be the first to react.

In the case of owned pools, the pool owner can set their pool to on ice or frozen, as they are also expected to monitor pool risk levels.

###### [](#backstop-threshold-1)

Backstop Threshold

The backstop deposit threshold required to activate pools is a product constant ($PC$) value of at least 200,000 for the BLND:USDC liquidity pool token deposits. This means that, when input into the weighted liquidity pool product constant formula, the underlying USDC and BLND token amounts represented by USDC:BLND liquidity pool token deposits must have a product constant of 200,000.

The constant product equation for 80/20 weighted liquidity pools is as follows:

PC\=A0.8∗B0.2PC=A^{0.8} \* B^{0.2}PC\=A0.8∗B0.2

wherePC\=Product Constant ValueA\=Amount of token A (BLND)B\=Amount of token B (USDC)\\begin{align\*} \\text{where}\\\\ &PC=\\text{Product Constant Value}\\\\ &A=\\text{Amount of token A (BLND)}\\\\ &B=\\text{Amount of token B (USDC)}\\\\ \\end{align\*}where​PC\=Product Constant ValueA\=Amount of token A (BLND)B\=Amount of token B (USDC)​

###### [](#pool-migration)

Pool Migration

Due to the immutable nature of standard isolated lending pools, if new parameters are required, a new pool must be deployed, and users must be migrated to it. Migrations are especially urgent if the old pool is using an oracle contract that is being shut down. To migrate users, someone first needs to create the new pool, then inform the backstop module depositors of the old pool what the new pool is and why they should migrate. Since an outdated parameter could jeopardize backstop module deposits, depositors should be more than happy to migrate. Once they begin the migration process by queueing their deposits for withdrawal, the pool can be turned off using pool management functions. This will force lenders and borrowers to migrate to the new pool to continue their operations.

##### [](#blnd-emissions)

BLND Emissions

BLND tokens are emitted by the protocol to users. An emissions contract controls all protocol emissions, and the backstop module determines how they get distributed. In total, the protocol emits 1 BLND token per second. The tokens are distributed to two types of users: backstop depositors and lending pool users.

###### [](#backstop-depositor-emissions)

Backstop Depositor Emissions

Users who deposit BLND:USDC LP tokens into the backstop module are eligible to receive a share of 70% of the total BLND emissions. All BLND:USDC LP token deposits are eligible for emissions regardless of the isolated pool the token is deposited in unless the deposit is queued for withdrawal. Each BLND:USDC LP token deposit receives emissions proportional to the total BLND:USDC LP tokens deposited by all users in the backstop module.

###### [](#isolated-pool-emissions)

Isolated Pool Emissions

Users who lend to or borrow from active Isolated Pools are eligible to receive a share of 30% of the total BLND emissions, depending on how the pool is configured. The backstop module splits the share of weekly emissions among these pools proportionally to their backstop sizes. From there, pools split their emission allowance to either borrowers or lenders based on the asset's emission rate. When these emissions are claimed, they are deposited into the backstop module of the pool the user was borrowing from.

###### [](#reward-zone)

Reward Zone

For a lending pool to receive emissions, it must be part of the reward zone. The reward zone is a subset of pools with the largest backstop modules; at protocol release, it will include 10 pools and add 1 pool every 97 days. A pool in the reward zone can be replaced at any point if a pool outside the reward zone has more backstop deposits. To be added to the reward zone, pools must have the status Active.

###### [](#emissions-as-balancing-force)

Emissions as Balancing Force

Distributing emissions to lending pools creates a necessary correlation between the pool’s backstop size and the pool’s total value locked (TVL). If the pool’s backstop module size outpaces the pool’s TVL, more emissions will be directed to the borrowers and lenders in the pool. This incentivizes more pool activity, which increases the pool’s TVL. If the pool’s TVL outpaces the pool’s backstop module, more interest is generated for backstop module depositors. This incentivizes more deposits into the pool’s backstop module, increasing its size. As a result of these incentive mechanisms, a pool’s backstop module size and its TVL remain correlated, protecting lender funds.

###### [](#emission-migration)

Emission Migration

The emission contract is not upgradeable and is only responsible for minting 1 BLND per second. Thus, all protocol logic regarding emissions distribution is the responsibility of the backstop module. If a new version of the protocol is released, the emission contract has an upgrade function that will redirect emissions from the old backstop module to the new contract. The upgrade function will only change the emission destination if the new contract has more BLND than the current backstop module. Thus, the new contract needs to convince the current backstop module depositors to migrate.

If a new backstop module contract is set, all currently existing pools will no longer receive emissions until they perform a backstop module update. After this is completed, the new backstop module assumes the responsibility of first-loss capital and the pool will again start receiving emissions.

###### [](#emissions-drop)

Emissions Drop

The emissions smart contract contains a Drop function that can be called on protocol release and after every emissions migration. This function distributes 50 million BLND to a list of addresses encoded into the backstop module smart contract.

##### [](#references)

References

\[1\] https://github.com/aave/aave-v3-core/blob/master/techpaper/Aave\_V3\_Technical\_Paper.pdf \[2\] https://medium.com/gauntlet-networks/gauntlets-parameter-recommendation-methodology-8591478a0c1c \[3\] https://docs.aave.com/risk/asset-risk/introduction \[4\] https://docs.euler.finance/getting-started/white-paper#permissionless-listing \[5\] https://compound.finance/docs/ctokens \[6\] https://github.com/aave/aave-protocol/blob/master/docs/Aave\_Protocol\_Whitepaper\_v1\_0.pdf

[PreviousBlend v2 Documentation](/)[NextMedia Kit](/media-kit)

Last updated 2 months ago

---

_Extraído de [https://docs.blend.capital/blend-whitepaper](https://docs.blend.capital/blend-whitepaper)_

---

## Sección 2 - Index

### Blend v2 Documentation | Blend

**URL:** https://docs.blend.capital
**Fecha de extracción:** 2025-07-12T01:12:00.807Z

---

---

source: https://docs.blend.capital
generated: 2025-07-12T01:12:00.807Z

---

Copy

### Blend v2 Documentation

##### [](#welcome)

Welcome!

This is the Blend v2 documentation page. Your place for all things related to the Blend protocol — a liquidity protocol primitive built on [Stellar](https://www.stellar.org).

###### [](#what-youll-find-here)

What you'll find here:

- [User Documentation](https://docs.blend.capital/users) Information on how users can utilize Blend lending pools

- [Pool Creator Documentation](/pool-creators/general) Information on how pool creators can create lending pools using Blend

Explore the docs to find out more!

- \*🪺 Follow** [**@blend_capital on Twitter**](https://x.com/blend_capital)**!\*\* **💬 Join the** [**Blend Discord**](https://discord.com/invite/a6CDBQQcjW)**!**

[NextBlend Whitepaper](/blend-whitepaper)

Last updated 29 days ago

---

_Extraído de [https://docs.blend.capital](https://docs.blend.capital)_

---

## Sección 3 - Media Kit

### Media Kit | Blend

**URL:** https://docs.blend.capital/media-kit
**Fecha de extracción:** 2025-07-12T01:12:11.273Z

---

---

source: https://docs.blend.capital/media-kit
generated: 2025-07-12T01:12:11.273Z

---

Copy

### 🧪Media Kit

You must use these assets in the form in which they are made available below. To avoid confusion, you may not alter the color, font, proportions, or any other aspect of these logos and design marks.

You must also set a logo or design mark off from the other content appearing in your use, and must not place it in such close proximity to other content that it is indistinguishable from that other content.

#### [](#blend-icons)

Blend Icons

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FGE2anbigA52J1BnuRV2n%252FBlend%2520Logo.png%3Falt%3Dmedia%26token%3D8e2d4aaa-da25-4296-a7a3-64194b4a702b&width=768&dpr=4&quality=100&sign=9d9d3fb7&sv=2)

Blend Logo

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FJLZ1kQvGi9AJJvobJtx0%252FBlend%2520App%2520Icon.png%3Falt%3Dmedia%26token%3D99430677-c375-4e56-b88b-6d27070d42bb&width=768&dpr=4&quality=100&sign=9595df24&sv=2)

Bllend App Icon

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FuC5ZjtUEToUwZ6GlREhw%252FBlend%2520Pool%2520Icon.png%3Falt%3Dmedia%26token%3D36bae4c2-4a7c-4583-a142-c77ec6a25594&width=768&dpr=4&quality=100&sign=353563ad&sv=2)

Blend Pool Icon

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FxCN5KxPfi1L5tUl4lsr3%252FBlend%2520Token%2520Icon.png%3Falt%3Dmedia%26token%3D46fc0542-d53d-457c-aec7-f16e6fa74817&width=768&dpr=4&quality=100&sign=d1c0e8c3&sv=2)

Blend Token Icon

#### [](#blend-wordmark--icon)

Blend Wordmark + Icon

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FbMRKNXIkVMG30NIjmNFX%252FBlend%2520Wordmark%2520-%2520White.png%3Falt%3Dmedia%26token%3D5e93254d-9faa-4af3-9d03-59484f7edbe6&width=768&dpr=4&quality=100&sign=b7d1c295&sv=2)

Blend Wordmark - White

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FWbt8TrtVk4SneKQh7ROU%252FBlend%2520Wordmark%2520-%2520Green%2520-%2520Boxed.png%3Falt%3Dmedia%26token%3D7d197380-b0a4-4157-a78e-0f7c53b0f236&width=768&dpr=4&quality=100&sign=b131df10&sv=2)

Blend Wordmark - Green - Boxed

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FExBemAY92zXV7fIFm2q0%252FBlend%2520Wordmark%2520-%2520Green.png%3Falt%3Dmedia%26token%3D7354b463-ba96-4cf7-be4a-e450ea1cb1c9&width=768&dpr=4&quality=100&sign=cd2f6d18&sv=2)

Blend Wordmark - Green

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FdQ1sG7V0RhTWPbmQbgqI%252FBlend%2520Wordmark%2520-%2520Black.png%3Falt%3Dmedia%26token%3D4dc76590-71bf-49e4-8ced-90c609aaf7e5&width=768&dpr=4&quality=100&sign=cd6eed20&sv=2)

BlendWordmark - Black

#### [](#emojis)

Emojis

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FgOL2HPfkFS7V3xN0izuP%252FLilBlendy.png%3Falt%3Dmedia%26token%3D04e8d452-c41c-468d-b902-cf3255dd7e73&width=768&dpr=4&quality=100&sign=c9eeba3d&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252Fxcv1YH7t7inDJKbalJ56%252FBlendyGM.png%3Falt%3Dmedia%26token%3D4edfe7d1-c192-4740-8539-517d8bff4f43&width=768&dpr=4&quality=100&sign=e3f8a948&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252F3AEoXtoDczTDmtR0itmZ%252FBlendGM.png%3Falt%3Dmedia%26token%3Dfcb9deff-ff15-4d4b-a5dd-e884d3487567&width=768&dpr=4&quality=100&sign=4568d3ae&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252Fh529f3wn3pYi6u2MyVoN%252FBlendCook.png%3Falt%3Dmedia%26token%3Da513114b-3210-4d66-8767-6acfeb804ce3&width=768&dpr=4&quality=100&sign=435544a8&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FZyZcc72zCrwjpHDj6juP%252FTheNamesBlendy.png%3Falt%3Dmedia%26token%3D52dd54dd-63a8-424a-bbee-af3eeeba22b5&width=768&dpr=4&quality=100&sign=3906147e&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FRRQxcML1wlCSpZxTpFjj%252FBlendyAngy.png%3Falt%3Dmedia%26token%3Dc25891ab-0de9-4201-b99f-85f2fac19aa5&width=768&dpr=4&quality=100&sign=ea18bafc&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FqdT1W3ndgR8aQex0ImNg%252FBlendyTheKid.png%3Falt%3Dmedia%26token%3D7df9f315-911b-4127-9b98-1ee091c989ff&width=768&dpr=4&quality=100&sign=92764d74&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FS5XTJ5wziXQjXD4LS3dp%252FBlendyYou.avif%3Falt%3Dmedia%26token%3D1943ff17-0aa8-4c7c-8d9d-14c9de8e524c&width=768&dpr=4&quality=100&sign=32788478&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252Fd8Wvu1HcKZ2NpndjJP2R%252FBlendyShrug.png%3Falt%3Dmedia%26token%3D308e177b-8ea9-475d-93ad-2220c2ff0ac8&width=768&dpr=4&quality=100&sign=6e5022c4&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FeF3c7tSWjHDq9BTK3mkn%252FBlendyWut.png%3Falt%3Dmedia%26token%3D11c3465e-aad6-4a3a-92b8-b2aaefd8db0e&width=768&dpr=4&quality=100&sign=18ca3e4a&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FhzjHIKf3f2pTSL3LJqfV%252FGetBlent.png%3Falt%3Dmedia%26token%3Dbb33c3e6-4947-4c40-a7a8-4b6aedec1991&width=768&dpr=4&quality=100&sign=1a83e45c&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FvgEtDmotgjAn7mi5q1Mp%252FEvilBlendy.png%3Falt%3Dmedia%26token%3D4491685a-e864-44be-ac21-da8ffe4ec552&width=768&dpr=4&quality=100&sign=4fb585e2&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252F1TeuGhbd2RIPctIGLWuO%252FSadBlendy.png%3Falt%3Dmedia%26token%3Da2b4bb57-0299-42a4-910a-e7aaa12e7385&width=768&dpr=4&quality=100&sign=a9ec31e2&sv=2)

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2F881490810-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FLg1UeA72WAt02V2TIIga%252Fuploads%252FNXoLSV9MwwZlsVbP0MiY%252FBlendLove.png%3Falt%3Dmedia%26token%3D8add8611-1b7c-4908-bf89-c6752b5f74bc&width=768&dpr=4&quality=100&sign=2df2b567&sv=2)

#### [](#basics)

Basics

[**Colors**](https://colorpeek.com/#24a338,e16bff,00c4ef,ff8a00) [**Font**](https://fonts.google.com/specimen/DM+Sans?preview.text=Blend)

[PreviousBlend Whitepaper](/blend-whitepaper)[NextDeployments](/mainnet-deployments)

Last updated 2 months ago

---

_Extraído de [https://docs.blend.capital/media-kit](https://docs.blend.capital/media-kit)_

---

## Sección 4 - Pool Creators Adding Assets Emissions

### Emissions | Blend

**URL:** https://docs.blend.capital/pool-creators/adding-assets/emissions
**Fecha de extracción:** 2025-07-12T01:12:12.540Z

---

---

source: https://docs.blend.capital/pool-creators/adding-assets/emissions
generated: 2025-07-12T01:12:12.540Z

---

Copy

### Emissions

Blend lending pools within the reward zone receive BLND emissions that are distributed to lenders or borrowers in the pool. Pool's can be added to the reward zone if they have larger backstop modules than the pools currently within the reward zone. Pool creators designate which assets in their pool receive emissions and whether borrowers or lenders of those assets receive emissions.

[PreviousInterest Rates](/pool-creators/adding-assets/interest-rates)[NextPool Management](/pool-creators/pool-management)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/adding-assets/emissions](https://docs.blend.capital/pool-creators/adding-assets/emissions)_

---

## Sección 5 - Pool Creators Adding Assets Interest Rates

### Interest Rates | Blend

**URL:** https://docs.blend.capital/pool-creators/adding-assets/interest-rates
**Fecha de extracción:** 2025-07-12T01:12:13.842Z

---

---

source: https://docs.blend.capital/pool-creators/adding-assets/interest-rates
generated: 2025-07-12T01:12:13.842Z

---

Copy

### Interest Rates

Interest rate parameters are used to define how much borrowers should be charged for borrowing assets at different utilization rates.

##### [](#utilization-rate)

Utilization Rate

An asset's utilization rate is the percentage of the asset's deposits that are currently being borrowed. It can be calculated using the following formula:

UtilizationRate\=TotalBorrowedTotalSuppliedUtilizationRate = \\frac{TotalBorrowed}{TotalSupplied}UtilizationRate\=TotalSuppliedTotalBorrowed​

##### [](#base-interest-rate)

Base Interest Rate

An asset's base interest rate is dynamic - it's based on a three-tier utilization curve which is calculated with the following parameters (the parameters are set by the pool creator and modifiable by the [pool admin](/pool-creators/pool-management#pool-admin)).

###### [](#target-utilization-u_t)

Target Utilization (U_T)

The target percentage of an asset’s supply that should be borrowed. This should be set high for assets that are intended to be borrowed and low for assets that are intended to be used as collateral. This value is stored with 7 decimals.

###### [](#base-rate-r_base)

Base Rate (R_base)

The reserve's minimum interest rate. This value has 7 decimals.

###### [](#rate-slope-1-r_1)

Rate Slope 1 (R_1)

The rate at which an asset's borrowing interest rate increases when it's below its target utilization. This value has 7 decimals.

###### [](#rate-slope-2-r_2)

Rate Slope 2 (R_2)

The rate at which an asset's interest rate increases when it's above its target utilization. This value has 7 decimals.

###### [](#rate-slope-3-r_3)

Rate Slope 3 (R_3)

The rate at which an asset's interest rate increases when it's above 95% utilization. An asset should never be above 95% utilization as it causes liquidity issues for lenders; thus, this slope should typically be set fairly high. This value has 7 decimals.

###### [](#base-interest-rate-equation)

Base Interest Rate Equation

IR(U)\={(Rbase+UUTR1)if U≤UT(Rbase+R1+U−UT0.95−UTR2)if UT<U≤0.95(Rbase+R1+R2)+U−0.950.05R3if 0.95<UIR(U)= \\begin{cases} (R\_{base}+\\frac{U}{U_T}R_1) & \\text{if } U\\leq U_T\\\\ (R\_{base}+R_1+\\frac{U-U_T}{0.95-U_T}R_2) & \\text{if } U_T\\lt U\\leq 0.95\\\\ (R\_{base}+R_1+R_2)+\\frac{U-0.95}{0.05}R_3 & \\text{if } 0.95\\lt U\\\\ \\end{cases}IR(U)\=⎩⎨⎧​(Rbase​+UT​U​R1​)(Rbase​+R1​+0.95−UT​U−UT​​R2​)(Rbase​+R1​+R2​)+0.05U−0.95​R3​​if U≤UT​if UT​<U≤0.95if 0.95<U​

Sample base interest rates:

![](https://docs.blend.capital/~gitbook/image?url=https%3A%2F%2Fgithub.com%2Fblend-capital%2Fdocs-v2%2Fblob%2Fmain%2F.gitbook%2Fassets%2Finterest%2520rates%2520%281%29.png&width=768&dpr=4&quality=100&sign=8dfc519d&sv=2)

- IR_1 is a low-utilization asset with:

  - U_T= 0.5 | R_1 = 0.05 | R_2 = 0.25 | R_3 = 0.5

- IR_2 is a high-utilization asset with:

  - U_T = 0.85 | R_1 = 0.05 | R_2 = 0.15 | R_3 = 0.5

- IR_3 is a fixed-rate asset with:

  - U_T = 0.01 | R_1 = 0.05 | R_2 = 0 | R_3 = 0

Desmos link: [https://www.desmos.com/calculator/hzqgduyymj](https://www.desmos.com/calculator/hzqgduyymj)

##### [](#reactive-interest)

Reactive Interest

In addition to being dynamic, interest rates are reactive. When an asset is below its target utilization, its interest rate will gradually decrease. When it’s above, the interest rate will increase. Target utilization should be set high for assets that are intended to be borrowed, like USDC, and low for assets that are designed to be primarily used as collateral.

This serves to ensure that capital remains efficiently allocated between BLND lending pools.

###### [](#rate-modifier)

Rate Modifier

The rate modifier value is the reactive value that modifies interest rates in response to variation from the target utilization rate. This value has 9 decimals.

The rate modifier equation is:

RateModifier\=UtilRateError∗ReactivityConstant+RateModifier\\ Rate Modifier = Util Rate Error \* Reactivity Constant + Rate Modifier RateModifier\=UtilRateError∗ReactivityConstant+RateModifier

###### [](#utilrateerror)

UtilRateError

The utilization rate error is the accumulation of how far off an assets utilization rate was from its target

UtilRateError\=Δseconds∗(UT−U)Util Rate Error = \\Delta seconds \* (U_T-U)UtilRateError\=Δseconds∗(UT​−U)

###### [](#reactivity-constant)

Reactivity Constant

A value that governs how quickly interest rates adjust based on assets' target utilization. This should be set based on how quickly users are expected to react to market inefficiencies. Additionally, it should also be set higher for assets with high-utilization targets to prevent them from experiencing excessive rate volatility and lower for low-utilization target assets.

For example, a reactivity constant of 0.0000200 will cause interest to double in approximately 2 months if the utilization rate is steadily 10% higher than it should be, making it a good choice for high utilization target assets.

518400seconds∗0.00002ReactivityConstant∗0.1UtilizationError∗100ErrorScalar\=1.0368518400\_{seconds}\*0.00002\_{ReactivityConstant}\*0.1\_{UtilizationError}\*100\_{ErrorScalar}=1.0368518400seconds​∗0.00002ReactivityConstant​∗0.1UtilizationError​∗100ErrorScalar​\=1.0368

RateModifier\=1.0368+1\=2.0368RateModifier = 1.0368 + 1=2.0368RateModifier\=1.0368+1\=2.0368

The full interest rate equation with the reactivity constant is

IR(U)\={RM∗(Rbase+UUTR1)if U≤UTRM∗(Rbase+R1+U−UT0.95−UTR2)if UT<U≤0.95RM∗(Rbase+R1+R2)+U−0.950.05R3if 0.95<U\\ IR(U)= \\begin{cases} RM\*(R\_{base}+\\frac{U}{U_T}R_1) & \\text{if } U\\leq U_T\\\\ RM\*(R\_{base}+R_1+\\frac{U-U_T}{0.95-U_T}R_2) & \\text{if } U_T\\lt U\\leq 0.95\\\\ RM\*(R\_{base}+R_1+R_2)+\\frac{U-0.95}{0.05}R_3 & \\text{if } 0.95\\lt U\\\\ \\end{cases} IR(U)\=⎩⎨⎧​RM∗(Rbase​+UT​U​R1​)RM∗(Rbase​+R1​+0.95−UT​U−UT​​R2​)RM∗(Rbase​+R1​+R2​)+0.05U−0.95​R3​​if U≤UT​if UT​<U≤0.95if 0.95<U​

You'll notice that the rate modifier only modifies the first two interest rates; this is because the last rate slope should be seen as an emergency slope with a very high value that assets shouldn't normally venture into. Allowing the rate modifier to affect it would make interest rates too volatile.

[PreviousRisk Parameters](/pool-creators/adding-assets/risk-parameters)[NextEmissions](/pool-creators/adding-assets/emissions)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/adding-assets/interest-rates](https://docs.blend.capital/pool-creators/adding-assets/interest-rates)_

---

## Sección 6 - Pool Creators Adding Assets Risk Parameters

### Risk Parameters | Blend

**URL:** https://docs.blend.capital/pool-creators/adding-assets/risk-parameters
**Fecha de extracción:** 2025-07-12T01:12:15.128Z

---

---

source: https://docs.blend.capital/pool-creators/adding-assets/risk-parameters
generated: 2025-07-12T01:12:15.128Z

---

Copy

### Risk Parameters

Pool creators use the following parameters to control asset risk. These parameters must be set for each asset in the pool.

##### [](#collateral-factor)

Collateral Factor

An asset's collateral factor modifies the asset value when used as collateral. Asset collateral factors must be set to less than or equal to 1.

When used as collateral, an asset's value is calculated using the following equation.

EffectiveCollateralValue\=CollateralFactor∗CollateralValueEffective CollateralValue= CollateralFactor \* CollateralValueEffectiveCollateralValue\=CollateralFactor∗CollateralValue

Generally, an asset's collateral factor should be set lower the riskier an asset is. If an asset shouldn't be collateralized at all, the collateral factor should be set to 0.

##### [](#liability-factor)

Liability Factor

An asset's liability factor modifies the asset value when borrowed. Liability factors must be set to less than or equal to 1.

An asset's value, when borrowed, is calculated using the following equation.

EffectiveLiabilityValue\=LiabilityValue∗LiabilityFactorEffectiveLiabilityValue=LiabilityValue\*LiabilityFactorEffectiveLiabilityValue\=LiabilityValue∗LiabilityFactor

Generally, an asset's liability factor should be set lower the riskier an asset is. If an asset isn't intended to be borrowed, its liability factor should be set to 0.

##### [](#utilization-cap)

Utilization Cap

Pool creators can set asset utilization caps to prevent more than a certain percentage of an asset from being borrowed. This parameter is useful for protecting lenders in the case of an oracle failure. For example, by setting the utilization cap of assets primarily used as collateral to 25%, no more than 25% of deposits can be stolen during an oracle attack.

##### [](#supply-cap)

Supply Cap

Pool creators can set a collateral cap for assets. This limits the total number of tokens that can be supplied to the pool. Pool creators should use this parameter to limit the pools exposure to long tail and volatile assets they want to use as collateral. It's also VERY important that they use it to protect the pool from issuer risks. Centralized assets (real world assets and stablecoins) can be infinitely minted by their issuers if the issuer becomes malicious or compromised. Setting collateral caps on these assets limits the amount of damage that can be done if such a scenario occurs.

[PreviousAdding Assets](/pool-creators/adding-assets)[NextInterest Rates](/pool-creators/adding-assets/interest-rates)

Last updated 3 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/adding-assets/risk-parameters](https://docs.blend.capital/pool-creators/adding-assets/risk-parameters)_

---

## Sección 7 - Pool Creators Backstop Bootstrapping

### Backstop Bootstrapping | Blend

**URL:** https://docs.blend.capital/pool-creators/backstop-bootstrapping
**Fecha de extracción:** 2025-07-12T01:12:16.463Z

---

---

source: https://docs.blend.capital/pool-creators/backstop-bootstrapping
generated: 2025-07-12T01:12:16.463Z

---

Copy

### Backstop Bootstrapping

It can be difficult to source either the USDC or BLND to successfully reach the required threshold of a new pool's backstop. To help with this an open source smart contract called the backstop bootstrapper has been released. [https://github.com/blend-capital/backstop-bootstrapper](https://github.com/blend-capital/backstop-bootstrapper)

##### [](#what-the-heck-is-a-bootstrap)

What the heck is a bootstrap?

The backstop bootstrapper allows anyone to create a "Bootstrap" event which allows them to put up a given amount of BLND or USDC, then allows other users called joiners to put up the other token throughout the event. At the end of the event all tokens are deposited into the BLND:USDC liquidity pool and the acquired liquidity pool tokens are distributed to the bootstrap initiator and the joiners.

This event serves as an "auction" that enables the bootstrap initiator to acquire liquidity pool tokens at a much better price than they would just depositing into the liquidity pool if they are trying to deposit a large amount. Put in story language, a bootstrap goes as following `Bill Bootstrapper: Arrrrgh, shiver me timbers, I've got 150,000 o' this here BLND I'm lookin' ta deposit in the liquidity pool o' Comet. Any of you scalleywags brave enough ta' put some USDC into this deposit so we get a better bounty?`

`Sammy Scalleywag: Ahoy Capin', here's 5,000 o' my hard earned USDC i'll deposit alongside ye so you get a bargin from the liquidity pool.`

`Tommy Twofingers: Now don't you two rapscallions go leavin' out tommy. Here's 10,000 of my plundered USDC for ye ta put into that liquidity pool.`

`Bill Bootstrapper: Thanks mateys, I made the deposit and we got 30% more liquidity pool tokens than we woulda gotten if we ad made em seperately. Here's yer share and the grogs on me tonight!`

##### [](#overview)

Overview

This smart contract allows anyone to create a new Bootstrap event by depositing a given amount of BLND or USDC

Then other users can deposit the pair token (BLND if the bootstrap token is USDC, and USDC if the bootstrap token is BLND). They can withdraw these tokens at any point until the bootstrap event ends. Once the bootstrap event is completed, if the minimum number of pair tokens has been reached, the backstop and pair tokens are deposited into the BLND:USDC comet liquidity pool.

The BLND depositors (or the bootstrapper) are allocated 80% of the received comet liquidity pool tokens. And the USDC depositors (or the bootstrapper) are allocated 20% of the received liquidity pool tokens.

The bootstrapper receives all of their allotted tokens. The pair token depositors (joiners) receive their proportional share of liquidity pool tokens.

EX: Say the pair token was USDC, 100 USDC was deposited, and 1000 liquidity pool tokens were received. A pair token depositor who deposited 10 USDC would receive 20 liquidity pool tokens (1000\*20\*100 = 20)

##### [](#pricing-bootstrap-tokens)

Pricing Bootstrap Tokens

We will here provide an example for how to easily price bootstrap tokens as a pair token depositor

The price of a bootstrap token is roughly equal to

So if the bootstrap token is BLND (weight 80%) and there is 160 BLND deposited in the bootstrap and 20 USDC, the implied price of BLND is 0.5$ (.8/.2\*20/160 = .5)

Thus, as a pair token depositor, if your deposit will bring the price of the bootstrap token above the price of the bootstrap token if purchased from the liquidity pool, it's better to buy the bootstrap token from the liquidity pool than participate in the bootstrapping event.

> **INFO**
>
> This is a rough pricing method - when bootstrap and pair tokens are deposited into the blend liquidity pool if their ratio is not equal to the ratio of bootstrap and pair tokens in the liquidity pool, the deposit will incur trading fees and slippage. Thus when calculating the bootstrap token price with the simplified method you should assume the real price is slightly higher than what you calculated.

[PreviousSetting Max Positions](/pool-creators/setting-max-positions)[NextRequired Infrastructure](/pool-creators/required-infrastructure)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/backstop-bootstrapping](https://docs.blend.capital/pool-creators/backstop-bootstrapping)_

---

## Sección 8 - Pool Creators General

### General | Blend

**URL:** https://docs.blend.capital/pool-creators/general
**Fecha de extracción:** 2025-07-12T01:12:17.770Z

---

---

source: https://docs.blend.capital/pool-creators/general
generated: 2025-07-12T01:12:17.770Z

---

Copy

### General

Anyone can deploy an isolated lending pool using Blend. All they need to do is:

- [Select assets and their parameters](/pool-creators/adding-assets)

- [Decide on a pool management strategy](/pool-creators/pool-management)

- [Decide on an oracle](/pool-creators/selecting-an-oracle)

- [Select a backstop take rate](/pool-creators/setting-backstop-take-rate)

##### [](#who-would-create-a-lending-pool)

Who would create a lending pool?

###### [](#for-network-platforms-like-wallets-and-dex-interfaces)

For network platforms, like wallets and DEX interfaces

- Platform-specific lending pools allow platforms to offer their users yield products, leveraged trading, borrowing, and more in a non-custodial fashion while maintaining a high level of control over the specific lending market available to their users. They can create “owned” lending markets that they have the power to update post-deployment.

###### [](#for-anchors-blend-offers)

For anchors, Blend offers

- The ability to create lending markets that feature the anchor’s assets, improving asset usefulness, liquidity, and adoption. New markets and assets do not require the approval of a DAO (Blend has no DAO); instead, they must reach a [certain level of backstop module deposits](/blend-whitepaper#backstop-threshold) before being enabled. This allows Anchors to quickly create new markets when they introduce new assets.

  - An additional benefit here is anchors can support liquidity pool shares featuring their assets as collateral. This allows stablecoins to build large amounts of liquidity when users loop liquidity pool shares (borrow against them, turn the borrowed deposits into more liquidity pool shares, and redeposit to repeat).

###### [](#for-defi-protocols-blend-offers)

For DeFi protocols, Blend offers

- The ability to create CDP protocols like MakerDAO. A lending pool is just a CDP vault with multiple assets; it would be simple for a CDP protocol to create a series of DAO-managed pools where users can borrow a debt-based stablecoin like DAI. This could be especially useful on the Stellar network to give users access to currencies that still lack established anchors.

- The ability to create DAO-managed mutable lending pools like Compound or Aave. By setting a Governance smart contract as a pool owner, someone could easily recreate a Compound or Aave like product on Stellar.

- RWA lending protocols can create custom markets that provide whitelisted companies with lines of credit tokens. This would allow approved entities to borrow from the pool without having to post collateral, enabling them to fund loans with on-chain assets. We expect this use case to be particularly useful given Stellar’s recent MoneyGram partnership and the difficulty of procuring financing in many developing economies.

[PreviousEmissions](/emissions)[NextTutorial: Setting Up a Pool](/pool-creators/tutorial-setting-up-a-pool)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/general](https://docs.blend.capital/pool-creators/general)_

---

## Sección 9 - Pool Creators Pool Management

### Pool Management | Blend

**URL:** https://docs.blend.capital/pool-creators/pool-management
**Fecha de extracción:** 2025-07-12T01:12:19.042Z

---

---

source: https://docs.blend.capital/pool-creators/pool-management
generated: 2025-07-12T01:12:19.042Z

---

Copy

### Pool Management

Pool management encompasses modifying pool status to freeze or unfreeze pools — and modifying pool parameters to add assets or adjust their risk/interest rate parameters.

##### [](#pool-admin)

Pool Admin

Pools may set a designated admin that has the authority to change pool status or update asset risk/interest rate parameters.

Pools with admins are considered owned pools. Alternatively, the pool's admin address can be set to a dead address, which makes the pool immutable, although its status can still be changed by the backstop module.

Pools without admins are standard pools. Standard pools are more decentralized and trustless than owned pools but lack the flexibility some pool creators may desire. We should note that an admin address must still be supplied to create and set up a pool. After the pool is created, the admin should change the admin address to a dead address to make the pool standard. Pool creators set the pool admin when they create the pool using the `deploy_pool` function on the pool factory contract. They can change it later using the `set_admin` function.

##### [](#pool-status)

Pool Status

Pool status changes are the primary way that pools can respond to unforeseen risks. Pools have three statuses.

###### [](#active)

Active:

Active pools function normally.

###### [](#on-ice)

On-Ice:

Pools that are On-Ice have borrowing disabled. This status is designed for when the pool is at risk but not defunct. For example, if the pool's oracle suffers liveness issues that will be resolved, the pool should be set to On-Ice.

###### [](#frozen)

Frozen:

Frozen pools have borrowing and depositing disabled. This status is for when a pool is defunct and should no longer be used. For example, suppose backstop module depositors in a standard pool want to move liquidity to a new pool with updated assets and parameters. In that case, they should coordinate to freeze the old pool.

The pool status can be changed at any time by the pool manager or, if the correct backstop state is met, by anyone.

##### [](#backstop-state-requirements)

Backstop State Requirements:

The backstop requirements to set specific pool status are as follows:

###### [](#active-1)

Active:

- Backstop deposits must exceed the minimum backstop requirement

\-and-

- Less than 50% of backstop deposits are queued for withdrawal.

###### [](#on-ice-1)

On-Ice:

- Backstop deposit fall below the minimum deposit requirement

\-or-

- Over 50% of backstop deposits are queued for withdrawal.

###### [](#frozen-1)

Frozen:

- Over 75% of backstop deposits are queued for withdrawal.

When a pool admin sets the pool to a more restrictive status, the backstop state cannot be used to set a less restrictive state. Likewise, pool admins cannot set a less restrictive status if the pool's backstop's state does not meet the requirements for that status.

##### [](#initial-pool-status)

Initial Pool Status

Pools start in the Setup status which disallows all pool actions. This is to allow the to finalize setup by adding assets to the pool before user's begin using it. After setup is finished the admin can use the `set_status()` function to set the status to On-Ice, allowing user's to deposit but not borrow. Pool creators should note that after they move the pool out of the Setup status there will be a mandatory 7 day queue to modify asset parameters or add new assets. This is to prevent pool admins from changing asset parameters or adding new assets without giving users a chance to exit the pool or backstops a chance to queue withdrawals.

Admin's are not immediately able to set pool's to active to limit the creation of unsafe pools by requiring that some insurance capital be put forward before a pool can be used. The rationale here is high-risk pools are unlikely to have many people willing to insure them.

##### [](#pool-migration)

Pool Migration

Standard pools occasionally need to be updated when oracles need to be changed or when asset parameters require an update. Backstop-triggered status changes allow backstop depositors to force borrowers and lenders to move to a new pool. When an updated pool is deployed, backstop depositors can coordinate to queue their deposits for withdrawal; then anyone can update pool status to FROZEN — forcing lenders and borrowers to migrate. Owned pools also need to be updated when oracles need to be changed since pool admins cannot update the oracle address. Pool migration is simpler for owned pools as the admin can set the pool status to FROZEN without coordinating with backstop depositors.

##### [](#risk-interest-rate-parameters)

Risk/Interest Rate Parameters

Pool admins can modify asset risk and interest rate parameters, add assets to the pool, and disable assets. Any change to asset parameters requires the update to be queued for seven days to give users time to react to the changes.

If the pool is a standard pool and does not have an admin, asset parameters require a pool migration to update.

[PreviousEmissions](/pool-creators/adding-assets/emissions)[NextSelecting an Oracle](/pool-creators/selecting-an-oracle)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/pool-management](https://docs.blend.capital/pool-creators/pool-management)_

---

## Sección 10 - Pool Creators Required Infrastructure

### Required Infrastructure | Blend

**URL:** https://docs.blend.capital/pool-creators/required-infrastructure
**Fecha de extracción:** 2025-07-12T01:12:20.335Z

---

---

source: https://docs.blend.capital/pool-creators/required-infrastructure
generated: 2025-07-12T01:12:20.332Z

---

Copy

### Required Infrastructure

There are multiple bots that pool creators need to ensure are running to maintain pool safety.

##### [](#liquidation-and-bad-debt-auction-bot)

Liquidation & Bad Debt Auction Bot

Liquidation bots must be set up to monitor the pool and liquidate any underwater users. The same bot should be used to fill bad debt auctions if one is created. Without one of these bots, users may create bad debt, harming backstop depositors.

Liquidation Auction Documentation: [Liquidation Management](/tech-docs/core-contracts/lending-pool/liquidation-management)

Bad Debt Auction Documentation: [Bad Debt Management](/tech-docs/core-contracts/lending-pool/bad-debt-management)

Example Liquidation & Bad Debt Auction Bot: [https://github.com/blend-capital/liquidation-bot](https://github.com/blend-capital/liquidation-bot)

##### [](#interest-auction-bot)

Interest Auction Bot

A bot must also be run to fill interest auctions.

Interest Auction Documentation: [Interest Management](/tech-docs/core-contracts/lending-pool/interest-management)

Example Interest Auction Bot: [https://github.com/blend-capital/liquidation-bot](https://github.com/blend-capital/liquidation-bot)

[PreviousBackstop Bootstrapping](/pool-creators/backstop-bootstrapping)[NextGeneral](/tech-docs/general)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/required-infrastructure](https://docs.blend.capital/pool-creators/required-infrastructure)_

---

## Sección 11 - Pool Creators Selecting An Oracle

### Selecting an Oracle | Blend

**URL:** https://docs.blend.capital/pool-creators/selecting-an-oracle
**Fecha de extracción:** 2025-07-12T01:12:21.636Z

---

---

source: https://docs.blend.capital/pool-creators/selecting-an-oracle
generated: 2025-07-12T01:12:21.636Z

---

Copy

### Selecting an Oracle

Oracles are smart contracts that publish off-chain data on-chain. Blend pools use price oracles to get the prices of their assets. Pool creators must set a pool's oracle contract when they create a pool. This must be a single contract that can report prices for all assets in the pool.\\

- \*Oracles CANNOT be changed after a pool is created, so please be very careful when selecting an oracle for a pool.\*\*

Oracles must support the "lastprice" and "decimals" functions on the [SEP-40 oracle standard](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0040.md).

##### [](#test-the-oracle)

Test the Oracle

It is required to verify that "lastprice" works for all potential reserves the pool will maintain. Please note the Blend pool will always invoke the oracle with `Asset::Stellar({contract_address})` to fetch last price.

The oracle can be tested by using the `PoolOracle` object provided via the [Blend JS SDK](https://github.com/blend-capital/blend-sdk-js).

Copy

```javascript
import { PoolOracle } from "@blend-capital/blend-sdk";

// allow logging of bigints and maps
const replacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else if (typeof value == "bigint") {
    return {
      dataType: "BigInt",
      value: value.toString(),
    };
  } else {
    return value;
  }
};

const network = {
  passphrase: "Public Global Stellar Network ; September 2015",
  rpc: "some-rpc-url",
};

// the contract address of the oracle
const oracle_id = "C...";
// the contract addresses of the assets being included as reserves
const assets = ["C...", "C...", "C..."];

const oracle = await PoolOracle.load(network, oracle_id, assets);
// validate results
console.log(JSON.stringify(oracle, replacer, 2));
```

##### [](#oracle-adapters)

Oracle Adapters

When a generalized oracle is insufficient for a pool (i.e. it doesn't support all assets the pool needs prices for), the pool creator may need to use an oracle adaptor. An oracle adaptor is a custom oracle contract that uses custom logic to aggregate multiple oracle feeds or impose desired behavior, such as reporting TWAP prices.

- \*Sample Oracle Adapter:\*\* [https://github.com/blend-capital/oracle-aggregator](https://github.com/blend-capital/oracle-aggregator)

###### [](#types-of-price-feeds)

Types of Price Feeds

Pool creators may find different types of price feeds useful. The two main types used in most lending pools are:

- Spot: Spot price feeds report the current price of an asset.

- TWAPs (time-weighted-asset-prices): These price feeds report average asset price over a given time period. These price feeds are more difficult to manipulate than spot price feeds; they are preferable for high-volatility or low-liquidity assets. TWAPs come in two types:

  - GM-TWAPS: geometric mean TWAPs calculate the geometric mean of an asset's price over a given time period. They are more resistant to manipulation than AM-TWAPS.

  - AM-TWAPS: arithmetic mean TWAPs calculate the arithmetic mean of an asset's price over a given time period.

###### [](#price-feed-aggregation)

Price Feed Aggregation

Ideally, price feeds should be aggregated across multiple sources to make them more manipulation-resistant. For example, a price feed reporting the XLM:USD spot price might aggregate the price by taking the average price from the Stellar DEX, Binance orderbook, and Coinbase orderbook.

###### [](#well-known-oracles)

Well Known Oracles

- [https://reflector.network/](https://reflector.network/)

[PreviousPool Management](/pool-creators/pool-management)[NextSetting Backstop Take Rate](/pool-creators/setting-backstop-take-rate)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/selecting-an-oracle](https://docs.blend.capital/pool-creators/selecting-an-oracle)_

---

## Sección 12 - Pool Creators Setting Backstop Take Rate

### Setting Backstop Take Rate | Blend

**URL:** https://docs.blend.capital/pool-creators/setting-backstop-take-rate
**Fecha de extracción:** 2025-07-12T01:12:22.911Z

---

---

source: https://docs.blend.capital/pool-creators/setting-backstop-take-rate
generated: 2025-07-12T01:12:22.911Z

---

Copy

### Setting Backstop Take Rate

The Backstop Take Rate is the percent of the interest paid by pool borrowers sent to the pool's backstop module depositors. The level it's set at influences the proportion of capital you can expect the backstop module to have in relation to the pool. This correlation results from a higher backstop take rate making depositing in the backstop module more profitable. Here are example backstop take rates for pools of various risk levels using the following formula:

BackstopInterestRequirement\=RequiredTVLCoverage∗RequiredInterestMultipleBackstopInterestRequirement = RequiredTVLCoverage\*RequiredInterestMultipleBackstopInterestRequirement\=RequiredTVLCoverage∗RequiredInterestMultiple BackstopTakeRate\=BackstopInterestRequirement(1+BackstopInterestRequirement)BackstopTakeRate = \\frac{BackstopInterestRequirement}{(1+BackstopInterestRequirement)}BackstopTakeRate\=(1+BackstopInterestRequirement)BackstopInterestRequirement​

###### [](#low-risk-pools)

Low-Risk Pools

- Assumptions:

  - Need 2% of TVL covered

  - Backstop depositors demand a rate of 2.5x the lender's rate

- Required take rate of 4.75%

- Compound V3 would be considered a low-risk pool

###### [](#medium-risk-pools)

Medium Risk Pools

- Assumptions:

  - 7.5% of TVL covered

  - Backstop depositors demand a rate of 4x the lender's rate

- Required take rate of 23.508%

- Aave V2 would be considered a medium-risk pool

###### [](#high-risk-pools)

High-Risk Pools

- Assumptions:

  - 15% of TVL Covered

  - Backstop depositors demand a rate of 5x lender's rate

- Required take rate of 42.86%

- Most pools with Stellar native tokens should be considered high risk

[PreviousSelecting an Oracle](/pool-creators/selecting-an-oracle)[NextSetting Max Positions](/pool-creators/setting-max-positions)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/setting-backstop-take-rate](https://docs.blend.capital/pool-creators/setting-backstop-take-rate)_

---

## Sección 13 - Pool Creators Setting Max Positions

### Setting Max Positions | Blend

**URL:** https://docs.blend.capital/pool-creators/setting-max-positions
**Fecha de extracción:** 2025-07-12T01:12:24.172Z

---

---

source: https://docs.blend.capital/pool-creators/setting-max-positions
generated: 2025-07-12T01:12:24.172Z

---

Copy

### Setting Max Positions

Pool creators must set the maximum number of positions user's in their pool can have. This just refers to the maximum number of positions a user can have at any given time. This is a pool-level setting, and can be changed by the pool admin at any time.

Pool's with lower numbers of max positions are more stable as user's positions are easier and less disruptive to liquidate. However, they're less attractive to user's that want more flexibility in their position complexity.

Pool creators must be very careful to not set this parameter too high as it can lead to positions being unliquidatable due to Sorban resource limits as it's cheaper to open new positions than liquidate all positions. This is due to resource constrains around the oracle the pool uses. If you use the oracle aggregator linked in his documentation and the Reflector Oracle safe limits are:

- 6 for Stellar classic assets

  - This depends heavily on oracle and asset configurations. 6 is the reccomendation with the standard oracle aggregator linked in [https://app.gitbook.com/o/-Me0aIJ5ubY2Yyeo6UbM/s/Lg1UeA72WAt02V2TIIga/~/changes/7/pool-creators/selecting-an-oracle](/pool-creators/selecting-an-oracle)

- Assets deployed on Soroban have larger resource requirements than Stellar Classic assets so any pool creator utilizing these assets should test the limits themselves.

These limits will change as Soroban resource limits increase - see: https://soroban.stellar.org/docs/reference/resource-limits-fees

[PreviousSetting Backstop Take Rate](/pool-creators/setting-backstop-take-rate)[NextBackstop Bootstrapping](/pool-creators/backstop-bootstrapping)

Last updated 2 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/setting-max-positions](https://docs.blend.capital/pool-creators/setting-max-positions)_

---

## Sección 14 - Pool Creators Tutorial Setting Up A Pool

### Tutorial: Setting Up a Pool | Blend

**URL:** https://docs.blend.capital/pool-creators/tutorial-setting-up-a-pool
**Fecha de extracción:** 2025-07-12T01:12:25.478Z

---

---

source: https://docs.blend.capital/pool-creators/tutorial-setting-up-a-pool
generated: 2025-07-12T01:12:25.478Z

---

Copy

### Tutorial: Setting Up a Pool

Here we'll walk through a step-by-step guide to deploying and setting up a new pool. The deployment should be carried out using the blend_utils repo which has scripts for doing so.

NOTE: this guide may be out of date - we recommend cross-referencing with the up to date guide here: [https://github.com/blend-capital/blend-utils?tab=readme-ov-file#pool-deployment](https://github.com/blend-capital/blend-utils?tab=readme-ov-file#pool-deployment)

#### [](#step-1-decide-on-an-oracle)

Step 1: Decide on an oracle

The oracle is backbone of a pool, and cannot be changed once an oracle is set.

Please review [Selecting an Oracle](/pool-creators/selecting-an-oracle).

#### [](#step-2-deploy-a-new-pool-contract)

Step 2: Deploy a new Pool Contract

We first deploy a new pool contract by calling the `deploy()` function on the Pool Factory Contract. The function takes the following parameters:

Parameter

Type

Description

admin

Copy

```
Address
```

Address of the pool admin. More Information : [Pool Management](/tech-docs/core-contracts/lending-pool/pool-management)

name

Copy

```
String
```

The Pool name. Used by UI's to render a name for the pool.

salt

Copy

```
BytesN<32>
```

Random bytes used to generate the pool contract address

oracle

Copy

```
Address
```

Address of the oracle contract used by the pool. More Information: [Selecting an Oracle](/pool-creators/selecting-an-oracle)

backstop_take_rate

Copy

```
u32
```

Pool backstop take rate. Scaled to 7 decimals. More Information: [Setting Backstop Take Rate](/pool-creators/setting-backstop-take-rate)

max_positions

Copy

```
u32
```

Pool max positions. No decimals. More Information: [Setting Max Positions](/pool-creators/setting-max-positions)

min_collateral

Copy

```
i128
```

The minimum collateral amount required to open a borrow position. Should be set higher than the gas cost required to liquidate the position (e.g. $1). Scaled to the oracle's decimals.

The deployment function will return the new Pool Contract's address.

> **INFO**
>
> The Pool Factory contract address can be found here: [Deployments](/mainnet-deployments)

> **WARNING**
>
> Many of the pool setup functions can only be called by the pool admin. If the pool creator intends for the admin to be a DAO or multisig it may be preferable for them to continue using their account to finish setting up the pool, then transfer pool ownership to the final admin using the Pool Contract's `set_admin()` function.

#### [](#step-3-add-pool-reserves)

Step 3: Add Pool Reserves

After the pool is deployed we add assets (reserves) to it by calling the Pool Contract's `queue_set_reserve()` function. The function takes the following parameters:

Parameter

Type

Description

asset

Copy

```
Address
```

Token Contract address of the asset being added to the pool

metadata

Copy

```
ReserveConfig
```

The reserve configuration for the new asset.

The ReserveConfig struct is constructed as follows:

Copy

```
pub struct ReserveConfig {
    pub index: u32,      // the index of the reserve in the list
    pub decimals: u32,   // the decimals used in both the bToken and underlying contract
    pub c_factor: u32,   // the collateral factor for the reserve scaled expressed in 7 decimals
    pub l_factor: u32,   // the liability factor for the reserve scaled expressed in 7 decimals
    pub util: u32,       // the target utilization rate scaled expressed in 7 decimals
    pub max_util: u32,   // the maximum allowed utilization rate scaled expressed in 7 decimals
    pub r_base: u32, // the R0 value (base rate) in the interest rate formula scaled expressed in 7 decimals
    pub r_one: u32,  // the R1 value in the interest rate formula scaled expressed in 7 decimals
    pub r_two: u32,  // the R2 value in the interest rate formula scaled expressed in 7 decimals
    pub r_three: u32, // the R3 value in the interest rate formula scaled expressed in 7 decimals
    pub reactivity: u32, // the reactivity constant for the reserve scaled expressed in 7 decimals
    pub collateral_cap: i128, // the total amount of underlying tokens that can be used as collateral
    pub enabled: bool,        // the enabled flag of the reserve
}
```

- The reserve `index` will be assigned by the `set_reserve()` function, the parameter does not matter when setting up the asset.

- The reserve `decimals` must match the number of decimals the new asset has, as defined by the asset's Token Contract. Stellar Classic assets have 7 decimals.

- More information on reserve `c_factor`, `l_factor`, and `max_util`, can be found here: [Risk Parameters](/pool-creators/adding-assets/risk-parameters)

- More information on reserve `util`, `r_base`, `r_one`, `r_two`, `r_three`, and `reactivity` can be found here: [Interest Rates](/pool-creators/adding-assets/interest-rates)

After the reserve is queued we finalize the addition by calling `set_reserve()` function. The function takes the following parameters:

Parameter

Type

Description

asset

Copy

```
Address
```

Token Contract address of the asset being added to the pool

> **WARNING**
>
> Pool creator's should be careful not to update the pool status before adding all initial reserves. If they do there will be a manditory 7 day delay between calling `queue_set_reserve() and set_reserve()`

#### [](#step-4-set-up-pool-emissions)

Step 4: Set up Pool Emissions

After reserves are added, we set up pool emissions by calling the `set_emissions_config()` function. The function takes the following parameters:

Parameter

Type

Description

res_emission_metadata

Copy

```
Vec<ReserveEmissionMetadata>
```

A vector of ReserveEmissionMetadata structs. These structs govern how pool emissions are distributed between pool assets.

The ReserveEmissionMetadata struct is constructed as follows:

Copy

```
pub struct ReserveEmissionMetadata {
    pub res_index: u32, // index of the reserve as defined by the ReserveConfig
    pub res_type: u32,  // 0 for liabilities, 1 for supply
    pub share: u64, // percent of the total pool emissions this reserve should receive. Scaled to 7 decimals
}
```

- `res_index` is the index of the reserve defined by the ReserveConfig struct. It was returned by the `set_reserve()` function. Reserve index's are set based on the order the reserves were added to the pool (the first reserve will have index 0, the next index 1, etc.).

- `res_type` designates whether lenders or borrowers of the reserve will receive emissions. If liabilities are designated borrowers receive emissions, if supply is designated lenders receive emissions. It is possible for both to receive emissions, the vec input into the `set_emissions_config()` function just must include a `ReserveEmissionMetadata` struct for both reserve liabilities and supply.

- `share` is the percent of total pool emissions the reserve (and reserve type) should receive. The total of all input `ReserveEmissionMetadata` share's must equal `10000000`.

#### [](#step-5-optional-set-up-pool-backstop)

Step 5 (optional): Set up Pool Backstop

If the pool creator wishes to, they can fund the pool's backstop at this point so that the pool meets the minimum backstop threshold allowing it to be activated and potentially added to the backstop reward zone.

- \*It is highly recommended to test your pool before depositing into the backstop\*\*.

For example, is there is a reserve that cannot have a priced fetched on the oracle, you will not be able to use the pool.

An easy way to preview pool configuration is to navigate to your pool via the Blend UI. Searching `/dashboard?poolId=C...` will attempt to load the pool via the UI.

###### [](#how-many-backstop-tokens-do-i-need)

How many Backstop Tokens do I need?

To reach the minimum backstop threshold a blend pool's backstop must have enough backstop LP tokens for their associated reserves to reach a product constant value of 200,000. This can be calculated with the following formula

k\=x0.8∗y0.2k=x^{0.8}\*y^{0.2}k\=x0.8∗y0.2

Where:

- k = Product Constant

- x = Blend Amount

- y = USDC amount

At current rates each LP token's associated reserves have a product constant of around 2. So 50,000 LP tokens are sufficient to reach the backstop threshold.

##### [](#acquiring-backstop-tokens)

Acquiring Backstop Tokens

To fund the backstop module we first need to acquire backstop tokens (80:20 BLND:USDC comet LP tokens). These can be acquired in 3 different ways depending on the assets we have on hand.

Individuals based outside of restricted jurisdictions can acquire backstop tokens via any of these options using the Blend UI [https://mainnet.blend.capital/](https://mainnet.blend.capital/)

###### [](#option-1-acquiring-backstop-tokens-using-only-usdc)

Option 1: Acquiring Backstop tokens using only USDC

To acquire backstop tokens with only USDC we must execute a single sided deposit on the Comet Liquidity Pool by calling the `dep_lp_tokn_amt_out_get_tokn_in` function. The function has the following parameters:

Parameter

Type

Description

token_in

Copy

```
Address
```

Address of the token being deposited (in this case USDC)

pool_amount_out

Copy

```
i128
```

The number of pool tokens to mint

max_amount_in

Copy

```
i128
```

The maximum amount of tokens (in this case USDC) you're willing to deposit

user

Copy

```
Address
```

Address of the user depositing

###### [](#option-2-acquiring-backstop-tokens-using-both-blnd-and-usdc)

Option 2: Acquiring Backstop Tokens using Both BLND and USDC

We use the Comet Liquidity Pool's `join_pool` function to mint backstop tokens using both BLND and USDC. It has the following parameters:

Parameter

Type

Description

pool_amount_out

Copy

```
i128
```

The number of pool tokens to mint

max_amounts_in

Copy

```
Vec<i128>
```

The maximum amount of tokens you're willing to deposit. BLND amount is first in the Vec, USDC amount is second.

user

Copy

```
Address
```

Address of the user depositing

###### [](#option-3-acquiring-backstop-tokens-using-blnd)

Option 3: Acquiring Backstop Tokens using BLND

To acquire backstop tokens with only BLND we execute a single sided deposit on the Comet Liquidity Pool by calling the `dep_lp_tokn_amt_out_get_tokn_in` function. This is much the same as option 1, except the deposit token is BLND and the max amount in is the maximum BLND you're willing to deposit.

##### [](#depositing-backstop-tokens)

Depositing Backstop Tokens

We can deposit backstop tokens into the backstop by calling `deposit()` on the Backstop contract. It has the following parameters:

Parameter

Type

Description

from

Copy

```
Address
```

The address of the user depositing the tokens

pool_address

Copy

```
Address
```

The address of the pool the backstop deposit is being made to. In this case it's the address of your pool.

amount

Copy

```
i128
```

The number of backstop tokens you wish to deposit.

##### [](#other-options-to-fund-the-backstop)

Other Options to Fund the Backstop

If the pool creator does not wish to fund the entire backstop themselves they have 2 options.

###### [](#backstop-bootstrapping)

Backstop Bootstrapping

A pool creator with a large amount of BLND or USDC that does not wish to create significant market impact by setting up their backstop can choose to use the Backstop Bootstrapper contract to facilitate a community backstop deposit.

More details can be found here:

[Backstop Bootstrapping](/pool-creators/backstop-bootstrapping)

###### [](#community-funding)

Community Funding

If the creator does not want to put much (or any) capital into the pool's backstop they can still deploy the pool without depositing into the backstop and just publicize the deployment to the blend community, inviting them to deposit.

> **INFO**
>
> The contract addresses for the Comet Pool contract, the Backstop contract, and the Backstop Bootstrapper contract can be found here: [Deployments](/mainnet-deployments)

#### [](#step-5-activating-the-pool)

Step 5: Activating the Pool

Now that all pool parameters are set we need to turn the pool on. We can do so using the Pool contract's `set_status()` function. It has the following parameters:

Parameter

Type

Description

pool_status

Copy

```
u32
```

Pool Status:

- 0 = admin active - requires that the backstop threshold is met. Allows both deposits and borrowing

- 2 = admin on-ice - allows deposits but not borrowing

- 4 = admin frozen - does not allow deposits or borrowing

Here we recommend that you set the pool to `on_ice` then, if the backstop has been funded, call the Pool contract's `update_status()` function (no parameters) which will set the status to active. Admin active is a elevated status which makes it harder for the backstop to shut the pool down.

#### [](#step-6-optional-add-pool-to-reward-zone)

Step 6 (optional): Add Pool to Reward Zone

At this point if the pool's backstop was funded in Step 4 so that it has met the backstop threshold we can add the pool to the Backstop Contract's reward zone so it begins receiving emissions.

We do so by calling the `add_reward()` function on the Backstop contract. It has the following parameters:

Parameter

Type

Description

to_add

Copy

```
Address
```

The address of the pool being added to the reward zone. In this case your pool's contract address.

to_remove

Copy

```
Address
```

The address of the pool being removed from the reward zone. This parameter only matters if the reward zone is full (it currently isn't), in which case your pool must have a larger backstop than one currently in the reward zone. In that case this parameter will be the address of the pool your pool is replacing.

And that's it! Your done! If you've completed all 6 steps your pool will now show up in the markets page at [https://mainnet.blend.capital/](https://mainnet.blend.capital/)

[PreviousGeneral](/pool-creators/general)[NextAdding Assets](/pool-creators/adding-assets)

Last updated 2 months ago

---

_Extraído de [https://docs.blend.capital/pool-creators/tutorial-setting-up-a-pool](https://docs.blend.capital/pool-creators/tutorial-setting-up-a-pool)_

---

## Sección 15 - Tech Docs Core Contracts Backstop Deposit Management

### Deposit Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/backstop/deposit-management
**Fecha de extracción:** 2025-07-12T01:12:26.736Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/backstop/deposit-management
generated: 2025-07-12T01:12:26.736Z

---

Copy

### Deposit Management

The Backstop contract allows users to deposit backstop tokens and allocate them towards different pools.

#### [](#storing-user-backstop-deposits)

Storing User Backstop Deposits

Users backstop deposits are allocated to individual pools. Their deposits are stored by the Backstop contract in a hashmap where the key is a `PoolUserKey` struct

Copy

```
pub struct PoolUserKey {
    pool: Address, // Pool Contract Address
    user: Address, // User Account Address
}
```

and the value is a `UserBalance` struct

Copy

```
pub struct UserBalance {
    pub shares: i128,  // the balance of shares the user owns
    pub q4w: Vec<Q4W>, // a list of queued withdrawals
}
```

#### [](#deposits)

Deposits

Users deposit backstop tokens into the backstop contract using the `deposit()` function which accepts a deposit amount and a pool address. The specified amount will be sent to the backstop contract, and recorded as a user's deposit in the specified pool. The deposit amount is accounted for as a number of shares, calculated as:

SharesIssued\=DepositAmount∗TotalSharesTotalTokensSharesIssued = DepositAmount \* \\frac{TotalShares}{TotalTokens}SharesIssued\=DepositAmount∗TotalTokensTotalShares​

The number of backstop tokens each share is worth fluctuates based on the behavior of the pool the deposit is allocated to

- Share value increases when the associated pool pays interest to the backstop as this increases the pool's `total_tokens`

- Share value decreases when deposits are used to cover bad debt as this decreases the pool's `total_tokens`

Once the deposit is finalized the pool's `total_tokens` will be increased by the deposit amount and the pool's `total_shares` will be increased by the number of shares issued.

> **WARNING**
>
> `deposit()` calls will fail if the user attempts to deposit into a pool not listed as a `deployed_pool` by the designated Pool Factory contract

#### [](#withdrawals)

Withdrawals

Backstop withdrawals are handled in two steps.

1.  The user calls `queue_withdrawal` with the amount they wish to withdraw and the pool they wish to withdraw from. This will queue a withdrawal for the specified amount of tokens from the specified pool.

> **WARNING**
>
> While deposits are queued for withdrawal the user will no longer receive emissions from the backstop. They will still receive their share of interest from the pool.

1.  User waits for the 17-day withdrawal queue to expire

> **INFO**
>
> At any point, the user can cancel a queued withdrawal using the `cancel_withdrawal()` function.

> **INFO**
>
> A withdrawal queue is required to prevent backstop depositors from leaving a pool before their backstop deposits can be used to cover bad debt.

1.  User calls `withdraw()` to withdraw the shares. This will transfer the tokens to the user and reduce the pool `total_tokens` and `total_shares` accordingly.

    1.  Tokens received are calculated as:

TokensReceived\=SharesWithdrwawn∗TotalTokensTotalSharesTokensReceived = SharesWithdrwawn \* \\frac{TotalTokens}{TotalShares}TokensReceived\=SharesWithdrwawn∗TotalSharesTotalTokens​

[PreviousBackstop](/tech-docs/core-contracts/backstop)[NextDrawing and Donating](/tech-docs/core-contracts/backstop/drawing-and-donating)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/backstop/deposit-management](https://docs.blend.capital/tech-docs/core-contracts/backstop/deposit-management)_

---

## Sección 16 - Tech Docs Core Contracts Backstop Drawing And Donating

### Drawing and Donating | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/backstop/drawing-and-donating
**Fecha de extracción:** 2025-07-12T01:12:27.980Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/backstop/drawing-and-donating
generated: 2025-07-12T01:12:27.980Z

---

Copy

### Drawing and Donating

Pools interact with backstop deposits allocated to them by drawing from the deposits to cover bad debt and donating a percentage of interest to the deposits.

#### [](#storing-pool-backstop-deposits)

Storing Pool Backstop Deposits

The Backstop contract stores total backstop deposits allocated to each pool contract in a hashmap where the key is the Pool contract address and the value is a `PoolBalance` struct

Copy

```
pub struct PoolBalance {
    pub shares: i128, // the amount of shares the pool has issued
    pub tokens: i128, // the number of backstop tokens the pool holds in the backstop
    pub q4w: i128,    // the number of shares queued for withdrawal
}
```

#### [](#drawing)

Drawing

Pools draw from backstop deposits allocated to them using the `draw()` function. This transfers the requested amount of backstop tokens from a specified pool's backstop deposits to a specified recipient and reduces the pool's `total_tokens` by the amount drawn.

> **INFO**
>
> Reducing the pool's `total_tokens`lowers the value of backstop deposits allocated to that pool

The draw function must be called by the specified pool or it will fail.

This function is used to allow pools to cover the bad debt they accumulate.

#### [](#donating)

Donating

Any party can donate to backstop depositors using the `donate()` function. This transfers the specified amount of backstop tokens from the caller to the backstop contract and increases the specified pool's `total_tokens`.

> **INFO**
>
> Increasing a pools `total_tokens` increases the value of backstop deposits allocated to that pool

This function is used to allow pools to donate a percentage of interest to backstop depositors.

[PreviousDeposit Management](/tech-docs/core-contracts/backstop/deposit-management)[NextEmission Distribution](/tech-docs/core-contracts/backstop/emission-distribution)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/backstop/drawing-and-donating](https://docs.blend.capital/tech-docs/core-contracts/backstop/drawing-and-donating)_

---

## Sección 17 - Tech Docs Core Contracts Backstop Emission Distribution

### Emission Distribution | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/backstop/emission-distribution
**Fecha de extracción:** 2025-07-12T01:12:29.232Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/backstop/emission-distribution
generated: 2025-07-12T01:12:29.232Z

---

Copy

### Emission Distribution

The Backstop contract is responsible for distributing emissions to backstop depositors and lending pools after it receives them from the emitter contract.

#### [](#reward-zone)

Reward Zone

Emissions are only distributed to pools in a `reward_zone`, which the backstop contract manages, and backstop depositors designating their deposits to those pools.

##### [](#reward-zone-length)

Reward Zone Length

The number of pools that can be added to the reward zone is 50. This is done to prevent liquidity fragmentation by ensuring only a select number of pools receive emissions.

##### [](#adding-pools-to-the-reward-zone)

Adding Pools to the Reward Zone

Pools can be added to the Reward Zone by calling the `add_reward()` function. This function intakes a potential pool to drop from the reward zone and attempts the addition with the following process:

If the pool being added to the reward zone has not met the minimum backstop threshold `add_reward()` will fail.

> **WARNING**
>
> If the to_remove pool is not in the reward zone, `add_reward()` will fail.

> **WARNING**
>
> If the pool is already in the reward zone, `add_reward()` will fail.

#### [](#emission-management)

Emission Management

The backstop contract facilitates both emission distribution and backstop emissions claims.

##### [](#emission-distribution)

Emission Distribution

Emissions are distributed to backstop depositors and pools by calling the `gulp_emissions()` function which:

> **INFO**
>
> Anyone may call `gulp_emissions()` - it's expected that someone will run a bot to do so

1.  Calculates the `new_emissions` received from the emitter which

    1.  equal to `emitter_last_distribution_time - backstop_last_distribution_time`

> **WARNING**
>
> At least one hour must have passed between `emitter_last_distribution_time` and `backstop_last_distribution_time` or this `gulp_emissions()` will fail. This is to prevent rounding issues

1.  Calculates the amount of emissions to allocate to backstop depositors and pools

    1.  Backstop depositors get 70% of new emissions

    2.  Pools get 30% of new emissions

2.  Sets emissions per second for backstop depositors

    1.  equal to `(backstop_emissions * pool_backstop_tokens / total_backstop_tokens_in_reward_zone_pools) + remaining_emissions / 7 days)`

> **INFO**
>
> This EPS will expire in 7 days, so emissions must be gulped every 7 days, or backstop depositors will stop receiving emissions until emissions are gulped again. Emissions not distributed during a gulp gap will be accrued in the next gulp call.

> **INFO**
>
> Backstop deposits queued for withdrawal will not count towards either`total_backstop_tokens_in_reward_zone_pools` or `pool_backstop_tokens` in the emission distribution calculations

1.  Sets emissions earned by each pool

    1.  equal to `pool_emissions * pool_backstop_tokens / total_backstop_tokens_in_reward_zone_pools`

##### [](#emission-claims)

Emission Claims

The backstop facilitates emission claims by backstop depositors. Backstop depositors can claim their emissions by calling the `claim()` function which transfers the user's earned emissions for all input pool addresses to the user and reduces the user's accrued emissions to 0.

Copy

```
    /// Claim backstop deposit emissions from a list of pools for `from`
    ///
    /// Returns the amount of LP tokens minted
    ///
    /// ### Arguments
    /// * `from` - The address of the user claiming emissions
    /// * `pool_addresses` - The Vec of addresses to claim backstop deposit emissions from
    /// * `min_lp_tokens_out` - The minimum amount of LP tokens to mint with the claimed BLND
    ///
    /// ### Errors
    /// If an invalid pool address is included
    fn claim(e: Env, from: Address, pool_addresses: Vec<Address>, min_lp_tokens_out: i128) -> i128;
```

All claimed emissions are automatically deposited into the backstop and allocated to the pool they were earned in.

> **INFO**
>
> Emissions are immediately deposited into the BLND:USDC liquidity pool so the claim function intakes a min-pool-tokens-out parameter to allow users to protect themselves from being frontran if they so choose.

> **INFO**
>
> Users can claim their emissions and deposit them on behalf of another user by specifying the user in the `to` parameter in the `claim()` function.

[PreviousDrawing and Donating](/tech-docs/core-contracts/backstop/drawing-and-donating)[NextPool Factory](/tech-docs/core-contracts/pool-factory)

Last updated 3 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/backstop/emission-distribution](https://docs.blend.capital/tech-docs/core-contracts/backstop/emission-distribution)_

---

## Sección 18 - Tech Docs Core Contracts Emitter Backstop Management

### Backstop Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/emitter/backstop-management
**Fecha de extracción:** 2025-07-12T01:12:30.519Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/emitter/backstop-management
generated: 2025-07-12T01:12:30.519Z

---

Copy

### Backstop Management

The Emitter contract defines the backstop contract address that will receive blend tokens. It can switch this address through an emissions swap. This allows the Backstop contract to be "upgraded" while retaining its immutability.

#### [](#setting-the-initial-backstop)

Setting the Initial Backstop

The Backstop contract address is initially set on Emitter initialization. This is done through the `initialize` function. This function can only be called once - any repeat calls will fail.

#### [](#backstop-swaps)

Backstop Swaps

Backstop swaps can be carried out at any point if a new smart contract (generally an upgraded Backstop contract) contains more `backstop_tokens` than the current backstop contract. Backstop swaps can be used to upgrade both the Backstop contract and the Backstop Token contract.

The steps to undertake a swap are to:

1.  Deploy a new Backstop contract

2.  Convince existing backstop depositors that it is worthwhile to migrate to the new contract.

If the new Backstop contract is using a new backstop token, it must still be able to handle deposits of the current backstop token (so it can compare balances) or the swap will be impossible.

> **WARNING**
>
> This may disrupt pools as backstop depositors must queue withdrawals from the old Backstop contract to deposit in the new Backstop contract. This could trigger pool status changes, which pool creators should be aware of.

1.  Once the new contract has more backstop tokens than the current contract, call `queue_backstop_swap()` on the emitter contract with the new backstop contract address and the new backstop token address.

`queue_backstop_swap()` will fail if the new backstop contract does not have more backstop tokens than the current backstop contract.

> **INFO**
>
> Only one backstop swap can be queued at a time. If a swap is already queued, the `queue_backstop_swap()` will fail.

1.  Wait until the unlock time has passed (takes 31 days).

> **WARNING**
>
> If at any point during the swap process, the new Backstop contract has fewer backstop tokens than the current Backstop contract, the swap can be canceled by calling `cancel_backstop_swap` on the Emitter contract.

> **INFO**
>
> A 31 day queue time is to prevent malicious actors from swapping the Backstop contract without giving backstop depositors time to withdraw the LP positions (backstop tokens are liquidity pool tokens) and force the attacker to finalize their trade.

1.  Call `swap_backstop` on the Emitter contract.

If the new Backstop contract no longer has more backstop tokens than the original the call will fail

> **INFO**
>
> A final `distribute()` call will be made to the old backstop contract before the swap is executed to ensure no emissions are lost.

The swap is now complete. The old backstop contract will continue functioning as expected. However, backstop depositors in the old contract and users of pools associated with that backstop will no longer receive emissions - prompting them to switch to the new contracts.

[PreviousEmitter](/tech-docs/core-contracts/emitter)[NextBlend Distribution](/tech-docs/core-contracts/emitter/blend-distribution)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/emitter/backstop-management](https://docs.blend.capital/tech-docs/core-contracts/emitter/backstop-management)_

---

## Sección 19 - Tech Docs Core Contracts Emitter Blend Distribution

### Blend Distribution | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/emitter/blend-distribution
**Fecha de extracción:** 2025-07-12T01:12:31.748Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/emitter/blend-distribution
generated: 2025-07-12T01:12:31.748Z

---

Copy

### Blend Distribution

The Emitter contract is the admin of the Blend token and is responsible for minting and emitting Blend to the current backstop.

#### [](#normal-emissions)

Normal Emissions

Regular emissions are carried out via the `distribute()` emitter function. This function mints an amount of Blend equal to the number of seconds that have passed since the last distribution time and sends it to the backstop contract. The Backstop contract handles further distribution logic.

#### [](#drop-emissions)

Drop Emissions

Blend emissions are also carried out via "Drops". Drops are fixed 50 million token emissions that can be executed after every backstop swap. Drops are carried out by the Emitter contract's`drop()` function which uses a `drop_recipient` list stored in the Backstop contract to determine what addressed Blend should be minted to.

> **WARNING**
>
> Each Backstop contract address can only call `drop()` once. If the backstop contract address is swapped then swapped back the original backstop still will not be able to call drop again.

The listed Backstop contract must call `` drop()` `` so Backstop contracts must always have a method of doing so

Drops are intended to incentivize further open-source development of the protocol - as a backstop swap represents the release of a new protocol version.

[PreviousBackstop Management](/tech-docs/core-contracts/emitter/backstop-management)[NextBackstop](/tech-docs/core-contracts/backstop)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/emitter/blend-distribution](https://docs.blend.capital/tech-docs/core-contracts/emitter/blend-distribution)_

---

## Sección 20 - Tech Docs Core Contracts Lending Pool Bad Debt Management

### Bad Debt Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/bad-debt-management
**Fecha de extracción:** 2025-07-12T01:12:33.006Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/bad-debt-management
generated: 2025-07-12T01:12:33.006Z

---

Copy

### Bad Debt Management

The Lending pool contract is responsible for assigning bad debt to the backstop - auctioning it off - and socializing it if it cannot be auctioned off.

#### [](#bad-debt-assignment)

Bad Debt Assignment

Bad debt is assigned to the backstop when a user's account no longer has any more collateral.

When a user's account is fully liquidated, if they do not have enough collateral a liquidator may only repay a portion of their debt. After this - the user's account will only have debt and no collateral. Then, anyone can call the `bad_debt()` function to transfer all debt from the delinquent user to the backstop. The bad debt is transferred by adding it as debt positions to the backstop's pool positions.

#### [](#bad-debt-auctions)

Bad Debt Auctions

Bad debt auctions are used to auction off bad debt to liquidators in exchange for a portion of the backstop deposits. They are initiated using the `create_bad_debt_auction` function. When this function is called, the auction creator will specify which debt positions they want to auction off. Bad debt auctions are filled by calling the `submit()` function with a `fill_bad_debt_auction` `Request`struct. When they are filled all the bad debt positions that have been added to the backstop's pool positions will be transferred to the fillers positions.

#### [](#bad-debt-socialization)

Bad Debt Socialization

When bad debt auctions are filled - if the backstop no longer has over 5% of the backstop threshold but still has bad debt positions - the backstop's remaining debt positions are burned which socializes the bad debt, reducing the value of all deposits of this asset in the pool.

[PreviousPool Management](/tech-docs/core-contracts/lending-pool/pool-management)[NextProtocol Tokens](/tech-docs/core-contracts/lending-pool/protocol-tokens)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/bad-debt-management](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/bad-debt-management)_

---

## Sección 21 - Tech Docs Core Contracts Lending Pool Emission Management

### Emission Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/emission-management
**Fecha de extracción:** 2025-07-12T01:12:34.240Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/emission-management
generated: 2025-07-12T01:12:34.240Z

---

Copy

### Emission Management

The pool contract is used to distribute the pool's share of emissions to lenders and borrowers and to facilitate user claims.

#### [](#distributing-emissions)

Distributing Emissions

Pool's must be in the reward zone to receive emissions. If they are in the reward zone, emissions are distributed to lenders and borrowers based on the pool's emission configuration. The emission configuration is set by the pool's owner and can be updated at any time. The emission configuration specifies the percentage of emissions that should be distributed to lenders and borrowers of different assets.

Distribution is carried out through 3 steps:

1.  `distribute()` is called on the emitter, which sends BLND to the backstop.

2.  `gulp_emissions()` is called on the backstop, which as well as handling BLND distribution to the pool's backstop depositor, allocates a portion of BLND emissions to the pool.

3.  The pool's `gulp_emissions()` function is called this function:

    - Calls `gulp_pool_emissions()` on the backstop - approving approving the pool to transfer it's allocated BLND from the backstop to the pool.

    - Sets EPS for every pool reserve.

#### [](#claiming-emissions)

Claiming Emissions

Users can claim their share of emissions by calling `claim_emissions()` and inputting the reserves that they want to claim emissions for.

[PreviousLiquidation Management](/tech-docs/core-contracts/lending-pool/liquidation-management)[NextInterest Management](/tech-docs/core-contracts/lending-pool/interest-management)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/emission-management](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/emission-management)_

---

## Sección 22 - Tech Docs Core Contracts Lending Pool Fund Management

### Fund Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/fund-management
**Fecha de extracción:** 2025-07-12T01:12:35.473Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/fund-management
generated: 2025-07-12T01:12:35.473Z

---

Copy

### Fund Management

The Lending pool contract allows users and liquidators to manipulate the user funds it stores.

#### [](#requests)

Requests

All fund management is carried out using `Request` structs

Copy

```
pub struct Request {
    pub request_type: u32,
    pub address: Address, // asset or liquidatee address
    pub amount: i128,
}
```

which are input into a single `submit()` function. Multiple requests can be bundled together to carry out actions atomically (e.g. supply and borrow in the same transaction). The `submit()` function will simply revert if the user's account is unhealthy after all requests are processed.

The following request types are supported:

- `Deposit` (enum 0): Deposits funds into the pool. These funds are not collateralized.

> **INFO**
>
> This request is useful for users who want to deposit funds but do not want these funds to be liquidated in the event their account becomes delinquent. Additionally, they're valuable in pools with strict position count limits since uncollateralized deposits don't count toward position count limits.

Deposit requests will fail if the pool status is greater than 3 (this means the pool is `Frozen`)

- `Withdraw` (enum 1): Withdraws uncollateralized funds from the pool.

- `Deposit Collateral` (enum 2): Deposits collateral into the pool.

Deposit Collateral requests will fail if the pool status is greater than 3 (this means the pool is `Frozen`)

- `Withdraw Collateral` (enum 3): Withdraws collateral from the pool.

- `Borrow` (enum 4): Borrows funds from the pool.

Borrow requests will fail if `pool_status` is greater than 1 (meaning the pool is `Frozen` or `On-Ice`)

- `Repay` (enum 5): Repays borrowed funds.

- `Fill Liquidation` (enum 6): Fills a user liquidation. This involves transferring a portion of the liquidated user's collateral and liabilities to the liquidator.

- `Fill Bad Debt Auction` (enum 7): Fills a bad debt auction. This involves transferring bad debt stored as liabilities in the Backstop contract's positions to the liquidator's positions.

- `Fill Interest Auction` (enum 8): Fills an interest auction. This request does not modify the filler's positions.

- `Delete Liquidation Auction` (enum 9): Cancel's an ongoing liquidation.

Delete Liquidation Auction requests will fail if `pool_status` is greater than 1 (meaning the pool is `Frozen` or `On-Ice`)

All requests will fail if the pool status is 6 (`Setup)`

Requests are flexible in that they can be carried out on behalf of other users utilizing the `spender` `from` and `to` parameters on the `submit()` function. This allows users to delegate fund management to other users or contracts.

> **WARNING**
>
> The addresses input into the `from` and `to` parameters are required to authorize the `submit()` call or it will fail.

###### [](#additional-submit-methods)

Additional Submit Methods

User's can also utilize `submit_with_allowance()` and `flash_loan()` to modify positions. Submit with allowance prompts the pool contract to call `transfer_from()` instead of `transfer()`when moving tokens, this is required for some integrations. `flash_loan()` allows users to borrow as much as they want from the pool without posting collateral as long as their position is healthy at the end of modification. This is useful for arbitrage bots, liquidation bots, and for easily entering leveraged positions.

[PreviousLending Pool](/tech-docs/core-contracts/lending-pool)[NextLiquidation Management](/tech-docs/core-contracts/lending-pool/liquidation-management)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/fund-management](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/fund-management)_

---

## Sección 23 - Tech Docs Core Contracts Lending Pool Interest Management

### Interest Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/interest-management
**Fecha de extracción:** 2025-07-12T01:12:36.715Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/interest-management
generated: 2025-07-12T01:12:36.715Z

---

Copy

### Interest Management

The Pool contract is used to distribute the backstop's share of pool interest to the pool's backstop depositor

#### [](#creating-interest-auctions)

Creating Interest Auctions

Interest is distributed to backstop depositors through a backstop interest auction. These are similar to Liquidation Auctions except they sell interest instead of collateral and buy backstop LP tokens instead of debt repayment. The backstop interest auction is created by calling the `create_interest_auction()` function and specifying which assets interest should be distributed for. All interest for these assets will be put up for auction and 140% of their value in backstop tokens will be requested in return.

Similar to liquidation auctions - the percent of posted interest transferred to the liquidator increases by .05% every block for the first 200 blocks - and the percent of posted backstop tokens transferred to the pool decreases by .05% every block for the second 200 blocks.

#### [](#filling-interest-auctions)

Filling Interest Auctions

Backstop interest auctions are filled by calling the `submit()` function with a `fill_interest_auction` `Request`.

When an interest auction is filled, the accrued interest is transferred to the liquidator - and backstop tokens used to fill the auction are transferred to the pool and donated to the backstop. This increases the value of the pool's backstop deposits.

[PreviousEmission Management](/tech-docs/core-contracts/lending-pool/emission-management)[NextPool Management](/tech-docs/core-contracts/lending-pool/pool-management)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/interest-management](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/interest-management)_

---

## Sección 24 - Tech Docs Core Contracts Lending Pool Liquidation Management

### Liquidation Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/liquidation-management
**Fecha de extracción:** 2025-07-12T01:12:37.957Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/liquidation-management
generated: 2025-07-12T01:12:37.957Z

---

Copy

### Liquidation Management

The pool contract is used to create and carry out user liquidations which are carried out via auctions.

#### [](#creating-liquidations)

Creating Liquidations

Liquidations are created with the `create_user_liquidations()` function. This function creates a liquidation auction which is used to auction off a portion of a user's collateral in exchange for the liquidator assuming a portion of the user's debt.

The creator of the liquidation auction can choose what percent of the user's positions to put up for auction, however, the percent chosen must result in the user's account having a health factor between 1.03 and 1.15 after the liquidation is fully filled.

All a user's positions are involved in every auction - the percentage of each position that is transferred to the liquidator is determined by the number of blocks that have passed since the liquidation started. The percentage of collateral positions transferred increases by .05% every block for the first 200 blocks - and the percentage of debt positions transferred decreases by .05% every block for the second 200 blocks.

#### [](#filling-liquidations)

Filling Liquidations

Liquidations are filled using a `Request` struct input into the `submit()` function, which is shared by user fund management. When the request is handled, a portion of the delinquent user's positions are added to the liquidator's positions. The liquidator can atomically manipulate these positions with additional `Request` structs they bundled with the `fill_liquidation` `Request` (ie. adding a `repay` or `deposit_collateral` request after the liquidation is filled).

> **INFO**
>
> The typical `submit()` health factor check ensures that the liquidator either has enough collateral or has repaid enough debt to complete the liquidation fill

Filling liquidations this way is more gas-efficient and capital-efficient than normal liquidation mechanisms. It also allows liquidators to delay repaying the user's delinquent debt by ensuring their account has enough collateral to cover the additional debt. Supporting these kinds of fills lowers the risk of liquidation cascades and also allows liquidators to slowly unwind positions rather than having to repay them immediately which lowers capital requirements.

Liquidators can fill liquidations fully or partially by inputting the percentage of the liquidation they want to fill in the `amount` field of the `Request` struct.

#### [](#cancelling-liquidations)

Cancelling Liquidations

If at any point during a liquidation auction, the delinquent user's account becomes healthy - the user can cancel the liquidation auction by calling the `submit()` function with a `cancel_liquidation_auction` `Request` . Liquidations typically take ~150 blocks to fill so this is especially useful if a user realizes they're being liquidated and wants to collateralize their account AND cancel the ongoing liquidation by submitting a `repay` or `deposit_collateral` `Request` bundled with a `cancel_liquidation_auction` `Request`.

[PreviousFund Management](/tech-docs/core-contracts/lending-pool/fund-management)[NextEmission Management](/tech-docs/core-contracts/lending-pool/emission-management)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/liquidation-management](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/liquidation-management)_

---

## Sección 25 - Tech Docs Core Contracts Lending Pool Pool Management

### Pool Management | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/pool-management
**Fecha de extracción:** 2025-07-12T01:12:39.224Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/pool-management
generated: 2025-07-12T01:12:39.224Z

---

Copy

### Pool Management

The Lending Pool contract handles updating pool status and asset parameters.

#### [](#pool-status)

Pool Status

Pool status is updated using either a permissionless function, `update_status()` , or a permissioned (admin-only) function `set_status()`. These set the pool to one of the following statuses:

- `Admin_Active` (enum 0): The pool is functioning normally.

- `Active` (enum 1): The pool is functioning normally.

- `Admin_On_Ice` (enum 2): Borrowing and auction cancellations are disabled.

- `On_Ice` (enum 3): Borrowing and auction cancellations are disabled.

- `Admin_Frozen` (enum 4): Borrowing, depositing, and auction cancellations are disabled.

- `Frozen` (enum 5): Borrowing, depositing, and auction cancellations are disabled.

- `Setup` (enum 6): The status the pool is initially set to on creation. Borrowing, depositing, and auction cancellations are disabled.

##### [](#permissionless-updates)

Permissionless Updates

Anyone can update pool status permissionlessly by calling `update_status()`. This function checks the backstop state and sets the status based on the current percentage of backstop deposits allocated to the pool that are queued-for-withdrawal (`q4w`), and if the pool's backstop has reached the deposit threshold (`met_threshold`).

The status is set as follows:

##### [](#permissioned-updates)

Permissioned Updates

Pool admins can update pool status by calling `set_status()`. This takes a `status` parameter (`new_status` in flowchart) and sets it after validating it with the following logic:

#### [](#asset-parameters)

Asset Parameters

Asset parameters can only be updated by the pool admin. They're updated in a two-step process that involves a 7-day queue to prevent admins from suddenly adding unsafe assets or parameters. The process is as follows:

1.  The admin calls `queue_set_reserve()` with the new parameters. This stores a queued reserve update in a hashmap with the address of the asset being added or updated as the key and a `QueuedReserveInit` struct as the value

Copy

```
pub struct QueuedReserveInit {
    pub new_config: ReserveConfig,
    pub unlock_time: u64, // block timestamp after which the queued reserve config can be added
}
```

Copy

```
pub struct ReserveConfig {
    pub index: u32,      // the index of the reserve in the list
    pub decimals: u32,   // the decimals used in both the bToken and underlying contract
    pub c_factor: u32,   // the collateral factor for the reserve scaled expressed in 7 decimals
    pub l_factor: u32,   // the liability factor for the reserve scaled expressed in 7 decimals
    pub util: u32,       // the target utilization rate scaled expressed in 7 decimals
    pub max_util: u32,   // the maximum allowed utilization rate scaled expressed in 7 decimals
    pub r_one: u32,      // the R1 value in the interest rate formula scaled expressed in 7 decimals
    pub r_two: u32,      // the R2 value in the interest rate formula scaled expressed in 7 decimals
    pub r_three: u32,    // the R3 value in the interest rate formula scaled expressed in 7 decimals
    pub reactivity: u32, // the reactivity constant for the reserve scaled expressed in 7 decimals
}
```

> **INFO**
>
> The queued reserve modification (or addition) can be canceled at any point by the admin using `cancel_set_reserve()`

1.  After 7 days have passed the admin calls `set_reserve()` which sets the asset parameters to the queued metadata.

[PreviousInterest Management](/tech-docs/core-contracts/lending-pool/interest-management)[NextBad Debt Management](/tech-docs/core-contracts/lending-pool/bad-debt-management)

Last updated 1 month ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/pool-management](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/pool-management)_

---

## Sección 26 - Tech Docs Core Contracts Lending Pool Protocol Tokens

### Protocol Tokens | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/lending-pool/protocol-tokens
**Fecha de extracción:** 2025-07-12T01:12:40.573Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/lending-pool/protocol-tokens
generated: 2025-07-12T01:12:40.573Z

---

Copy

### Protocol Tokens

The Blend protocol represents all positions for a pool with tokens. This allows the pool to track interest fairly across multiple suppliers and borrowers for a given reserve. All protocol tokens are non-transferable, and are only an accounting method to safely represent positions.

When reading positions for an address via the `get_positions(address: Address)` function, the value returned is a Map of the reserve's index to the BToken or DToken balance.

#### [](#btokens)

bTokens

A bToken represents a supply made to a Blend pool. Each reserve has a unique bToken per pool, and they are non-transferable.

bTokens are converted to and from underlying assets with the reserve's `bRate`. The `bRate` is adjusted when interest is accrued.

bTokens\=underlyingbRatebTokens = \\frac{underlying}{bRate}bTokens\=bRateunderlying​

underlying\=bRate∗bRokensunderlying = bRate\*bRokensunderlying\=bRate∗bRokens

#### [](#dtokens)

dTokens

A dToken represents a liability against a Blend pool. Each reserve has a unique dToken per pool, and they are non-transferable.

dTokens are converted to and from underlying assets with the reserve's `dRate`. The `dRate` is adjusted when interest is accrued.

dTokens\=underlyingdRatedTokens = \\frac{underlying}{dRate}dTokens\=dRateunderlying​

underlying\=dRate∗dTokensunderlying = dRate\*dTokensunderlying\=dRate∗dTokens

[PreviousBad Debt Management](/tech-docs/core-contracts/lending-pool/bad-debt-management)[NextGuides](/tech-docs/guides)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/lending-pool/protocol-tokens](https://docs.blend.capital/tech-docs/core-contracts/lending-pool/protocol-tokens)_

---

## Sección 27 - Tech Docs Core Contracts Pool Factory Lending Pool Deployment

### Lending Pool Deployment | Blend

**URL:** https://docs.blend.capital/tech-docs/core-contracts/pool-factory/lending-pool-deployment
**Fecha de extracción:** 2025-07-12T01:12:41.836Z

---

---

source: https://docs.blend.capital/tech-docs/core-contracts/pool-factory/lending-pool-deployment
generated: 2025-07-12T01:12:41.836Z

---

Copy

### Lending Pool Deployment

The Pool Factory contracts primary responsibility is to deploy and initialize new lending pool contracts

#### [](#deployment)

Deployment

Lending pools are deployed using the `deploy()` function. This will deploy a new lending pool contract using the hash stored on the pool factory, and initialize it with the input parameters.

Additionally, the new lending pool's address will be stored in the pool factory. This allows the pool factory to be queried to check if a pool was deployed by it.

[PreviousPool Factory](/tech-docs/core-contracts/pool-factory)[NextLending Pool](/tech-docs/core-contracts/lending-pool)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/core-contracts/pool-factory/lending-pool-deployment](https://docs.blend.capital/tech-docs/core-contracts/pool-factory/lending-pool-deployment)_

---

## Sección 28 - Tech Docs General

### General | Blend

**URL:** https://docs.blend.capital/tech-docs/general
**Fecha de extracción:** 2025-07-12T01:12:43.092Z

---

---

source: https://docs.blend.capital/tech-docs/general
generated: 2025-07-12T01:12:43.092Z

---

Copy

### General

Blend is a permissionless liquidity protocol that allows permissionless lending pool creation and usage.

The technical documentation will encompass an overview of the core contracts involved in the protocol, as well as guides on how to deploy Blend pools, integrate with them, and more. While the technical documentation can be a good resource - we highly recommend checking out the Blend Capital GitHub for a better understanding of the protocol [https://github.com/blend-capital](https://github.com/blend-capital)

[PreviousRequired Infrastructure](/pool-creators/required-infrastructure)[NextCore Contracts](/tech-docs/core-contracts)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/general](https://docs.blend.capital/tech-docs/general)_

---

## Sección 29 - Tech Docs Guides Deploying A Pool

### Deploying a Pool | Blend

**URL:** https://docs.blend.capital/tech-docs/guides/deploying-a-pool
**Fecha de extracción:** 2025-07-12T01:12:44.309Z

---

---

source: https://docs.blend.capital/tech-docs/guides/deploying-a-pool
generated: 2025-07-12T01:12:44.309Z

---

Copy

### Deploying a Pool

#### [](#deploying-a-new-lending-pool)

Deploying A New Lending Pool

An up to date pool deployment guide can be found here: [https://github.com/blend-capital/blend-utils?tab=readme-ov-file#pool-deployment](https://github.com/blend-capital/blend-utils?tab=readme-ov-file#pool-deployment)

[PreviousGuides](/tech-docs/guides)[NextIntegrations](/tech-docs/integrations)

Last updated 3 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/guides/deploying-a-pool](https://docs.blend.capital/tech-docs/guides/deploying-a-pool)_

---

## Sección 30 - Tech Docs Integrations Fee Vault

### Fee Vault | Blend

**URL:** https://docs.blend.capital/tech-docs/integrations/fee-vault
**Fecha de extracción:** 2025-07-12T01:12:45.614Z

---

---

source: https://docs.blend.capital/tech-docs/integrations/fee-vault
generated: 2025-07-12T01:12:45.614Z

---

Copy

### Fee Vault

[Github Link](https://github.com/script3/fee-vault/tree/main)

The Fee Vault is a contract that allows an admin to earn fees on funds supplied to Blend pools. The Fee Vault is designed for wallets or other integrating protocols that want to add an additional revenue stream based on their users' activity on Blend.

#### [](#how-does-it-work)

How does it work?

The Fee Vault works by being an intermediary between the Blend pool and the user. It tracks the interest generated by user deposits and determines what amount of that interest should be taken as a fee for the admin.

Each Fee Vault supports at most one Blend pool, but can support multiple assets (reserves) within the same Blend pool. The admin must enable a vault for each reserve they want to support. Each reserve vault is an [ERC4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/)\-style vault that tracks interest generated by the users and enables the contract to fairly share that interest across all users.

The Fee Vault supports two types of fee modes, take rate and capped rate, and the fee mode and amount can be changed at any time.

##### [](#take-rate)

Take Rate

In take rate mode, the vault takes a fixed percentage of the interest generated by the user deposits. For example, if the vaults earn 100 USDC in interest and the take rate is 10%, the Fee Vault will take 10 USDC as a fee for the admin, and users will earn 90 USDC.

##### [](#capped-rate)

Capped Rate

In capped rate mode, the vault calculates how much interest should have been earned by the user deposits to reach the capped rate. If the vault generated more interest, the excess is taken as a fee for the admin.

For example, if the vault has a capped rate of 10% and the vault earns 12% (e.g. 120 USDC) over the period, the users will earn 100 USDC and the admin will take 20 USDC as a fee. If the vault only earns 8% (e.g. 80 USDC), the users will earn 80 USDC and the admin will take 0 USDC as a fee.

##### [](#calculating-rates)

Calculating Rates

[GitHub Link](https://github.com/script3/fee-vault/blob/main/src/reserve_vault.rs#L75-L135)

The core math of the vault is how rates and interest earned are calculated. In both fee modes, the vault tracks interest earned between update periods on the vault. That is, if a user interacted with the vault on block 100, and another user interacted with the vault on block 200, the vault will calculate the interest earned between block 100 and block 200, and then calculate the fee based on that interest.

For extremely high frequency interactions, like every block, this can lead to situations where rounding can start to impact fee calculations. The Fee Vault protects against this by rounding against the admin, such that rounding can never impact expected user earnings.

All calculations are done based on the last stored reserve vault, and the reserve's `b_rate` for the current block. The vault data struct is shown below:

Copy

```
### [contracttype]
pub struct ReserveVault {
    /// The reserve asset address
    pub address: Address,
    /// The reserve's last bRate
    pub b_rate: i128,
    /// The timestamp of the last update
    pub last_update_timestamp: u64,
    /// The total shares issued by the reserve vault
    pub total_shares: i128,
    /// The total bToken deposits owned by the reserve vault depositors. Excludes accrued fees.
    pub total_b_tokens: i128,
    /// The number of bTokens the admin is due
    pub accrued_fees: i128,
}
```

###### [](#variables)

Variables

R\=current_reserve_dataR = current\\\_reserve\\\_dataR\=current_reserve_data

V\=last_vault_dataV = last\\\_vault\\\_dataV\=last_vault_data

###### [](#take-rate-math)

Take Rate Math

ΔbRate\=bRateR−bRateV\\Delta bRate = bRate\_{R} - bRate\_{V}ΔbRate\=bRateR​−bRateV​

interest\=bTokensV∗ΔbRateinterest = bTokens\_{V} \* \\Delta bRateinterest\=bTokensV​∗ΔbRate

adminFees\=interest∗takeRateadminFees = interest \* takeRateadminFees\=interest∗takeRate

bTokenAdminFees\=⌊adminInterestbRateR⌋bTokenAdminFees = \\lfloor\\frac{adminInterest}{bRate\_{R}}\\rfloorbTokenAdminFees\=⌊bRateR​adminInterest​⌋

###### [](#capped-rate-math)

Capped Rate Math

Δtime\=currentTimestamp−lastUpdateTimestampV\\Delta time = currentTimestamp - lastUpdateTimestamp\_{V}Δtime\=currentTimestamp−lastUpdateTimestampV​

bRatetarget\=(1+⌈cappedRate∗ΔT31536000⌉)∗bRateVbRate\_{target} = (1 + \\lceil\\frac{cappedRate\* \\Delta T}{31536000}\\rceil) \* bRate\_{V}bRatetarget​\=(1+⌈31536000cappedRate∗ΔT​⌉)∗bRateV​

bTokenAdminFees\=max(bRateR−bRatetarget,0)∗bTokensVbTokenAdminFees = max(bRate\_{R} - bRate\_{target}, 0) \* bTokens\_{V}bTokenAdminFees\=max(bRateR​−bRatetarget​,0)∗bTokensV​

###### [](#applying-btokenadminfees)

Applying bTokenAdminFees

The `bTokenAdminFees` is the amount of `bTokens` that the admin is due from the vault. To apply this, the vault deducts the `bTokenAdminFees` from the `total_b_tokens` of the vault, adds it to the `accrued_fees` of the vault, and sets the `last_update_timestamp` to the current block timestamp.

[PreviousIntegrate with a Blend Pool](/tech-docs/integrations/integrate-pool)[NextPotential Improvements](/tech-docs/potential-improvements)

Last updated 1 month ago

---

_Extraído de [https://docs.blend.capital/tech-docs/integrations/fee-vault](https://docs.blend.capital/tech-docs/integrations/fee-vault)_

---

## Sección 31 - Tech Docs Potential Improvements

### Potential Improvements | Blend

**URL:** https://docs.blend.capital/tech-docs/potential-improvements
**Fecha de extracción:** 2025-07-12T01:12:50.692Z

---

---

source: https://docs.blend.capital/tech-docs/potential-improvements
generated: 2025-07-12T01:12:50.692Z

---

Copy

### Potential Improvements

This page covers known issues and potential improvements that could be made to the codebase if a new version of blend is released.

##### [](#known-issues)

Known Issues

[PreviousFee Vault](/tech-docs/integrations/fee-vault)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/tech-docs/potential-improvements](https://docs.blend.capital/tech-docs/potential-improvements)_

---

## Sección 32 - Users Auctions

### Auctions | Blend

**URL:** https://docs.blend.capital/users/auctions
**Fecha de extracción:** 2025-07-12T01:12:51.952Z

---

---

source: https://docs.blend.capital/users/auctions
generated: 2025-07-12T01:12:51.952Z

---

Copy

### Auctions

##### [](#what-are-auctions-in-blend)

What are auctions in Blend?

The Blend protocol utilizes auctions to sell assets on behalf of the protocol to a bidder. Each auction contains a lot (what the bidder receives) and a bid (what the bidder pays). The auctions are Dutch auctions, or descending price auctions, meaning the price for the bidder starts out extremely high and descends over time. Anyone can fill auctions conducted by the Blend protocol, provided you have the ability to hold the assets in the lot. There are three different types of auctions conducted by the protocol: interest, liquidations, and bad debt.

Auctions can be filled by invoking the `submit` function on a Blend pool, with the following Request included:

Request

- amount `i128`

  - The percentage of the auction to fill as an integer, from 1-100.

- request_type `u32`

  - The type of auction to fill (6 = liquidation, 7 = bad debt, 8 = interest).

- address `Address`

  - The owner of the auction. This is the backstop address for bad debt and interest auctions, and the user being liquidated for liquidation auctions.

##### [](#how-are-auctions-priced)

How are auctions priced?

The auctions are priced based on how many blocks have passed since the auction began, over the course of 400 blocks. The initial price of auctions are set differently based on each auction, but on creation each auction will be set with base values for each asset in the lot and bid. This base value is then scaled for each asset based on the amount of blocks that have passed:

Lot(N)\={Lotbase∗1200Nif N<200Lotbaseif N≥200Lot(N) = \\begin{cases} Lot\_{base}\*\\frac{1}{200}N & \\text{if } N\\lt 200\\\\ Lot\_{base} & \\text{if } N\\geq 200\\\\ \\end{cases}Lot(N)\={Lotbase​∗2001​NLotbase​​if N<200if N≥200​

Bid(N)\={Bidbaseif N≤200Bidbase∗(1−1200(N−200))if N\>200Bid(N) = \\begin{cases} Bid\_{base} & \\text{if } N\\leq 200\\\\ Bid\_{base}\*(1-\\frac{1}{200}(N-200)) & \\text{if } N\\gt 200\\\\ \\end{cases}Bid(N)\={Bidbase​Bidbase​∗(1−2001​(N−200))​if N≤200if N\>200​

At block 0, the bidder pays the full bid but receives nothing. Between block 0 and 200, the lot increases by 0.5% of the base. At block 200, the bid and lot are exactly the base value of the auction. Between block 200 and 400, the bid decreases by 0.5% of the base. At block 400, the bidder pays nothing but receives the full lot.

##### [](#interest-auctions)

Interest Auctions

Interest auctions facilitate the sale of the backstop's earned interest for backstopping a pool in exchange for backstop tokens. These backstop tokens are then donated to the backstop such that they are shared among all backstop depositors.

###### [](#bid)

Bid

The bid contains only the [backstop token](/users/backstopping#what-is-the-backstop-token). On a successful fill, the backstop token is transferred from the bidder to the pool.

###### [](#lot)

Lot

The lot contains all tokens that have generated interest due to the backstop for a pool. This generally is all borrowable assets in a pool. On a successful fill, the pool transfers the lot to the bidder.

##### [](#liquidation-auctions)

Liquidation Auctions

Liquidation auctions facilitate the sale of a liquidated users collateral in exchange for taking on their liabilities. Filling these auctions generally results in the bidder taking on more liabilities than collateral, so it is recommended that bidders have some collateral already present in the pool, or they also include repayment requests in the same transaction. If the bidder does not end up with a healthy position after the transaction, the fill will revert.

###### [](#bid-1)

Bid

The bid contains a set of [dTokens](/tech-docs/core-contracts/lending-pool/protocol-tokens#dtokens) currently held by the liquidated user. On a successful fill, the dTokens in the bid are moved from the liquidated user to the bidder. The bidder now has a liability against the pool that they can decide when and how to repay.

###### [](#lot-1)

Lot

The lot contains a set of [bTokens](/tech-docs/core-contracts/lending-pool/protocol-tokens#btokens) currently held by the liquidated user. On a successful bid, the bTokens in the lot are moved from the liquidated user to the bidder. The bidder now has additional collateral against the pool that they can decide when and how to withdraw.

##### [](#bad-debt-auctions)

Bad Debt Auctions

Bad debt can be generated as a result of liquidations. If a liquidated user does not have any collateral left but still maintains some liabilities, these liabilities are considered "bad debt" and moved to the backstop. Bad debt auctions facilitate the sale of backstop tokens in exchange for taking on the bad debt.

###### [](#bid-2)

Bid

The bid contains a set of [dTokens](/tech-docs/core-contracts/lending-pool/protocol-tokens#dtokens) currently held by the backstop. On a successful fill, the dTokens in the bid are moved from the backstop to the bidder. The bidder now has a liability against the pool that they can decide when and how to repay.

###### [](#lot-2)

Lot

The lot contains only the [backstop token](/users/backstopping#what-is-the-backstop-token). On a successful fill, the backstop token is transferred from the backstop to the bidder.

[PreviousBLND Token](/users/blnd-token)[NextEmissions](/emissions)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/users/auctions](https://docs.blend.capital/users/auctions)_

---

## Sección 33 - Users Backstopping

### Backstopping | Blend

**URL:** https://docs.blend.capital/users/backstopping
**Fecha de extracción:** 2025-07-12T01:12:53.195Z

---

---

source: https://docs.blend.capital/users/backstopping
generated: 2025-07-12T01:12:53.195Z

---

Copy

### Backstopping

##### [](#what-is-a-backstopping)

What is a Backstopping?

Each Blend lending pool has a backstop module, which protects the lending pool from bad debt. If a user incurs bad debt because their positions aren't liquidated quickly enough, their bad debt is transferred to the backstop module, which pays it off by auctioning off its deposits. Users can backstop pools by depositing into their backstop module, thus participating in insuring the lending pool.

##### [](#what-is-the-backstop-token)

What is the Backstop Token?

The backstop supports a single token for all deposits.

The backstop token is [BLND:USDC 80:20 liquidity pool shares](/users/backstopping#what-are-blnd-usdc-80-20-liquidity-pool-shares).

The contract address on mainnet can be found [here](/mainnet-deployments#cas3fl6tlzkdggsisdbwggpxt3nrr4dytzd7yod3hmyo6ltjuvgrveam).

##### [](#why-would-a-user-backstop-a-pool)

Why Would a User Backstop a Pool?

Backstop module depositors receive a percent of the interest pool borrowers pay in exchange for insuring pools. The percentage they are paid depends on a Backstop Take Rate, which is set on pool creation. So if a backstop take rate is 25%, backstop module depositors will receive 25% of all interest paid by borrowers from that pool. This interest is transferred to backstop module depositors as [BLND:USDC 80:20 liquidity pool shares.](/users/backstopping#what-are-blnd-usdc-80-20-liquidity-pool-shares)

In addition, pools require a minimum amount of backstop deposits to be activated. Users who wish to see a certain pool activated may choose to backstop it to help it reach this minimum.

Finally, if the selected lending pool backstop is in the reward zone, backstop module depositors receive BLND emissions. This is to allow them to continue curating and insuring more pools in the Blend protocol.

##### [](#what-are-blnd-usdc-80-20-liquidity-pool-shares)

What are BLND:USDC 80:20 Liquidity Pool Shares?

Tokens representing ownership in a weighted liquidity pool (LP) holding BLND and USDC tokens in weights of 80% BLND and 20% USDC. A LP is a smart contract that functions as an exchange for the tokens it holds. Liquidity providers deposit tokens in the LP smart contract in exchange for shares representing their deposit. The contract utilizes an algorithm to allow traders to swap between the tokens it holds while paying fees to the liquidity providers. A weighted LP is a LP that has unequal values of the tokens it holds. Traditional LPs hold equal values of the tokens they hold. However, weighted ones can support any value distribution. A 80:20 LP will hold 80% of its value in token A and 20% in token B (A and B being BLND and USDC in our case).

##### [](#how-do-users-backstop-pools)

How do User's Backstop Pools?

Users can backstop pools by depositing [BLND:USDC 80:20 weighted liquidity pool shares](/users/backstopping#what-are-blnd-usdc-80-20-liquidity-pool-shares) in the pools backstop module. They should note that if they wish to withdraw these deposits, they will have to queue them for withdrawal and wait for a 21-day withdrawal queue period to end.

##### [](#what-are-the-risks-of-backstopping)

What are the Risks of Backstopping?

Backstop depositors act as first-loss capital for lending pools. If the pool incurs bad debt, backstop deposits will be auctioned off to cover it. Losses incurred by covering bad debt are shared proportionally between backstop module depositors.

##### [](#how-do-backstoppers-claim-earned-interest-and-emissions)

How do Backstoppers Claim Earned Interest and Emissions?

Pool backstoppers can claim earned interest and emissions at any point. When claimed, they are deposited into the [BLND:USDC 80:20 liquidity pool](/users/backstopping#what-are-blnd-usdc-80-20-liquidity-pool-shares), and the shares are added to the user's backstop module deposits.

[PreviousLiquidations](/users/lending-borrowing/liquidations)[NextBLND Token](/users/blnd-token)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/users/backstopping](https://docs.blend.capital/users/backstopping)_

---

## Sección 34 - Users Blnd Token

### BLND Token | Blend

**URL:** https://docs.blend.capital/users/blnd-token
**Fecha de extracción:** 2025-07-12T01:12:54.496Z

---

---

source: https://docs.blend.capital/users/blnd-token
generated: 2025-07-12T01:12:54.496Z

---

Copy

### BLND Token

#### [](#blnd-tokens)

BLND Tokens

##### [](#what-are-blnd-tokens)

What are BLND tokens?

BLND is Blend's protocol token. BLND tokens are emitted to users by the protocol and can be deposited in backstop modules in order to insure lending pools.

##### [](#what-is-the-blnd-asset)

What is the BLND asset?

[https://stellar.expert/explorer/public/asset/BLND-GDJEHTBE6ZHUXSWFI642DCGLUOECLHPF3KSXHPXTSTJ7E3JF6MQ5EZYY-1](https://stellar.expert/explorer/public/asset/BLND-GDJEHTBE6ZHUXSWFI642DCGLUOECLHPF3KSXHPXTSTJ7E3JF6MQ5EZYY-1)

##### [](#how-do-i-get-blnd-tokens)

How do I get BLND tokens?

Users receive BLND tokens just for using the Blend Protocol!

Lenders and borrowers receive emissions if the pool they're using is in the [reward zone](/blend-whitepaper#reward-zone) and has allocated emissions to lenders or borrowers of the asset they're lending or borrowing. 30% of BLND emissions are distributed to pools in the reward zone, and they're split between pools based on how large the pool's backstop deposit is.

Backstop depositors always receive emissions. 70% of BLND emissions are distributed to backstop depositors.\\

Emissions must claim them from either the pool or backstop (depending on how they were earned) to receive their issued BLND. When users claim backstop emissions, the earned BLND is deposited into the [BLND:USDC 80:20 liquidity pool](/users/backstopping#what-are-blnd-usdc-80-20-liquidity-pool-shares), and the shares are deposited into the backstop module for the pool the user was backstopping or using. Emissions earned from lending and borrowing are simply transferred to the user for them to do with as they wish.

###### [](#why-cant-i-claim-my-v2-emissions)

Why can't I claim my V2 Emissions?

Blend V2 is currently issuing retroactive emissions. These are nonclaimable emissions that will be claimable once the emitter backstop swap occurs (this is the "official" protocol upgrade). After the backstop swap, BLND will be distributed to the V2 backstop, and all emissions will be claimable.

More information on backstop swaps:

[https://docs.blend.capital/blend-whitepaper#blnd-emissions](https://docs.blend.capital/blend-whitepaper#blnd-emissions)

##### [](#how-many-blnd-tokens-are-there)

How many BLND tokens are there?

49 million BLND tokens were emitted upon protocol launch using [the Drop function](/blend-whitepaper#emissions-drop). After that, the protocol will emit 1 BLND per second to users. The initially minted tokens will be distributed as follows:

- 7,000,000 BLND to YieldBlox DAO

  These tokens will be sent to the YieldBlox DAO treasury. They can be used immediately.

- 5,250,000 BLND to Ecosystem Organizations

  These tokens will be distributed to custom lockup contracts which allow organizations to use BLND in the protocol, but not to transfer them for 4 years. The purpose of this distribution is to help early adopters of Blend bootstrap their pools.

- 27,000,000 BLND to core contributors

  These tokens will be distributed to lockup smart contracts where they cannot be accessed for 2 years.

- 9,750,000 BLND to investors

  These tokens will be distributed to lockup smart contracts that allow half to be accessed after 6 months, and the remainder to be accessed after a year.

##### [](#was-there-a-blnd-airdrop)

Was there a BLND airdrop?

No.

[PreviousBackstopping](/users/backstopping)[NextAuctions](/users/auctions)

Last updated 2 months ago

---

_Extraído de [https://docs.blend.capital/users/blnd-token](https://docs.blend.capital/users/blnd-token)_

---

## Sección 35 - Users Choosing Pools

### Choosing Pools | Blend

**URL:** https://docs.blend.capital/users/choosing-pools
**Fecha de extracción:** 2025-07-12T01:12:55.776Z

---

---

source: https://docs.blend.capital/users/choosing-pools
generated: 2025-07-12T01:12:55.776Z

---

Copy

### Choosing Pools

Users should be careful when choosing a pool to use — below are some things for the users to pay attention to:

- Check if the pool supports the asset they want to lend, borrow, or collateralize.

  - Assets supported for lending and borrowing will have a [liability factor](/users/lending-borrowing/borrowing#how-much-can-users-borrow) above 0 and show an interest rate above 0.

  - Assets supported as collateral will have a [collateral factor](/users/lending-borrowing/borrowing#how-much-can-users-borrow) above 0.

- Ensure the pool has a well-capitalized backstop module.

  - The backstop module is a fund of assets insuring the pool against bad debt. Well-capitalized backstop modules denote a pool being relatively safe, as backstop module depositors will not want to insure unsafe pools.

  - If a large percentage of the backstop module is queued for withdrawal, the pool is probably in an unstable state — and the user should avoid it for the time being.

- Ensure the assets supported as collateral in the pool are safe collateral assets.

  - Generally, low volatility and high liquidity assets make good collateral.

- Ensure the pool's [risk parameters](/pool-creators/adding-assets/risk-parameters) are set appropriately.

  - The pool should have reasonable collateral and liability factors for supported assets.

- Ensure the pool's oracle contract is reliable.

  - Lending pools rely on oracles to fetch asset prices — users should always be sure the oracle for their lending pool is reliable, or their assets may be lost.

- Ensure the pool admin is trustworthy

  - The pool admin has the ability to change the majority of these settings, so trusting them is a requirement for using the pool.

  - Some pools use disabled public keys as the admin. If this is the case, the pool is immutable and no configuration options can be changed.

[PreviousGeneral/FAQ](/users/general-faq)[NextLending-Borrowing](/users/lending-borrowing)

Last updated 1 month ago

---

_Extraído de [https://docs.blend.capital/users/choosing-pools](https://docs.blend.capital/users/choosing-pools)_

---

## Sección 36 - Users General Faq

### General/FAQ | Blend

**URL:** https://docs.blend.capital/users/general-faq
**Fecha de extracción:** 2025-07-12T01:13:00.904Z

---

---

source: https://docs.blend.capital/users/general-faq
generated: 2025-07-12T01:13:00.904Z

---

Copy

### General/FAQ

#### [](#general)

General

##### [](#what-is-blend)

What is Blend?

Blend is a DeFi (decentralized finance) protocol that allows any entity to create or utilize an immutable lending market that fits its needs.

##### [](#what-is-a-decentralized-finance-protocol)

What is a Decentralized Finance protocol?

A decentralized finance protocol is a financial application that does not rely on or require its users to trust a central intermediary. This is achieved by building the protocol using immutable smart contracts that run on a distributed network. Blend consists of a group of immutable smart contracts running on Stellar's Soroban smart contract engine. No central organization controls Blend, and there is no organization Blend relies on to continue operating. This means that Blend is non-custodial, trust-minimized, and censorship-resistant.

##### [](#why-should-you-care-about-blend)

Why should you care about Blend?

Blend offers lending pools that are secure, capital efficient, and permissionless. Utilizing it, ecosystem entities will be able to provide a variety of new functionality to the Stellar ecosystem — such as real-world financing, leveraged trading, yield products, and new DeFi apps.

- \*Security\*\*

All Blend lending pools are isolated from one another. Therefore, lenders and borrowers are only exposed to the risk of the pool they're using. Additionally, each lending pool has mandatory insurance through the [backstop module](/blend-whitepaper#backstop-module).

- \*Capital Efficiency\*\*

Blend's reactive interest rate mechanism ensures there isn't slack capital in the protocol. Lenders and borrowers can expect to experience relatively efficient rates while using Blend.

- \*Permissionless\*\*

Anyone can use Blend to lend or borrow. But more importantly, anyone can deploy a new lending pool as long as they can attract backstop module depositors. This means all valuable use cases for Blend should be quickly supported rather than having to go through an arduous governance process.

##### [](#what-are-the-benefits-of-blend-for-stellar)

What are the benefits of Blend for Stellar?

Blend brings decentralized, on-chain lending markets to the Stellar ecosystem. Within the ecosystem, this promises to:

- Increase trading and payment liquidity

- Improve capital productivity

- Reduce reliance on lending intermediaries like banks

- Offer new financial services to a global market

##### [](#how-do-i-use-blend)

How do I use Blend?

Currently, Blend is still in development. Once it's released to the Stellar testnet, there will be a web app where users can use it.

More technical users can also use Blend directly by calling the smart contracts using the Horizon API layer. Please see the Soroban documentation and the [technical docs](/tech-docs/general) section for more information.

##### [](#does-blend-have-fees)

Does Blend have fees?

Blend users can incur three possible fees:

- \*Network Fees\*\*

Blend users must pay [Stellar Network fees](https://developers.stellar.org/docs/glossary/fees/) for each transaction.

- \*Interest Rates\*\*

Borrowers on Blend must pay interest fees to lenders. These vary based on the parameters set by pool creators and fluctuate based on demand. For more information, see the [interest rates section](/blend-whitepaper#interest-rates) of the whitepaper.

- \*Liquidation Premiums\*\*

When a Blend borrower is liquidated, the liquidator will likely demand a liquidation premium, meaning the value of the collateral they claim will be greater than the value of the liabilities they repay. The size of the premium is market-driven; it will always be the smallest premium needed to clear the liquidation. To learn more about the liquidation mechanism, see the [liquidations section](/blend-whitepaper#liquidations) of the whitepaper.

##### [](#can-blend-be-changed-or-upgraded)

Can Blend be changed or upgraded?

No. The closest thing to an upgrade for Blend is an [emissions fork](/blend-whitepaper#emission-migration) - in which case the old version of the protocol still functions as expected; it just stops receiving emissions.

##### [](#whats-a-blnd-token)

What's a BLND token?

BLND is Blend's platform token. It is issued to protocol users and can be deposited in the backstop module to insure lending pools.

##### [](#are-there-risks-when-using-blend)

Are there risks when using Blend?

Using any financial application involves risk. There are four main risks users should consider when using Blend.

- \*Smart Contract Risk\*\*

Blend functions using smart contracts. If a bug is discovered and exploited, it could result in a loss of user funds. To mitigate this risk, the Blend Protocol has been audited by third parties. Audit Reports:

[Audits & Bug Bounties](/audits-and-bug-bounties)

###### [](#oracle-risk)

Oracle Risk

Blend's lending pools rely on oracles to price assets accurately. If a pool's oracle stopped functioning, the pool's users could suffer a loss of user funds.

###### [](#asset-risk)

Asset Risk

Lenders using Blend lending pools are exposed to asset risk. High volatility in assets could cause the pool to take on bad debt. Lenders could suffer asset loss if the amount of bad debt exceeds the value of assets [backstopping](/users/backstopping) the pool.

- \*Stellar Protocol Ledger Risk\*\*

As with all decentralized ledgers, Stellar has its unique set of risks. You can read more about the Stellar Consensus Protocol and its risks [here](https://developers.stellar.org/docs/glossary/scp/).

[PreviousGithub](/github)[NextChoosing Pools](/users/choosing-pools)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/users/general-faq](https://docs.blend.capital/users/general-faq)_

---

## Sección 37 - Users Lending Borrowing Borrowing

### Borrowing | Blend

**URL:** https://docs.blend.capital/users/lending-borrowing/borrowing
**Fecha de extracción:** 2025-07-12T01:13:02.182Z

---

---

source: https://docs.blend.capital/users/lending-borrowing/borrowing
generated: 2025-07-12T01:13:02.182Z

---

Copy

### Borrowing

##### [](#how-does-borrowing-work-on-blend)

How does borrowing work on Blend?

Borrowing from Blend requires users to post sufficient collateral to the lending pool they are borrowing from. The collateral posted is also lent to the pool, so borrowers generate interest on it. The amount of collateral the borrower must post depends on their collateral's Collateral Factor(CF) and the borrowed asset's Liability Factor(LF). The required dollar value of their collateral can be calculated with the following formula:

CollateralValue\=LiabilityValueLF∗CFCollateralValue = \\frac{LiabilityValue}{LF\*CF }CollateralValue\=LF∗CFLiabilityValue​

So if the user has collateral with a CFCFCF of 0.5 and is attempting to borrow $450 of an asset with a LFLFLFof 0.9, they must post at least $1000 of collateral.

Borrowers must always maintain this collateral ratio as the value of their collateral and liabilities shifts. If they ever lack sufficient collateral, they will be [liquidated](/users/lending-borrowing/liquidations).

##### [](#how-do-you-borrow-using-blend)

How do you borrow using Blend?

To borrow using Blend, borrowers must first select a lending pool to borrow from. When choosing a pool to borrow from, users should:

- Check the pool supports borrowing of the asset they want to borrow.

- Check that the pool supports collateralizing the asset they wish to collateralize.

- Check that the Collateral Factor and Liability Factors are sufficient for the level of debt the user wants to incur against their collateral.

- Ensure the pool has a well capitalized backstop module.

  - The backstop module is a fund of assets insuring the pool against bad debt, so well-capitalized backstop modules denote a pool being relatively safe.

  - If a large percentage of the backstop module is queued for withdrawal, the pool is probably in an unstable state, and the user should avoid it for the time being.

- Ensure the assets supported as collateral in the pool are safe collateral assets.

  - Generally, low volatility, high liquidity assets make good collateral.

- Ensure the pool's risk parameters are set appropriately.

  - The pool should have reasonable collateral and liability factors for supported assets.

- Ensure the pool's oracle contract is trustworthy.

  - Oracles are crucial for the safety of pools — users should always be sure the oracle for their lending pool is reliable.

Once a lending pool is selected, borrowers deposit collateral in it and can borrow assets from it.

Borrowers can repay borrowed assets from the protocol at any time.

##### [](#why-would-users-borrow-from-blend)

Why Would Users Borrow From Blend?

In exchange for borrowing from Blend lending pools, borrowers receive BLND issuance from the protocol (if their pool is in the reward zone and is allocating emissions to borrowers of the asset the user is borrowing). In addition, users retain full control of their collateral when borrowing from Blend. The protocol is decentralized, trust-free, and non-custodial. Only the protocol smart contracts have control over user funds, and users can withdraw their funds at any time.

##### [](#what-assets-can-be-borrowed)

What Assets can be Borrowed?

Any Stellar-based asset enabled for borrowing by the lending pool the user is using can be borrowed with Blend. If an asset isn't supported, a new pool can be created to support it as long as the pool can attract sufficient backstop module deposits to reach the [minimum deposit threshold](/blend-whitepaper#backstop-threshold).

##### [](#how-do-borrowers-repay-borrowed-assets)

How do Borrowers Repay Borrowed Assets?

Borrowers can repay borrowed assets by using Blend's smart contracts. In doing so, they will also repay all interest the borrower has accrued (interest is automatically accrued to the user's liability balance).

##### [](#how-much-can-users-borrow)

How Much Can Users Borrow?

Each user has a borrow limit for pools they are using based on the amount and quality of their collateral. If they exceed this borrow limit, their account can be liquidated. Users can calculate their borrow limit using the following equation:

BorrowLimit\=∑CollateralFactor∗CollateralValueBorrowLimit = \\sum{CollateralFactor\*CollateralValue}BorrowLimit\=∑CollateralFactor∗CollateralValue

Users should note that when borrowing, their borrow limit is increased by the liability asset's value divided by its liability factor, so:

EffectiveLiabilityValue\=LiabilityValueLiabilityFactorEffectiveLiabilityValue = \\frac{LiabilityValue}{LiabilityFactor}EffectiveLiabilityValue\=LiabilityFactorLiabilityValue​

##### [](#how-do-borrowers-pay-interest)

How Do Borrowers Pay Interest?

Interest automatically accrues to a borrower's liability balance over time. When they repay their debt, they will also be paying any interest they owe.

##### [](#how-is-interest-calculated)

How Is Interest Calculated?

Interest rates vary based on pre-set interest rate parameters but are generally based on the utilization of an asset in a pool (how much of the supplied amount is borrowed). In addition, interest can move higher or lower if an asset is consistently over or underutilized due to the interest rate model's reactivity.

To learn more about how Blend calculates interest rates, see the [interest rate section](/blend-whitepaper#interest-rates) of the whitepaper.

##### [](#do-borrowers-earn-blnd-emissions)

Do Borrowers Earn BLND Emissions?

Borrowers earn BLND emissions if their pool is in the reward zone, and the pool creator allocated emissions to borrowers of the asset the user is borrowing. They may claim these emissions at any time.

[PreviousLending](/users/lending-borrowing/lending)[NextLiquidations](/users/lending-borrowing/liquidations)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/users/lending-borrowing/borrowing](https://docs.blend.capital/users/lending-borrowing/borrowing)_

---

## Sección 38 - Users Lending Borrowing Lending

### Lending | Blend

**URL:** https://docs.blend.capital/users/lending-borrowing/lending
**Fecha de extracción:** 2025-07-12T01:13:03.458Z

---

---

source: https://docs.blend.capital/users/lending-borrowing/lending
generated: 2025-07-12T01:13:03.458Z

---

Copy

### Lending

##### [](#how-does-lending-with-blend-work)

How Does Lending with Blend Work?

Lenders supply assets they wish to lend to Blend lending pools. Borrowers then may borrow the assets by posting collateral to the pool and paying interest to lenders.

##### [](#how-do-you-lend-using-blend)

How Do You Lend Using Blend?

Lenders provide assets to the lending pool and receive interest in return. Borrowers can borrow these assets by posting collateral and paying interest at loan repayment.

Lenders can withdraw lent assets from the protocol at any time as long as two conditions are met:

- The lending pool tokens are lent to must have sufficient liquidity — this means the pool must have more unborrowed assets than the amount the lender wishes to withdraw.

  - If the pool does not have sufficient liquidity, the interest rate model will ensure liquidity increases. Blend's interest rate model raises interest if an asset is overutilized, ensuring that either borrowers repay, are liquidated, or more lenders enter the pool to receive the high interest rates. To learn more, see the [interest rate section](/blend-whitepaper#interest-rates) of the whitepaper.

- The lender must be in good standing with the pool post-withdrawal — lenders have the option of using lent funds as collateral to borrow other pool assets. If they choose to do so, they are only allowed to withdraw lent funds if the withdrawal does not cause them to exceed their [borrow limit](/users/lending-borrowing/borrowing#how-much-can-users-borrow). Otherwise, they must repay the borrowed funds before they can withdraw.

##### [](#why-would-users-lend-on-blend)

Why would users lend on Blend?

In exchange for lending using Blend lending pools, lenders receive interest from borrowers and BLND issuance from the protocol (if their pool is in the reward zone and is allocating emissions to lenders of the asset the user is lending). In addition, when lending on Blend, users retain control of their funds. The protocol is decentralized, trust-free, and non-custodial. Only the protocol smart contracts have control over user funds, and users can withdraw their funds at any time.

##### [](#what-is-the-interest-rate-for-lending-on-blend)

What is the interest rate for lending on Blend?

Lending interest rates equal the _borrowing interest rate_ multiplied by the _utilization ratio_ since interest paid by borrowers is distributed proportionally to lenders. Borrowing interest rates are demand-based and calculated using the utilization ratio. This means borrowing interest rates increase as the percentage of protocol assets lent to borrowers increases. See the [interest rate section](/blend-whitepaper#interest-rates) of the whitepaper to learn more about how they are calculated.

##### [](#how-do-lenders-receive-interest)

How do lenders receive interest?

When lenders withdraw their lent assets, they also withdraw any interest they have earned.

##### [](#who-controls-my-lent-assets)

Who controls my lent assets?

You do! Assets lent to the protocol are controlled by Blend's smart contracts. Therefore, you can use those smart contracts to withdraw your lent assets at any time.

##### [](#what-assets-can-be-lent)

What assets can be lent?

Any Stellar-based asset supported by the lending pool you're using can be lent with Blend. If an asset isn't supported a new pool can be created to support it as long as sufficient backstop module depositors will support it.

##### [](#how-do-lenders-withdraw-lent-assets)

How do lenders withdraw lent assets?

Lenders can withdraw assets by using Blend's smart contracts. Doing so will also withdraw all interest the lender has accrued.

##### [](#is-there-any-situation-where-lenders-cant-withdraw-assets)

Is there any situation where lenders can't withdraw assets?

If an assets utilization ratio is too high, there may not be sufficient liquidity for a lender to withdraw assets because too much of the asset balance is currently lent out. However, due to Blend's demand-based interest rate model, this is extremely unlikely. Interest rates are typically extremely high (over 100%) at high utilization ratios, which heavily incentivizes borrowers to repay their loans and new entities to lend to the protocol, thus adding liquidity and lowering the utilization ratio.

##### [](#do-lenders-earn-blnd-emissions)

Do Lenders Earn BLND Emissions?

Lenders earn BLND emissions if their pool is in the reward zone and the pool creator allocated emissions to lenders of the asset the user is lending. They may claim these emissions at any time at which point.

[PreviousLending-Borrowing](/users/lending-borrowing)[NextBorrowing](/users/lending-borrowing/borrowing)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/users/lending-borrowing/lending](https://docs.blend.capital/users/lending-borrowing/lending)_

---

## Sección 39 - Users Lending Borrowing Liquidations

### Liquidations | Blend

**URL:** https://docs.blend.capital/users/lending-borrowing/liquidations
**Fecha de extracción:** 2025-07-12T01:13:04.681Z

---

---

source: https://docs.blend.capital/users/lending-borrowing/liquidations
generated: 2025-07-12T01:13:04.681Z

---

Copy

### Liquidations

In the case that a user's account becomes delinquent because they exceed their [borrow limit,](/users/lending-borrowing/borrowing) they can be liquidated. This means their positions will be transferred to another Blend user who will then either close them or re-collateralize them.

##### [](#how-do-blend-liquidations-work)

How do Blend Liquidations Work?

When a Blend user becomes delinquent, any user may initiate a liquidation auction on their account — the liquidator will choose a percent of the user's collateral positions to be auctioned off. They cannot auction off more liabilities than are necessary to bring the account back to a healthy state. Based on the percentage of liabilities being auctioned off, the protocol will choose a percentage of the user's collateral to also be auctioned off. The value of the collateral auctioned will slightly exceed the value of the liabilities being auctioned. As soon as the auction is initiated, it begins. At this point, anyone can fill the auction. The percent of the offered collateral the auction filler receives depends on how long the auction has gone on (the percent grows over time). Once 100% of the offered collateral is available, the percent of the liability that the filler must repay starts decreasing from 100% until it hits 0%. This way, we can be sure that the auction will be filled as soon as a market participant deems it profitable.

When a liquidator fills the auction, the filled liability and collateral positions are transferred to their account. Then, the liquidator must ensure their account is healthy by either posting enough collateral to maintain the newly acquired liabilities or by repaying a portion of the liabilities.

Since liquidators have autonomy over when to fill the auction, they will typically fill it at a point where the value of the collateral they receive slightly exceeds the value of the liabilities they repay.

For a full explanation of the liquidation process, see the [liquidation section](/blend-whitepaper#liquidations) of the whitepaper.

[PreviousBorrowing](/users/lending-borrowing/borrowing)[NextBackstopping](/users/backstopping)

Last updated 4 months ago

---

_Extraído de [https://docs.blend.capital/users/lending-borrowing/liquidations](https://docs.blend.capital/users/lending-borrowing/liquidations)_

---

## Información del Documento

- **Archivos combinados:** 39
- **Generado:** 11/7/2025, 19:13:04
- **Herramienta:** Web Scraper to Markdown
- **Archivos fuente:**
  - `blend-whitepaper.md`
  - `index.md`
  - `media-kit.md`
  - `pool-creators-adding-assets-emissions.md`
  - `pool-creators-adding-assets-interest-rates.md`
  - `pool-creators-adding-assets-risk-parameters.md`
  - `pool-creators-backstop-bootstrapping.md`
  - `pool-creators-general.md`
  - `pool-creators-pool-management.md`
  - `pool-creators-required-infrastructure.md`
  - `pool-creators-selecting-an-oracle.md`
  - `pool-creators-setting-backstop-take-rate.md`
  - `pool-creators-setting-max-positions.md`
  - `pool-creators-tutorial-setting-up-a-pool.md`
  - `tech-docs-core-contracts-backstop-deposit-management.md`
  - `tech-docs-core-contracts-backstop-drawing-and-donating.md`
  - `tech-docs-core-contracts-backstop-emission-distribution.md`
  - `tech-docs-core-contracts-emitter-backstop-management.md`
  - `tech-docs-core-contracts-emitter-blend-distribution.md`
  - `tech-docs-core-contracts-lending-pool-bad-debt-management.md`
  - `tech-docs-core-contracts-lending-pool-emission-management.md`
  - `tech-docs-core-contracts-lending-pool-fund-management.md`
  - `tech-docs-core-contracts-lending-pool-interest-management.md`
  - `tech-docs-core-contracts-lending-pool-liquidation-management.md`
  - `tech-docs-core-contracts-lending-pool-pool-management.md`
  - `tech-docs-core-contracts-lending-pool-protocol-tokens.md`
  - `tech-docs-core-contracts-pool-factory-lending-pool-deployment.md`
  - `tech-docs-general.md`
  - `tech-docs-guides-deploying-a-pool.md`
  - `tech-docs-integrations-fee-vault.md`
  - `tech-docs-potential-improvements.md`
  - `users-auctions.md`
  - `users-backstopping.md`
  - `users-blnd-token.md`
  - `users-choosing-pools.md`
  - `users-general-faq.md`
  - `users-lending-borrowing-borrowing.md`
  - `users-lending-borrowing-lending.md`
  - `users-lending-borrowing-liquidations.md`
