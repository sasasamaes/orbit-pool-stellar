# Documentación Completa

> **Generado:** 11/7/2025, 19:19:49
> **Archivos combinados:** 56
> **Herramienta:** Web Scraper to Markdown

## Tabla de Contenidos

1. [Docs Build Apps Application Design Considerations](#sección-1---docs-build-apps-application-design-considerations)
2. [Docs Build Apps Dapp Frontend](#sección-2---docs-build-apps-dapp-frontend)
3. [Docs Build Apps Overview](#sección-3---docs-build-apps-overview)
4. [Docs Build Guides Cli](#sección-4---docs-build-guides-cli)
5. [Docs Build Guides Conventions](#sección-5---docs-build-guides-conventions)
6. [Docs Build Guides Dapps](#sección-6---docs-build-guides-dapps)
7. [Docs Build Guides Events](#sección-7---docs-build-guides-events)
8. [Docs Build Guides Freighter](#sección-8---docs-build-guides-freighter)
9. [Docs Build Guides Rpc](#sección-9---docs-build-guides-rpc)
10. [Docs Build Guides Storage](#sección-10---docs-build-guides-storage)
11. [Docs Build Guides Testing](#sección-11---docs-build-guides-testing)
12. [Docs Build Smart Contracts Example Contracts Atomic Swap](#sección-12---docs-build-smart-contracts-example-contracts-atomic-swap)
13. [Docs Build Smart Contracts Example Contracts Auth](#sección-13---docs-build-smart-contracts-example-contracts-auth)
14. [Docs Build Smart Contracts Example Contracts Liquidity Pool](#sección-14---docs-build-smart-contracts-example-contracts-liquidity-pool)
15. [Docs Build Smart Contracts Example Contracts Timelock](#sección-15---docs-build-smart-contracts-example-contracts-timelock)
16. [Docs Build Smart Contracts Example Contracts Tokens](#sección-16---docs-build-smart-contracts-example-contracts-tokens)
17. [Docs Build Smart Contracts Example Contracts](#sección-17---docs-build-smart-contracts-example-contracts)
18. [Docs Build Smart Contracts Getting Started](#sección-18---docs-build-smart-contracts-getting-started)
19. [Docs Build Smart Contracts Overview](#sección-19---docs-build-smart-contracts-overview)
20. [Docs Data Analytics Hubble Analyst Guide](#sección-20---docs-data-analytics-hubble-analyst-guide)
21. [Docs Data Analytics Hubble Data Catalog](#sección-21---docs-data-analytics-hubble-data-catalog)
22. [Docs Data Analytics Hubble Developer Guide](#sección-22---docs-data-analytics-hubble-developer-guide)
23. [Docs Data Analytics Hubble](#sección-23---docs-data-analytics-hubble)
24. [Docs Data Apis Api Providers](#sección-24---docs-data-apis-api-providers)
25. [Docs Data Apis Horizon Admin Guide](#sección-25---docs-data-apis-horizon-admin-guide)
26. [Docs Data Apis Horizon Api Reference](#sección-26---docs-data-apis-horizon-api-reference)
27. [Docs Data Apis Horizon](#sección-27---docs-data-apis-horizon)
28. [Docs Data Apis Rpc Admin Guide](#sección-28---docs-data-apis-rpc-admin-guide)
29. [Docs Data Apis Rpc Api Reference](#sección-29---docs-data-apis-rpc-api-reference)
30. [Docs Data Apis Rpc](#sección-30---docs-data-apis-rpc)
31. [Docs Data Indexers Build Your Own](#sección-31---docs-data-indexers-build-your-own)
32. [Docs Learn Fundamentals Anchors](#sección-32---docs-learn-fundamentals-anchors)
33. [Docs Learn Fundamentals Fees Resource Limits Metering](#sección-33---docs-learn-fundamentals-fees-resource-limits-metering)
34. [Docs Learn Fundamentals Lumens](#sección-34---docs-learn-fundamentals-lumens)
35. [Docs Learn Fundamentals Networks](#sección-35---docs-learn-fundamentals-networks)
36. [Docs Learn Fundamentals Stellar Consensus Protocol](#sección-36---docs-learn-fundamentals-stellar-consensus-protocol)
37. [Docs Learn Fundamentals Stellar Data Structures](#sección-37---docs-learn-fundamentals-stellar-data-structures)
38. [Docs Learn Fundamentals Stellar Ecosystem Proposals](#sección-38---docs-learn-fundamentals-stellar-ecosystem-proposals)
39. [Docs Learn Fundamentals Stellar Stack](#sección-39---docs-learn-fundamentals-stellar-stack)
40. [Docs Learn Fundamentals Transactions](#sección-40---docs-learn-fundamentals-transactions)
41. [Docs Learn Migrate](#sección-41---docs-learn-migrate)
42. [Docs Networks Resource Limits Fees](#sección-42---docs-networks-resource-limits-fees)
43. [Docs Networks Software Versions](#sección-43---docs-networks-software-versions)
44. [Docs Tokens Control Asset Access](#sección-44---docs-tokens-control-asset-access)
45. [Docs Tokens Quickstart](#sección-45---docs-tokens-quickstart)
46. [Docs Tokens Stellar Asset Contract](#sección-46---docs-tokens-stellar-asset-contract)
47. [Docs Tokens Token Interface](#sección-47---docs-tokens-token-interface)
48. [Docs Tools Developer Tools](#sección-48---docs-tools-developer-tools)
49. [Docs Tools Infra Tools Cross Chain](#sección-49---docs-tools-infra-tools-cross-chain)
50. [Docs Tools Lab](#sección-50---docs-tools-lab)
51. [Docs Tools Quickstart](#sección-51---docs-tools-quickstart)
52. [Docs Tools Ramps Moneygram](#sección-52---docs-tools-ramps-moneygram)
53. [Docs Tools Sdks](#sección-53---docs-tools-sdks)
54. [Docs Validators Admin Guide](#sección-54---docs-validators-admin-guide)
55. [Docs Validators Tier 1 Orgs](#sección-55---docs-validators-tier-1-orgs)
56. [Index](#sección-56---index)

---

## Sección 1 - Docs Build Apps Application Design Considerations

### Application Design Considerations | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/apps/application-design-considerations
**Fecha de extracción:** 2025-07-12T01:17:05.888Z

---

---

source: https://developers.stellar.org/docs/build/apps/application-design-considerations
generated: 2025-07-12T01:17:05.888Z

---

On this page

### Application Design Considerations

#### Custody models[​](#custody-models "Direct link to Custody models")

When building an application, one of the first things you have to decide is how your users’ secret keys will be secured and stored. Stellar applications give users access to their accounts that are stored on the ledger, and access to these accounts is controlled by the account’s secret key. That secret key proves that the user has custody or “owns” the account.

There are four custody options to consider:

- Non-custodial service - the user of the application stores their own secret key
- Custodial service - the service provider (application) stores the users’ secret keys
- Mixture of both - with the use of [multisig](/docs/learn/fundamentals/transactions/signatures-multisig), this option is useful for maintaining non-custodial status while still allowing for account recovery
- Third-party key management services - integrate a third-party custodial service into your application that can store your users’ secret keys

##### Non-custodial service[​](#non-custodial-service "Direct link to Non-custodial service")

In a non-custodial service, the user of the application stores the secret key for their account and permissions the application to send requests to delegate transaction signing. There are some potential usability issues as the user has to know how to securely store their own account credentials and safely navigate transaction signing on their end. If they lose their secret key, they will also lose access to their account.

Typically, non-custodial applications create or import a pre-existing Stellar account for each user.

##### Custodial service[​](#custodial-service "Direct link to Custodial service")

With a custodial service, the service provider (an application such as a centralized exchange) stores the users’ secret keys and delegates usage rights to the user.

Many custodial services choose to use a single pooled Stellar account (called shared, omnibus, or [pooled accounts](/docs/learn/encyclopedia/transactions-specialized/pooled-accounts-muxed-accounts-memos)) to handle transactions on behalf of their users instead of creating a new Stellar account for each user. To distinguish between individual users in a pooled account, we encourage the implementation of [muxed accounts](/docs/learn/encyclopedia/transactions-specialized/pooled-accounts-muxed-accounts-memos#muxed-accounts).

##### A mixture of non-custodial and custodial[​](#a-mixture-of-non-custodial-and-custodial "Direct link to A mixture of non-custodial and custodial")

Building an application with [multi-signature](/docs/learn/fundamentals/transactions/signatures-multisig) capabilities allows you to have a non-custodial service with account recovery. If the user loses their secret key, they can still sign transactions with other authorized signatures, granted the signature threshold is high enough.

##### Third-party key management services​[​](#third-party-key-management-services "Direct link to Third-party key management services​")

There are several apps and services that specialize in adding additional security layers to users' accounts. Check them out if you're interested in integrating a third-party key management service:

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)
- [StellarGuard](https://stellarguard.me/)
- [LobstrVault](https://vault.lobstr.co/)

#### Application security[​](#application-security "Direct link to Application security")

Even though wallets can operate client-side, they deal with a user’s secret keys, which give direct access to their account, and to any value they hold. That’s why it’s essential to require all web traffic to flow over strong TLS methods. Even when developing locally, use a non-signed localhost certificate to develop secure habits from the very beginning. Stellar is a powerful money-moving software — don’t skimp on security.

For more information, check out our guide to [securing web-based products](https://www.stellar.org/developers/guides/walkthroughs/securing-web-projects.html).

#### Wallet services[​](#wallet-services "Direct link to Wallet services")

A wallet typically has these basic functions: key storage, account creation, transaction signing, and queries to the Stellar database. There are some services that take care of all of these functions for you, so you can build whatever you’d like around it. Check out some of these wallet services below.

- [Albedo](https://albedo.link/)
- [Freighter](https://www.freighter.app/)

#### Account creation strategies[​](#account-creation-strategies "Direct link to Account creation strategies")

In this section, we will go over the new user account creation flow between non-custodial wallets and anchors with SEP-24 and/or SEP-6 implementations. A Stellar account is created with a keypair (a public key and private key) and the minimum balance of XLM.

When a new customer downloads the wallet application and goes through the deposit flow for the first time, their Stellar account can be created by either the user’s wallet application or the anchor facilitating the first deposit. This section describes each of these strategies.

##### Option 1: The anchor creates and funds the Stellar account​[​](#option-1-the-anchor-creates-and-funds-the-stellar-account "Direct link to Option 1: The anchor creates and funds the Stellar account​")

For this option, the wallet needs to allow users to initiate their first deposit without having to add an asset/establish a trustline. The wallet then prompts the user to add the trustline once funds are received by the anchor. The flow looks like this:

1.  The wallet registers a new user and issues a keypair.
2.  The wallet initiates the first deposit on behalf of the user without requiring the user to add the asset/create the trustline.
3.  The anchor provides deposit instructions to the customer.
4.  The user transfers money from a bank account to the anchor’s bank account.
5.  Once the anchor receives the transfer, the anchor creates and funds the Stellar account for the customer.
6.  The wallet detects that the account has been created and a trustline must be established.
7.  The wallet prompts the user to add the asset/create the trustline.
8.  Finally, the anchor sends the deposit funds to the user’s Stellar account.

> **INFO**
>
> info
>
> An anchor should always maintain a healthy amount of XLM in its distribution account to support new account creations. If doing so becomes unsustainable, it’s recommended that the anchor collaborates with wallets to determine a strategy based on the number of account creation requests. The recommended amount is 2XLM per user account creation (1XLM to meet the minimum balance requirement, and 1XLM for establishing trustlines and covering transaction fees).

With the flow described above, the wallet and the anchor have to facilitate listening for and responding to the trustline status, which can create user experience frictions when waiting for the trustline to be established. To address this issue, Protocol 15 introduced claimable balances, which enhance the flow by allowing users to start using the wallet without having to secure XLM. Both the wallet and the anchor have to implement claimable balance support in order to make this flow work.

The flow with Claimable Balances looks like this:

1.  The wallet registers a new user, and generates a keypair.
2.  The wallet initiates a deposit on behalf of a user.
3.  The anchor provides deposit instructions to the wallet.
4.  The user transfers money from a bank account to the anchor’s account.
5.  The anchor creates and funds the user's Stellar account plus the amount required for trustlines and transaction fees. Again, we suggest 2 XLM to start.
6.  The anchor creates a Claimable Balance.
7.  The wallet detects the Claimable Balance for the account, claims the funds, and posts it in the wallet.

##### Option 2: the wallet creates and funds the Stellar account upon user sign-up​[​](#option-2-the-wallet-creates-and-funds-the-stellar-account-upon-user-sign-up "Direct link to Option 2: the wallet creates and funds the Stellar account upon user sign-up​")

For this option, the wallet creates and funds the Stellar account upon every new user sign-up with the minimum requirement of 1XLM, plus the .5XLM reserve for establishing the first trustline, plus a bit more to cover transaction fees. For more information on minimum balances, check out the [Lumens section](/docs/learn/fundamentals/lumens#minimum-balance).

The flow looks like this:

1.  Upon a new user signup, the wallet issues a keypair, then creates and funds the user's Stellar account with 2XLM.
2.  Then the wallet creates a trustline, and initiates the first deposit.
3.  Once the deposit request is sent to the anchor, the anchor provides instructions for the deposit.
4.  The customer transfer funds from a personal bank account to the anchor’s account.
5.  The anchor receives the funds, then sends them to the user’s Stellar account.
6.  The wallet detects that funds were sent and notifies the user.

> **NOTE**
>
> note
>
> In the examples above, we suggest having the anchor or wallet cover minimum balance and trustline XLM requirements by depositing funds directly into a user's account. We made that suggestion for the sake of simplicity, but in all cases, the anchor or wallet could instead use sponsored reserves to ensure that when a user closes a trustline or merges their account, the reserve reverts to the sponsoring account rather than to the user's account.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/apps/application-design-considerations.mdx)

Last updated on **Jun 18, 2025** by **Bri Wylde**

- [Custody models](#custody-models)
  - [Non-custodial service](#non-custodial-service)
  - [Custodial service](#custodial-service)
  - [A mixture of non-custodial and custodial](#a-mixture-of-non-custodial-and-custodial)
  - [Third-party key management services​](#third-party-key-management-services)
- [Application security](#application-security)
- [Wallet services](#wallet-services)
- [Account creation strategies](#account-creation-strategies)
  - [Option 1: The anchor creates and funds the Stellar account​](#option-1-the-anchor-creates-and-funds-the-stellar-account)
  - [Option 2: the wallet creates and funds the Stellar account upon user sign-up​](#option-2-the-wallet-creates-and-funds-the-stellar-account-upon-user-sign-up)

---

_Extraído de [https://developers.stellar.org/docs/build/apps/application-design-considerations](https://developers.stellar.org/docs/build/apps/application-design-considerations)_

---

## Sección 2 - Docs Build Apps Dapp Frontend

### Build a dapp Frontend: Connect Wallets, Handle Transactions & More | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/apps/dapp-frontend
**Fecha de extracción:** 2025-07-12T01:17:07.425Z

---

---

source: https://developers.stellar.org/docs/build/apps/dapp-frontend
generated: 2025-07-12T01:17:07.425Z

---

On this page

### Build a Dapp Frontend

This is a continuation of the [Getting Started tutorial](/docs/build/smart-contracts/getting-started), where you should have deployed two smart contracts to the public network. In this section, we'll create a web app that interacts with the contracts via RPC calls.

Let's get started.

#### Initialize a frontend toolchain[​](#initialize-a-frontend-toolchain "Direct link to Initialize a frontend toolchain")

You can build a Soroban app with any frontend toolchain or integrate it into any existing full-stack app. For this tutorial, we're going to use [Astro](https://astro.build/). Astro works with React, Vue, Svelte, any other UI library, or no UI library at all. In this tutorial, we're not using a UI library. The Soroban-specific parts of this tutorial will be similar no matter what frontend toolchain you use.

If you're new to frontend, don't worry. We won't go too deep. But it will be useful for you to see and experience the frontend development process used by Soroban apps. We'll cover the relevant bits of JavaScript and Astro, but teaching all of frontend development and Astro is beyond the scope of this tutorial.

Let's get started.

You're going to need [Node.js](https://nodejs.org/en/download/package-manager/) v18.14.1 or greater. If you haven't yet, install it now.

We want to create an Astro project with the contracts from the previous lesson. To do this, we can clone a template. You can find Soroban templates on GitHub by [searching for repositories that start with "soroban-template-"](https://github.com/search?q=%22soroban-template-%22&type=repositories). For this tutorial, we'll use [stellar/soroban-template-astro](https://github.com/stellar/soroban-template-astro). We'll also use a tool called [degit](https://github.com/Rich-Harris/degit) to clone the template without its git history. This will allow us to set it up as our own git project.

Since you have `node` and its package manager `npm` installed, you also have `npx`.

We're going to create a new project directory with this template to make things easier in this tutorial, so make sure you're no longer in your `soroban-hello-world` directory and then run:

```
npx degit stellar/soroban-template-astro first-soroban-appcd first-soroban-appgit initgit add .git commit -m "first commit: initialize from stellar/soroban-template-astro"
```

This project has the following directory structure, which we'll go over in more detail below.

```
├── contracts│   ├── hello_world│   └── increment├── CONTRIBUTING.md├── Cargo.toml├── Cargo.lock├── initialize.js├── package-lock.json├── package.json├── packages├── public├── src│   ├── components│   │   └── Card.astro│   ├── env.d.ts│   ├── layouts│   │   └── Layout.astro│   └── pages│       └── index.astro└── tsconfig.json
```

The `contracts` are the same ones you walked through in the previous steps of the tutorial. Since we already deployed these contracts with aliases, we can reuse the generated contract ID files by copying them from the `soroban-hello-world/.stellar` directory into this project:

```
cp -R ../soroban-hello-world/.stellar/ .stellar
```

#### Generate an NPM package for the Hello World contract[​](#generate-an-npm-package-for-the-hello-world-contract "Direct link to Generate an NPM package for the Hello World contract")

Before we open the new frontend files, let's generate an NPM package for the Hello World contract. This is our suggested way to interact with contracts from frontends. These generated libraries work with any JavaScript project (not a specific UI like React), and make it easy to work with some of the trickiest bits of Soroban, like encoding [XDR](/docs/learn/fundamentals/contract-development/types/fully-typed-contracts).

This is going to use the CLI command `stellar contract bindings typescript`:

```
stellar contract bindings typescript \  --network testnet \  --contract-id hello_world \  --output-dir packages/hello_world
```

> **TIP**
>
> tip
>
> Notice that we were able to use the contract alias, `hello_world`, in place of the contract id!

This project is set up as an NPM Workspace, and so the `hello_world` client library was generated in the `packages` directory at `packages/hello_world`.

We attempt to keep the code in these generated libraries readable, so go ahead and look around. Open up the new `packages/hello_world` directory in your editor. If you've built or contributed to Node projects, it will all look familiar. You'll see a `package.json` file, a `src` directory, a `tsconfig.json`, and even a README.

#### Generate an NPM package for the Increment contract[​](#generate-an-npm-package-for-the-increment-contract "Direct link to Generate an NPM package for the Increment contract")

Though we can run `soroban contract bindings typescript` for each of our contracts individually, the [soroban-template-astro](https://github.com/stellar/soroban-astro-template) project that we used as our template includes a very handy `initialize.js` script that will handle this for all of the contracts in our `contracts` directory.

In addition to generating the NPM packages, `initialize.js` will also:

- Generate and fund our Stellar account
- Build all of the contracts in the `contracts` dir
- Deploy our contracts
- Create handy contract clients for each contract

We have already taken care of the first three bullet points in earlier steps of this tutorial, so those tasks will be noops when we run `initialize.js`.

##### Configure initialize.js[​](#configure-initializejs "Direct link to Configure initialize.js")

We need to make sure that `initialize.js` has all of the environment variables it needs before we do anything else. Copy the `.env.example` file over to `.env`. The environment variables set in `.env` are used by the `initialize.js` script.

```
cp .env.example .env
```

Let's take a look at the contents of the `.env` file:

```
### Prefix with "PUBLIC_" to make available in Astro frontend filesPUBLIC_STELLAR_NETWORK_PASSPHRASE="Standalone Network ; February 2017"PUBLIC_STELLAR_RPC_URL="http://localhost:8000/soroban/rpc"STELLAR_ACCOUNT="me"STELLAR_NETWORK="standalone"
```

This `.env` file defaults to connecting to a locally running network, but we want to configure our project to communicate with Testnet, since that is where we deployed our contracts. To do that, let's update the `.env` file to look like this:

```
### Prefix with "PUBLIC_" to make available in Astro frontend files-PUBLIC_STELLAR_NETWORK_PASSPHRASE="Standalone Network ; February 2017"+PUBLIC_STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"-PUBLIC_STELLAR_RPC_URL="http://localhost:8000/soroban/rpc"+PUBLIC_STELLAR_RPC_URL="https://soroban-testnet.stellar.org:443"-STELLAR_ACCOUNT="me"+STELLAR_ACCOUNT="alice"-STELLAR_NETWORK="standalone"+STELLAR_NETWORK="testnet"
```

> **INFO**
>
> info
>
> This `.env` file is used in the `initialize.js` script. When using the CLI, we can still use the network configuration we set up in the [Setup](/docs/build/smart-contracts/getting-started/setup) step, or by passing the `--rpc-url` and `--network-passphrase` flags.

##### Run `initialize.js`[​](#run-initializejs "Direct link to run-initializejs")

First let's install the Javascript dependencies:

```
npm install
```

And then let's run `initialize.js`:

```
npm run init
```

As mentioned above, this script attempts to build and deploy our contracts, which we have already done. The script is smart enough to check if a step has already been taken care of, and is a no-op in that case, so it is safe to run more than once.

##### Call the contract from the frontend[​](#call-the-contract-from-the-frontend "Direct link to Call the contract from the frontend")

Now let's open up `src/pages/index.astro` and take a look at how the frontend code integrates with the NPM package we created for our contracts.

Here we can see that we're importing our generated `helloWorld` client from `../contracts/hello_world`. We're then invoking the `hello` method and adding the result to the page.

src/pages/index.astro

```
- --import Layout from "../layouts/Layout.astro";import Card from "../components/Card.astro";import helloWorld from "../contracts/hello_world";const { result } = await helloWorld.hello({ to: "you" });const greeting = result.join(" ");--- ...<h1>{greeting}</h1>
```

Let's see it in action! Start the dev server:

```
npm run dev
```

And open [localhost:4321](http://localhost:4321) in your browser. You should see the greeting from the contract!

You can try updating the `{ to: 'Soroban' }` argument. When you save the file, the page will automatically update.

> **INFO**
>
> info
>
> When you start up the dev server with `npm run dev`, you will see similar output in your terminal as when you ran `npm run init`. This is because the `dev` script in package.json is set up to run `npm run init` and `astro dev`, so that you can ensure that your deployed contract and your generated NPM pacakage are always in sync. If you want to just start the dev server without the initialize.js script, you can run `npm run astro dev`.

##### What's happening here?[​](#whats-happening-here "Direct link to What's happening here?")

If you inspect the page (right-click, inspect) and refresh, you'll see a couple interesting things:

- The "Network" tab shows that there are no Fetch/XHR requests made. But RPC calls happen via Fetch/XHR! So how is the frontend calling the contract?
- There's no JavaScript on the page. But we just wrote some JavaScript! How is it working?

This is part of Astro's philosophy: the frontend should ship with as few assets as possible. Preferably zero JavaScript. When you put JavaScript in the [frontmatter](https://docs.astro.build/en/core-concepts/astro-components/), Astro will run it at build time, and then replace anything in the `{...}` curly brackets with the output.

When using the development server with `npm run dev`, it runs the frontmatter code on the server, and injects the resulting values into the page on the client.

You can try building to see this more dramatically:

```
npm run build
```

Then check the `dist` folder. You'll see that it built an HTML and CSS file, but no JavaScript. And if you look at the HTML file, you'll see a static "Hello Soroban" in the `<h1>`.

During the build, Astro made a single call to your contract, then injected the static result into the page. This is great for contract methods that don't change, but probably won't work for most contract methods. Let's integrate with the `incrementor` contract to see how to handle interactive methods in Astro. -->

#### Call the incrementor contract from the frontend[​](#call-the-incrementor-contract-from-the-frontend "Direct link to Call the incrementor contract from the frontend")

While `hello` is a simple view-only/read method, `increment` changes on-chain state. This means that someone needs to sign the transaction. So we'll need to add transaction-signing capabilities to the frontend.

The way signing works in a browser is with a _wallet_. Wallets can be web apps, browser extensions, standalone apps, or even separate hardware devices.

##### Install Freighter Extension[​](#install-freighter-extension "Direct link to Install Freighter Extension")

Right now, the wallet that best supports Soroban is [Freighter](/docs/build/guides/freighter). It is available as a Firefox Add-on, as well as extensions for Chrome and Brave. Go ahead and [install it now](https://freighter.app).

Once it's installed, open it up by clicking the extension icon. If this is your first time using Freighter, you will need to create a new wallet. Go through the prompts to create a password and save your recovery passphrase.

Go to Settings (the gear icon) → Preferences and toggle the switch to Enable Experimental Mode. Then go back to its home screen and select "Test Net" from the top-right dropdown. Finally, if it shows the message that your Stellar address is not funded, go ahead and click the "Fund with Friendbot" button.

Now you're all set up to use Freighter as a user, and you can add it to your app.

##### Add the StellarWalletsKit and set it up[​](#add-the-stellarwalletskit-and-set-it-up "Direct link to Add the StellarWalletsKit and set it up")

Even though we're using Freighter to test our app, there are more wallets that support signing smart contract transactions. To make their integration easier, we are using the `StellarWalletsKit` library which allows us support all Stellar Wallets with a single library.

To install this kit we are going to include the next package:

```
npm install @creit.tech/stellar-wallets-kit
```

With the package installed, we are going to create a new simple file where our instantiated kit and simple state will be located. Create the file `src/stellar-wallets-kit.ts` and paste this:

src/stellar-wallets-kit.ts

```javascript
import {  allowAllModules,  FREIGHTER_ID,  StellarWalletsKit,} from "@creit.tech/stellar-wallets-kit";const SELECTED_WALLET_ID = "selectedWalletId";function getSelectedWalletId() {  return localStorage.getItem(SELECTED_WALLET_ID);}const kit = new StellarWalletsKit({  modules: allowAllModules(),  network: import.meta.env.PUBLIC_STELLAR_NETWORK_PASSPHRASE,  // StellarWalletsKit forces you to specify a wallet, even if the user didn't  // select one yet, so we default to Freighter.  // We'll work around this later in `getPublicKey`.  selectedWalletId: getSelectedWalletId() ?? FREIGHTER_ID,});export const signTransaction = kit.signTransaction.bind(kit);export async function getPublicKey() {  if (!getSelectedWalletId()) return null;  const { address } = await kit.getAddress();  return address;}export async function setWallet(walletId: string) {  localStorage.setItem(SELECTED_WALLET_ID, walletId);  kit.setWallet(walletId);}export async function disconnect(callback?: () => Promise<void>) {  localStorage.removeItem(SELECTED_WALLET_ID);  kit.disconnect();  if (callback) await callback();}export async function connect(callback?: () => Promise<void>) {  await kit.openModal({    onWalletSelected: async (option) => {      try {        await setWallet(option.id);        if (callback) await callback();      } catch (e) {        console.error(e);      }      return option.id;    },  });}
```

In the code above, we instantiate the kit with desired settings and export it. We also wrap some kit functions and add custom functionality, such as augmenting the kit by allowing it to remember which wallet options was selected between page refreshes (that's the `localStorage` bit). The kit requires a `selectedWalletId` even before the user selects one, so we also work around this limitation, as the code comment explains. You can learn more about how the kit works in [the StellarWalletsKit documentation](https://stellarwalletskit.dev/)

Now we're going to add a "Connect" button to the page which will open the kit's built-in modal, and prompt the user to use their preferred wallet. Once the user picks their preferred wallet and grants permission to accept requests from the website, we will fetch the public key and the "Connect" button will be replaced with a message saying, "Signed in as \[their public key\]".

Now let's add a new component to the `src/components` directory called `ConnectWallet.astro` with the following content:

src/components/ConnectWallet.astro

```
<div id="connect-wrap" class="wrap" aria-live="polite">  &nbsp;  <div class="ellipsis"></div>  <button style="display:none" data-connect aria-controls="connect-wrap">    Connect  </button>  <button style="display:none" data-disconnect aria-controls="connect-wrap">    Disconnect  </button></div><style>  .wrap {    text-align: center;    display: flex;    width: 18em;    margin: auto;    justify-content: center;    line-height: 2.7rem;    gap: 0.5rem;  }  .ellipsis {    overflow: hidden;    text-overflow: ellipsis;    text-align: center;    white-space: nowrap;  }</style><script>  import { getPublicKey, connect, disconnect } from "../stellar-wallets-kit";  const ellipsis = document.querySelector(    "#connect-wrap .ellipsis",  ) as HTMLElement;  const connectButton = document.querySelector("[data-connect]") as HTMLButtonElement;  const disconnectButton = document.querySelector(    "[data-disconnect]",  ) as HTMLButtonElement;  async function showDisconnected() {    ellipsis.innerHTML = "";    ellipsis.removeAttribute("title");    connectButton.style.removeProperty("display");    disconnectButton.style.display = "none";  }  async function showConnected() {    const publicKey = await getPublicKey();    if (publicKey) {      ellipsis.innerHTML = `Signed in as ${publicKey}`;      ellipsis.title = publicKey ?? "";      connectButton.style.display = "none";      disconnectButton.style.removeProperty("display");    } else {      showDisconnected();    }  }  connectButton.addEventListener("click", async () => {    await connect(showConnected);  });  disconnectButton.addEventListener("click", async () => {    disconnect(showDisconnected);  });  if (await getPublicKey()) {    showConnected();  } else {    showDisconnected();  }</script>
```

Some of this may look surprising. `<style>` and `<script>` tags in the middle of the page? Uncreative class names like `wrap`? `import` statements in a `<script>`? Top-level `await`? What's going on here?

Astro automatically scopes the styles within a component to that component, so there's no reason for us to come up with a clever names for our classes.

And all the `script` declarations get bundled together and included intelligently in the page. Even if you use the same component multiple times, the script will only be included once. And yes, you can use top-level `await`.

You can read more about this in [Astro's page about client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/).

The code itself here is pretty self-explanatory. We import `kit` from the file we created before. Then, when the user clicks on the sign-in button, we call the `connect` function we created in our `stellar-wallets-kit.ts` file above. This will launch the built-in StellarWalletsKit modal, which allows the user to pick from the wallet options we configured (we configured all of them, with `allowAllModules`). We pass our own `setLoggedIn` function as the callback, which will be called in the `onWalletSelected` function in `stellar-wallets-kit.ts`. We end by updating the UI, based on whether the user is currently connected or not.

Now we can import the component in the frontmatter of `pages/index.astro`:

pages/index.astro

```
 - -- import Layout from '../layouts/Layout.astro'; import Card from '../components/Card.astro'; import helloWorld from "../contracts/hello_world";+import ConnectWallet from '../components/ConnectWallet.astro' ...
```

And add it right below the `<h1>`:

pages/index.astro

```
 <h1>{greeting}</h1>+<ConnectWallet />
```

If you're no longer running your dev server, go ahead and restart it:

```
npm run dev
```

Then open the page and click the "Connect" button. You should see Freighter pop up and ask you to sign in. Once you do, the button should be replaced with a message saying, "Signed in as \[your public key\]".

Now you're ready to sign the call to `increment`!

##### Call `increment`[​](#call-increment "Direct link to call-increment")

Now we can import the `increment` contract client from `contracts/increment.ts` and start using it. We'll again create a new Astro component. Create a new file at `src/components/Counter.astro` with the following contents:

src/components/Counter.astro

```
<strong>Incrementor</strong><br />Current value: <strong id="current-value" aria-live="polite">???</strong><br /><br /><button data-increment aria-controls="current-value">Increment</button><script>  import { getPublicKey, signTransaction } from "../stellar-wallets-kit";  import incrementor from "../contracts/increment";  const button = document.querySelector(    "[data-increment]",  ) as HTMLButtonElement;  const currentValue = document.querySelector("#current-value") as HTMLElement;  button.addEventListener("click", async () => {    const publicKey = await getPublicKey();    if (!publicKey) {      alert("Please connect your wallet first");      return;    } else {      incrementor.options.publicKey = publicKey;      incrementor.options.signTransaction = signTransaction;    }    button.disabled = true;    button.classList.add("loading");    currentValue.innerHTML =      currentValue.innerHTML +      '<span class="visually-hidden"> – updating…</span>';    try {      const tx = await incrementor.increment();      const { result } = await tx.signAndSend();      // Only use `innerHTML` with contract values you trust!      // Blindly using values from an untrusted contract opens your users to script injection attacks!      currentValue.innerHTML = result.toString();    } catch (e) {      console.error(e);    } finally {      button.disabled = false;      button.classList.remove("loading");    }  });</script>
```

This should be somewhat familiar by now. We have a `script` that, thanks to Astro's build system, can `import` modules directly. We use `document.querySelector` to find the elements defined above. And we add a `click` handler to the button, which calls `increment` and updates the value on the page. It also sets the button to `disabled` and adds a `loading` class while the call is in progress to prevent the user from clicking it again and visually communicate that something is happening. For people using screen readers, the loading state is communicated with the [visually-hidden](https://www.a11yproject.com/posts/how-to-hide-content/) span, which will be announced to them thanks to the `aria` tags we saw before.

The biggest difference from the call to `greeter.hello` is that this transaction gets executed in two steps. The initial call to `increment` constructs a Soroban transaction and then makes an RPC call to _simulate_ it. For read-only calls like `hello`, this is all you need, so you can get the `result` right away. For write calls like `increment`, you then need to `signAndSend` before the transaction actually gets included in the ledger. You also need to make sure you set a valid `publicKey` and a `signTransaction` method.

> **INFO**
>
> info
>
> Destructuring `{ result }`: If you're new to JavaScript, you may not know what's happening with those `const { result }` lines. This is using JavaScript's _destructuring_ feature. If the thing on the right of the equals sign is an object, then you can use this pattern to quickly grab specific keys from that object and assign them to variables. You can also name the variable something else, if you like. For example, try changing the code above to:
>
> ```
> const { result: newValue } = ...
> ```

Also, notice that you don't need to manually specify Freighter as the wallet in the call to `increment`. This may change in the future, but while Freighter is the only game in town, these generated libraries automatically use it. If you want to override this behavior, you can pass a `wallet` option; check the latest `Wallet` interface in [the template source](https://github.com/stellar/soroban-tools/blob/main/cmd/crates/soroban-spec-typescript/src/project_template/src/method-options.ts) for details.

Now let's use this component. In `pages/index.astro`, first import it:

pages/index.astro

```
 - -- import Layout from '../layouts/Layout.astro'; import Card from '../components/Card.astro'; import helloWorld from "../contracts/hello_world"; import ConnectFreighter from '../components/ConnectFreighter.astro';+import Counter from '../components/Counter.astro'; ...
```

Then use it. Let's replace the contents of the `instructions` paragraph with it:

pages/index.astro

```
 <p class="instructions">-  To get started, open the directory <code>src/pages</code> in your project.<br />-  <strong>Code Challenge:</strong> Tweak the "Welcome to Astro" message above.+  <Counter /> </p>
```

Check the page; if you're still running your dev server, it should have already updated. Click the "Increment" button; you should see a Freighter confirmation. Confirm, and... the value updates! 🎉

There's obviously some functionality missing, though. For example, that `???` is a bummer. But our `increment` contract doesn't give us a way to query the current value without also updating it.

Before you try to update it, let's streamline the process around building, deploying, and generating clients for contracts.

#### Take it further[​](#take-it-further "Direct link to Take it further")

If you want to take it a bit further and make sure you understand all the pieces here, try the following:

- Make a `src/contracts` folder with a `greeter.ts` and an `incrementor.ts`. Move the `new Contract({ ... })` logic into those files. You may also want to extract the `rpcUrl` variable to a `src/contracts/utils.ts` file.
- Add a `get_value` method to the `increment` contract, and use it to display the current value in the `Counter` component. When you run `npm run dev`, the `initialize` script will run and update the contract and the generated client.
- Add a "Decrement" button to the `Counter` component.
- [Deploy](https://docs.astro.build/en/guides/deploy/) your frontend. You can do this quickly and for free [with GitHub](https://docs.astro.build/en/guides/deploy/github/). If you get stuck installing stellar-cli and deploying contracts on GitHub, check out [how we did this](https://github.com/AhaLabs/soroban-tutorial-project/commit/c1f4cfde1bbaf059507100767ee6b43d29b42914).
- Rather than using NPM scripts for everything, try using a more elegant script runner such as [just](https://github.com/casey/just). The existing npm `scripts` can then call `just`, such as `"setup": "just setup"`.
- Update the README to explain what this project is and how to use it to potential collaborators and employers 😉

#### Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

Sometimes things go wrong. As a first step when troubleshooting, you may want to [clone our tutorial repository](https://github.com/AhaLabs/soroban-tutorial-project) and see if the problem happens there, too. If it happens there, too, then it may be a temporary problem with the Soroban network.

Here are some common issues and how to fix them.

##### Call to `hello` fails[​](#call-to-hello-fails "Direct link to call-to-hello-fails")

Sometimes the call to `hello` can start failing. You can obviously stub out the call and define `result` some other way to troubleshoot.

One of the common problems here is that the contract becomes [archived](/docs/learn/fundamentals/contract-development/storage/state-archival). To check if this is the problem, you can re-run `npm run init`.

If you're still having problems, join our Discord (link above) or [open an issue in GitHub](https://github.com/stellar/stellar-docs/issues/new/choose).

##### All contract calls start throwing `403` errors[​](#all-contract-calls-start-throwing-403-errors "Direct link to all-contract-calls-start-throwing-403-errors")

This means that Testnet is down, and you probably just need to wait a while and try again.

#### Wrapping up[​](#wrapping-up "Direct link to Wrapping up")

Some of the things we did in this section:

- We learned about Astro's no-JS-by-default approach
- We added Astro components and learned how their `script` and `style` tags work
- We saw how easy it is to interact with smart contracts from JavaScript by generating client libraries using `stellar contract bindings typescript`
- We learned about wallets and Freighter

At this point, you've seen a full end-to-end example of building a contract on Stellar! What's next? You choose! You can:

- See more complex example contracts in the [Example Contracts](/docs/build/smart-contracts/example-contracts) section.
- Learn more about the [internal architecture and design](/docs/learn/fundamentals/contract-development) of Soroban.
- Learn how to find other templates other than [stellar/soroban-template-astro](https://github.com/stellar/soroban-astro-template), and how to build your own: [Develop contract initialization frontend templates](/docs/build/guides/dapps/soroban-contract-init-template)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/apps/dapp-frontend.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Initialize a frontend toolchain](#initialize-a-frontend-toolchain)
- [Generate an NPM package for the Hello World contract](#generate-an-npm-package-for-the-hello-world-contract)
- [Generate an NPM package for the Increment contract](#generate-an-npm-package-for-the-increment-contract)
  - [Configure initialize.js](#configure-initializejs)
  - [Run `initialize.js`](#run-initializejs)
  - [Call the contract from the frontend](#call-the-contract-from-the-frontend)
  - [What's happening here?](#whats-happening-here)
- [Call the incrementor contract from the frontend](#call-the-incrementor-contract-from-the-frontend)
  - [Install Freighter Extension](#install-freighter-extension)
  - [Add the StellarWalletsKit and set it up](#add-the-stellarwalletskit-and-set-it-up)
  - [Call `increment`](#call-increment)
- [Take it further](#take-it-further)
- [Troubleshooting](#troubleshooting)
  - [Call to `hello` fails](#call-to-hello-fails)
  - [All contract calls start throwing `403` errors](#all-contract-calls-start-throwing-403-errors)
- [Wrapping up](#wrapping-up)

---

_Extraído de [https://developers.stellar.org/docs/build/apps/dapp-frontend](https://developers.stellar.org/docs/build/apps/dapp-frontend)_

---

## Sección 3 - Docs Build Apps Overview

### Build Wallet Applications on Stellar with the Wallet SDK in four languages | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/apps/overview
**Fecha de extracción:** 2025-07-12T01:17:08.809Z

---

---

source: https://developers.stellar.org/docs/build/apps/overview
generated: 2025-07-12T01:17:08.809Z

---

On this page

### Overview

Stellar is an open-source distributed ledger that you can use as a backend to power various applications and services, such as wallets, payment apps, currency exchanges, micropayment services, platforms for in-game purchases, and more — check out projects being built on Stellar: [Stellar Ecosystem Projects](https://stellar.org/ecosystem/projects#Projects).

Stellar has built-in logic for key storage, creating accounts, signing transactions, tracking balances, and queries to the Stellar database, and anyone can use the network to issue, store, transfer, and trade assets.

This documentation includes sections on how to build applications without smart contracts with the [Wallet SDK](/docs/build/apps/wallet/overview) or the [JS SDK](/docs/build/apps/example-application-tutorial/overview), building with smart contracts with the [dapp frontend tutorial](/docs/build/apps/dapp-frontend), and all information regarding experimentation with [smart wallets](/docs/build/apps/smart-wallets).

#### Anchors[​](#anchors "Direct link to Anchors")

Many Stellar assets connect to real-world currencies, and Stellar has open protocols for integrating deposits and withdrawals of these assets via the [anchor network](https://stellar.org/learn/anchor-basics). Because of this, a Stellar-based application can take advantage of real banking rails and connect to real money.

Read more about anchors in our [Anchors section](/docs/learn/fundamentals/anchors).

Set up an anchor using the [Anchor Platform](/platforms/anchor-platform).

Integrate MoneyGram Ramps into an existing application with the [Integrate with MoneyGram Ramps tutorial](https://developer.moneygram.com/moneygram-developer/docs/integrate-moneygram-ramps).

#### Stellar Ecosystem Proposals (SEPs)[​](#stellar-ecosystem-proposals-seps "Direct link to Stellar Ecosystem Proposals (SEPs)")

Stellar-based products and services interoperate by implementing various Stellar Ecosystem Proposals (SEPs), which are publicly created, open-source documents that live in a [GitHub repository](https://github.com/stellar/stellar-protocol/tree/master/ecosystem#stellar-ecosystem-proposals-seps) and define how asset issuers, anchors, wallets, and other service providers interact with each other.

As a wallet, the most important SEPs are [SEP-24: Hosted Deposit and Withdrawal](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md), and [SEP-31: Cross Border Payments API](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0031.md), [SEP-10: Stellar Authentication](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md), [SEP-12: KYC API](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md), and [SEP-38: Anchor RFQ API](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0038.md).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/apps/overview.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Anchors](#anchors)
- [Stellar Ecosystem Proposals (SEPs)](#stellar-ecosystem-proposals-seps)

---

_Extraído de [https://developers.stellar.org/docs/build/apps/overview](https://developers.stellar.org/docs/build/apps/overview)_

---

## Sección 4 - Docs Build Guides Cli

### Stellar CLI | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/cli
**Fecha de extracción:** 2025-07-12T01:17:16.447Z

---

---

source: https://developers.stellar.org/docs/build/guides/cli
generated: 2025-07-12T01:17:16.446Z

---

### Stellar CLI

The [Stellar CLI](/docs/tools/cli/stellar-cli) is a crucial tool for developers to use while creating and interacting with Stellar smart contracts.

##### Guides in this category:

[

#### 📄️ Contract Lifecycle

Manage the lifecycle of a Stellar smart contract using the CLI

](/docs/build/guides/cli/contract-lifecycle)

[

#### 📄️ Deploy a contract from installed Wasm bytecode

Deploy an instance of a compiled contract that is already installed on the network

](/docs/build/guides/cli/deploy-contract)

[

#### 📄️ Deploy the Stellar Asset Contract for a Stellar asset

Deploy an SAC for a Stellar asset so that it can interact with smart contracts

](/docs/build/guides/cli/deploy-stellar-asset-contract)

[

#### 📄️ Extend a deployed contract instance's TTL

Use the CLI to extend the time to live (TTL) of a contract instance

](/docs/build/guides/cli/extend-contract-instance)

[

#### 📄️ Extend a deployed contract's storage entry TTL

Use the CLI to extend the time to live (TTL) of a contract's persistent storage entry

](/docs/build/guides/cli/extend-contract-storage)

[

#### 📄️ Extend a deployed contract's Wasm code TTL

Use Stellar CLI to extend contract's Wasm bytecode TTL, with or without local binary

](/docs/build/guides/cli/extend-contract-wasm)

[

#### 📄️ Install and deploy a smart contract

Combine the install and deploy commands in the Stellar CLI to accomplish both tasks

](/docs/build/guides/cli/install-deploy)

[

#### 📄️ Upload Wasm bytecode

Use the Stellar CLI to upload a compiled smart contract on the ledger

](/docs/build/guides/cli/install-wasm)

[

#### 📄️ Payments and Assets

Send XLM, stellar classic, or a soroban asset using the Stellar CLI

](/docs/build/guides/cli/payments-and-assets)

[

#### 📄️ Restore an archived contract using the Stellar CLI

Restore an archived contract instance using the Stellar CLI

](/docs/build/guides/cli/restore-contract-instance)

[

#### 📄️ Restore archived contract data using the Stellar CLI

Restore archived contract storage entries using Stellar CLI

](/docs/build/guides/cli/restore-contract-storage)

[

#### 📄️ tx Commands

Create stellar transactions using the Stellar CLI

](/docs/build/guides/cli/tx-new)

[

#### 📄️ tx op add

Create stellar transactions using the Stellar CLI

](/docs/build/guides/cli/tx-op-add)

[

#### 📄️ tx sign and tx send

Create stellar transactions using the Stellar CLI

](/docs/build/guides/cli/tx-sign)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/cli/README.mdx)

Last updated on **Mar 25, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/cli](https://developers.stellar.org/docs/build/guides/cli)_

---

## Sección 5 - Docs Build Guides Conventions

### Contract Conventions | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/conventions
**Fecha de extracción:** 2025-07-12T01:17:17.836Z

---

---

source: https://developers.stellar.org/docs/build/guides/conventions
generated: 2025-07-12T01:17:17.836Z

---

### Contract Conventions

These guides describe the "typical" way something might be accomplished in a Rust contract. These guides aren't meant to be quite as _prescriptive_ as some others; instead, they serve to highlight some of the norms we've seen when crop up in contract development.

##### Guides in this category:

[

#### 📄️ Using \_\_check_auth in interesting ways

Two guides that walk through using \_\_check_auth

](/docs/build/guides/conventions/check-auth-tutorials)

[

#### 📄️ Making cross-contract calls

Call a smart contract from within another smart contract

](/docs/build/guides/conventions/cross-contract)

[

#### 📄️ Deploy a contract from installed Wasm bytecode using a deployer contract

Deploy a contract from installed Wasm bytecode using a deployer contract

](/docs/build/guides/conventions/deploy-contract)

[

#### 📄️ Deploy a SAC for a Stellar asset using code

Deploy a SAC for a Stellar asset using Javascript SDK

](/docs/build/guides/conventions/deploy-sac-with-code)

[

#### 📄️ Organize contract errors with an error enum type

Manage and communicate contract errors using an enum struct stored as Status values

](/docs/build/guides/conventions/error-enum)

[

#### 📄️ Extend a deployed contract's TTL with code

How to extend the TTL of a deployed contract's Wasm code

](/docs/build/guides/conventions/extending-wasm-ttl)

[

#### 📄️ Upgrading Wasm bytecode for a deployed contract

Upgrade Wasm bytecode for a deployed contract

](/docs/build/guides/conventions/upgrading-contracts)

[

#### 📄️ Write metadata for your contract

Use the contractmeta! macro in Rust SDK to write metadata in Wasm contracts

](/docs/build/guides/conventions/wasm-metadata)

[

#### 📄️ Workspaces

Organize contracts using Cargo workspaces

](/docs/build/guides/conventions/workspace)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/conventions/README.mdx)

Last updated on **Jul 2, 2024** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/conventions](https://developers.stellar.org/docs/build/guides/conventions)_

---

## Sección 6 - Docs Build Guides Dapps

### Dapp Development | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/dapps
**Fecha de extracción:** 2025-07-12T01:17:19.216Z

---

---

source: https://developers.stellar.org/docs/build/guides/dapps
generated: 2025-07-12T01:17:19.216Z

---

### Dapp Development

We've written some helpful guides on some of the most useful tools available to you, the dapp developer.

##### Guides in this category:

[

#### 📄️ Use Docker to build and run dapps

Understand Docker and use it to build applications

](/docs/build/guides/dapps/docker)

[

#### 📄️ Comprehensive frontend guide for Stellar dapps

Learn how to build functional frontend interfaces for Stellar dapps using React, Tailwind CSS, and the Stellar SDK.

](/docs/build/guides/dapps/frontend-guide)

[

#### 📄️ Initialize a dapp using scripts

Set up initialization correctly to ensure seamless setup for your dapp

](/docs/build/guides/dapps/initialization)

[

#### 📄️ Create a frontend for your dapp using React

Connect dapp frontends to contracts and Freighter wallet using @soroban-react

](/docs/build/guides/dapps/react)

[

#### 📄️ Develop contract with frontend templates

Understand, find, and create your own frontend templates for use with Stellar CLI's \`stellar contract init\` command

](/docs/build/guides/dapps/soroban-contract-init-template)

[

#### 📄️ Implement state archival in dapps

Learn how to implement state archival in your dapp

](/docs/build/guides/dapps/state-archival)

[

#### 📄️ Work with contract specs in Java, Python, and PHP

A guide to understanding and interacting with Soroban smart contracts in different programming languages

](/docs/build/guides/dapps/working-with-contract-specs)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/dapps/README.mdx)

Last updated on **Jan 6, 2025** by **Jane Wang**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/dapps](https://developers.stellar.org/docs/build/guides/dapps)_

---

## Sección 7 - Docs Build Guides Events

### Contract Events | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/events
**Fecha de extracción:** 2025-07-12T01:17:20.629Z

---

---

source: https://developers.stellar.org/docs/build/guides/events
generated: 2025-07-12T01:17:20.629Z

---

### Contract Events

Learn how to emit, ingest, and use events published from a Stellar smart contract.

##### Guides in this category:

[

#### 📄️ Consume previously ingested events

Consume ingested events without querying the RPC again

](/docs/build/guides/events/consume)

[

#### 📄️ Ingest events published from a contract

Use Stellar RPC's getEvents method for querying events, with a 7 day retention window

](/docs/build/guides/events/ingest)

[

#### 📄️ Publish events from a Rust contract

Publish events from a Rust contract

](/docs/build/guides/events/publish)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/events/README.mdx)

Last updated on **Jan 6, 2025** by **Jane Wang**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/events](https://developers.stellar.org/docs/build/guides/events)_

---

## Sección 8 - Docs Build Guides Freighter

### Freighter Wallet | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/freighter
**Fecha de extracción:** 2025-07-12T01:17:22.037Z

---

---

source: https://developers.stellar.org/docs/build/guides/freighter
generated: 2025-07-12T01:17:22.037Z

---

### Freighter Wallet

[Freighter](https://www.freighter.app/) is a browser extension wallet provided by the Stellar Development Foundation. It provides users a way to interact with Soroban tokens directly from the web browser.

##### Guides in this category:

[

#### 📄️ Connect to the Testnet

Create a Stellar account on Testnet with Freighter

](/docs/build/guides/freighter/connect-testnet)

[

#### 📄️ Enable Soroban tokens

Add smart contract tokens to your Freighter wallet

](/docs/build/guides/freighter/enable-soroban-tokens)

[

#### 📄️ Integrate Freighter with a React dapp

Integrate the Freighter wallet into your React dapps

](/docs/build/guides/freighter/integrate-freighter-react)

[

#### 📄️ Prompt Freighter to sign transactions as a JS dapp developer

Sign smart contract transactions using the Freighter browser extension

](/docs/build/guides/freighter/prompt-to-sign-tx)

[

#### 📄️ Send Soroban token payments

Send a smart contract token payment directly from Freighter

](/docs/build/guides/freighter/send-token-payments)

[

#### 📄️ Sign authorization entries

Use Freighter's API to sign an authorization entry

](/docs/build/guides/freighter/sign-auth-entries)

[

#### 📄️ Sign Soroban XDRs

Sign smart contract XDRs using dapps integrated with Freighter

](/docs/build/guides/freighter/sign-soroban-xdrs)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/freighter/README.mdx)

Last updated on **Jan 6, 2025** by **Jane Wang**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/freighter](https://developers.stellar.org/docs/build/guides/freighter)_

---

## Sección 9 - Docs Build Guides Rpc

### RPC | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/rpc
**Fecha de extracción:** 2025-07-12T01:17:23.426Z

---

---

source: https://developers.stellar.org/docs/build/guides/rpc
generated: 2025-07-12T01:17:23.426Z

---

### RPC

Using and interacting with the Stellar RPC is an important part of the smart contract development lifecycle. Read more about the RPC in our [RPC documentation](/docs/data/apis/rpc).

##### Guides in this category:

[

#### 📄️ Generate ledger key parameters with a symbol key using the Python SDK

Generate ledger key parameters with a symbol key using the Python SDK

](/docs/build/guides/rpc/generate-ledger-keys-python)

[

#### 📄️ Retrieve a contract code ledger entry using the JavaScript SDK

Retrieve a contract code ledger entry using the JavaScript SDK

](/docs/build/guides/rpc/retrieve-contract-code-js)

[

#### 📄️ Retrieve a contract code ledger entry using the Python SDK

Retrieve a contract code ledger entry using the Python SDK

](/docs/build/guides/rpc/retrieve-contract-code-python)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/rpc/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/rpc](https://developers.stellar.org/docs/build/guides/rpc)_

---

## Sección 10 - Docs Build Guides Storage

### Contract Storage | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/storage
**Fecha de extracción:** 2025-07-12T01:17:24.807Z

---

---

source: https://developers.stellar.org/docs/build/guides/storage
generated: 2025-07-12T01:17:24.807Z

---

### Contract Storage

Smart contract storage is available to affordably accommodate a wide range of uses. Learn more in the [state archival section](/docs/learn/fundamentals/contract-development/storage/state-archival).

##### Guides in this category:

[

#### 📄️ How to choose the right storage type for your use case

This guide walks you through choosing the most suitable storage type for your use case and how to implement it

](/docs/build/guides/storage/choosing-the-right-storage)

[

#### 📄️ Use instance storage in a contract

Instance storage has an archival TTL that is tied to the contract instance itself

](/docs/build/guides/storage/use-instance)

[

#### 📄️ Use persistent storage in a contract

Persistent storage can be useful for ledger entrys that are not common across every user of the contract instance

](/docs/build/guides/storage/use-persistent)

[

#### 📄️ Use temporary storage in a contract

Temporary storage is useful for a contract to store data that can quickly become irrelevant or out-dated

](/docs/build/guides/storage/use-temporary)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/storage/README.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/storage](https://developers.stellar.org/docs/build/guides/storage)_

---

## Sección 11 - Docs Build Guides Testing

### Contract Testing | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/guides/testing
**Fecha de extracción:** 2025-07-12T01:17:26.193Z

---

---

source: https://developers.stellar.org/docs/build/guides/testing
generated: 2025-07-12T01:17:26.193Z

---

### Contract Testing

Testing is vital to ensure that smart contracts are safe, resilient, and accurate.

##### Guides in this category:

[

#### 📄️ Unit Tests

Unit tests are small tests that test smart contracts.

](/docs/build/guides/testing/unit-tests)

[

#### 📄️ Mocking

Mocking dependency contracts in tests.

](/docs/build/guides/testing/mocking)

[

#### 📄️ Test Authorization

Write tests that test contract authorization.

](/docs/build/guides/testing/test-contract-auth)

[

#### 📄️ Test Events

Write tests that test contract events.

](/docs/build/guides/testing/test-contract-events)

[

#### 📄️ Integration Tests

Integration testing uses dependency contracts instead of mocks.

](/docs/build/guides/testing/integration-tests)

[

#### 📄️ Fork Testing

Integration testing using mainnet data.

](/docs/build/guides/testing/fork-testing)

[

#### 📄️ Fuzzing

Fuzzing and property testing to find unexpected behavior.

](/docs/build/guides/testing/fuzzing)

[

#### 📄️ Differential Tests

Differential testing detects unintended changes.

](/docs/build/guides/testing/differential-tests)

[

#### 📄️ Differential Tests with Test Snapshots

Differential testing using automatic test snapshots.

](/docs/build/guides/testing/differential-tests-with-test-snapshots)

[

#### 📄️ Mutation Testing

Mutation testing finds code not tested.

](/docs/build/guides/testing/mutation-testing)

[

#### 📄️ Code Coverage

Code coverage tools find code not tested.

](/docs/build/guides/testing/code-coverage)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/guides/testing/README.mdx)

Last updated on **Jan 6, 2025** by **Jane Wang**

---

_Extraído de [https://developers.stellar.org/docs/build/guides/testing](https://developers.stellar.org/docs/build/guides/testing)_

---

## Sección 12 - Docs Build Smart Contracts Example Contracts Atomic Swap

### Swap tokens atomically between authorized users.

**URL:** https://developers.stellar.org/docs/build/smart-contracts/example-contracts/atomic-swap
**Fecha de extracción:** 2025-07-12T01:17:29.120Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/atomic-swap
generated: 2025-07-12T01:17:29.120Z

---

On this page

### Atomic Swap

The [atomic swap example](https://github.com/stellar/soroban-examples/tree/v22.0.1/atomic_swap) swaps two tokens between two authorized parties atomically while following the limits they set.

This is example demonstrates advanced usage of Soroban auth framework and assumes the reader is familiar with the [auth example](/docs/build/smart-contracts/example-contracts/auth) and with Soroban token usage.

[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web)

[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples)

#### Run the Example[​](#run-the-example "Direct link to Run the Example")

First go through the [Setup](/docs/build/smart-contracts/getting-started/setup) process to get your development environment configured, then clone the `v22.0.1` tag of `soroban-examples` repository:

```
git clone -b v22.0.1 https://github.com/stellar/soroban-examples
```

Or, skip the development environment setup and open this example in [GitHub Codespaces](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web) or [Code Anywhere](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples).

To run the tests for the example use `cargo test`.

```
cargo test -p soroban-atomic-swap-contract
```

You should see the output:

```
running 1 testtest test::test_atomic_swap ... ok
```

#### Code[​](#code "Direct link to Code")

atomic_swap/src/lib.rs

```
### [contract]pub struct AtomicSwapContract;#[contractimpl]impl AtomicSwapContract {    // Swap token A for token B atomically. Settle for the minimum requested price    // for each party (this is an arbitrary choice to demonstrate the usage of    // allowance; full amounts could be swapped as well).    pub fn swap(        env: Env,        a: Address,        b: Address,        token_a: Address,        token_b: Address,        amount_a: i128,        min_b_for_a: i128,        amount_b: i128,        min_a_for_b: i128,    ) {        // Verify preconditions on the minimum price for both parties.        if amount_b < min_b_for_a {            panic!("not enough token B for token A");        }        if amount_a < min_a_for_b {            panic!("not enough token A for token B");        }        // Require authorization for a subset of arguments specific to a party.        // Notice, that arguments are symmetric - there is no difference between        // `a` and `b` in the call and hence their signatures can be used        // either for `a` or for `b` role.        a.require_auth_for_args(            (token_a.clone(), token_b.clone(), amount_a, min_b_for_a).into_val(&env),        );        b.require_auth_for_args(            (token_b.clone(), token_a.clone(), amount_b, min_a_for_b).into_val(&env),        );        // Perform the swap by moving tokens from a to b and from b to a.        move_token(&env, &token_a, &a, &b, amount_a, min_a_for_b);        move_token(&env, &token_b, &b, &a, amount_b, min_b_for_a);    }}fn move_token(    env: &Env,    token: &Address,    from: &Address,    to: &Address,    max_spend_amount: i128,    transfer_amount: i128,) {    let token = token::Client::new(env, token);    let contract_address = env.current_contract_address();    // This call needs to be authorized by `from` address. It transfers the    // maximum spend amount to the swap contract's address in order to decouple    // the signature from `to` address (so that parties don't need to know each    // other).    token.transfer(from, &contract_address, &max_spend_amount);    // Transfer the necessary amount to `to`.    token.transfer(&contract_address, to, &transfer_amount);    // Refund the remaining balance to `from`.    token.transfer(        &contract_address,        from,        &(&max_spend_amount - &transfer_amount),    );}
```

Ref: [https://github.com/stellar/soroban-examples/tree/v22.0.1/atomic_swap](https://github.com/stellar/soroban-examples/tree/v22.0.1/atomic_swap)

#### How it Works[​](#how-it-works "Direct link to How it Works")

The example contract requires two `Address`\-es to authorize their parts of the swap operation: one `Address` wants to sell a given amount of token A for token B at a given price and another `Address` wants to sell token B for token A at a given price. The contract swaps the tokens atomically, but only if the requested minimum price is respected for both parties.

Open the `atomic_swap/src/lib.rs` file or see the code above to follow along.

##### Swap authorization[​](#swap-authorization "Direct link to Swap authorization")

```
...a.require_auth_for_args(    (token_a.clone(), token_b.clone(), amount_a, min_b_for_a).into_val(&env),);b.require_auth_for_args(    (token_b.clone(), token_a.clone(), amount_b, min_a_for_b).into_val(&env),);...
```

Authorization of `swap` function leverages `require_auth_for_args` Soroban host function. Both `a` and `b` need to authorize symmetric arguments: token they sell, token they buy, amount of token they sell, minimum amount of token they want to receive. This means that `a` and `b` can be freely exchanged in the invocation arguments (as long as the respective arguments are changed too).

##### Moving the tokens[​](#moving-the-tokens "Direct link to Moving the tokens")

```
...// Perform the swap via two token transfers.move_token(&env, token_a, &a, &b, amount_a, min_a_for_b);move_token(&env, token_b, &b, &a, amount_b, min_b_for_a);...fn move_token(    env: &Env,    token: &Address,    from: &Address,    to: &Address,    max_spend_amount: i128,    transfer_amount: i128,) {    let token = token::Client::new(env, token);    let contract_address = env.current_contract_address();    // This call needs to be authorized by `from` address. It transfers the    // maximum spend amount to the swap contract's address in order to decouple    // the signature from `to` address (so that parties don't need to know each    // other).    token.transfer(from, &contract_address, &max_spend_amount);    // Transfer the necessary amount to `to`.    token.transfer(&contract_address, to, &transfer_amount);    // Refund the remaining balance to `from`.    token.transfer(        &contract_address,        from,        &(&max_spend_amount - &transfer_amount),    );}
```

The swap itself is implemented via two token moves: from `a` to `b` and from `b` to `a`. The token move is implemented via allowance: the users don't need to know each other in order to perform the swap, and instead they authorize the swap contract to spend the necessary amount of token on their behalf via `transfer`. Soroban auth framework makes sure that the `transfer` signatures would have the proper context, and they won't be usable outside the `swap` contract invocation.

##### Tests[​](#tests "Direct link to Tests")

Open the [`atomic_swap/src/test.rs`](https://github.com/stellar/soroban-examples/tree/v22.0.1/atomic_swap/src/test.rs) file to follow along.

Refer to another examples for the general information on the test setup.

The interesting part for this example is verification of `swap` authorization:

```
contract.swap(    &a,    &b,    &token_a.address,    &token_b.address,    &1000,    &4500,    &5000,    &950,);assert_eq!(    env.auths(),    std::vec![        (            a.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    contract.address.clone(),                    symbol_short!("swap"),                    (                        token_a.address.clone(),                        token_b.address.clone(),                        1000_i128,                        4500_i128                    )                        .into_val(&env),                )),                sub_invocations: std::vec![AuthorizedInvocation {                    function: AuthorizedFunction::Contract((                        token_a.address.clone(),                        symbol_short!("transfer"),                        (a.clone(), contract.address.clone(), 1000_i128,).into_val(&env),                    )),                    sub_invocations: std::vec![]                }]            }        ),        (            b.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    contract.address.clone(),                    symbol_short!("swap"),                    (                        token_b.address.clone(),                        token_a.address.clone(),                        5000_i128,                        950_i128                    )                        .into_val(&env),                )),                sub_invocations: std::vec![AuthorizedInvocation {                    function: AuthorizedFunction::Contract((                        token_b.address.clone(),                        symbol_short!("transfer"),                        (b.clone(), contract.address.clone(), 5000_i128,).into_val(&env),                    )),                    sub_invocations: std::vec![]                }]            }        ),    ]);
```

`env.auths()` returns all the authorizations. In the case of `swap` four authorizations are expected. Two for each address authorizing, because each address authorizes not only the swap, but the `approve` all on the token being sent.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/example-contracts/atomic-swap.mdx)

Last updated on **May 28, 2025** by **Chris Anatalio**

- [Run the Example](#run-the-example)
- [Code](#code)
- [How it Works](#how-it-works)
  - [Swap authorization](#swap-authorization)
  - [Moving the tokens](#moving-the-tokens)
  - [Tests](#tests)

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/example-contracts/atomic-swap](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/atomic-swap)_

---

## Sección 13 - Docs Build Smart Contracts Example Contracts Auth

### Implement authentication and authorization.

**URL:** https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth
**Fecha de extracción:** 2025-07-12T01:17:30.637Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth
generated: 2025-07-12T01:17:30.637Z

---

On this page

### Auth

The [auth example](https://github.com/stellar/soroban-examples/tree/v22.0.1/auth) demonstrates how to implement authentication and authorization using the Soroban Host-managed auth framework.

This example is an extension of the [storing data example](/docs/build/smart-contracts/getting-started/storing-data).

[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web)

[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples)

#### Run the Example[​](#run-the-example "Direct link to Run the Example")

First go through the [Setup](/docs/build/smart-contracts/getting-started/setup) process to get your development environment configured, then clone the `v22.0.1` tag of `soroban-examples` repository:

```
git clone -b v22.0.1 https://github.com/stellar/soroban-examples
```

Or, skip the development environment setup and open this example in [GitHub Codespaces](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web) or [Code Anywhere](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples).

To run the tests for the example, navigate to the `auth` directory, and use `cargo test`.

```
cd authcargo test
```

You should see the output:

```
running 1 testtest test::test ... ok
```

#### Code[​](#code "Direct link to Code")

auth/src/lib.rs

```
### [contracttype]pub enum DataKey {    Counter(Address),}#[contract]pub struct IncrementContract;#[contractimpl]impl IncrementContract {    /// Increment increments a counter for the user, and returns the value.    pub fn increment(env: Env, user: Address, value: u32) -> u32 {        // Requires `user` to have authorized call of the `increment` of this        // contract with all the arguments passed to `increment`, i.e. `user`        // and `value`. This will panic if auth fails for any reason.        // When this is called, Soroban host performs the necessary        // authentication, manages replay prevention and enforces the user's        // authorization policies.        // The contracts normally shouldn't worry about these details and just        // write code in generic fashion using `Address` and `require_auth` (or        // `require_auth_for_args`).        user.require_auth();        // This call is equilvalent to the above:        // user.require_auth_for_args((&user, value).into_val(&env));        // The following has less arguments but is equivalent in authorization        // scope to the above calls (the user address doesn't have to be        // included in args as it's guaranteed to be authenticated).        // user.require_auth_for_args((value,).into_val(&env));        // Construct a key for the data being stored. Use an enum to set the        // contract up well for adding other types of data to be stored.        let key = DataKey::Counter(user.clone());        // Get the current count for the invoker.        let mut count: u32 = env.storage().persistent().get(&key).unwrap_or_default();        // Increment the count.        count += value;        // Save the count.        env.storage().persistent().set(&key, &count);        // Return the count to the caller.        count    }}
```

Ref: [https://github.com/stellar/soroban-examples/tree/v22.0.1/auth](https://github.com/stellar/soroban-examples/tree/v22.0.1/auth)

#### How it Works[​](#how-it-works "Direct link to How it Works")

The example contract stores a per-`Address` counter that can only be incremented by the owner of that `Address`.

Open the `auth/src/lib.rs` file or see the code above to follow along.

##### `Address`[​](#address "Direct link to address")

```
### [contracttype]pub enum DataKey {    Counter(Address),}
```

`Address` is a universal Soroban identifier that may represent a Stellar account, a contract or an 'account contract' (a contract that defines a custom authentication scheme and authorization policies). Contracts don't need to distinguish between these internal representations though. `Address` can be used any time some network identity needs to be represented, like to distinguish between counters for different users in this example.

> **TIP**
>
> Enum keys like `DataKey` are useful for organizing contract storage.
>
> Different enum values create different key 'namespaces'.
>
> In the example the counter for each address is stored against `DataKey::Counter(Address)`. If the contract needs to start storing other types of data, it can do so by adding additional variants to the enum.

##### `require_auth`[​](#require_auth "Direct link to require_auth")

```
impl IncrementContract {    pub fn increment(env: Env, user: Address, value: u32) -> u32 {        user.require_auth();
```

`require_auth` method can be called for any `Address`. Semantically `user.require_auth()` here means 'require `user` to have authorized calling `increment` function of the current `IncrementContract` instance with the current call arguments, i.e. the current `user` and `value` argument values'. In simpler terms, this ensures that the `user` has allowed incrementing their counter value and nobody else can increment it.

When using `require_auth` the contract implementation doesn't need to worry about the signatures, authentication, and replay prevention. All these features are implemented by the Soroban host and happen automatically as long as the `Address` type is used.

`Address` has another method called `require_auth_for_args`. It works in the same fashion as `require_auth`, but allows customizing the arguments that need to be authorized. Note though, this should be used with care to ensure that there is a deterministic mapping between the contract invocation arguments and the `require_auth_for_args` arguments.

The following two calls are functionally equivalent to `user.require_auth`:

```
// Completely equivalentuser.require_auth_for_args((&user, value).into_val(&env));// The following has less arguments but is equivalent in authorization// scope to the above call (the user address doesn't have to be// included in args as it's guaranteed to be authenticated).user.require_auth_for_args((value,).into_val(&env));
```

##### Tests[​](#tests "Direct link to Tests")

Open the [`auth/src/test.rs`](https://github.com/stellar/soroban-examples/tree/v22.0.1/auth/src/test.rs) file to follow along.

auth/src/test.rs

```
fn test() {    let env = Env::default();    env.mock_all_auths();    let contract_id = env.register(IncrementContract, {});    let client = IncrementContractClient::new(&env, &contract_id);    let user_1 = Address::random(&env);    let user_2 = Address::random(&env);    assert_eq!(client.increment(&user_1, &5), 5);    // Verify that the user indeed had to authorize a call of `increment` with    // the expected arguments:    assert_eq!(        env.auths(),        [(            // Address for which auth is performed            user_1.clone(),            // Identifier of the called contract            contract_id.clone(),            // Name of the called function            symbol_short!("increment"),            // Arguments used to call `increment` (converted to the env-managed vector via `into_val`)            (user_1.clone(), 5_u32).into_val(&env)        )]    );    // Do more `increment` calls. It's not necessary to verify authorizations    // for every one of them as we don't expect the auth logic to change from    // call to call.    assert_eq!(client.increment(&user_1, &2), 7);    assert_eq!(client.increment(&user_2, &1), 1);    assert_eq!(client.increment(&user_1, &3), 10);    assert_eq!(client.increment(&user_2, &4), 5);}
```

In any test the first thing that is always required is an `Env`, which is the Soroban environment that the contract will run in.

```
let env = Env::default();
```

The test instructs the environment to mock all auths. All calls to `require_auth` or `require_auth_for_args` will succeed.

```
env.mock_all_auths();
```

The contract is registered with the environment using the contract type.

```
let contract_id = env.register(IncrementContract, {});
```

All public functions within an `impl` block that is annotated with the `#[contractimpl]` attribute have a corresponding function generated in a generated client type. The client type will be named the same as the contract type with `Client` appended. For example, in our contract the contract type is `IncrementContract`, and the client is named `IncrementContractClient`.

```
let client = IncrementContractClient::new(&env, &contract_id);
```

Generate `Address`es for two users. Normally the exact value of the `Address` shouldn't matter for testing, so they're simply generated randomly.

```
let user_1 = Address::random(&env);let user_2 = Address::random(&env);
```

Invoke `increment` function for `user_1`.

```
assert_eq!(client.increment(&user_1, &5), 5);
```

In order to verify that the `require_auth` call(s) have indeed happened, use `auths` function that returns a vector of tuples containing the authorizations from the most recent contract invocation.

```
assert_eq!(    env.auths(),    [(        // Address for which auth is performed        user_1.clone(),        // Identifier of the called contract        contract_id.clone(),        // Name of the called function        symbol_short!("increment"),        // Arguments used to call `increment` (converted to the env-managed vector via `into_val`)        (user_1.clone(), 5_u32).into_val(&env)    )]);
```

Invoke `increment` function several more times for both users. Notice, that the values are tracked separately for each users.

```
assert_eq!(client.increment(&user_1, &2), 7);assert_eq!(client.increment(&user_2, &1), 1);assert_eq!(client.increment(&user_1, &3), 10);assert_eq!(client.increment(&user_2, &4), 5);
```

#### Build the Contract[​](#build-the-contract "Direct link to Build the Contract")

To build the contract into a `.wasm` file, use the `stellar contract build` command.

```
stellar contract build
```

The `.wasm` file should be found in the `target` directory after building:

```
target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm
```

#### Run the Contract[​](#run-the-contract "Direct link to Run the Contract")

If you have [`stellar-cli`](/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli) installed, you can invoke functions on the contract.

But since we are dealing with authorization and signatures, we need to set up some identities to use for testing and get their public keys:

```
stellar keys generate acc1stellar keys generate acc2stellar keys address acc1stellar keys address acc2
```

Example output with two public keys of identities:

```
GA6S566FD3EQDUNQ4IGSLXKW3TGVSTQW3TPHPGS7NWMCEIPBOKTNCSRUGAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B
```

Now the contract itself can be invoked. Notice the `--source` must be the identity name matching the address passed to the `--user` argument. This allows `Stellar CLI` to automatically sign the necessary payload for the invocation.

- macOS/Linux
- Windows (PowerShell)

```
stellar contract invoke \    --source acc1 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GA6S566FD3EQDUNQ4IGSLXKW3TGVSTQW3TPHPGS7NWMCEIPBOKTNCSRU \    --value 2
```

```
stellar contract invoke `    --source acc1 `    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm `    --id 1 `    -- `    increment `    --user GA6S566FD3EQDUNQ4IGSLXKW3TGVSTQW3TPHPGS7NWMCEIPBOKTNCSRU `    --value 2
```

Run a few more increments for both accounts.

- macOS/Linux
- Windows (PowerShell)

```
stellar contract invoke \    --source acc2 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B \    --value 5
```

```
stellar contract invoke \    --source acc1 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GA6S566FD3EQDUNQ4IGSLXKW3TGVSTQW3TPHPGS7NWMCEIPBOKTNCSRU \    --value 3
```

```
stellar contract invoke \    --source acc2 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B \    --value 10
```

```
stellar contract invoke \    --source acc2 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B \    --value 5
```

```
stellar contract invoke \    --source acc1 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GA6S566FD3EQDUNQ4IGSLXKW3TGVSTQW3TPHPGS7NWMCEIPBOKTNCSRU \    --value 3
```

```
stellar contract invoke \    --source acc2 \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B \    --value 10
```

View the data that has been stored against each user with `stellar contract read`.

```
stellar contract read --id 1
```

```
"[""Counter"",""GA6S566FD3EQDUNQ4IGSLXKW3TGVSTQW3TPHPGS7NWMCEIPBOKTNCSRU""]",5"[""Counter"",""GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B""]",15
```

It is also possible to preview the authorization payload that is being signed by providing `--auth` flag to the invocation:

- macOS/Linux
- Windows (PowerShell)

```
stellar contract invoke \    --source acc2 \    --auth \    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm \    --id 1 \    -- \    increment \    --user GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B \    --value 123
```

```
stellar contract invoke `    --source acc2 `    --auth `    --wasm target/wasm32-unknown-unknown/release/soroban_auth_contract.wasm `    --id 1 `    -- `    increment `    --user GAJGHZ44IJXYFNOVRZGBCVKC2V62DB2KHZB7BEMYOWOLFQH4XP2TAM6B `    --value 123
```

```
Contract auth: [{"address_with_nonce":null,"root_invocation":{"contract_id":"0000000000000000000000000000000000000000000000000000000000000001","function_name":"increment","args":[{"object":{"address":{"account":{"public_key_type_ed25519":"c7bab0288753d58d3e21cc3fa68cd2546b5f78ae6635a6f1b3fe07e03ee846e9"}}}},{"u32":123}],"sub_invocations":[]},"signature_args":[]}]
```

#### Further reading[​](#further-reading "Direct link to Further reading")

[Authorization documentation](/docs/learn/fundamentals/contract-development/authorization) provides more details on how Soroban auth framework works.

[Timelock](/docs/build/smart-contracts/example-contracts/timelock) and [Single Offer](/docs/build/smart-contracts/example-contracts/single-offer-sale) examples demonstrate authorizing token operations on behalf of the user, which can be extended to any nested contract invocations.

[Atomic Swap](/docs/build/smart-contracts/example-contracts/atomic-swap) example demonstrates multi-party authorization where multiple users sign their parts of the contract invocation.

[Custom Account](/docs/build/smart-contracts/example-contracts/custom-account) example for demonstrates an account contract that defines a custom authentication scheme and user-defined authorization policies.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/example-contracts/auth.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Run the Example](#run-the-example)
- [Code](#code)
- [How it Works](#how-it-works)
  - [`Address`](#address)
  - [`require_auth`](#require_auth)
  - [Tests](#tests)
- [Build the Contract](#build-the-contract)
- [Run the Contract](#run-the-contract)
- [Further reading](#further-reading)

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth)_

---

## Sección 14 - Docs Build Smart Contracts Example Contracts Liquidity Pool

### Write a constant-product liquidity pool contract.

**URL:** https://developers.stellar.org/docs/build/smart-contracts/example-contracts/liquidity-pool
**Fecha de extracción:** 2025-07-12T01:17:38.663Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/liquidity-pool
generated: 2025-07-12T01:17:38.663Z

---

On this page

### Liquidity Pool

The [liquidity pool example](https://github.com/stellar/soroban-examples/tree/v22.0.1/liquidity_pool) demonstrates how to write a constant product liquidity pool contract. A liquidity pool is an automated way to add liquidity for a set of tokens that will facilitate asset conversion between them. Users can deposit some amount of each token into the pool, receiving a proportional number of "token shares." The user will then receive a portion of the accrued conversion fees when they ultimately "trade in" their token shares to receive their original tokens back.

Soroban liquidity pools are exclusive to Soroban and cannot interact with built-in Stellar AMM liquidity pools.

> **WARNING**
>
> caution
>
> Implementing a liquidity pool contract should be done cautiously. User funds are involved, so great care should be taken to ensure safety and transparency. The example here should _not_ be considered a ready-to-go contract. Please use it as a reference only.
>
> The Stellar network already has liquidity pool functionality built right in to the core protocol. [Learn more here](/docs/learn/encyclopedia/sdex/liquidity-on-stellar-sdex-liquidity-pools).

[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web)

[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples)

#### Run the Example[​](#run-the-example "Direct link to Run the Example")

First go through the [Setup](/docs/build/smart-contracts/getting-started/setup) process to get your development environment configured, then clone the `v22.0.1` tag of `soroban-examples` repository:

```
git clone -b v22.0.1 https://github.com/stellar/soroban-examples
```

Or, skip the development environment setup and open this example in [GitHub Codespaces](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web) or [Code Anywhere](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples).

To run the tests for the example, navigate to the `liquidity_pool` directory, and use `cargo test`.

```
cd liquidity_poolcargo test
```

You should see the output:

```
running 3 teststest test::deposit_amount_zero_should_panic - should panic ... oktest test::swap_reserve_one_nonzero_other_zero - should panic ... oktest test::test ... ok
```

#### Code[​](#code "Direct link to Code")

> **INFO**
>
> info
>
> Since our liquidity pool will be issuing its own token to establish the nuber of shares in the pool the address has, we have created a `token.rs` module in this project to hold the logic controlling the token contract for those shares.

- lib.rs
- token.rs

```
### ![no_std]#![no_std]mod test;mod token;use num_integer::Roots;use soroban_sdk::{    contract, contractimpl, contractmeta, Address, BytesN, ConversionError, Env, TryFromVal, Val,};use token::create_share_token;#[derive(Clone, Copy)]#[repr(u32)]pub enum DataKey {    TokenA = 0,    TokenB = 1,    TokenShare = 2,    TotalShares = 3,    ReserveA = 4,    ReserveB = 5,}impl TryFromVal<Env, DataKey> for Val {    type Error = ConversionError;    fn try_from_val(_env: &Env, v: &DataKey) -> Result<Self, Self::Error> {        Ok((*v as u32).into())    }}fn get_token_a(e: &Env) -> Address {    e.storage().instance().get(&DataKey::TokenA).unwrap()}fn get_token_b(e: &Env) -> Address {    e.storage().instance().get(&DataKey::TokenB).unwrap()}fn get_token_share(e: &Env) -> Address {    e.storage().instance().get(&DataKey::TokenShare).unwrap()}fn get_total_shares(e: &Env) -> i128 {    e.storage().instance().get(&DataKey::TotalShares).unwrap()}fn get_reserve_a(e: &Env) -> i128 {    e.storage().instance().get(&DataKey::ReserveA).unwrap()}fn get_reserve_b(e: &Env) -> i128 {    e.storage().instance().get(&DataKey::ReserveB).unwrap()}fn get_balance(e: &Env, contract: Address) -> i128 {    token::Client::new(e, &contract).balance(&e.current_contract_address())}fn get_balance_a(e: &Env) -> i128 {    get_balance(e, get_token_a(e))}fn get_balance_b(e: &Env) -> i128 {    get_balance(e, get_token_b(e))}fn get_balance_shares(e: &Env) -> i128 {    get_balance(e, get_token_share(e))}fn put_token_a(e: &Env, contract: Address) {    e.storage().instance().set(&DataKey::TokenA, &contract);}fn put_token_b(e: &Env, contract: Address) {    e.storage().instance().set(&DataKey::TokenB, &contract);}fn put_token_share(e: &Env, contract: Address) {    e.storage().instance().set(&DataKey::TokenShare, &contract);}fn put_total_shares(e: &Env, amount: i128) {    e.storage().instance().set(&DataKey::TotalShares, &amount)}fn put_reserve_a(e: &Env, amount: i128) {    e.storage().instance().set(&DataKey::ReserveA, &amount)}fn put_reserve_b(e: &Env, amount: i128) {    e.storage().instance().set(&DataKey::ReserveB, &amount)}fn burn_shares(e: &Env, amount: i128) {    let total = get_total_shares(e);    let share_contract = get_token_share(e);    token::Client::new(e, &share_contract).burn(&e.current_contract_address(), &amount);    put_total_shares(e, total - amount);}fn mint_shares(e: &Env, to: Address, amount: i128) {    let total = get_total_shares(e);    let share_contract_id = get_token_share(e);    token::Client::new(e, &share_contract_id).mint(&to, &amount);    put_total_shares(e, total + amount);}fn transfer(e: &Env, token: Address, to: Address, amount: i128) {    token::Client::new(e, &token).transfer(&e.current_contract_address(), &to, &amount);}fn transfer_a(e: &Env, to: Address, amount: i128) {    transfer(e, get_token_a(e), to, amount);}fn transfer_b(e: &Env, to: Address, amount: i128) {    transfer(e, get_token_b(e), to, amount);}fn get_deposit_amounts(    desired_a: i128,    min_a: i128,    desired_b: i128,    min_b: i128,    reserve_a: i128,    reserve_b: i128,) -> (i128, i128) {    if reserve_a == 0 && reserve_b == 0 {        return (desired_a, desired_b);    }    let amount_b = desired_a * reserve_b / reserve_a;    if amount_b <= desired_b {        if amount_b < min_b {            panic!("amount_b less than min")        }        (desired_a, amount_b)    } else {        let amount_a = desired_b * reserve_a / reserve_b;        if amount_a > desired_a || amount_a < min_a {            panic!("amount_a invalid")        }        (amount_a, desired_b)    }}// Metadata that is added on to the WASM custom sectioncontractmeta!(    key = "Description",    val = "Constant product AMM with a .3% swap fee");#[contract]struct LiquidityPool;#[contractimpl]impl LiquidityPool {    pub fn __constructor(e: Env, token_wasm_hash: BytesN<32>, token_a: Address, token_b: Address) {        if token_a >= token_b {            panic!("token_a must be less than token_b");        }        let share_contract = create_share_token(&e, token_wasm_hash, &token_a, &token_b);        put_token_a(&e, token_a);        put_token_b(&e, token_b);        put_token_share(&e, share_contract);        put_total_shares(&e, 0);        put_reserve_a(&e, 0);        put_reserve_b(&e, 0);    }    // Returns the token contract address for the pool share token    pub fn share_id(e: Env) -> Address {        get_token_share(&e)    }    // Deposits token_a and token_b. Also mints pool shares for the "to" Identifier. The amount minted    // is determined based on the difference between the reserves stored by this contract, and    // the actual balance of token_a and token_b for this contract.    pub fn deposit(        e: Env,        to: Address,        desired_a: i128,        min_a: i128,        desired_b: i128,        min_b: i128,    ) {        // Depositor needs to authorize the deposit        to.require_auth();        let (reserve_a, reserve_b) = (get_reserve_a(&e), get_reserve_b(&e));        // Calculate deposit amounts        let (amount_a, amount_b) =            get_deposit_amounts(desired_a, min_a, desired_b, min_b, reserve_a, reserve_b);        if amount_a <= 0 || amount_b <= 0 {            // If one of the amounts can be zero, we can get into a situation            // where one of the reserves is 0, which leads to a divide by zero.            panic!("both amounts must be strictly positive");        }        let token_a_client = token::Client::new(&e, &get_token_a(&e));        let token_b_client = token::Client::new(&e, &get_token_b(&e));        token_a_client.transfer(&to, &e.current_contract_address(), &amount_a);        token_b_client.transfer(&to, &e.current_contract_address(), &amount_b);        // Now calculate how many new pool shares to mint        let (balance_a, balance_b) = (get_balance_a(&e), get_balance_b(&e));        let total_shares = get_total_shares(&e);        let zero = 0;        let new_total_shares = if reserve_a > zero && reserve_b > zero {            let shares_a = (balance_a * total_shares) / reserve_a;            let shares_b = (balance_b * total_shares) / reserve_b;            shares_a.min(shares_b)        } else {            (balance_a * balance_b).sqrt()        };        mint_shares(&e, to, new_total_shares - total_shares);        put_reserve_a(&e, balance_a);        put_reserve_b(&e, balance_b);    }    // If "buy_a" is true, the swap will buy token_a and sell token_b. This is flipped if "buy_a" is false.    // "out" is the amount being bought, with in_max being a safety to make sure you receive at least that amount.    // swap will transfer the selling token "to" to this contract, and then the contract will transfer the buying token to "to".    pub fn swap(e: Env, to: Address, buy_a: bool, out: i128, in_max: i128) {        to.require_auth();        let (reserve_a, reserve_b) = (get_reserve_a(&e), get_reserve_b(&e));        let (reserve_sell, reserve_buy) = if buy_a {            (reserve_b, reserve_a)        } else {            (reserve_a, reserve_b)        };        if reserve_buy < out {            panic!("not enough token to buy");        }        // First calculate how much needs to be sold to buy amount out from the pool        let n = reserve_sell * out * 1000;        let d = (reserve_buy - out) * 997;        let sell_amount = (n / d) + 1;        if sell_amount > in_max {            panic!("in amount is over max")        }        // Transfer the amount being sold to the contract        let sell_token = if buy_a {            get_token_b(&e)        } else {            get_token_a(&e)        };        let sell_token_client = token::Client::new(&e, &sell_token);        sell_token_client.transfer(&to, &e.current_contract_address(), &sell_amount);        let (balance_a, balance_b) = (get_balance_a(&e), get_balance_b(&e));        // residue_numerator and residue_denominator are the amount that the invariant considers after        // deducting the fee, scaled up by 1000 to avoid fractions        let residue_numerator = 997;        let residue_denominator = 1000;        let zero = 0;        let new_invariant_factor = |balance: i128, reserve: i128, out: i128| {            let delta = balance - reserve - out;            let adj_delta = if delta > zero {                residue_numerator * delta            } else {                residue_denominator * delta            };            residue_denominator * reserve + adj_delta        };        let (out_a, out_b) = if buy_a { (out, 0) } else { (0, out) };        let new_inv_a = new_invariant_factor(balance_a, reserve_a, out_a);        let new_inv_b = new_invariant_factor(balance_b, reserve_b, out_b);        let old_inv_a = residue_denominator * reserve_a;        let old_inv_b = residue_denominator * reserve_b;        if new_inv_a * new_inv_b < old_inv_a * old_inv_b {            panic!("constant product invariant does not hold");        }        if buy_a {            transfer_a(&e, to, out_a);        } else {            transfer_b(&e, to, out_b);        }        let new_reserve_a = balance_a - out_a;        let new_reserve_b = balance_b - out_b;        if new_reserve_a <= 0 || new_reserve_b <= 0 {            panic!("new reserves must be strictly positive");        }        put_reserve_a(&e, new_reserve_a);        put_reserve_b(&e, new_reserve_b);    }    // transfers share_amount of pool share tokens to this contract, burns all pools share tokens in this contracts, and sends the    // corresponding amount of token_a and token_b to "to".    // Returns amount of both tokens withdrawn    pub fn withdraw(        e: Env,        to: Address,        share_amount: i128,        min_a: i128,        min_b: i128,    ) -> (i128, i128) {        to.require_auth();        // First transfer the pool shares that need to be redeemed        let share_token_client = token::Client::new(&e, &get_token_share(&e));        share_token_client.transfer(&to, &e.current_contract_address(), &share_amount);        let (balance_a, balance_b) = (get_balance_a(&e), get_balance_b(&e));        let balance_shares = get_balance_shares(&e);        let total_shares = get_total_shares(&e);        // Now calculate the withdraw amounts        let out_a = (balance_a * balance_shares) / total_shares;        let out_b = (balance_b * balance_shares) / total_shares;        if out_a < min_a || out_b < min_b {            panic!("min not satisfied");        }        burn_shares(&e, balance_shares);        transfer_a(&e, to.clone(), out_a);        transfer_b(&e, to, out_b);        put_reserve_a(&e, balance_a - out_a);        put_reserve_b(&e, balance_b - out_b);        (out_a, out_b)    }    pub fn get_rsrvs(e: Env) -> (i128, i128) {        (get_reserve_a(&e), get_reserve_b(&e))    }}
```

```
### ![allow(unused)]use soroban_sdk::{symbol_short, xdr::ToXdr, Address, Bytes, BytesN, Env, FromVal, String, Symbol};soroban_sdk::contractimport!(    file = "../token/target/wasm32-unknown-unknown/release/soroban_token_contract.wasm");pub fn create_share_token(    e: &Env,    token_wasm_hash: BytesN<32>,    token_a: &Address,    token_b: &Address,) -> Address {    let mut salt = Bytes::new(e);    salt.append(&token_a.to_xdr(e));    salt.append(&token_b.to_xdr(e));    let salt = e.crypto().sha256(&salt);    e.deployer().with_current_contract(salt).deploy_v2(        token_wasm_hash,        (            e.current_contract_address(),            7u32,            String::from_val(e, &"Pool Share Token"),            String::from_val(e, &"POOL"),        ),    )}
```

Ref: [https://github.com/stellar/soroban-examples/tree/v22.0.1/liquidity_pool](https://github.com/stellar/soroban-examples/tree/v22.0.1/liquidity_pool)

#### How it Works[​](#how-it-works "Direct link to How it Works")

Every asset created on Stellar starts with zero liquidity. The same is true of tokens created on Soroban (unless a Stellar asset with existing liquidity token is "wrapped" for use in Soroban). In simple terms, "liquidity" means how much of an asset in a market is available to be bough or sold. In the "old days," you could generate liquidity in a market by creating buy/sell orders on an order book.

Liquidity pools automate this process by substituting the orders with math. Depositors into the liquidity pool earn fees from `swap` transactions. No orders required!

Open the `liquidity_pool/src/lib.rs` file or see the code above to follow along.

##### Initialize the Contract[​](#initialize-the-contract "Direct link to Initialize the Contract")

When this contract is deployed, the constructor will automatically be called, so the following arguments must be passed int:

- **`token_wasm_hash`:** The contract will end up [creating its own `POOL` token](#creating-a-custom-pool-token-for-lp-shares) as well as [interacting with contracts for `token_a` and `token_b`](#token-transfers-tofrom-the-lp-contract). The way this example works is by using the [`token` example contract](/docs/build/smart-contracts/example-contracts/tokens) for both of these jobs. When our liquidity pool contract is initialized it wants us to pass the wasm hash of the **already installed** token contract. It will then deploy a contract that will run the WASM bytecode stored at that hash as a new token contract for the `POOL` tokens.
- **`token_a`:** The contract `Address` for an **already deployed** (or wrapped) token that will be held in reserve by the liquidity pool.
- **`token_b`:** The contract `Address` for an **already deployed** (or wrapped) token that will be held in reserve by the liquidity pool.

Bear in mind that which token is `token_a` and which is `token_b` is **not** an arbitrary distinction. In line with the Built-in Stellar liquidity pools, this contract can only make a single liquidity pool for a given set of tokens. So, the token addresses must be provided in [lexicographical order](/docs/learn/encyclopedia/sdex/liquidity-on-stellar-sdex-liquidity-pools#liquidity-pool-participation) at the time of initialization.

```
pub fn __constructor(e: Env, token_wasm_hash: BytesN<32>, token_a: Address, token_b: Address) {    if token_a >= token_b {        panic!("token_a must be less than token_b");    }    let share_contract = create_share_token(&e, token_wasm_hash, &token_a, &token_b);    put_token_a(&e, token_a);    put_token_b(&e, token_b);    put_token_share(&e, share_contract);    put_total_shares(&e, 0);    put_reserve_a(&e, 0);    put_reserve_b(&e, 0);}
```

##### A "Constant Product" Liquidity Pool[​](#a-constant-product-liquidity-pool 'Direct link to A "Constant Product" Liquidity Pool')

The _type_ of liquidity pool this example contract implements is called a "constant product" liquidity pool. While this isn't the only type of liquidity pool out there, it is the most common variety. These liquidity pools are designed to keep the _total_ value of each asset in _relative_ equilibrium. The "product" in the constant product (also called an "invariant") will change every time the liquidity pool is interacted with (deposit, withdraw, or token swaps). However, the invariant **must** only increase with every interaction.

During a swap, what must be kept in mind is that for every withdrawal from the `token_a` side, you must "refill" the `token_b` side with a sufficient amount to keep the liquidity pool's price balanced. The math is predictable, but it is not linear. The more you take from one side, the more you must give on the opposite site _exponentially_.

Inside the `swap` function, the math is done like this (this is a simplified version, however):

```
fn swap(e: Env, to: Address, buy_a: bool, out: i128, in_max: i128) {    // Get the current balances of both tokens in the liquidity pool    let (reserve_sell, reserve_buy) = (get_reserve_a(&e), get_reserve_b(&e));    // Calculate how much needs to be    let n = reserve_sell * out * 1000;    let d = (reserve_buy - out) * 997;    let sell_amount = (n / d) + 1;}
```

We have much more in-depth information about how this kind of liquidity pool works is available in [Stellar Quest: Series 3, Quest 5](https://quest.stellar.org/learn/series/3/quest/5). This is a really useful, interactive way to learn more about how the built-in Stellar liquidity pools work. Much of the knowledge you might gain from there will easily translate to this example contract.

##### Interacting with Token Contracts in Another Contract[​](#interacting-with-token-contracts-in-another-contract "Direct link to Interacting with Token Contracts in Another Contract")

This liquidity pool contract will operate with a total of three different Soroban tokens:

- **`POOL`:** This token is a unique token that is given to asset depositors in exchange for their deposit. These tokens are "traded in" by the user when they withdraw some amount of their original deposit (plus any earned swap fees). This example contract implements the same [`token` example contract](/docs/build/smart-contracts/example-contracts/tokens) for this token.
- **`token_a`** and **`token_b`**: Will be the two "reserve tokens" that users will deposit into the pool. These could be "wrapped" tokens from pre-existing Stellar assets, or they could be Soroban-native tokens. This contract doesn't really care, as long as the functions it needs from the common [Token Interface](/docs/tokens/token-interface) are available in the token contract.

###### Creating a Contract `POOL` Token for LP Shares[​](#creating-a-contract-pool-token-for-lp-shares "Direct link to creating-a-contract-pool-token-for-lp-shares")

We are utilizing the compiled `token` example contract as our asset contract for the `POOL` token. This means it follows all the conventions of the [Token Interface](/docs/tokens/token-interface), and can be treated just like any other token. They could be transferred, burned, minted, etc. It also means the LP developer _could_ take advantage of the administrative features such as clawbacks, authorization, and more.

The `token.rs` file contains a `create_share_token` function that we will use to deploy this particular token contract.

src/token.rs

```
pub fn create_share_token(    e: &Env,    token_wasm_hash: BytesN<32>,    token_a: &Address,    token_b: &Address,) -> Address {    let mut salt = Bytes::new(e);    salt.append(&token_a.to_xdr(e));    salt.append(&token_b.to_xdr(e));    let salt = e.crypto().sha256(&salt);    e.deployer().with_current_contract(salt).deploy_v2(        token_wasm_hash,        (            e.current_contract_address(),            7u32,            String::from_val(e, &"Pool Share Token"),            String::from_val(e, &"POOL"),        ),    )}
```

Then, during a `deposit`, a calculated amount of `POOL` tokens are `mint`ed to the depositing address.

```
fn mint_shares(e: &Env, to: Address, amount: i128) {    let total = get_total_shares(e);    let share_contract_id = get_token_share(e);    token::Client::new(e, &share_contract_id).mint(&to, &amount);    put_total_shares(e, total + amount);}
```

How is that number of shares calculated, you ask? Excellent question! If it's the very first deposit (see above), it's just the square root of the product of the quantities of `token_a` and `token_b` deposited. Very simple.

However, if there have already been deposits into the liquidity pool, and the user is just adding more tokens into the pool, there's a bit more math. However, the main point is that each depositor receives the same ratio of `POOL` tokens for their deposit as every other depositor.

```
fn deposit(e: Env, to: Address, desired_a: i128, min_a: i128, desired_b: i128, min_b: i128) {    let zero = 0;    let new_total_shares = if reserve_a > zero && reserve_b > zero {        // Note balance_a and balance_b at this point in the function include        // the tokens the user is currently depositing, whereas reserve_a and        // reserve_b do not yet.        let shares_a = (balance_a * total_shares) / reserve_a;        let shares_b = (balance_b * total_shares) / reserve_b;        shares_a.min(shares_b)    } else {        (balance_a * balance_b).sqrt()    };}
```

###### Token Transfers to/from the LP Contract[​](#token-transfers-tofrom-the-lp-contract "Direct link to Token Transfers to/from the LP Contract")

As we've already discussed, the liquidity pool contract will make use of the [Token Interface](/docs/tokens/token-interface) available in the token contracts that were supplied as `token_a` and `token_b` arguments at the time of initialization. Throughout the rest of the contract, the liquidity pool will make use of that interface to make transfers of those tokens to/from itself.

What's happening is that as a user deposits tokens into the pool, and the contract invokes the `transfer` function to move the tokens from the `to` address (the depositor) to be held by the contract address. `POOL` tokens are then minted to depositor (see previous section). Pretty simple, right!?

```
fn deposit(e: Env, to: Address, desired_a: i128, min_a: i128, desired_b: i128, min_b: i128) {    // Depositor needs to authorize the deposit    to.require_auth();    let token_a_client = token::Client::new(&e, &get_token_a(&e));    let token_b_client = token::Client::new(&e, &get_token_b(&e));    token_a_client.transfer(&to, &e.current_contract_address(), &amounts.0);    token_b_client.transfer(&to, &e.current_contract_address(), &amounts.1);    mint_shares(&e, to, new_total_shares - total_shares);}
```

In contrast, when a user withdraws their deposited tokens, It's about more involved, and the following procedure happens.

1.  Some amount of the `POOL` token is transferred from the depositor to the contract address. This is a temporary way to track how many `POOL` tokens are being redeemed. The contract will not hold this balance of `POOL` for long.
2.  The withdraw amounts for the reserve tokens are calculated based on the contract's current balance of `POOL` tokens.
3.  The `POOL` tokens are burned now that the withdraw amounts have been calculated, and they are no longer needed.
4.  The respective amounts of `token_a` and `token_b` are transferred _from_ the contract address into the `to` address (the depositor).

```
fn withdraw(e: Env, to: Address, share_amount: i128, min_a: i128, min_b: i128) -> (i128, i128) {    to.require_auth();    // First transfer the pool shares that need to be redeemed    let share_token_client = token::Client::new(&e, &get_token_share(&e));    share_token_client.transfer(&to, &e.current_contract_address(), &share_amount);    // Now calculate the withdraw amounts    let out_a = (balance_a * balance_shares) / total_shares;    let out_b = (balance_b * balance_shares) / total_shares;    burn_shares(&e, balance_shares);    transfer_a(&e, to.clone(), out_a);    transfer_b(&e, to, out_b);}
```

You'll notice that by holding the balance of `token_a` and `token_b` on the liquidity pool contract itself it makes, it very easy for us to perform any of the [Token Interface](/docs/tokens/token-interface) actions inside the contract. As a bonus, any outside observer could query the balances of `token_a` or `token_b` held by the contract to verify the reserves are actually in line with the values the contract reports when its own `get_rsvs` function is invoked.

#### Tests[​](#tests "Direct link to Tests")

Open the [`liquidity_pool/src/test.rs`](https://github.com/stellar/soroban-examples/blob/v22.0.1/liquidity_pool/src/test.rs) file to follow along.

```
### ![cfg(test)]extern crate std;use crate::{token, LiquidityPoolClient};use soroban_sdk::{    symbol_short,    testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation},    Address, BytesN, Env, IntoVal,};fn create_token_contract<'a>(e: &Env, admin: &Address) -> token::Client<'a> {    token::Client::new(        e,        &e.register_stellar_asset_contract_v2(admin.clone())            .address(),    )}fn create_liqpool_contract<'a>(    e: &Env,    token_wasm_hash: &BytesN<32>,    token_a: &Address,    token_b: &Address,) -> LiquidityPoolClient<'a> {    LiquidityPoolClient::new(        e,        &e.register(            crate::LiquidityPool {},            (token_wasm_hash.clone(), token_a, token_b),        ),    )}fn install_token_wasm(e: &Env) -> BytesN<32> {    soroban_sdk::contractimport!(        file = "../token/target/wasm32-unknown-unknown/release/soroban_token_contract.wasm"    );    e.deployer().upload_contract_wasm(WASM)}#[test]fn test() {    let e = Env::default();    e.mock_all_auths();    let mut admin1 = Address::generate(&e);    let mut admin2 = Address::generate(&e);    let mut token1 = create_token_contract(&e, &admin1);    let mut token2 = create_token_contract(&e, &admin2);    if &token2.address < &token1.address {        std::mem::swap(&mut token1, &mut token2);        std::mem::swap(&mut admin1, &mut admin2);    }    let user1 = Address::generate(&e);    let liqpool = create_liqpool_contract(        &e,        &install_token_wasm(&e),        &token1.address,        &token2.address,    );    let token_share = token::Client::new(&e, &liqpool.share_id());    token1.mint(&user1, &1000);    assert_eq!(token1.balance(&user1), 1000);    token2.mint(&user1, &1000);    assert_eq!(token2.balance(&user1), 1000);    liqpool.deposit(&user1, &100, &100, &100, &100);    assert_eq!(        e.auths(),        std::vec![(            user1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    liqpool.address.clone(),                    symbol_short!("deposit"),                    (&user1, 100_i128, 100_i128, 100_i128, 100_i128).into_val(&e)                )),                sub_invocations: std::vec![                    AuthorizedInvocation {                        function: AuthorizedFunction::Contract((                            token1.address.clone(),                            symbol_short!("transfer"),                            (&user1, &liqpool.address, 100_i128).into_val(&e)                        )),                        sub_invocations: std::vec![]                    },                    AuthorizedInvocation {                        function: AuthorizedFunction::Contract((                            token2.address.clone(),                            symbol_short!("transfer"),                            (&user1, &liqpool.address, 100_i128).into_val(&e)                        )),                        sub_invocations: std::vec![]                    }                ]            }        )]    );    assert_eq!(token_share.balance(&user1), 100);    assert_eq!(token_share.balance(&liqpool.address), 0);    assert_eq!(token1.balance(&user1), 900);    assert_eq!(token1.balance(&liqpool.address), 100);    assert_eq!(token2.balance(&user1), 900);    assert_eq!(token2.balance(&liqpool.address), 100);    liqpool.swap(&user1, &false, &49, &100);    assert_eq!(        e.auths(),        std::vec![(            user1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    liqpool.address.clone(),                    symbol_short!("swap"),                    (&user1, false, 49_i128, 100_i128).into_val(&e)                )),                sub_invocations: std::vec![AuthorizedInvocation {                    function: AuthorizedFunction::Contract((                        token1.address.clone(),                        symbol_short!("transfer"),                        (&user1, &liqpool.address, 97_i128).into_val(&e)                    )),                    sub_invocations: std::vec![]                }]            }        )]    );    assert_eq!(token1.balance(&user1), 803);    assert_eq!(token1.balance(&liqpool.address), 197);    assert_eq!(token2.balance(&user1), 949);    assert_eq!(token2.balance(&liqpool.address), 51);    e.budget().reset_unlimited();    liqpool.withdraw(&user1, &100, &197, &51);    assert_eq!(        e.auths(),        std::vec![(            user1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    liqpool.address.clone(),                    symbol_short!("withdraw"),                    (&user1, 100_i128, 197_i128, 51_i128).into_val(&e)                )),                sub_invocations: std::vec![AuthorizedInvocation {                    function: AuthorizedFunction::Contract((                        token_share.address.clone(),                        symbol_short!("transfer"),                        (&user1, &liqpool.address, 100_i128).into_val(&e)                    )),                    sub_invocations: std::vec![]                }]            }        )]    );    assert_eq!(token1.balance(&user1), 1000);    assert_eq!(token2.balance(&user1), 1000);    assert_eq!(token_share.balance(&user1), 0);    assert_eq!(token1.balance(&liqpool.address), 0);    assert_eq!(token2.balance(&liqpool.address), 0);    assert_eq!(token_share.balance(&liqpool.address), 0);}#[test]#[should_panic]fn deposit_amount_zero_should_panic() {    let e = Env::default();    e.mock_all_auths();    // Create contracts    let mut admin1 = Address::generate(&e);    let mut admin2 = Address::generate(&e);    let mut token_a = create_token_contract(&e, &admin1);    let mut token_b = create_token_contract(&e, &admin2);    if &token_b.address < &token_a.address {        std::mem::swap(&mut token_a, &mut token_b);        std::mem::swap(&mut admin1, &mut admin2);    }    let liqpool = create_liqpool_contract(        &e,        &install_token_wasm(&e),        &token_a.address,        &token_b.address,    );    // Create a user    let user1 = Address::generate(&e);    token_a.mint(&user1, &1000);    assert_eq!(token_a.balance(&user1), 1000);    token_b.mint(&user1, &1000);    assert_eq!(token_b.balance(&user1), 1000);    liqpool.deposit(&user1, &1, &0, &0, &0);}#[test]#[should_panic]fn swap_reserve_one_nonzero_other_zero() {    let e = Env::default();    e.mock_all_auths();    // Create contracts    let mut admin1 = Address::generate(&e);    let mut admin2 = Address::generate(&e);    let mut token_a = create_token_contract(&e, &admin1);    let mut token_b = create_token_contract(&e, &admin2);    if &token_b.address < &token_a.address {        std::mem::swap(&mut token_a, &mut token_b);        std::mem::swap(&mut admin1, &mut admin2);    }    let liqpool = create_liqpool_contract(        &e,        &install_token_wasm(&e),        &token_a.address,        &token_b.address,    );    // Create a user    let user1 = Address::generate(&e);    token_a.mint(&user1, &1000);    assert_eq!(token_a.balance(&user1), 1000);    token_b.mint(&user1, &1000);    assert_eq!(token_b.balance(&user1), 1000);    // Try to get to a situation where the reserves are 1 and 0.    // It shouldn't be possible.    token_b.transfer(&user1, &liqpool.address, &1);    liqpool.swap(&user1, &false, &1, &1);}
```

In any test the first thing that is always required is an `Env`, which is the Soroban environment that the contract will run in.

```
let e = Env::default();
```

We mock authentication checks in the tests, which allows the tests to proceed as if all users/addresses/contracts/etc. had successfully authenticated.

```
e.mock_all_auths();
```

We have abstracted into a few functions the tasks of creating token contracts, deploying a liquidity pool contract, and installing the token example WASM bytecode into our test environment. Each are then used within the test.

```
fn create_token_contract<'a>(e: &Env, admin: &Address) -> token::Client<'a> {    token::Client::new(        e,        &e.register_stellar_asset_contract_v2(admin.clone())            .address(),    )}fn create_liqpool_contract<'a>(    e: &Env,    token_wasm_hash: &BytesN<32>,    token_a: &Address,    token_b: &Address,) -> LiquidityPoolClient<'a> {    LiquidityPoolClient::new(        e,        &e.register(            crate::LiquidityPool {},            (token_wasm_hash.clone(), token_a, token_b),        ),    )}fn install_token_wasm(e: &Env) -> BytesN<32> {    soroban_sdk::contractimport!(        file = "../token/target/wasm32-unknown-unknown/release/soroban_token_contract.wasm"    );    e.deployer().upload_contract_wasm(WASM)}
```

All public functions within an `impl` block that is annotated with the `#[contractimpl]` attribute have a corresponding function generated in a generated client type. The client type will be named the same as the contract type with `Client` appended. For example, in our contract the contract type is `LiquidityPool`, and the client is named `LiquidityPoolClient`.

These tests examine the "typical" use-case of a liquidity pool, ensuring that the balances, returns, etc. are appropriate at various points during the test.

1.  First, the test sets everything up with an `Env`, two admin addresses, two reserve tokens, a randomly generated address to act as the user of the liquidity pool, the liquidity pool itself, a pool token shares contract, and mints the reserve assets to the user address.
2.  The user then deposits some of each asset into the liquidity pool. At this time, the following checks are done:
    - appropriate authorizations for deposits and transfers exist,
    - balances are checked for each token (`token_a`, `token_b`, and `POOL`) from both the user's perspective and the `liqpool` contract's perspective
3.  The user performs a swap, buying `token_b` in exchange for `token_a`. The same checks as the previous step are made now, excepting the balances of `POOL`, since a swap has no effect on `POOL` tokens.
4.  The user then withdraws all of the deposits it made, trading all of its `POOL` tokens in the process. The same checks are made here as were made in the `deposit` step.

#### Build the Contract[​](#build-the-contract "Direct link to Build the Contract")

To build the contract, use the `stellar contract build` command.

```
stellar contract build
```

A `.wasm` file should be outputted in the `target` directory:

```
target/wasm32-unknown-unknown/release/soroban_liquidity_pool_contract.wasm
```

#### Run the Contract[​](#run-the-contract "Direct link to Run the Contract")

If you have [`stellar-cli`](/docs/tools/cli/stellar-cli) installed, you can invoke contract functions using it.

- macOS/Linux
- Windows (PowerShell)

```
stellar contract invoke \    --wasm target/wasm32-unknown-unknown/release/soroban_liquidity_pool_contract.wasm \    --id 1 \    -- \    deposit \    --to GBZV3NONYSUDVTEHATQO4BCJVFXJO3XQU5K32X3XREVZKSMMOZFO4ZXR \    --desired_a 100 \    --min_a 98 \    --desired_be 200 \    --min_b 196
```

```
stellar contract invoke `    --wasm target/wasm32-unknown-unknown/release/soroban_liquidity_pool_contract.wasm `    --id 1 `    -- `    deposit `    --to GBZV3NONYSUDVTEHATQO4BCJVFXJO3XQU5K32X3XREVZKSMMOZFO4ZXR `    --desired_a 100 `    --min_a 98 `    --desired_be 200 `    --min_b 196
```

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/example-contracts/liquidity-pool.mdx)

Last updated on **May 28, 2025** by **Chris Anatalio**

- [Run the Example](#run-the-example)
- [Code](#code)
- [How it Works](#how-it-works)
  - [Initialize the Contract](#initialize-the-contract)
  - [A "Constant Product" Liquidity Pool](#a-constant-product-liquidity-pool)
  - [Interacting with Token Contracts in Another Contract](#interacting-with-token-contracts-in-another-contract)
- [Tests](#tests)
- [Build the Contract](#build-the-contract)
- [Run the Contract](#run-the-contract)

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/example-contracts/liquidity-pool](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/liquidity-pool)_

---

## Sección 15 - Docs Build Smart Contracts Example Contracts Timelock

### Lockup some token to be claimed by another user under set conditions

**URL:** https://developers.stellar.org/docs/build/smart-contracts/example-contracts/timelock
**Fecha de extracción:** 2025-07-12T01:17:40.057Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/timelock
generated: 2025-07-12T01:17:40.057Z

---

### Timelock

The [timelock example](https://github.com/stellar/soroban-examples/tree/v22.0.1/timelock) demonstrates how to write a timelock and implements a greatly simplified claimable balance similar to the [claimable balance](/docs/learn/encyclopedia/transactions-specialized/claimable-balances) feature available on Stellar.

[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web)

[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples)

The contract accepts deposits of an amount of a token, and allows other users to claim it before or after a time point.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/example-contracts/timelock.mdx)

Last updated on **May 28, 2025** by **Chris Anatalio**

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/example-contracts/timelock](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/timelock)_

---

## Sección 16 - Docs Build Smart Contracts Example Contracts Tokens

### Write a CAP-46-6 compliant token contract

**URL:** https://developers.stellar.org/docs/build/smart-contracts/example-contracts/tokens
**Fecha de extracción:** 2025-07-12T01:17:41.690Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/tokens
generated: 2025-07-12T01:17:41.690Z

---

On this page

### Tokens

The [token example](https://github.com/stellar/soroban-examples/tree/v22.0.1/token) demonstrates how to write a token contract that implements the [Token Interface](/docs/tokens/token-interface).

[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web)

[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples)

#### Run the Example[​](#run-the-example "Direct link to Run the Example")

First go through the [Setup](/docs/build/smart-contracts/getting-started/setup) process to get your development environment configured, then clone the `v22.0.1` tag of `soroban-examples` repository:

```
git clone -b v22.0.1 https://github.com/stellar/soroban-examples
```

Or, skip the development environment setup and open this example in [GitHub Codespaces](https://github.com/codespaces/new?repo=stellar/soroban-examples&editor=web) or [Code Anywhere](https://app.codeanywhere.com/#https://github.com/stellar/soroban-examples).

To run the tests for the example, navigate to the `hello_world` directory, and use `cargo test`.

```
cd tokencargo test
```

You should see the output:

```
running 6 teststest test::decimal_is_over_eighteen - should panic ... oktest test::transfer_insufficient_balance - should panic ... oktest test::test_zero_allowance ... oktest test::transfer_from_insufficient_allowance - should panic ... oktest test::test_burn ... oktest test::test ... ok
```

#### Code[​](#code "Direct link to Code")

> **NOTE**
>
> note
>
> The source code for this [token example](https://github.com/stellar/soroban-examples/tree/v22.0.1/token) is broken into several smaller modules. This is a common design pattern for more complex smart contracts.

- lib
- admin
- allowance
- balance
- contract
- metadata
- storage_types

token/src/lib.rs

```
### ![no_std]mod admin;mod allowance;mod balance;mod contract;mod metadata;mod storage_types;mod test;pub use crate::contract::TokenClient;
```

token/src/admin.rs

```
use soroban_sdk::{Address, Env};use crate::storage_types::DataKey;pub fn read_administrator(e: &Env) -> Address {    let key = DataKey::Admin;    e.storage().instance().get(&key).unwrap()}pub fn write_administrator(e: &Env, id: &Address) {    let key = DataKey::Admin;    e.storage().instance().set(&key, id);}
```

token/src/allowance.rs

```
use crate::storage_types::{AllowanceDataKey, AllowanceValue, DataKey};use soroban_sdk::{Address, Env};pub fn read_allowance(e: &Env, from: Address, spender: Address) -> AllowanceValue {    let key = DataKey::Allowance(AllowanceDataKey { from, spender });    if let Some(allowance) = e.storage().temporary().get::<_, AllowanceValue>(&key) {        if allowance.expiration_ledger < e.ledger().sequence() {            AllowanceValue {                amount: 0,                expiration_ledger: allowance.expiration_ledger,            }        } else {            allowance        }    } else {        AllowanceValue {            amount: 0,            expiration_ledger: 0,        }    }}pub fn write_allowance(    e: &Env,    from: Address,    spender: Address,    amount: i128,    expiration_ledger: u32,) {    let allowance = AllowanceValue {        amount,        expiration_ledger,    };    if amount > 0 && expiration_ledger < e.ledger().sequence() {        panic!("expiration_ledger is less than ledger seq when amount > 0")    }    let key = DataKey::Allowance(AllowanceDataKey { from, spender });    e.storage().temporary().set(&key.clone(), &allowance);    if amount > 0 {        e.storage().temporary().bump(            &key,            expiration_ledger                .checked_sub(e.ledger().sequence())                .unwrap(),        )    }}pub fn spend_allowance(e: &Env, from: Address, spender: Address, amount: i128) {    let allowance = read_allowance(e, from.clone(), spender.clone());    if allowance.amount < amount {        panic!("insufficient allowance");    }    write_allowance(        e,        from,        spender,        allowance.amount - amount,        allowance.expiration_ledger,    );}
```

token/src/balance.rs

```
use crate::storage_types::{DataKey, BALANCE_BUMP_AMOUNT, BALANCE_LIFETIME_THRESHOLD};use soroban_sdk::{Address, Env};pub fn read_balance(e: &Env, addr: Address) -> i128 {    let key = DataKey::Balance(addr);    if let Some(balance) = e.storage().persistent().get::<DataKey, i128>(&key) {        e.storage()            .persistent()            .extend_ttl(&key, BALANCE_LIFETIME_THRESHOLD, BALANCE_BUMP_AMOUNT);        balance    } else {        0    }}fn write_balance(e: &Env, addr: Address, amount: i128) {    let key = DataKey::Balance(addr);    e.storage().persistent().set(&key, &amount);    e.storage()        .persistent()        .extend_ttl(&key, BALANCE_LIFETIME_THRESHOLD, BALANCE_BUMP_AMOUNT);}pub fn receive_balance(e: &Env, addr: Address, amount: i128) {    let balance = read_balance(e, addr.clone());    write_balance(e, addr, balance + amount);}pub fn spend_balance(e: &Env, addr: Address, amount: i128) {    let balance = read_balance(e, addr.clone());    if balance < amount {        panic!("insufficient balance");    }    write_balance(e, addr, balance - amount);}
```

token/src/contract.rs

```
//! This contract demonstrates a sample implementation of the Soroban token//! interface.use crate::admin::{read_administrator, write_administrator};use crate::allowance::{read_allowance, spend_allowance, write_allowance};use crate::balance::{read_balance, receive_balance, spend_balance};use crate::metadata::{read_decimal, read_name, read_symbol, write_metadata};#[cfg(test)]use crate::storage_types::{AllowanceDataKey, AllowanceValue, DataKey};use crate::storage_types::{INSTANCE_BUMP_AMOUNT, INSTANCE_LIFETIME_THRESHOLD};use soroban_sdk::token::{self, Interface as _};use soroban_sdk::{contract, contractimpl, Address, Env, String};use soroban_token_sdk::metadata::TokenMetadata;use soroban_token_sdk::TokenUtils;fn check_nonnegative_amount(amount: i128) {    if amount < 0 {        panic!("negative amount is not allowed: {}", amount)    }}#[contract]pub struct Token;#[contractimpl]impl Token {    pub fn __constructor(e: Env, admin: Address, decimal: u32, name: String, symbol: String) {        if decimal > 18 {            panic!("Decimal must not be greater than 18");        }        write_administrator(&e, &admin);        write_metadata(            &e,            TokenMetadata {                decimal,                name,                symbol,            },        )    }    pub fn mint(e: Env, to: Address, amount: i128) {        check_nonnegative_amount(amount);        let admin = read_administrator(&e);        admin.require_auth();        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        receive_balance(&e, to.clone(), amount);        TokenUtils::new(&e).events().mint(admin, to, amount);    }    pub fn set_admin(e: Env, new_admin: Address) {        let admin = read_administrator(&e);        admin.require_auth();        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        write_administrator(&e, &new_admin);        TokenUtils::new(&e).events().set_admin(admin, new_admin);    }    #[cfg(test)]    pub fn get_allowance(e: Env, from: Address, spender: Address) -> Option<AllowanceValue> {        let key = DataKey::Allowance(AllowanceDataKey { from, spender });        let allowance = e.storage().temporary().get::<_, AllowanceValue>(&key);        allowance    }}#[contractimpl]impl token::Interface for Token {    fn allowance(e: Env, from: Address, spender: Address) -> i128 {        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        read_allowance(&e, from, spender).amount    }    fn approve(e: Env, from: Address, spender: Address, amount: i128, expiration_ledger: u32) {        from.require_auth();        check_nonnegative_amount(amount);        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        write_allowance(&e, from.clone(), spender.clone(), amount, expiration_ledger);        TokenUtils::new(&e)            .events()            .approve(from, spender, amount, expiration_ledger);    }    fn balance(e: Env, id: Address) -> i128 {        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        read_balance(&e, id)    }    fn transfer(e: Env, from: Address, to: Address, amount: i128) {        from.require_auth();        check_nonnegative_amount(amount);        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        spend_balance(&e, from.clone(), amount);        receive_balance(&e, to.clone(), amount);        TokenUtils::new(&e).events().transfer(from, to, amount);    }    fn transfer_from(e: Env, spender: Address, from: Address, to: Address, amount: i128) {        spender.require_auth();        check_nonnegative_amount(amount);        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        spend_allowance(&e, from.clone(), spender, amount);        spend_balance(&e, from.clone(), amount);        receive_balance(&e, to.clone(), amount);        TokenUtils::new(&e).events().transfer(from, to, amount)    }    fn burn(e: Env, from: Address, amount: i128) {        from.require_auth();        check_nonnegative_amount(amount);        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        spend_balance(&e, from.clone(), amount);        TokenUtils::new(&e).events().burn(from, amount);    }    fn burn_from(e: Env, spender: Address, from: Address, amount: i128) {        spender.require_auth();        check_nonnegative_amount(amount);        e.storage()            .instance()            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);        spend_allowance(&e, from.clone(), spender, amount);        spend_balance(&e, from.clone(), amount);        TokenUtils::new(&e).events().burn(from, amount)    }    fn decimals(e: Env) -> u32 {        read_decimal(&e)    }    fn name(e: Env) -> String {        read_name(&e)    }    fn symbol(e: Env) -> String {        read_symbol(&e)    }}
```

token/src/metadata.rs

```
use soroban_sdk::{Bytes, Env};use soroban_token_sdk::{TokenMetadata, TokenUtils};pub fn read_decimal(e: &Env) -> u32 {    let util = TokenUtils::new(e);    util.get_metadata_unchecked().unwrap().decimal}pub fn read_name(e: &Env) -> Bytes {    let util = TokenUtils::new(e);    util.get_metadata_unchecked().unwrap().name}pub fn read_symbol(e: &Env) -> Bytes {    let util = TokenUtils::new(e);    util.get_metadata_unchecked().unwrap().symbol}pub fn write_metadata(e: &Env, metadata: TokenMetadata) {    let util = TokenUtils::new(e);    util.set_metadata(&metadata);}
```

token/src/storage_types.rs

```
use soroban_sdk::{contracttype, Address};#[derive(Clone)]#[contracttype]pub struct AllowanceDataKey {    pub from: Address,    pub spender: Address,}#[contracttype]pub struct AllowanceValue {    pub amount: i128,    pub expiration_ledger: u32,}#[derive(Clone)]#[contracttype]pub enum DataKey {    Allowance(AllowanceDataKey),    Balance(Address),    Nonce(Address),    State(Address),    Admin,}
```

Ref: [https://github.com/stellar/soroban-examples/tree/v22.0.1/token](https://github.com/stellar/soroban-examples/tree/v22.0.1/token)

#### How it Works[​](#how-it-works "Direct link to How it Works")

Tokens created on a smart contract platform can take many different forms, include a variety of different functionalities, and meet very different needs or use-cases. While each token can fulfill a unique niche, there are some "normal" features that almost all tokens will need to make use of (e.g., payments, transfers, balance queries, etc.). In an effort to minimize repetition and streamline token deployments, Soroban implements the [Token Interface](/docs/tokens/token-interface), which provides a uniform, predictable interface for developers and users.

Creating a Soroban token compatible contract from an existing Stellar asset is very easy, it requires deploying the built-in [Stellar Asset Contract](/docs/tokens/stellar-asset-contract).

This example contract, however, demonstrates how a smart contract token might be constructed that doesn't take advantage of the Stellar Asset Contract, but does still satisfy the commonly used Token Interface to maximize interoperability.

##### Separation of Functionality[​](#separation-of-functionality "Direct link to Separation of Functionality")

You have likely noticed that this example contract is broken into discrete modules, with each one responsible for a siloed set of functionality. This common practice helps to organize the code and make it more maintainable.

For example, most of the token logic exists in the `contract.rs` module. Functions like `mint`, `burn`, `transfer`, etc. are written and programmed in that file. The Token Interface describes how some of these functions should emit events when they occur. However, keeping all that event-emitting logic bundled in with the rest of the contract code could make it harder to track what is happening in the code, and that confusion could ultimately lead to errors.

Instead, we have a separate `soroban_token_sdk::TokenUtils` module that takes away all the headache of emitting events when other functions run. Here is the event emitted when a token is minted:

```
TokenUtils::new(&e).events().mint(admin, to, amount);
```

Admittedly, this is a simple example, but constructing the contract this way makes it very clear to the developer what is happening and where. This function is then used by the `contract.rs` module whenever the `mint` function is invoked:

```
// earlier in `contract.rs`use crate::event;fn mint(e: Env, to: Address, amount: i128) {    check_nonnegative_amount(amount);    let admin = read_administrator(&e);    admin.require_auth();    receive_balance(&e, to.clone(), amount);    TokenUtils::new(&e).events().mint(admin, to, amount);}
```

This same convention is used to separate from the "main" contract code the metadata for the token, the storage type definitions, etc.

##### Standardized Interface, Customized Behavior[​](#standardized-interface-customized-behavior "Direct link to Standardized Interface, Customized Behavior")

This example contract follows the standardized [Token Interface](/docs/tokens/token-interface), implementing all of the same functions as the [Stellar Asset Contract](/docs/tokens/stellar-asset-contract). This gives wallets, users, developers, etc. a predictable interface to interact with the token. Even though we are implementing the same _interface_ of functions, that doesn't mean we have to implement the same _behavior_ inside those functions. While this example contract doesn't actually modify any of the functions that would be present in a deployed instance of the Stellar Asset Contract, that possibility remains open to the contract developer.

By way of example, perhaps you have an NFT project, and the artist wants to have a small royalty paid every time their token transfers hands:

```
// This is mainly the `transfer` function from `src/contract.rs`fn transfer(e: Env, from: Address, to: Address, amount: i128) {    from.require_auth();    check_nonnegative_amount(amount);    spend_balance(&e, from.clone(), amount);    // We calculate some new amounts for payment and royalty    let payment = (amount * 997) / 1000;    let royalty = amount - payment    receive_balance(&e, artist.clone(), royalty);    receive_balance(&e, to.clone(), payment);    event::transfer(&e, from, to, amount);}
```

The `transfer` interface is still in use, and is still the same as other tokens, but we've customized the behavior to address a specific need. Another use-case might be a tightly controlled token that requires authentication from an admin before any `transfer`, `allowance`, etc. function could be invoked.

> **TIP**
>
> tip
>
> Of course, you will want your token to behave in an _intuitive_ and _transparent_ manner. If a user is invoking a `transfer`, they will expect tokens to move. If an asset issuer needs to invoke a `clawback` they will likely _require_ the right kind of behavior to take place.

#### Tests[​](#tests "Direct link to Tests")

Open the `token/src/test.rs` file to follow along.

token/src/test.rs

```
### ![cfg(test)]extern crate std;use crate::{contract::Token, TokenClient};use soroban_sdk::{    symbol_short,    testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation},    Address, Env, FromVal, IntoVal, String, Symbol,};fn create_token<'a>(e: &Env, admin: &Address) -> TokenClient<'a> {    let token_contract = e.register(        Token,        (            admin,            7_u32,            String::from_val(e, &"name"),            String::from_val(e, &"symbol"),        ),    );    TokenClient::new(e, &token_contract)}#[test]fn test() {    let e = Env::default();    e.mock_all_auths();    let admin1 = Address::generate(&e);    let admin2 = Address::generate(&e);    let user1 = Address::generate(&e);    let user2 = Address::generate(&e);    let user3 = Address::generate(&e);    let token = create_token(&e, &admin1);    token.mint(&user1, &1000);    assert_eq!(        e.auths(),        std::vec![(            admin1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("mint"),                    (&user1, 1000_i128).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.balance(&user1), 1000);    token.approve(&user2, &user3, &500, &200);    assert_eq!(        e.auths(),        std::vec![(            user2.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("approve"),                    (&user2, &user3, 500_i128, 200_u32).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.allowance(&user2, &user3), 500);    token.transfer(&user1, &user2, &600);    assert_eq!(        e.auths(),        std::vec![(            user1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("transfer"),                    (&user1, &user2, 600_i128).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.balance(&user1), 400);    assert_eq!(token.balance(&user2), 600);    token.transfer_from(&user3, &user2, &user1, &400);    assert_eq!(        e.auths(),        std::vec![(            user3.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    Symbol::new(&e, "transfer_from"),                    (&user3, &user2, &user1, 400_i128).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.balance(&user1), 800);    assert_eq!(token.balance(&user2), 200);    token.transfer(&user1, &user3, &300);    assert_eq!(token.balance(&user1), 500);    assert_eq!(token.balance(&user3), 300);    token.set_admin(&admin2);    assert_eq!(        e.auths(),        std::vec![(            admin1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("set_admin"),                    (&admin2,).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    // Increase to 500    token.approve(&user2, &user3, &500, &200);    assert_eq!(token.allowance(&user2, &user3), 500);    token.approve(&user2, &user3, &0, &200);    assert_eq!(        e.auths(),        std::vec![(            user2.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("approve"),                    (&user2, &user3, 0_i128, 200_u32).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.allowance(&user2, &user3), 0);}#[test]fn test_burn() {    let e = Env::default();    e.mock_all_auths();    let admin = Address::generate(&e);    let user1 = Address::generate(&e);    let user2 = Address::generate(&e);    let token = create_token(&e, &admin);    token.mint(&user1, &1000);    assert_eq!(token.balance(&user1), 1000);    token.approve(&user1, &user2, &500, &200);    assert_eq!(token.allowance(&user1, &user2), 500);    token.burn_from(&user2, &user1, &500);    assert_eq!(        e.auths(),        std::vec![(            user2.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("burn_from"),                    (&user2, &user1, 500_i128).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.allowance(&user1, &user2), 0);    assert_eq!(token.balance(&user1), 500);    assert_eq!(token.balance(&user2), 0);    token.burn(&user1, &500);    assert_eq!(        e.auths(),        std::vec![(            user1.clone(),            AuthorizedInvocation {                function: AuthorizedFunction::Contract((                    token.address.clone(),                    symbol_short!("burn"),                    (&user1, 500_i128).into_val(&e),                )),                sub_invocations: std::vec![]            }        )]    );    assert_eq!(token.balance(&user1), 0);    assert_eq!(token.balance(&user2), 0);}#[test]#[should_panic(expected = "insufficient balance")]fn transfer_insufficient_balance() {    let e = Env::default();    e.mock_all_auths();    let admin = Address::generate(&e);    let user1 = Address::generate(&e);    let user2 = Address::generate(&e);    let token = create_token(&e, &admin);    token.mint(&user1, &1000);    assert_eq!(token.balance(&user1), 1000);    token.transfer(&user1, &user2, &1001);}#[test]#[should_panic(expected = "insufficient allowance")]fn transfer_from_insufficient_allowance() {    let e = Env::default();    e.mock_all_auths();    let admin = Address::generate(&e);    let user1 = Address::generate(&e);    let user2 = Address::generate(&e);    let user3 = Address::generate(&e);    let token = create_token(&e, &admin);    token.mint(&user1, &1000);    assert_eq!(token.balance(&user1), 1000);    token.approve(&user1, &user3, &100, &200);    assert_eq!(token.allowance(&user1, &user3), 100);    token.transfer_from(&user3, &user1, &user2, &101);}#[test]#[should_panic(expected = "Decimal must not be greater than 18")]fn decimal_is_over_eighteen() {    let e = Env::default();    let admin = Address::generate(&e);    let _ = TokenClient::new(        &e,        &e.register(            Token,            (                admin,                19_u32,                String::from_val(&e, &"name"),                String::from_val(&e, &"symbol"),            ),        ),    );}#[test]fn test_zero_allowance() {    // Here we test that transfer_from with a 0 amount does not create an empty allowance    let e = Env::default();    e.mock_all_auths();    let admin = Address::generate(&e);    let spender = Address::generate(&e);    let from = Address::generate(&e);    let token = create_token(&e, &admin);    token.transfer_from(&spender, &from, &spender, &0);    assert!(token.get_allowance(&from, &spender).is_none());}
```

The token example implements eight different tests to cover a wide array of potential behaviors and problems. However, all of the tests start with a few common pieces. In any test, the first thing that is always required is an `Env`, which is the Soroban environment that the contract will run in.

```
let e = Env::default();
```

We mock authentication checks in the tests, which allows the tests to proceed as if all users/addresses/contracts/etc. had successfully authenticated.

```
e.mock_all_auths();
```

We're also using a `create_token` function to ease the repetition of having to register our token contract. The resulting `token` client is then used to invoke the contract during each test.

```
// It is defined at the top of the file...fn create_token<'a>(e: &Env, admin: &Address) -> TokenClient<'a> {    let token_contract = e.register(        Token,        (            admin,            7_u32,            String::from_val(e, &"name"),            String::from_val(e, &"symbol"),        ),    );    TokenClient::new(e, &token_contract)}// ... and it is used inside each testlet token = create_token(&e, &admin);
```

All public functions within an `impl` block that has been annotated with the `#[contractimpl]` attribute will have a corresponding function in the test's generated client type. The client type will be named the same as the contract type with `Client` appended. For example, in our contract, the contract type is named `Token`, and the client type is named `TokenClient`.

The six tests created for this example contract test a range of possible conditions and ensure the contract responds appropriately to each one:

- **`test()`** - This function makes use of a variety of the built-in token functions to test the "predictable" way an asset might be interacted with by a user, as well as an administrator.
- **`test_burn()`** - This function ensures a `burn()` invocation decreases a user's balance, and that a `burn_from()` invocation decreases a user's balance as well as consuming another user's allowance of that balance.
- **`test_zero_allowance()`** - This function makes sure that a `transfer_from()` with an zero balance doesn't create an empty allowance.
- **`transfer_insufficient_balance()`** - This function ensures a `transfer()` invocation panics when the `from` user doesn't have the balance to cover it.
- **`transfer_from_insufficient_allowance()`** - This function ensures a user with an existing allowance for someone else's balance cannot make a `transfer()` greater than that allowance.
- **`decimal_is_over_eighteen()`** - This function tests that constructing a token with too high of a decimal precision will not succeed.

#### Build the Contract[​](#build-the-contract "Direct link to Build the Contract")

To build the contract, use the `stellar contract build` command.

```
stellar contract build
```

A `.wasm` file should be outputted in the `target` directory:

```
target/wasm32-unknown-unknown/release/soroban_token_contract.wasm
```

#### Run the Contract[​](#run-the-contract "Direct link to Run the Contract")

If you have [`stellar-cli`](/docs/tools/cli/stellar-cli) installed, you can invoke contract functions using it.

- macOS/Linux
- Windows (PowerShell)

```
stellar contract invoke \    --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm \    --id 1 \    -- \    balance \    --id GBZV3NONYSUDVTEHATQO4BCJVFXJO3XQU5K32X3XREVZKSMMOZFO4ZXR
```

```
stellar contract invoke `    --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm `    --id 1 `    -- `    balance `    --id GBZV3NONYSUDVTEHATQO4BCJVFXJO3XQU5K32X3XREVZKSMMOZFO4ZXR
```

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/example-contracts/tokens.mdx)

Last updated on **May 28, 2025** by **Chris Anatalio**

- [Run the Example](#run-the-example)
- [Code](#code)
- [How it Works](#how-it-works)
  - [Separation of Functionality](#separation-of-functionality)
  - [Standardized Interface, Customized Behavior](#standardized-interface-customized-behavior)
- [Tests](#tests)
- [Build the Contract](#build-the-contract)
- [Run the Contract](#run-the-contract)

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/example-contracts/tokens](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/tokens)_

---

## Sección 17 - Docs Build Smart Contracts Example Contracts

### Example Smart Contracts: Learn, Build, Test & Deploy on the Network | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/smart-contracts/example-contracts
**Fecha de extracción:** 2025-07-12T01:17:27.610Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/example-contracts
generated: 2025-07-12T01:17:27.610Z

---

### Example Contracts

The Stellar team has put together a large collection of [example contracts](https://github.com/stellar/soroban-examples) to demonstrate use of smart contracts on Stellar. For many of these example contracts, we've written an accompanying tutorial that will walk you through the example contract and describe a bit more about its design.

The examples listed below are provided in a sequential manner. The first listed example contracts create a solid foundation of concepts that will be required during the later examples. While you are absolutely free to choose, read, and use any of the example contracts you like, please keep in mind that the order you see is intentional.

[**Storage**](/docs/build/smart-contracts/example-contracts/storage) - Increment a counter and store the incremented value

[**Events**](/docs/build/smart-contracts/example-contracts/events) - Publish events from a smart contract.

[**Custom Types**](/docs/build/smart-contracts/example-contracts/custom-types) - Define your own data structures in a smart contract.

[**Errors**](/docs/build/smart-contracts/example-contracts/errors) - Define and generate errors in a smart contract.

[**Logging**](/docs/build/smart-contracts/example-contracts/logging) - Debug a smart contract with logs.

[**Auth**](/docs/build/smart-contracts/example-contracts/auth) - Implement authentication and authorization.

[**BLS Signature**](/docs/build/smart-contracts/example-contracts/bls-signature) - A custom account contract with BLS signature verification.

[**Cross Contract Calls**](/docs/build/smart-contracts/example-contracts/cross-contract-call) - Call a smart contract from another smart contract.

[**Deployer**](/docs/build/smart-contracts/example-contracts/deployer) - Deploy and initialize a smart contract using another smart contract.

[**Allocator**](/docs/build/smart-contracts/example-contracts/alloc) - Use the allocator feature to emulate heap memory in a smart contract.

[**Atomic Swap**](/docs/build/smart-contracts/example-contracts/atomic-swap) - Swap tokens atomically between authorized users.

[**Batched Atomic Swaps**](/docs/build/smart-contracts/example-contracts/atomic-multi-swap) - Swap a token pair among groups of authorized users.

[**Mint Lock**](/docs/build/smart-contracts/example-contracts/mint-lock) - Implement a contract that can delegate minting with limits.

[**Timelock**](/docs/build/smart-contracts/example-contracts/timelock) - Lockup some token to be claimed by another user under set conditions.

[**Single Offer Sale**](/docs/build/smart-contracts/example-contracts/single-offer-sale) - Make a standing offer to sell a token in exchange for another token.

[**Upgradeable Contract**](/docs/build/smart-contracts/example-contracts/upgradeable-contract) - Upgrading Wasm Bytecode for a Deployed Contract.

[**Liquidity Pool**](/docs/build/smart-contracts/example-contracts/liquidity-pool) - Write a constant-product liquidity pool contract.

[**Tokens**](/docs/build/smart-contracts/example-contracts/tokens) - Write a CAP-46-6 compliant token contract.

[**Custom Account**](/docs/build/smart-contracts/example-contracts/custom-account) - Implement an account contract supporting multisig and custom authorization policies.

[**Fuzz Testing**](/docs/build/smart-contracts/example-contracts/fuzzing) - Increase confidence in a contract's correctness with fuzz testing.

[**Workspace**](/docs/build/smart-contracts/example-contracts/workspace) - Develop multiple contracts side-by-side.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/example-contracts/README.mdx)

Last updated on **Feb 18, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/example-contracts](https://developers.stellar.org/docs/build/smart-contracts/example-contracts)_

---

## Sección 18 - Docs Build Smart Contracts Getting Started

### Get Started with Smart Contracts: Setup, Write in Rust & Deploy | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/smart-contracts/getting-started
**Fecha de extracción:** 2025-07-12T01:17:43.067Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/getting-started
generated: 2025-07-12T01:17:43.067Z

---

### Getting Started

Dive into smart contract development with this Getting Started tutorial.

[

#### 📄️ Setup

Learn how to set up Stellar smart contract development by installing Rust, configuring your editor, and setting up the Stellar CLI with this step-by-step guide.

](/docs/build/smart-contracts/getting-started/setup)

[

#### 📄️ 1. Hello World

Create your first smart contract on Stellar with this Hello World guide. Learn how to write, deploy, and test your contract using Rust and the Stellar CLI.

](/docs/build/smart-contracts/getting-started/hello-world)

[

#### 📄️ 2. Deploy to Testnet

Deploy Stellar smart contracts to Testnet using the CLI, interact with other contracts, test functionality, debug issues, and prepare for Mainnet deployment.

](/docs/build/smart-contracts/getting-started/deploy-to-testnet)

[

#### 📄️ 3. Storing Data

Follow along with the increment example to write a simple contract that stores and retrieves data on the Stellar network. Learn about storage and TTL.

](/docs/build/smart-contracts/getting-started/storing-data)

[

#### 📄️ 4. Deploy the Increment Contract

Follow this step-by-step guide in the final section of Getting Started to learn how to deploy the increment smart contract on Testnet using the Stellar CLI.

](/docs/build/smart-contracts/getting-started/deploy-increment-contract)

[

#### 📄️ 5. Build a Hello World Frontend

Build a frontend for the Hello World contract by using Stellar CLI to generate TypeScript bindings.

](/docs/build/smart-contracts/getting-started/hello-world-frontend)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/getting-started/README.mdx)

Last updated on **Feb 18, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/getting-started](https://developers.stellar.org/docs/build/smart-contracts/getting-started)_

---

## Sección 19 - Docs Build Smart Contracts Overview

### An Overview of Smart Contracts on Stellar, Including the Rust SDK and FAQs | Stellar Docs

**URL:** https://developers.stellar.org/docs/build/smart-contracts/overview
**Fecha de extracción:** 2025-07-12T01:17:44.453Z

---

---

source: https://developers.stellar.org/docs/build/smart-contracts/overview
generated: 2025-07-12T01:17:44.453Z

---

On this page

### Overview

Soroban is the smart contracts platform on the Stellar network. These contracts are small programs written in the [Rust language](https://www.rust-lang.org/) and compiled as [WebAssembly](https://webassembly.org/) (Wasm) for deployment.

> **NOTE**
>
> note
>
> For a comprehensive introduction to Stellar smart contracts, view the [Smart Contract Learn Section](/docs/learn/fundamentals/contract-development/overview).

Write your first smart contract on Stellar using the [Getting Started Guide](/docs/build/smart-contracts/getting-started/setup).

#### Rust on Stellar[​](#rust-on-stellar "Direct link to Rust on Stellar")

Stellar smart contracts have several characteristics (such as resource limits, security considerations, and more) that force contracts to use only a narrow subset of the full Rust language and must use specialized libraries for most tasks.

Learn more in the [Contract Rust Dialect section](/docs/learn/fundamentals/contract-development/rust-dialect).

In particular, the Rust standard library and most third-party libraries (called [crates](/docs/learn/migrate/evm/solidity-and-rust-advanced-concepts#crates)) will not be available for direct off-the-shelf use in contracts due to the abovementioned constraints. Some crates can be adapted for use in contracts, and others may be incorporated into the host environment as host objects or functions.

> **NOTE**
>
> note
>
> Other languages may be supported in the future, but at this time, only Rust is supported.

#### Soroban Rust SDK[​](#soroban-rust-sdk "Direct link to Soroban Rust SDK")

Contracts are developed using a software development kit (SDK). The [Soroban Rust SDK](/docs/tools/sdks/contract-sdks#soroban-rust-sdk) consists of a Rust crate and a command-line (CLI) tool.

The SDK crate acts as a substitute for the Rust standard library — providing data structures and utility functions for contracts — as well as providing access to smart-contract-specific functionality from the contract environment, like cryptographic hashing and signature verification, access to on-chain persistent storage, and location and invocation of secondary contracts via stable identifiers.

The Soroban SDK CLI tool provides a developer-focused front-end for:

- Compiling
- Testing
- Inspecting
- Versioning
- Deploying

It also includes a complete implementation of the contract host environment that is identical to the one that runs on-chain, called [local testing mode](/docs/learn/fundamentals/contract-development/errors-and-debugging/debugging#local-testing-mode). With this capability, contracts can be run locally on a developer's workstation and can be tested and debugged directly with a local debugger within a standard IDE, as well as a native test harness for fast-feedback unit testing and high-speed fuzzing or property testing.

#### Host environment[​](#host-environment "Direct link to Host environment")

The host environment is a set of Rust crates compiled into the SDK CLI tool and stellar-core. It comprises a set of host objects and functions, an interface to on-chain storage and contract invocation, a resource-accounting and fee-charging system, and a Wasm interpreter.

Most contract developers will not frequently need to interact with the host environment directly — SDK functions wrap most of its facilities and provide richer and more ergonomic types and functions — but it is helpful to understand its structure to understand the conceptual model the SDK is presenting. Some parts of the host environment will likely be visible when testing or debugging contracts compiled natively on a local workstation.

Learn more in the [Environment Concepts section](/docs/learn/fundamentals/contract-development/environment-concepts).

#### Stellar smart contract FAQs[​](#stellar-smart-contract-faqs "Direct link to Stellar smart contract FAQs")

- \*What is Soroban to Stellar? Is it a new blockchain?​\*\*

Soroban is not a new blockchain. Soroban is a smart contract platform integrated into the existing Stellar blockchain. It is an additive feature that lives alongside and doesn't replace the existing set of Stellar operations.

- \*How do I invoke a Soroban contract on Stellar?​\*\*

Invoke a Soroban contract by submitting a transaction that contains the new operation: [`InvokeHostFunctionOp`](/docs/learn/fundamentals/transactions/list-of-operations#invoke-host-function).

- \*Can Soroban contracts use Stellar accounts for authentication?​\*\*

Yes. Stellar accounts are shared with Soroban. Smart contacts have access to Stellar account signer configuration and know the source account that directly invoked them in a transaction. Check out the [Authorization section](/docs/learn/fundamentals/contract-development/authorization) for more information.

- \*Can Soroban contracts interact with Stellar assets?​\*\*

Yes. Soroban contains a built-in [Stellar Asset Contract](/docs/tokens/stellar-asset-contract) that can interact with classic trustlines.

- \*Do issuers of Stellar assets maintain authorization over an asset sent to a non-account identifier in Soroban (`AUTH_REQUIRED`, `AUTH_REVOCABLE`, `AUTH_CLAWBACK`)​?\*\*

Yes. Issuers retain the same level of control on Soroban as they have regularly. This functionality is accessible through a set of admin functions (clawback, set_auth) on the built-in Stellar Asset Contract.

- \*Can Soroban contracts interact with any other Stellar operations?​\*\*

No. Aside from the interactions with accounts and assets mentioned above. This means that Soroban contracts cannot interact with the SDEX, claimable balances, or sponsorships.

- \*Does the Stellar base reserve apply to Soroban contracts?​\*\*

No. Soroban has a different [fee structure](/docs/learn/fundamentals/fees-resource-limits-metering), and ledger entries that are allocated by Soroban contracts do not add to an account's required minimal balance.

- \*Need help finding what you're looking for?​\*\*

Ask in the Developer channels in the [Stellar Developer Discord](https://discord.gg/stellardev).

- \*Should I issue my token as a Stellar asset or a Soroban contract token?​\*\*

To the greatest extent possible, we recommend issuing tokens as Stellar assets. These tokens will benefit from being interoperable with the existing tools available in the Stellar ecosystem and are more performant because the Stellar Asset Contract is built into the host. Read more in the [Tokens Overview](/docs/tokens).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/build/smart-contracts/overview.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Rust on Stellar](#rust-on-stellar)
- [Soroban Rust SDK](#soroban-rust-sdk)
- [Host environment](#host-environment)
- [Stellar smart contract FAQs](#stellar-smart-contract-faqs)

---

_Extraído de [https://developers.stellar.org/docs/build/smart-contracts/overview](https://developers.stellar.org/docs/build/smart-contracts/overview)_

---

## Sección 20 - Docs Data Analytics Hubble Analyst Guide

### Analyst Guide | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/analytics/hubble/analyst-guide
**Fecha de extracción:** 2025-07-12T01:17:47.223Z

---

---

source: https://developers.stellar.org/docs/data/analytics/hubble/analyst-guide
generated: 2025-07-12T01:17:47.223Z

---

### Analyst Guide

All you need to know to use Hubble data for analysis.

[

#### 📄️ Connecting

BigQuery offers multiple connection methods to Hubble. This guide details three common methods:

](/docs/data/analytics/hubble/analyst-guide/connecting)

[

#### 📄️ Viewing Metadata

Hubble publishes metadata which can help users determine which tables to query, how frequently the dataset updates, and general information about the dataset.

](/docs/data/analytics/hubble/analyst-guide/viewing-metadata)

[

#### 📄️ Optimizing Queries

Hubble has terabytes of data to explore&mdash;that’s a lot of data! With access to so much data at your fingertips, it is crucial to performance-tune your queries.

](/docs/data/analytics/hubble/analyst-guide/optimizing-queries)

[

#### 📄️ Creating Visualizations

This page will show how you can create visualizations with Hubble and Google Looker Studio.

](/docs/data/analytics/hubble/analyst-guide/creating-visualizations)

[

#### 📄️ Queries for Horizon/RPC-like Data

Horizon and RPC both provide API endpoints to retrieve data from the Stellar network. The following example queries retrieve the same data by using Hubble with the added benefit of being able to return historical data.

](/docs/data/analytics/hubble/analyst-guide/queries-for-horizon-like-data)

[

#### 📄️ History VS State Tables

This page describes the differences between History and State tables within Hubble.

](/docs/data/analytics/hubble/analyst-guide/history-vs-state-tables)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/analytics/hubble/analyst-guide/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/data/analytics/hubble/analyst-guide](https://developers.stellar.org/docs/data/analytics/hubble/analyst-guide)_

---

## Sección 21 - Docs Data Analytics Hubble Data Catalog

### Data Catalog | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/analytics/hubble/data-catalog
**Fecha de extracción:** 2025-07-12T01:17:48.604Z

---

---

source: https://developers.stellar.org/docs/data/analytics/hubble/data-catalog
generated: 2025-07-12T01:17:48.604Z

---

### Data Catalog

View all Hubble data catalog information.

[

#### 📄️ Data Model Diagram

For more detailed information see the Full Hubble Data Model Diagram or the Compressed Hubble Data Model Diagram.

](/docs/data/analytics/hubble/data-catalog/data-model-diagram)

[

#### 🗃️ Data Dictionary

16 items

](/docs/data/analytics/hubble/data-catalog/data-dictionary)

[

#### 📄️ Data Lineage

](/docs/data/analytics/hubble/data-catalog/data-lineage)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/analytics/hubble/data-catalog/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/data/analytics/hubble/data-catalog](https://developers.stellar.org/docs/data/analytics/hubble/data-catalog)_

---

## Sección 22 - Docs Data Analytics Hubble Developer Guide

### Developer Guide | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/analytics/hubble/developer-guide
**Fecha de extracción:** 2025-07-12T01:17:49.992Z

---

---

source: https://developers.stellar.org/docs/data/analytics/hubble/developer-guide
generated: 2025-07-12T01:17:49.992Z

---

### Developer Guide

All you need to know about running a Hubble analytics platform.

[

#### 🗃️ Backfill

2 items

](/docs/data/analytics/hubble/developer-guide/backfill)

[

#### 📄️ Connecting

BigQuery offers multiple connection methods to Hubble. This guide details three common methods:

](/docs/data/analytics/hubble/developer-guide/connecting-to-bigquery)

[

#### 🗃️ Source System Ingestion

3 items

](/docs/data/analytics/hubble/developer-guide/source-system-ingestion)

[

#### 🗃️ Data Curation

3 items

](/docs/data/analytics/hubble/developer-guide/data-curation)

[

#### 🗃️ Visualization

2 items

](/docs/data/analytics/hubble/developer-guide/visualization)

[

#### 🗃️ Scheduling and Orchestration

3 items

](/docs/data/analytics/hubble/developer-guide/scheduling-and-orchestration)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/analytics/hubble/developer-guide/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/data/analytics/hubble/developer-guide](https://developers.stellar.org/docs/data/analytics/hubble/developer-guide)_

---

## Sección 23 - Docs Data Analytics Hubble

### Hubble | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/analytics/hubble
**Fecha de extracción:** 2025-07-12T01:17:45.847Z

---

---

source: https://developers.stellar.org/docs/data/analytics/hubble
generated: 2025-07-12T01:17:45.847Z

---

On this page

### Hubble

#### What is Hubble?[​](#what-is-hubble "Direct link to What is Hubble?")

Hubble is an open-source, publicly available dataset that provides a complete historical record of the Stellar network. Similar to Horizon, it ingests and presents the data produced by the Stellar network in a format that is easier to consume than the performance-oriented data representations used by Stellar Core. The dataset is hosted on BigQuery–meaning it is suitable for large, analytic workloads, historical data retrieval and complex data aggregation. **Hubble should not be used for real-time data retrieval and cannot submit transactions to the network.** For real time use cases, we recommend [running an API server](/docs/data/apis/horizon/admin-guide).

This guide describes when to use Hubble and how to connect. To view the underlying data structures, queries and examples, use the [Viewing Metadata](/docs/data/analytics/hubble/analyst-guide/viewing-metadata) and [Optimizing Queries](/docs/data/analytics/hubble/analyst-guide/optimizing-queries) tutorials.

#### Why Use Hubble?[​](#why-use-hubble "Direct link to Why Use Hubble?")

Some questions are hard to answer with the Horizon API and its underlying PostgreSQL database. This is because its infrastructure is optimized for quick database reads and writes so that it can process online transactions. Horizon can accurately store the results of these smaller transactions, however it sacrifices the ability to execute complex queries easily. The Stellar Network’s data footprint has also increased exponentially, which is creating space constraints and performance issues for Horizon instances that store the full historical record.

This is where Hubble comes in. It is optimized to execute complex queries and scan large amounts of data. Hubble can store orders of magnitude more data than Horizon and will not run into the same storage constraints. Queries that require pagination in Horizon or timeout can be returned in a single query. Hubble empowers users to explore, analyze, and derive meaningful conclusions from the data without the burden of maintaining a database.

Users should be aware of the following limitations:

- Hubble is read-only; it cannot interact with the Stellar Network.
- The database is updated in intraday batches. There is no guarantee for same-day data availability.
- The SDF hosts a public instance of Hubble, and end users incur the cost to execute queries. Visit the [BigQuery Pricing Page](https://cloud.google.com/bigquery/pricing#analysis_pricing_models) to learn more.

#### Why We Chose BigQuery[​](#why-we-chose-bigquery "Direct link to Why We Chose BigQuery")

BigQuery is Google Cloud’s data warehouse that comes with some key features that fulfill Stellar’s analytic needs.

First, BigQuery allows anyone to make a dataset publicly available. This means that the SDF can contribute open source repositories to build and maintain a data warehouse and also host a public instance.

BigQuery also separates storage from compute, which makes it sustainable to host a public instance. The maintainer only has to pay the cost of storage without incurring the cost of the analytics running on the dataset.

Most importantly, BigQuery is the de facto platform for blockchain datasets. By selecting BigQuery, Stellar Network data is located with other blockchain data, which allows for cross-chain analytics.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/analytics/hubble/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

- [What is Hubble?](#what-is-hubble)
- [Why Use Hubble?](#why-use-hubble)
- [Why We Chose BigQuery](#why-we-chose-bigquery)

---

_Extraído de [https://developers.stellar.org/docs/data/analytics/hubble](https://developers.stellar.org/docs/data/analytics/hubble)_

---

## Sección 24 - Docs Data Apis Api Providers

### Providers | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/api-providers
**Fecha de extracción:** 2025-07-12T01:17:51.382Z

---

---

source: https://developers.stellar.org/docs/data/apis/api-providers
generated: 2025-07-12T01:17:51.382Z

---

On this page

### Providers

> **INFO**
>
> info
>
> On August 1, 2024, the publicly accessible SDF-hosted Horizon had its historical data truncated to one year. That update optimized the performance of the publicly accessible Horizon and ensured a streamlined experience for all users. Consider third-party ecosystem providers of Horizon, which may provide a longer history retention window as well as other features.

Multiple infrastructure providers have made Stellar RPC and Horizon services available, and offer plans ranging from free to dedicated instances. These providers can be used for development, testing, and production.

These providers allow access to the Futurenet, Testnet and Mainnet network.

| Provider                                                    | Futurenet | Testnet | Mainnet | Horizon | RPC |
| ----------------------------------------------------------- | --------- | ------- | ------- | ------- | --- |
| [Blockdaemon\*†](https://www.blockdaemon.com/apply/soroban) | ❌        | ✅      | ✅      | ✅      | ✅  |
| [Validation Cloud\*†](https://app.validationcloud.io/)      | ❌        | ✅      | ✅      | ✅      | ✅  |
| [QuickNode\*](https://www.quicknode.com/docs/stellar)       | ❌        | ✅      | ✅      | ✅      | ✅  |
| [NowNodes](https://nownodes.io/nodes/stellar-xlm)           | ✅        | ✅      | ✅      | ❌      | ✅  |
| [Gateway](https://gateway.fm/public-rpc/)                   | ❌        | ✅      | ✅      | ❌      | ✅  |
| [Ankr](https://www.ankr.com/rpc/advanced-api/)              | ❌        | ✅      | ✅      | ✅      | ✅  |
| [Infstones](https://infstones.com/)                         | ❌        | ❌      | ✅      | ❌      | ✅  |
| [Obsrvr](https://www.withObsrvr.com/)                       | ❌        | ✅      | ✅      | ✅      | ✅  |
| [GetBlock](https://getblock.io/nodes/xlm/)                  | ❌        | ❌      | ✅      | ❌      | ✅  |
| [Nodies](https://nodies.org)                                | ❌        | ✅      | ✅      | ✅      | ✅  |

\*_Blockdaemon, Validation Cloud, and Quicknode combine Horizon and RPC in the same endpoint._

†_Blockdaemon and Validation Cloud provide full historical data for Horizon._

##### Publicly Accessible APIs[​](#publicly-accessible-apis "Direct link to Publicly Accessible APIs")

| Provider                                         | Network   | URL                                                                     |
| ------------------------------------------------ | --------- | ----------------------------------------------------------------------- |
| [Liquify](https://www.liquify.io/)               | Futurenet | RPC: `https://stellar.liquify.com/api=41EEWAH79Y5OCGI7/futurenet`       |
|                                                  | Testnet   | RPC: `https://stellar.liquify.com/api=41EEWAH79Y5OCGI7/testnet`         |
|                                                  | Mainnet   | RPC: `https://stellar-mainnet.liquify.com/api=41EEWAH79Y5OCGI7/mainnet` |
| [Gateway](https://gateway.fm/)                   | Testnet   | RPC: `https://soroban-rpc.testnet.stellar.gateway.fm`                   |
|                                                  | Mainnet   | RPC: `https://soroban-rpc.mainnet.stellar.gateway.fm`                   |
| [sorobanrpc.com](https://sorobanrpc.com/)        | Mainnet   | RPC: `https://mainnet.sorobanrpc.com`                                   |
| [Nodies](https://nodies.org)                     | Testnet   | RPC: `https://stellar-soroban-testnet-public.nodies.app`                |
|                                                  | Mainnet   | RPC: `https://stellar-soroban-public.nodies.app`                        |
| [SDF](http://www.stellar.org)                    | Futurenet | RPC: `https://rpc-futurenet.stellar.org`                                |
| Horizon: `https://horizon-futurenet.stellar.org` |
|                                                  | Testnet   | RPC: `https://soroban-testnet.stellar.org`                              |
| Horizon: `https://horizon-testnet.stellar.org`   |
| [LOBSTR](https://lobstr.co)                      | Mainnet   | Horizon: `https://horizon.stellar.lobstr.co`                            |

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/api-providers.mdx)

Last updated on **Mar 13, 2025** by **Molly Karcher**

- [Publicly Accessible APIs](#publicly-accessible-apis)

---

_Extraído de [https://developers.stellar.org/docs/data/apis/api-providers](https://developers.stellar.org/docs/data/apis/api-providers)_

---

## Sección 25 - Docs Data Apis Horizon Admin Guide

### Admin Guide | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/horizon/admin-guide
**Fecha de extracción:** 2025-07-12T01:17:54.018Z

---

---

source: https://developers.stellar.org/docs/data/apis/horizon/admin-guide
generated: 2025-07-12T01:17:54.018Z

---

### Admin Guide

All you need to know about setting up, running, and using Horizon.

[

#### 📄️ Overview

Horizon is a central component of the Stellar platform: it provides an HTTP API to data in the Stellar network. It ingests and re-serves the data produced by the Stellar network in a form that is easier to consume by the average application relative to the performance-oriented data representations used by Stellar Core.

](/docs/data/apis/horizon/admin-guide/overview)

[

#### 📄️ Prerequisites

The Horizon service is responsible for synchronizing with the Stellar network and processing ledger data. To understand the scope of Horizon's services, please read the configuring section before you move on to the prerequisites for computation.

](/docs/data/apis/horizon/admin-guide/prerequisites)

[

#### 📄️ Installing

To install Horizon in production or non-development environments, we recommend the following based on target infrastructure:

](/docs/data/apis/horizon/admin-guide/installing)

[

#### 📄️ Configuring

Prerequisites

](/docs/data/apis/horizon/admin-guide/configuring)

[

#### 📄️ Running

Once you have established the Horizon database and have identified the Horizon runtime config per host, you're ready to run Horizon.

](/docs/data/apis/horizon/admin-guide/running)

[

#### 📄️ Ingestion

Horizon API provides most of its utility through ingested data, and your Horizon server can be configured to listen for and ingest transaction results from the Stellar network. Ingestion enables API access to both current state (e.g. someone's balance) and historical state (e.g. someone's transaction history).

](/docs/data/apis/horizon/admin-guide/ingestion)

[

#### 📄️ Monitoring

Metrics

](/docs/data/apis/horizon/admin-guide/monitoring)

[

#### 📄️ Scaling

Horizon enables different logical tiers that can be scaled independently for increasing throughput, isolation, and availability. The following components can be independently scaled:

](/docs/data/apis/horizon/admin-guide/scaling)

[

#### 📄️ Upgrading

Here we'll describe the recommended steps for upgrading a Horizon 2.x installation.

](/docs/data/apis/horizon/admin-guide/upgrading)

[

#### 📄️ Ingestion Filtering

Overview

](/docs/data/apis/horizon/admin-guide/ingestion-filtering)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/horizon/admin-guide/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/data/apis/horizon/admin-guide](https://developers.stellar.org/docs/data/apis/horizon/admin-guide)_

---

## Sección 26 - Docs Data Apis Horizon Api Reference

### API Reference | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/horizon/api-reference
**Fecha de extracción:** 2025-07-12T01:17:55.389Z

---

---

source: https://developers.stellar.org/docs/data/apis/horizon/api-reference
generated: 2025-07-12T01:17:55.389Z

---

### API Reference

View all Horizon API information.

[

#### 🗃️ Resources

11 items

](/docs/data/apis/horizon/api-reference/resources)

[

#### 🗃️ Structure

6 items

](/docs/data/apis/horizon/api-reference/structure)

[

#### 🗃️ Aggregations

4 items

](/docs/data/apis/horizon/api-reference/aggregations)

[

#### 🗃️ Errors

4 items

](/docs/data/apis/horizon/api-reference/errors)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/horizon/api-reference/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/data/apis/horizon/api-reference](https://developers.stellar.org/docs/data/apis/horizon/api-reference)_

---

## Sección 27 - Docs Data Apis Horizon

### Access Blockchain Data with Horizon API: Query Transactions, Accounts & More | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/horizon
**Fecha de extracción:** 2025-07-12T01:17:52.749Z

---

---

source: https://developers.stellar.org/docs/data/apis/horizon
generated: 2025-07-12T01:17:52.749Z

---

On this page

### Horizon Introduction

> **INFO**
>
> info
>
> On August 1, 2024, the publicly accessible SDF-hosted Horizon had its historical data truncated to one year. That update optimized the performance of the publicly accessible Horizon and ensured a streamlined experience for all users. Consider third-party ecosystem providers of Horizon, which may provide a longer history retention window as well as other features.

Horizon provides an HTTP API to data in the Stellar network. It ingests and re-serves the data produced by the Stellar network in a form that is easier to consume by the average application relative to the performance-oriented data representations used by Stellar Core. This API serves the bridge between apps and [Stellar Core](/docs/validators). Projects like wallets, decentralized exchanges, and asset issuers use Horizon to submit transactions, query an account balance, or stream events like transactions to an account.

Horizon can be accessed via cURL, a browser, or one of the [Stellar SDKs](/docs/tools/sdks). To reduce the complexity of your project, we recommend you use an SDK instead of making direct API calls.

This guide describes how to administer a production Horizon instance (refer to the [Developers' Blog](https://www.stellar.org/developers-blog/a-new-sun-on-the-horizon) for some background on the performance and architectural improvements of this major version bump). For information about developing on the Horizon codebase, check out the [Development Guide](https://github.com/stellar/go/blob/master/services/horizon/internal/docs/GUIDE_FOR_DEVELOPERS.md).

Before we begin, it's worth reiterating the sentiment echoed in the [Core Node](/docs/validators) documentation: **we do not endorse running Horizon backed by a standalone Stellar Core instance**, and especially not by a _validating_ Stellar Core. These are two separate concerns, and decoupling them is important for both reliability and performance. Horizon instead manages its own, pared-down version of Stellar Core optimized for its own subset of needs (we'll refer to this as a "Captive Core" instance).

#### Why Run Horizon?[​](#why-run-horizon "Direct link to Why Run Horizon?")

Running Horizon within your own infrastructure provides a number of benefits. You can:

- Have full operational control without dependency on the Stellar Development Foundation for network data and transaction submission to networks;
- Run multiple instances for redundancy and scalability.

The Stellar Development Foundation (SDF) runs two instances of Horizon:

- [horizon-testnet.stellar.org](https://horizon-testnet.stellar.org/) for interacting with the [testnet](/docs/learn/fundamentals/networks)
- [horizon-futurenet.stellar.org](https://horizon-futurenet.stellar.org/) for interacting with the [futurenet](/docs/learn/fundamentals/networks)

#### In These Docs[​](#in-these-docs "Direct link to In These Docs")

- [Admin Guide](/docs/data/apis/horizon/admin-guide): how to set up your own Horizon instance.
- [Structure](/docs/data/apis/horizon/api-reference/structure): how Horizon is structured.
- [Resources](/docs/data/apis/horizon/api-reference/resources): descriptions of resources and their endpoints.
- [Aggregations](/docs/data/apis/horizon/api-reference/aggregations): descriptions of specialized endpoints.
- [Errors](/docs/data/apis/horizon/api-reference/errors): potential errors and what they mean.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/horizon/README.mdx)

Last updated on **Mar 12, 2025** by **Molly Karcher**

- [Why Run Horizon?](#why-run-horizon)
- [In These Docs](#in-these-docs)

---

_Extraído de [https://developers.stellar.org/docs/data/apis/horizon](https://developers.stellar.org/docs/data/apis/horizon)_

---

## Sección 28 - Docs Data Apis Rpc Admin Guide

### Admin Guide | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/rpc/admin-guide
**Fecha de extracción:** 2025-07-12T01:17:58.166Z

---

---

source: https://developers.stellar.org/docs/data/apis/rpc/admin-guide
generated: 2025-07-12T01:17:58.166Z

---

### Admin Guide

All you need to know about setting up, running, and using Stellar RPC.

[

#### 📄️ Prerequisites

The RPC service can be installed on bare metal or a virtual machine. It is natively supported on both Linux and Windows operating systems.

](/docs/data/apis/rpc/admin-guide/prerequisites)

[

#### 📄️ Installing

We offer three alternatives to deploy your own RPC instance:

](/docs/data/apis/rpc/admin-guide/installing)

[

#### 📄️ Configuring

For production, we recommend running Stellar RPC with a TOML configuration file rather than CLI flags. This is similar to creating a configuration file for Stellar-Core as we did previously. For example, using our docker image:

](/docs/data/apis/rpc/admin-guide/configuring)

[

#### 📄️ Running

You can run the stellar/stellar-rpc container with the following command:

](/docs/data/apis/rpc/admin-guide/running)

[

#### 📄️ Development

For local development, we recommend downloading and running a local instance via Docker Quickstart and running a local network or communicating with a live development \[Testnet\].

](/docs/data/apis/rpc/admin-guide/development)

[

#### 📄️ Monitoring

If you run Stellar RPC with the --admin-endpoint configured and expose the port, you'll have access to the Prometheus metrics via the /metrics endpoint. For example, if the admin endpoint is 0.0.0.0

](/docs/data/apis/rpc/admin-guide/monitoring)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/rpc/admin-guide/README.mdx)

Last updated on **Mar 20, 2025** by **Alfonso Acosta**

---

_Extraído de [https://developers.stellar.org/docs/data/apis/rpc/admin-guide](https://developers.stellar.org/docs/data/apis/rpc/admin-guide)_

---

## Sección 29 - Docs Data Apis Rpc Api Reference

### API Reference | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/rpc/api-reference
**Fecha de extracción:** 2025-07-12T01:17:59.545Z

---

---

source: https://developers.stellar.org/docs/data/apis/rpc/api-reference
generated: 2025-07-12T01:17:59.545Z

---

### API Reference

View all RPC API information.

[

#### 🗃️ Methods

12 items

](/docs/data/apis/rpc/api-reference/methods)

[

#### 🗃️ Structure

3 items

](/docs/data/apis/rpc/api-reference/structure)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/rpc/api-reference/README.mdx)

Last updated on **Mar 12, 2025** by **chowbao**

---

_Extraído de [https://developers.stellar.org/docs/data/apis/rpc/api-reference](https://developers.stellar.org/docs/data/apis/rpc/api-reference)_

---

## Sección 30 - Docs Data Apis Rpc

### Use the Stellar RPC to Access Blockchain Data, Query Transactions & More | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/apis/rpc
**Fecha de extracción:** 2025-07-12T01:17:56.801Z

---

---

source: https://developers.stellar.org/docs/data/apis/rpc
generated: 2025-07-12T01:17:56.801Z

---

On this page

### RPC Introduction

> **INFO**
>
> info
>
> Stellar-RPC was renamed from Soroban-RPC in Nov 2024. Additional context on this decision can be found on our [developer blog](https://stellar.org/blog/foundation-news/stellar-rpc-has-arrived).

Stellar RPC is a lightweight tool that provides real-time access to Stellar network data. Much like RPC nodes in other blockchain ecosystems, it allows developers to query the network efficiently. Whether you’re building a non-custodial wallet, issuing assets, or monitoring network activity, Stellar RPC is designed to provide trusted, stable infrastructure that anyone can run.

For any new builders coming to Stellar, Stellar RPC should be your starting point—it’s built to align with the growing needs of the ecosystem. RPC can be accessed via cURL or one of the [Stellar SDKs](/docs/tools/sdks).

#### Why Run RPC?[​](#why-run-rpc "Direct link to Why Run RPC?")

Running RPC within your own infrastructure provides a number of benefits. You can:

- Have full operational control without dependency on any third party provider for network data and transaction submission. The only way to harness the true power of a decentralized blockchain!
- Avoid the added overhead of directly interacting with [Stellar Core](/docs/validators), whose primary focus is performance and therefore provdes a very limited API
- Avoid the added overhead of storing way more data than your application actually needs, as would be the case when running [Horizon](/docs/data/apis/horizon)

What Stellar RPC is not:

- An indexer for historical data. RPC retains at maximum 7 days of historical data.
- A primary backend service for your application. Use RPC as your gateway to the blockchain, but ingest and index only the data you care about.
- A drop-in replacement for Horizon. Horizon provides several indexing features not commonly supported by RPC nodes. We believe these business opportunities should be passed back to third party applications (indexers, analytics providers, etc) and away from the SDF.

#### In These Docs[​](#in-these-docs "Direct link to In These Docs")

- [Admin Guide](/docs/data/apis/rpc/admin-guide): how to set up and operate your own RPC instance.
- [RPC Methods](/docs/data/apis/rpc/api-reference/methods): descriptions of RPC methods, including their expected inputs and outputs.
- [Structure](/docs/data/apis/rpc/api-reference/structure): how the RPC API is structured.
- [Ecosystem Providers](/docs/data/apis/api-providers): third party providers that provide RPC instances as a service.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/apis/rpc/README.mdx)

Last updated on **Mar 12, 2025** by **Molly Karcher**

- [Why Run RPC?](#why-run-rpc)
- [In These Docs](#in-these-docs)

---

_Extraído de [https://developers.stellar.org/docs/data/apis/rpc](https://developers.stellar.org/docs/data/apis/rpc)_

---

## Sección 31 - Docs Data Indexers Build Your Own

### Build Your Own Indexer | Stellar Docs

**URL:** https://developers.stellar.org/docs/data/indexers/build-your-own
**Fecha de extracción:** 2025-07-12T01:18:00.929Z

---

---

source: https://developers.stellar.org/docs/data/indexers/build-your-own
generated: 2025-07-12T01:18:00.929Z

---

On this page

### Build Your Own Indexer

Learn about the services and tools that you can build custom indexing with.

#### [Galexie](/docs/data/indexers/build-your-own/galexie)[​](#galexie "Direct link to galexie")

Galexie is a tool for acquiring Stellar ledger metadata from the network and exporting to external storage,a data lake. Galexie is the foundation of the Composable Data Pipeline (CDP) and serves as the first step in extracting raw Stellar ledger metadata and making it accessible. Learn more about CDP’s benefits and applications in [this blog post](https://stellar.org/blog/developers/composable-data-platform).

- \*Why Use It:\*\*

* You want to maintain a data lake of pre-computed ledger metadata for historical and currently closed network ledgers.

#### [Ingest SDK](/docs/data/indexers/build-your-own/ingest-sdk)[​](#ingest-sdk "Direct link to ingest-sdk")

A set of Golang packages which can be used within application as a programmatic domain model to interact with Stellar network.

- \*Why Use It:\*\*

* You want rapid development of applications in Golang which can acquire and parse ledger meta data and ledger entries from Stellar network.
* You want an intuitive, compile-time, type-safe application developer experience.
* You want to programatically access History Archives to retrieve ledger entries.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/data/indexers/build-your-own/README.mdx)

Last updated on **Mar 18, 2025** by **shawn**

- [Galexie](#galexie)
- [Ingest SDK](#ingest-sdk)

---

_Extraído de [https://developers.stellar.org/docs/data/indexers/build-your-own](https://developers.stellar.org/docs/data/indexers/build-your-own)_

---

## Sección 32 - Docs Learn Fundamentals Anchors

### Learn About Anchors: On/Off Ramps for Bridging Traditional Finance & Blockchain | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/anchors
**Fecha de extracción:** 2025-07-12T01:18:27.226Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/anchors
generated: 2025-07-12T01:18:27.226Z

---

On this page

### Anchors

#### Overview[​](#overview "Direct link to Overview")

An anchor is a Stellar-specific term for the on and off-ramps that connect the Stellar network to traditional financial rails, such as financial institutions or fintech companies. Anchors accept deposits of fiat currencies (such as the US dollar, Argentine peso, or Nigerian naira) via existing rails (such as bank deposits or cash-in points), then sends the user the equivalent digital tokens on the Stellar network. The equivalent digital tokens can either represent that same fiat currency or another digital token altogether. Alternatively, anchors allow token holders to redeem their tokens for the real-world assets they represent.

Stellar has anchor services operating worldwide. View the [Anchor Directory](https://resources.stellar.org/anchors?) for more information on existing Stellar anchors.

Anchors can issue their own assets on the Stellar network, or they can honor assets that already exist.

You can set up an anchor by using the SDF-maintained [Anchor Platform](/platforms/anchor-platform), which is the easiest way to deploy an anchor service compatible with Stellar Ecosystem Proposals (SEPs).

Learn how to integrate anchor services into your blockchain-based application by viewing the [Build Apps section](/docs/build/apps/overview). If you’re looking specifically for MoneyGram Ramps, see the Integrate with [MoneyGram Ramps tutorial](https://developer.moneygram.com/moneygram-developer/docs/integrate-moneygram-ramps).

#### Stellar Ecosystem Proposals (SEPs)[​](#stellar-ecosystem-proposals-seps "Direct link to Stellar Ecosystem Proposals (SEPs)")

Stellar is an open-source network that is designed to interoperate with traditional financial institutions, various types of assets, and other networks. Network participants implement Stellar Ecosystem Proposals (SEPs) to ensure they can interoperate with other products and services on the network. SEPs are publicly created, open-source documents that live in a [GitHub repository](https://github.com/stellar/stellar-protocol/tree/master/ecosystem#stellar-ecosystem-proposals-seps.mdx) and they define how anchors, asset issuers, applications, exchanges, and other service providers should interact and interoperate.

Read more about SEPs in the [SEPs section](/docs/learn/fundamentals/stellar-ecosystem-proposals).

For anchors, the most important SEPs are [SEP-6](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md): Programmatic Deposit and Withdrawal, [SEP-24](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md): Hosted Deposit and Withdrawal, and [SEP-31](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0031.md): Cross Border Payments API. You’ll also work with [SEP-10](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md): Stellar Authentication, [SEP-12](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md): KYC API, and [SEP-38](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0038.md): Anchor RFQ API.

##### Using SEP-6: Programmatic Deposit and Withdrawal versus SEP-24: Hosted Deposit and Withdrawal[​](#using-sep-6-programmatic-deposit-and-withdrawal-versus-sep-24-hosted-deposit-and-withdrawal "Direct link to Using SEP-6: Programmatic Deposit and Withdrawal versus SEP-24: Hosted Deposit and Withdrawal")

A user typically must decide whether they want to set up an anchor using [SEP-6: Programmatic Deposit and Withdrawal](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md) or [SEP-24: Hosted Deposit and Withdrawal](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md). Here are the differences and what to consider when choosing one or the other.

###### SEP-6: Programmatic Deposit and Withdrawal[​](#sep-6-programmatic-deposit-and-withdrawal "Direct link to SEP-6: Programmatic Deposit and Withdrawal")

Defines the standard way for anchors and wallets to interact on behalf of users. With this SEP’s guidance, wallets and other clients can interact with anchors directly without the user needing to leave the wallet to go to the anchor’s site. With SEP-6, the client collects KYC information from the user.

Wallets (clients) must take into consideration when using SEP-6:

- Clients must collect KYC information they may not need
- Clients must know what information to collect per-anchor
- Clients must send the information in a standardized format [(SEP-12: KYC API)](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md)
- Anchors must receive the information via SEP-12’s API

###### SEP-24: Hosted Deposit and Withdrawal[​](#sep-24-hosted-deposit-and-withdrawal "Direct link to SEP-24: Hosted Deposit and Withdrawal")

Defines the standard way for anchors and wallets to interact on behalf of users interactively. This means that the user’s application must open a webview hosted by a third-party anchor for the user to provide the information necessary to complete the transaction. With SEP-24, the anchor collects KYC information from the user.

Wallets (clients) must take into consideration when using SEP-24:

- Clients don’t have to collect the anchor’s required KYC information
- Clients & anchors don’t have to implement [SEP-12: KYC API](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md)
- Anchors must create a UI to be rendered by many clients
- Clients must allow anchors to temporarily control UX

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/anchors.mdx)

Last updated on **May 1, 2025** by **Bri Wylde**

- [Overview](#overview)
- [Stellar Ecosystem Proposals (SEPs)](#stellar-ecosystem-proposals-seps)
  - [Using SEP-6: Programmatic Deposit and Withdrawal versus SEP-24: Hosted Deposit and Withdrawal](#using-sep-6-programmatic-deposit-and-withdrawal-versus-sep-24-hosted-deposit-and-withdrawal)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/anchors](https://developers.stellar.org/docs/learn/fundamentals/anchors)_

---

## Sección 33 - Docs Learn Fundamentals Fees Resource Limits Metering

### Understanding Fees, Resource Limits, and Metering for Transactions | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering
**Fecha de extracción:** 2025-07-12T01:18:28.646Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering
generated: 2025-07-12T01:18:28.646Z

---

On this page

### Fees, Resource Limits, and Metering

#### Fees overview[​](#fees-overview "Direct link to Fees overview")

Stellar requires a fee for all transactions to make it to the ledger. This helps prevent spam and prioritizes transactions during traffic surges. All fees are paid using the native Stellar token, the [lumen (or XLM)](/docs/learn/fundamentals/lumens).

There are two types of fees on Stellar:

- \*Resource fee: _only applies to smart contract transactions_\*\*. The amount the submitter must pay for their transaction to execute. This amount is based on a transaction’s resource consumption and the state of network storage (described in the [Storage Dynamic Pricing section](#dynamic-pricing-for-storage)). Read about resource fees [below](#resource-fee).

- \*Inclusion fee:\*\* the maximum amount the submitter is willing to pay for the transaction to be included in the ledger. Read more [below](#inclusion-fee).

When competing for space on the ledger, smart contract transactions are _only_ competing with other smart contract transactions, and transactions that do not execute a smart contract are _only_ competing with other transactions that do not execute a smart contract.

The lumens collected from transaction fees go into a locked account and are not given to or used by anyone.

#### Resource fee[​](#resource-fee "Direct link to Resource fee")

All smart contract transactions require a resource fee in addition to an inclusion fee:

`Transaction Fee (Tx.fee) = Resource Fee (sorobanData.resourceFee) + Inclusion Fee`

Transactions that do not execute a smart contract can be thought of as having a resource fee of zero (`resourceFee == 0`). Conversely, for smart contract transactions, you can subtract the resource fee from the total transaction fee to derive the equivalent classic transaction fee component, which is the inclusion fee.

![Soroban Fees](/assets/images/soroban_fees-c0afa3ae1112b7796ebc41c9af789389.png) _\* Diagram: Solid line boxes are what is actually present in the transaction, while dotted lines are derivable._

Smart contracts on Stellar use a multidimensional resource fee model that charges fees for several resource types using [network-defined rates](/docs/networks/resource-limits-fees). The resource fee is calculated based on the resource consumption declared in the transaction and can fluctuate based on a mutable storage write fee (more on that in the [Storage Dynamic Pricing section](#dynamic-pricing-for-storage) below). If the transaction attempts to exceed the declared resource limits, it will fail. If the transaction uses fewer resources than declared, there will be no refunds [(with a couple of exceptions)](#refundable-and-non-refundable-resource-fees).

The resource fee depends on the following resources:

- **Instructions:** the number of CPU instructions the transaction uses, metered by the host environment;
- **Ledger entry accesses:** reading or writing any single ledger entry (any storage key in the contract context);
- **Ledger I/O:** the number of bytes read from or written to the ledger;
- **Transaction size:** the size of the transaction submitted to the network in bytes;
- **Events & return value size:** the size of the events produced by the contract and the return value of the top-level contract function — both events and return value are included in transaction metadata;
- **Ledger space rent:** the payment for the ledger entry TTL extensions (i.e., rent payments) and rent payments for increasing ledger entry size. Refer to the [state archival](/docs/learn/fundamentals/contract-development/storage/state-archival) section for more information about smart contract rent.

> **NOTE**
>
> note
>
> Some parameters may contribute to multiple fee components. For example, the transaction size is charged for network propagation (as network bandwidth is limited) and for historical storage (as storing ledger history is not free).

The implementation details for fee computation are provided by the following [library](https://github.com/stellar/rs-soroban-env/blob/main/soroban-env-host/src/fees.rs). This library is used by the protocol to compute the fees and thus can be considered canonical. The resource fee rates may be updated based on consensus from the network validators.

Find current resource fees in the [Resource Limits & Fees](/docs/networks/resource-limits-fees) page in the Networks section.

For help in analyzing smart contract cost and efficiency, see this [How-To Guide](/docs/build/guides/fees/analyzing-smart-contract-cost).

##### Refundable and non-refundable resource fees[​](#refundable-and-non-refundable-resource-fees "Direct link to Refundable and non-refundable resource fees")

The resource fee is calculated with a non-refundable fees portion and a refundable fees portion: `ResourceFee(sorobanData.resourceFee) = Non-refundable resource fee + Refundable resource fees`.

- \*Non-refundable fees:\*\* calculated from CPU instructions, read bytes, write bytes, and bandwidth (transaction size, including its signatures).

- \*Refundable fees:\*\* calculated from rent, events, and return value. Refundable fees are charged from the source account before the transaction is executed and then refunded based on actual usage. However, the transaction will fail if `refundableFee` is not enough to cover the actual resource usage.

##### Find a transaction’s resource fee[​](#find-a-transactions-resource-fee "Direct link to Find a transaction’s resource fee")

The best way to find the required resource fee for any smart contract transaction is to use the [`simulateTransaction` endpoint](/docs/learn/fundamentals/contract-development/contract-interactions/transaction-simulation) from the RPC, which enables you to dry run the execution of a transaction to compute the necessary resource values and fees.

##### Resource limitations[​](#resource-limitations "Direct link to Resource limitations")

> **NOTE**
>
> note
>
> Only smart contract transactions are subject to resource limitations.

Stellar’s ledger close time is constrained to a few seconds, preventing the execution of arbitrarily large transactions, regardless of the resource fees involved. All resources mentioned in the prior section are subject to a per-transaction limit. A transaction’s memory (RAM) is also capped, though not subject to any charge.

Resource limits are determined by a validator vote and can be adjusted based on network usage and ecosystem needs with a validator consensus.

Find current resource limits in the [Resource Limits & Fees](/docs/networks/resource-limits-fees) page in the Networks section.

#### Inclusion fee[​](#inclusion-fee "Direct link to Inclusion fee")

The inclusion fee is the maximum bid (a bid denotes a dynamic fee, meaning it varies based on certain network conditions) the submitter is willing to pay for the transaction to be included in the ledger. The inclusion fee equals the number of operations in the transaction multiplied by the effective base fee for the given ledger: `inclusion fee = # of operations * effective base fee`

- \*Effective base fee:\*\* the fee required per operation for a transaction to make it to the ledger. This cannot be lower than 100 stroops per operation (the network minimum).

- \*Stroop:\*\* the smallest unit of a lumen, one ten-millionth of a lumen (.0000001 XLM).

> **NOTE**
>
> note
>
> Transactions can have up to 100 operations per transaction except for transactions that execute a smart contract. Smart contract transactions are only allowed one operation per transaction (unless the transaction is getting [fee-bumped](/docs/learn/encyclopedia/transactions-specialized/fee-bump-transactions); this would add another operation), and the limits are instead specified in CPU instructions and other resource limits.

When you set a base fee for a transaction, you are specifying the maximum amount you are willing to pay per operation in that transaction. This doesn’t necessarily mean you’ll pay that amount. You’ll only be charged the lowest amount needed for your transaction to make it to the ledger. If network traffic is light and the number of submitted operations or transactions is below the network ledger limit (configured by validators: currently 1,000 non-smart-contract operations and 100 smart contract transactions), you will only pay the network minimum (configured by validators, currently 100 stroops).

Alternatively, your transaction may not make it to the ledger if the effective base fee is higher than your base fee bid. When network traffic exceeds the ledger limit, the network enters into [surge pricing mode](#surge-pricing), and your effective base fee becomes your maximum bid.

Fees are deducted from the source account unless there is a fee-bump transaction that states otherwise. Learn about fee-bump transactions in the [Fee-Bump Transaction section](/docs/learn/encyclopedia/transactions-specialized/fee-bump-transactions).

#### Surge and dynamic pricing[​](#surge-and-dynamic-pricing "Direct link to Surge and dynamic pricing")

##### Surge pricing[​](#surge-pricing "Direct link to Surge pricing")

The network can enter surge pricing mode under two circumstances: 1. when the number of operations submitted to a ledger exceeds the network capacity (1,000 operations for transactions that do not execute smart contracts), or 2. if there is competition between smart contract transactions for a particular resource (instructions, ledger entry accesses (reads and writes), ledger IO (bytes read and bytes written), and the total size of transactions to be applied). During this time, the network uses market dynamics to decide which transactions to include in the ledger. Transactions that offer a higher maximum base fee bid make it to the ledger first.

During surge pricing mode, transactions are sorted based on their inclusion fee amount, and the user pays the minimum inclusion fee in their transaction set. For example, if there are five transactions with respective inclusion fees of 2, 3, 4, 4, and 5 XLM, and only four of them an make it to the ledger, then all included transactions pay the inclusion fee of 3 XLM. If all five transactions can make it to the ledger (which would mean the network is not in surge pricing mode), each would pay the minimum inclusion fee of 100 stroops (.00001 XLM).

If there are multiple transactions offering the same inclusion fee, but they cannot all fit into the ledger, transactions are picked randomly so that the total operations for the entire set don’t exceed 1,000. The rest of the transactions are pushed to the next ledger or discarded if they’ve been waiting for too long. If your transaction is discarded, Horizon will return a timeout error.

> **NOTE**
>
> note
>
> It is recommended to apply [ledger bounds](/docs/learn/fundamentals/transactions/operations-and-transactions#ledger-bounds) or [time bounds](/docs/learn/fundamentals/transactions/operations-and-transactions#time-bounds) to transactions — either your transaction makes it to the ledger or fails, depending on your time and/or ledger parameters.

- \*You are more likely to pay a higher inclusion fee when submitting smart contract transactions.\*\* Smart contract transactions have tighter ledger limits than transactions that don’t interact with smart contracts and will therefore experience surge pricing more often. You are more likely to pay your maximum inclusion fee bid or, at least, the minimum inclusion fee bid in your transaction set. So, you must plan your fee bidding strategy accordingly.

##### Dynamic pricing for storage[​](#dynamic-pricing-for-storage "Direct link to Dynamic pricing for storage")

Stellar’s storage database size is determined by two forces: the rate of additions (writes) and the rate of deletions (evictions). Stellar has set a ledger growth threshold to a constant value (the `BucketListTargetSizeBytes` network parameter, implemented to prevent explosive state growth and subject to change based on validator vote). Because there is a fixed capacity, write fees are based on the ledger size and can alter dynamically based on that size.

When the ledger size is large, there is a higher demand for storage space, which causes a higher write fee. Over time, entries are archived, reducing the overall ledger size and, thereby, reducing storage pricing. This fee model is designed as if the database size represents the current demand for storage at any given instant.

Write fees will grow gradually over time when the database size is below the ledger growth threshold and will grow linearly, but with a 1,000x factor after exceeding that threshold. This is a safeguard against spam and is not anticipated under normal circumstances.

#### Metering[​](#metering "Direct link to Metering")

Metering is a mechanism in the host environment that accounts for the resource costs incurred during the execution of a smart contract. The outcomes of metering act as the canonical truth of a smart contract’s execution cost and serve as an input for fee computations.

Stellar’s smart contract execution environment comprises a host and a guest. The host encapsulates shared functionalities for all contracts, including host objects, functions, and a Wasm interpreter (VM). The guest environment is where the compiled Wasm contract is interpreted and executed. A detailed discussion of these environments can be found in [Environment Concepts](/docs/learn/fundamentals/contract-development/environment-concepts).

The division between the host and guest environments and their shared functionalities necessitates a unique approach to resource accounting. In particular, the resources required for executing Wasm instructions and running host functions must be accounted for uniformly, with costs in terms of CPU instructions and memory bytes.

Consider two contracts: A and B, both comprising the same number of Wasm instructions. If Contract A repeatedly calls host functions for complex computations while Contract B executes pure arithmetic operations within the VM, Contract A should be more costly, and this difference should be accurately represented in the metering process.

Metering ensures fairness, thwarts resource manipulation and attacks, and generates a deterministic and reproducible measure of runtime resource costs.

##### Methodology[​](#methodology "Direct link to Methodology")

To maintain equivalence in metering between the host and guest, computation costs on both sides are expressed in terms of CPU instructions and memory bytes (representing CPU and RAM usage). Metering and limit-checking occur within the host environment, and pre-calibrated numerical models ensure results are deterministic.

##### Cost types[​](#cost-types "Direct link to Cost types")

Metering is segmented into host components, referred to as **cost types**. Each cost type can be viewed as a “meta instruction” symbolizing a specific host operation with a known complexity that depends on a runtime input. For instance, cost type `ComputeSha256Hash` represents the cost of computing the SHA256 hash of a byte array.

> **INFO**
>
> info
>
> Execution of Wasm instructions is accounted for as a host cost type `WasmInsnExec`, which has a constant CPU cost per Wasm instruction. This methodology treats guest instructions and host executions equivalently.

Find a complete list of host cost types and their definitions here: [`ContractCostType`](https://github.com/stellar/stellar-xdr/blob/e372df9f677961aac04c5a4cc80a3667f310b29f/Stellar-contract-config-setting.x#L92-L155).

##### Cost parameters[​](#cost-parameters "Direct link to Cost parameters")

Cost types are carefully selected to:

1.  Serve as comprehensive building blocks for all significant contract execution costs;
2.  Ensure each component cost increases at most linearly (i.e., constant or linear) with respect to its input. That is, `y = a + bx`, where `y` is the cost output, `x` is the input, and `a` & `b` are the constant and linear model parameters, respectively.

Each cost type has a separate model for both resource types (CPU and memory).

The parameters for each model, `a` and `b`, are calibrated and fitted offline against inputs of various sizes. The collection of all model cost parameters from the network configurable entries (see [`ConfigSettingsEntry`](https://github.com/stellar/stellar-xdr/blob/e372df9f677961aac04c5a4cc80a3667f310b29f/Stellar-contract-config-setting.x#L223-L226) can be updated through network consensus.

##### Metering process[​](#metering-process "Direct link to Metering process")

Before contract execution, the host environment is prepared with the cost parameters and a budget defining the resource limits. Metering is then implemented to measure the cumulative resource consumption during host execution.

During execution, whenever a component (a code block defining a cost type) is encountered, the corresponding model computes the resource output from the runtime input and increments the meter accordingly. The meter checks the cumulative consumption against the budget limit. If the limit is exceeded, an error is produced, and execution is terminated.

If the contract execution concludes within the specified resource limits, the metered total of CPU instructions is recorded and utilized as the input for fee calculation. While memory usage is not included in the fee computation, it is nevertheless subject to the resource limits.

#### Inclusion fee pricing strategies[​](#inclusion-fee-pricing-strategies "Direct link to Inclusion fee pricing strategies")

There are two primary methods to deal with inclusion fee fluctuations and surge pricing:

- [**Method 1:**](#set-the-highest-fee-youre-comfortable-paying) set the highest fee you’re comfortable paying. This does not mean that you’ll pay that amount on every transaction — you will only pay what’s necessary to get into the ledger. Under normal (non-surge) circumstances, you will only pay the standard fee even with a higher maximum fee set. This method is simple, convenient, and efficient but can still potentially fail.
- [**Method 2:**](#fee-bumps-on-past-transactions) resubmit a transaction with a higher fee using a fee-bump transaction

##### Set the highest fee you’re comfortable paying​[​](#set-the-highest-fee-youre-comfortable-paying "Direct link to Set the highest fee you’re comfortable paying​")

In general, it’s a good idea to choose the highest fee you’re willing to pay per operation for your transaction to make it to the ledger. Wallet developers may want to offer users a chance to specify their own base fee, though it may make more sense to set a persistent global base fee that’s above the market rate since the average user probably doesn’t care if they’re paying 0.8 cents or 0.00008 cents.

Remember that you’re more likely to pay your maximum fee bid with smart contract transactions.

##### Fee-bumps on past transactions​[​](#fee-bumps-on-past-transactions "Direct link to Fee-bumps on past transactions​")

Even with a liberal fee-paying policy, your transaction may fail to make it into the ledger due to insufficient funds or untimely surges. Fee-bump transactions can solve this problem. The following snippet shows you how to resubmit a transaction with a higher fee (as long as you have the original transaction envelope):

- JavaScript

```
// Let `lastTx` be some transaction that fails submission due to high fees, and// `lastFee` be the maximum fee (expressed as an int) willing to be paid by// `account` for `lastTx`.server.submitTransaction(lastTx).catch(function (error) {  if (isFeeError(error)) {    let bump = sdk.TransactionBuilder.buildFeeBumpTransaction(      account,      // account that will PAY the new fee      lastFee * 10, // new fee      lastTx,       // the (entire) failing transaction      server.networkPassphrase    );    bump.sign(someAccount);    return server.submitTransaction(bump);  }  // ...other error conditions...}).then(...);
```

Suppose you submit two distinct transactions with the same source account and sequence number; the second transaction is a fee-bump transaction. In that case, the second transaction will be included in the transaction queue, replacing the first transaction if and only if the fee bid of the second transaction is at least 10x the fee bid of the first transaction.

This value can typically be found in the `fee_charged` field of the transaction response under the `tx_insufficient_fee` error case.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/fees-resource-limits-metering.mdx)

Last updated on **Jun 19, 2025** by **Fifo (Fabricius Zatti)**

- [Fees overview](#fees-overview)
- [Resource fee](#resource-fee)
  - [Refundable and non-refundable resource fees](#refundable-and-non-refundable-resource-fees)
  - [Find a transaction’s resource fee](#find-a-transactions-resource-fee)
  - [Resource limitations](#resource-limitations)
- [Inclusion fee](#inclusion-fee)
- [Surge and dynamic pricing](#surge-and-dynamic-pricing)
  - [Surge pricing](#surge-pricing)
  - [Dynamic pricing for storage](#dynamic-pricing-for-storage)
- [Metering](#metering)
  - [Methodology](#methodology)
  - [Cost types](#cost-types)
  - [Cost parameters](#cost-parameters)
  - [Metering process](#metering-process)
- [Inclusion fee pricing strategies](#inclusion-fee-pricing-strategies)
  - [Set the highest fee you’re comfortable paying​](#set-the-highest-fee-youre-comfortable-paying)
  - [Fee-bumps on past transactions​](#fee-bumps-on-past-transactions)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering)_

---

## Sección 34 - Docs Learn Fundamentals Lumens

### Understanding Lumens, The Native Currency of the Network | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/lumens
**Fecha de extracción:** 2025-07-12T01:18:30.044Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/lumens
generated: 2025-07-12T01:18:30.044Z

---

On this page

### Lumens (XLM)

Lumens (XLM) are the native currency of the Stellar network. The lumen is the only token that doesn’t require an issuer or trustline. They are used to pay all transaction [fees](#transaction-fees), fund [rent](/docs/learn/fundamentals/fees-resource-limits-metering#resource-fee), and to cover [minimum balance requirements](/docs/learn/fundamentals/stellar-data-structures/accounts#base-reserves-and-subentries) on the network.

To read up on the basics of lumens, head over to our Stellar Learn site: [Stellar Learn: Lumens](https://www.stellar.org/lumens)

#### Transaction fees[​](#transaction-fees "Direct link to Transaction fees")

Stellar requires a small fee for all transactions to prevent ledger spam and prioritize transactions during surge pricing. Transaction fees are paid in lumens.

To learn about fees on Stellar, see our [Fees section](/docs/learn/fundamentals/fees-resource-limits-metering).

Smart contract transactions on Stellar employ a different fee structure based on an inclusion fee and resource consumption (which includes [rent](#rent)). Read more in the [Fees and Metering section](/docs/learn/fundamentals/fees-resource-limits-metering).

#### Base reserves[​](#base-reserves "Direct link to Base reserves")

A unit of measurement used to calculate an account’s minimum balance. One base reserve is currently 0.5 XLM.

Validators can vote to change the base reserve, but that’s uncommon and should only happen every few years.

#### Minimum balance[​](#minimum-balance "Direct link to Minimum balance")

Stellar accounts must maintain a minimum balance to exist, which is calculated using the base reserve. An account must always maintain a minimum balance of two base reserves (currently 1 XLM). Every subentry after that requires an additional base reserve (currently 0.5 XLM) and increases the account’s minimum balance. Subentries include trustlines (for both traditional assets and pool shares), offers, signers, and data entries. An account cannot have more than 1,000 subentries.

Data also lives on the ledger as ledger entries. Ledger entries include claimable balances (which require a base reserve per claimant) and liquidity pool deposits and withdrawals.

For example, an account with one trustline, two offers, and a claimable balance with one claimant has a minimum balance of:

2 base reserves (1 XLM) + 3 subentries/base reserves (1.5 XLM) + 1 ledger entry/base reserve (1 XLM) = 3.5 XLM

When you close a subentry, the associated base reserve will be added to your available balance. An account must always pay its own minimum balance unless a subentry is being sponsored by another account. For information about this, see our [Sponsored Reserves Encyclopedia Entry](/docs/learn/encyclopedia/transactions-specialized/sponsored-reserves).

#### Rent[​](#rent "Direct link to Rent")

Smart contract data does not require any base reserves in order to live on the ledger, so every smart contract entry must pay rent instead. The rent charged for an entry to exist on the ledger is based on how big the entry is and how long the it should be live on the ledger before being archived. There are different rent requirements for each storage type `Persistent`, `Temporary`, and `Instance`, which you can read about in the [State Archival section](/docs/learn/fundamentals/contract-development/storage/state-archival).

#### Lumen Supply Metrics[​](#lumen-supply-metrics "Direct link to Lumen Supply Metrics")

This section explains how lumen supply metrics are calculated and made available via API. This information can be useful for products and services that track the distribution of XLM, including market cap aggregators and some exchanges, or to anyone who wants to investigate the distribution of XLM defined by the SDF mandate.

Unlike many other blockchains, the native network currency is not created through mining- all XLM that has ever existed and will ever exist was created when the Stellar network went live.

[SDF’s Dashboard API endpoint](https://dashboard.stellar.org/api/v2/lumens) will always have the live totals for the essential numbers around lumens. This guide explains important supply metrics like Original Supply, Total Supply, and Circulating Supply entailed in that data.

Please reference our [Ecosystem Horizon API Providers](/docs/data/apis/api-providers) to access more Stellar network data via Horizon.

##### Dashboard API[​](#dashboard-api "Direct link to Dashboard API")

As of May 28th, 2024, the Dashboard API shows:

- JSON

```json
{
  "updatedAt": "2024-05-28T16:11:14.622Z",
  "originalSupply": "100000000000",
  "inflationLumens": "5443902087.3472865",
  "burnedLumens": "55442115112.9537534",
  "totalSupply": "50001786974.3935331",
  "upgradeReserve": "259580243.9842749",
  "feePool": "4690537.8610771",
  "sdfMandate": "20761482987.7713113",
  "circulatingSupply": "28976033204.7768698",
  "_details": "https://www.stellar.org/developers/guides/lumen-supply-metrics.html"
}
```

##### Definitions[​](#definitions "Direct link to Definitions")

- \*originalSupply\*\* One hundred billion lumens [were created](https://stellar.expert/explorer/public/ledger/2) when the Stellar network went live. That’s the Original Supply for the network.

- \*inflationLumens\*\* For the first five or so years of Stellar’s existence, the supply of lumens increased by 1% annually. This “network inflation” was ended by validator vote on October 28, 2019. The total number of lumens generated by inflation was 5,443,902,087.3472865.

Adding this number to the Original Supply, you get the total lumens that have ever existed: 105,443,902,087.3472865. This number is visible on the [List All Ledgers](/docs/data/apis/horizon/api-reference/list-all-ledgers) Horizon API endpoint as `_embedded.records.total_coins`. See all Stellar Mainnet Horizon data providers [here](/docs/data/apis/api-providers).

- \*burnedLumens\*\* These are all the lumens sent to accounts with no signers, meaning the funds are inaccessible and have been removed forever from Stellar’s lumen supply.

While any address with no signers is counted here, the vast majority of the lumens in this sum are in a single locked address. On November 4, 2019, SDF [reduced](https://www.stellar.org/blog/sdfs-next-steps/) its lumen holdings to better reflect its mission and the growth of the Stellar ecosystem. To do so, the Foundation sent 55,442,095,285.7418 lumens to [GALA…LUTO](https://stellar.expert/explorer/public/account/GALAXYVOIDAOPZTDLHILAJQKCVVFMD4IKLXLSZV5YHO7VY74IWZILUTO).

- \*totalSupply\*\* The Total Supply is the number of lumens now in existence: 50,001,803,905.97172. The Total Supply includes four major categories of lumens, which the API treats in detail.

- \*upgradeReserve\*\* The Upgrade Reserve is a special address that’s neither circulating nor a part of SDF’s mandate. When Stellar [changed its consensus algorithm](https://www.stellar.org/blog/upgraded-network-is-here/) in 2015 and relaunched the network these lumens were set aside, to be claimed, one-for-one, by holders of the old network tokens. The [Upgrade Reserve account](https://stellar.expert/explorer/public/account/GBEZOC5U4TVH7ZY5N3FLYHTCZSI6VFGTULG7PBITLF5ZEBPJXFT46YZM) is essentially an escrow, and we don’t expect many claimants to come and pull those lumens into the circulating supply at this point.

- \*feePool\*\* The Fee Pool is where network fees collect. The lumens do not belong to any particular account. No one has access to the fee pool, so these lumens are non-circulating. Network validators could theoretically vote for a protocol change that would affect the fee pool, so we include it in the total supply. Stellar’s transaction fees are extremely low so the fee pool grows very slowly. The Fee Pool is tracked by the protocol itself, and the current number is visible on the [List All Ledgers](/docs/data/apis/horizon/api-reference/list-all-ledgers) Horizon API endpoint as `_embedded.records.fee_pool`. See all Stellar Mainnet Horizon data providers [here](/docs/data/apis/api-providers).

- \*sdfMandate\*\* The SDF Mandate is described in detail [here](https://www.stellar.org/foundation/mandate). The Foundation was funded by lumens generated at Stellar’s inception; all of those lumens will eventually be spent or distributed to enhance and promote Stellar. Here is a complete list of the addresses currently associated with the SDF Mandate:

* [Direct Development, Available Funds](https://stellar.expert/explorer/public/account/GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ)
* [Jan 1 2021 Escrow](https://stellar.expert/explorer/public/account/GBA6XT7YBQOERXT656T74LYUVJ6MEIOC5EUETGAQNHQHEPUFPKCW5GYM)
* [Jan 1 2022 Escrow](https://stellar.expert/explorer/public/account/GD2D6JG6D3V52ZMPIYSVHYFKVNIMXGYVLYJQ3HYHG5YDPGJ3DCRGPLTP)
* [Jan 1 2023 Escrow](https://stellar.expert/explorer/public/account/GA2VRL65L3ZFEDDJ357RGI3MAOKPJZ2Z3IJTPSC24I4KDTNFSVEQURRA)
* [Direct Development (Hot 1)](https://stellar.expert/explorer/public/account/GCEZYB47RSSSR6RMHQDTBWL4L6RY5CY2SPJU3QHP3YPB6ALPVRLPN7OQ)
* [Direct Development (Hot 2)](https://stellar.expert/explorer/public/account/GATL3ETTZ3XDGFXX2ELPIKCZL7S5D2HY3VK4T7LRPD6DW5JOLAEZSZBA)
* [Direct Development (Hot 3)](https://stellar.expert/explorer/public/account/GCVLWV5B3L3YE6DSCCMHLCK7QIB365NYOLQLW3ZKHI5XINNMRLJ6YHVX)
* [Developer Support](https://stellar.expert/explorer/public/account/GCVJDBALC2RQFLD2HYGQGWNFZBCOD2CPOTN3LE7FWRZ44H2WRAVZLFCU)
* [Developer Support (Hot)](https://stellar.expert/explorer/public/account/GCKJZ2YVECFGLUDJ5T7NZMJPPWERBNYHCXT2MZPXKELFHUSYQR5TVHJQ)
* [Currency Support](https://stellar.expert/explorer/public/account/GAMGGUQKKJ637ILVDOSCT5X7HYSZDUPGXSUW67B2UKMG2HEN5TPWN3LQ)
* [New Products](https://stellar.expert/explorer/public/account/GCPWKVQNLDPD4RNP5CAXME4BEDTKSSYRR4MMEL4KG65NEGCOGNJW7QI2)
* [Enterprise Fund](https://stellar.expert/explorer/public/account/GDUY7J7A33TQWOSOQGDO776GGLM3UQERL4J3SPT56F6YS4ID7MLDERI4)
* [Marketing Support](https://stellar.expert/explorer/public/account/GBEVKAYIPWC5AQT6D4N7FC3XGKRRBMPCAMTO3QZWMHHACLHTMAHAM2TP)
* [In-App Distribution](https://stellar.expert/explorer/public/account/GDKIJJIKXLOM2NRMPNQZUUYK24ZPVFC6426GZAEP3KUK6KEJLACCWNMX)
* [In-App Distribution (Hot)](https://stellar.expert/explorer/public/account/GAX3BRBNB5WTJ2GNEFFH7A4CZKT2FORYABDDBZR5FIIT3P7FLS2EFOZZ)

- \*circulatingSupply\*\* The Circulating Supply is lumens in the hands of individuals and independent companies. These are lumens out in the world, used to pay network fees and fund Stellar accounts. They are also used as a general medium of exchange. We expect Stellar’s Circulating Supply to grow steadily as SDF spends and distributes lumens according to its mandate. Lumens in the Total Supply, but not in the SDF Mandate, Upgrade Reserve, or Fee Pool are assumed to be circulating.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/lumens.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Transaction fees](#transaction-fees)
- [Base reserves](#base-reserves)
- [Minimum balance](#minimum-balance)
- [Rent](#rent)
- [Lumen Supply Metrics](#lumen-supply-metrics)
  - [Dashboard API](#dashboard-api)
  - [Definitions](#definitions)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/lumens](https://developers.stellar.org/docs/learn/fundamentals/lumens)_

---

## Sección 35 - Docs Learn Fundamentals Networks

### Role & Usage of Stellar's Mainnet, Testnet & Futurenet | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/networks
**Fecha de extracción:** 2025-07-12T01:18:31.429Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/networks
generated: 2025-07-12T01:18:31.429Z

---

On this page

### Networks

Stellar has three networks: the public network (Mainnet, also called Pubnet or the Public Network), the test network (Testnet), and a dev network (Futurenet). Mainnet is the main network used by applications in production. It connects to real financial rails and requires XLM to cover minimum balances, transaction fees, and rent. The Testnet is a smaller, free-to-use network maintained by SDF that functions like the Mainnet but doesn’t connect to real money. It has a built-in testnet XLM faucet (called Friendbot), and it resets on a regular cadence, so it's the best place for developers to test applications when they need a stable environment that mirrors Mainnet functionality. Futurenet is a dev network you can use to test more bleeding edge features that also has access to its own Friendbot. It resets whenever a reset is necessary, so it's not as predictable as Testnet, but it is where new features may be introduced before they are implemented in stable releases.

#### Stats: Mainnet versus Testnet versus Futurenet[​](#stats-mainnet-versus-testnet-versus-futurenet "Direct link to Stats: Mainnet versus Testnet versus Futurenet")

##### Mainnet[​](#mainnet "Direct link to Mainnet")

- Validator nodes are run by the public
- SDF offers free [Horizon Testnet and Futurenet Instances](/docs/data/apis/api-providers#sdf-provided-horizon) to interact with the Testnet and Futurenet. The ecosystem has [Horizon providers](/docs/data/apis/api-providers) whom offer instances for Testnet and Mainnet. You can [run your own Horizon](/docs/data/apis/horizon/admin-guide/overview) or use an instance offered by an [infrastructure provider](/docs/data/apis/api-providers).
- You need to fund your account with XLM from another account
- Mainnet is limited to 1,000 operations per ledger and will be limited to a maximum of 100 smart contract transactions per ledger (the precise amount of smart contract txs per ledger can vary greatly depending on transaction [resource limits](/docs/learn/fundamentals/fees-resource-limits-metering#resource-limitations)).
  - See more detailed smart contract network settings in the section on [Fees and Metering](/docs/learn/fundamentals/fees-resource-limits-metering).
- No publicly available RPC, see RPC service providers [here](/docs/data/apis/api-providers)

##### Testnet[​](#testnet "Direct link to Testnet")

- SDF runs three core validator nodes
- SDF offers a free [Horizon instance](https://horizon-testnet.stellar.org/) you can use to interact with the Testnet
- Friendbot is a faucet you can use for free Testnet XLM
- Testnet is limited to 100 operations per ledger and one smart contract transaction per ledger
- SDF offers free RPC endpoints, more information [here](/docs/data/apis/api-providers#sdf-provided-rpc)

##### Futurenet[​](#futurenet "Direct link to Futurenet")

- SDF runs core validator nodes
- SDF offers a free [Horizon instance](https://horizon-futurenet.stellar.org) you can use to interact with the Futurenet
- Friendbot is a faucet you can use for free Futurenet XLM
- Futurenet is limited to 100 operations per ledger and one smart contract transaction per ledger
- SDF offers free RPC endpoints, more information [here](/docs/data/apis/api-providers#sdf-provided-rpc)

#### Friendbot[​](#friendbot "Direct link to Friendbot")

Friendbot is a bot that funds accounts with fake XLM on Testnet or Futurenet. You can request XLM from Friendbot using the [Stellar Lab](/docs/tools/lab/account) or with various SDKs. Requests to Friendbot are rate limited, so use it wisely. Friendbot provides 10,000 fake XLM when funding a new account.

If you are creating multiple accounts, you can fund your first account with Friendbot and then use that first account to fund your subsequent accounts using the Create Account operation.

#### Testnet and Futurenet data reset[​](#testnet-and-futurenet-data-reset "Direct link to Testnet and Futurenet data reset")

Testnet and Futurenet are reset periodically to the genesis ledger to declutter the network, remove spam, reduce the time needed to catch up on the latest ledger, and help maintain the system. Resets clear all ledger entries (accounts, trustlines, offers, smart contract data, etc.), transactions, and historical data from Stellar Core, Horizon, and the Stellar RPC- which is why developers should not rely on the persistence of accounts or the state of any balances when using Testnet or Futurenet.

Futurenet resets are on a less regular cadence than Testnet resets and don't have a set schedule.

Testnet resets typically happen once per quarter at 17:00 UTC and are announced at least two weeks in advance on the [Stellar Dashboard](http://dashboard.stellar.org/) and through several developer community channels.

Here are the scheduled 2025 dates:

- March 19, 2025
- June 18, 2025
- September 17, 2025
- December 17, 2025

If you run a Testnet or Futurenet Horizon instance, you need to re-join and re-sync to the network after a reset. Check out how to do that here: [Testnet Reset](https://github.com/stellar/packages/blob/master/docs/testnet-reset.md).

Check out [this How-To Guide](/docs/build/guides/basics/automate-reset-data) on automating Testnet and Futurenet reset data.

#### Test data automation[​](#test-data-automation "Direct link to Test data automation")

It is recommended that you have testing infrastructure that can repopulate the Testnet and Futurenet with useful data after a reset. This will make testing more reliable and will help you scale your testing infrastructure to a private network if you choose to do so. For example, you may want to:

- Generate issuers of assets for testing the development of a wallet;
- Generate orders on the order book (both current and historical) for testing the development of a trading client;
- Recreate liquidity pools;
- Redeploy smart contracts.

If you maintain an application, you should think about creating a data set that is representative enough to test your primary use cases, and allow for robust testing even when Testnet or Futurenet are not available.

A script can automate this entire process by creating an account with Friendbot and submitting a set of transactions that are predefined as a part of your testing infrastructure.

#### Network passphrases[​](#network-passphrases "Direct link to Network passphrases")

Stellar’s Mainnet, Testnet, and Futurenet each have their own unique passphrase. These are used when validating signatures on a given transaction. If you sign a transaction for one network but submit it to another, it won’t be considered valid. By convention, the format of a passphrase is ‘`[Network Name] ; [Month of Creation] [Year of Creation]`’.

The current passphrases for the Stellar Mainnet, Testnet, and Futurenet are:

- Mainnet: '`Public Global Stellar Network ; September 2015`'
- Testnet: '`Test SDF Network ; September 2015`'
- Futurenet: '`Test SDF Future Network ; October 2022`'

Passphrases serve two main purposes: (1) used as the seed for the root account (master network key) at genesis and (2) used to build hashes of transactions, which are ultimately what is signed by each signer’s secret key in a transaction envelope; this allows you to verify that a transaction was intended for a specific network by its signers.

Many SDKs have the passphrases hardcoded for Stellar's networks. If you’re running a private network, you’ll have to manually pass in a passphrase to be used whenever transaction hashes are generated. All of Stellar’s official SDKs allow you to use a network with a custom passphrase.

#### What Testnet and Futurenet should and should not be used for[​](#what-testnet-and-futurenet-should-and-should-not-be-used-for "Direct link to What Testnet and Futurenet should and should not be used for")

##### Testnet and Futurenet are good for[​](#testnet-and-futurenet-are-good-for "Direct link to Testnet and Futurenet are good for")

- Creating test accounts (with funding from Friendbot);
- Developing applications and contracts and exploring tutorials on Stellar without the potential to lose any assets;
- Testing existing applications against new releases or release candidates of Stellar Core, Horizon, and the Stellar RPC;
- Performing data analysis on a smaller, non-trivial data set compared to the Mainnet.

##### Testnet and Futurenet are bad for[​](#testnet-and-futurenet-are-bad-for "Direct link to Testnet and Futurenet are bad for")

- Load and stress testing;
- High availability test infrastructure- SDF does not guarantee Testnet availability;
- Long-term storage of data on the network since the network resets periodically;
- A testing infrastructure that requires more control over the test environment, such as:
  - The ability to control the data reset frequency;
  - The need to secure private or sensitive data (before launching on the Mainnet). You can always run your own test network for use cases that don’t work well with SDF’s Testnet.

#### Moving your project from Testnet or Futurenet to production[​](#moving-your-project-from-testnet-or-futurenet-to-production "Direct link to Moving your project from Testnet or Futurenet to production")

Mainnet, Testnet, and Futurenet each have their own unique passphrase, which is used to validate signatures on a given transaction.

The current passphrases for the Stellar Mainnet, Testnet, and Futurenet are:

- \*Mainnet (Pubnet)\*\*: `Public Global Stellar Network ; September 2015`

- \*Testnet\*\*: `Test SDF Network ; September 2015`

- \*Futurenet\*\*: `Test SDF Future Network ; October 2022`

For applications that don’t rely on the state of the network (such as specific accounts needing to exist), you move to production by changing the network passphrase and ensuring your Horizon instance is connected to Mainnet.

If you’ve been running a Stellar Core or Horizon instance against the Testnet and want to switch to production, changing the passphrase will require both respective databases to be completely reinitialized. If you run your own RPC on Testnet or Futurenet, you may want to use an RPC service when you move to Mainnet. Check out the RPC service providers [here](/docs/data/apis/api-providers).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/networks.mdx)

Last updated on **May 21, 2025** by **Bri Wylde**

- [Stats: Mainnet versus Testnet versus Futurenet](#stats-mainnet-versus-testnet-versus-futurenet)
  - [Mainnet](#mainnet)
  - [Testnet](#testnet)
  - [Futurenet](#futurenet)
- [Friendbot](#friendbot)
- [Testnet and Futurenet data reset](#testnet-and-futurenet-data-reset)
- [Test data automation](#test-data-automation)
- [Network passphrases](#network-passphrases)
- [What Testnet and Futurenet should and should not be used for](#what-testnet-and-futurenet-should-and-should-not-be-used-for)
  - [Testnet and Futurenet are good for](#testnet-and-futurenet-are-good-for)
  - [Testnet and Futurenet are bad for](#testnet-and-futurenet-are-bad-for)
- [Moving your project from Testnet or Futurenet to production](#moving-your-project-from-testnet-or-futurenet-to-production)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/networks](https://developers.stellar.org/docs/learn/fundamentals/networks)_

---

## Sección 36 - Docs Learn Fundamentals Stellar Consensus Protocol

### Overview of the Stellar Consensus Protocol (SCP) and Transaction Validation | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol
**Fecha de extracción:** 2025-07-12T01:18:39.064Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol
generated: 2025-07-12T01:18:39.064Z

---

On this page

### Stellar Consensus Protocol

Consensus is hugely important in a decentralized payment system. It distributes the monitoring and approval of transactions across many individual nodes (computers) instead of relying on one closed, central system. Nodes are run by organizations or individuals, and the goal is for all nodes to update the ledger in the same way, ensuring each ledger reaches the same state. Consensus is vital for the security of the blockchain, allowing nodes to agree on something safely and preventing double-spend attacks.

The Stellar network reaches consensus using the Stellar Consensus Protocol (SCP), which is a construction of the Federated Byzantine Agreement (FBA). FBA differs from other well-known consensus mechanisms like Proof of Work (which relies on a node’s computational power) and Proof of Stake (which relies on a node’s staking power) by instead relying on the agreement of trusted nodes.

In SCP, each participating Stellar Core node (also called a validator or validator node) decides what set of other nodes they want to trust. The flexibility of user-defined trust allows for open network membership (meaning anyone can become a Core node) and decentralized control (meaning no central authority dictates whose vote is required for consensus).

There are no monetary rewards for being a validator on the Stellar network. Instead, users are encouraged to become a validator because they are then contributing to the security and resiliency of the network, which benefits the products and services built on Stellar.

There are three desired properties of consensus mechanisms: fault tolerance, safety, and liveness.

- Fault tolerance - the system can continue operating despite node failures or malfunctions
- Safety - no two nodes ever agree on different values, guarantees nodes will produce the same block
- Liveness - a node can output a value without the participation of any misbehaving nodes

Consensus mechanisms can typically only prioritize two out of three of these properties. SCP prioritizes fault tolerance and safety over liveness. Because of prioritizing safety, blocks can sometimes get stuck while waiting for nodes to agree.

#### SCP components[​](#scp-components "Direct link to SCP components")

##### Quorum set[​](#quorum-set "Direct link to Quorum set")

As mentioned above, each Core node decides on which other nodes it would like to trust to reach agreement. A node’s trusted set of nodes is called a **quorum set**. Validators might add each other to their quorum sets due to innate trust associated with real-world identities.

##### Thresholds and quorum slices[​](#thresholds-and-quorum-slices "Direct link to Thresholds and quorum slices")

In addition to choosing a quorum set, Core nodes must also choose a **threshold**. A threshold is the minimum number of nodes in a quorum set that must agree to reach consensus. For example, let’s say node B has nodes \[A, C, D\] in its quorum set and sets the threshold to 2. This means that any combination of 2 nodes in the quorum set agreeing is valid: either \[A,C\], \[C,D\], or \[A,D\] must agree for the node to proceed. The combination of agreeing nodes within the quorum set are called **quorum slices**.

##### Node blocking sets[​](#node-blocking-sets "Direct link to Node blocking sets")

Nodes can be blocked from reaching consensus by **node blocking sets**. Node blocking sets are any set of nodes in a quorum set that prevent a node from reaching agreement. For example, if a node requires 3 out of 4 of the nodes in its quorum set to agree, any combination of two nodes is considered a node blocking set.

##### Quorum[​](#quorum "Direct link to Quorum")

A **quorum** is a set of nodes sufficient to reach an agreement wherein each node is part of a quorum slice.

##### Statement[​](#statement "Direct link to Statement")

Valid **statements** on Stellar express the different opinions of nodes regarding transaction sets to agree on for a given ledger. For example: “I propose this transaction set for ledger number 800”.

A node’s opinion on a statement depends on the opinions of its quorum set.

#### Federated voting[​](#federated-voting "Direct link to Federated voting")

In the SCP, agreement is achieved using federated voting. A node reasons about the state of the network based on what it learns from its quorum set- before a statement is 100% agreed upon by every honest node in the network, it goes through three steps of federated voting: (1) Vote, (2) Accept, and (3) Confirm.

A node can have four opinions on a statement (let’s call the statement “A”)

- I don’t know anything about A and have no opinion
- I vote for A, it’s valid, but I don’t know if it’s safe to act on it yet
- I accept A, because enough nodes supported this statement, but I don’t know if it’s safe to act on it yet
- I confirm A, it is safe to act on it. Even if every node in my quorum has not confirmed A, they will not be able to confirm anything else but A.

To transition between the states above, federated voting has the following rules:

- Vote for A if it is consistent with my previous votes

- Accept A if either:

  - Every node in my quorum slice voted for or accepted A

    OR

  - My blocking set accepted A (even if I voted for something that contradicts A in the past, I forget about that vote, and proceed with accepting A)

- Confirm A if every node in a quorum slice accepted A

#### Consensus rounds[​](#consensus-rounds "Direct link to Consensus rounds")

Each consensus round is separated into two stages:

##### Nomination protocol[​](#nomination-protocol "Direct link to Nomination protocol")

In the nomination protocol, candidate transaction sets are selected to be included in a ledger. Once a node confirms its first candidate, it stops voting to nominate any new transaction sets. It may still accept or confirm previously nominated statements. This guarantees that at some point, all nodes will converge on a candidate set. If every node on the network stops introducing new values but continues to confirm what other nodes confirmed, eventually, everyone will end up with the same list of candidates.

A node may start the ballot protocol as soon as it confirms a candidate. After it confirms its first candidate and starts the ballot protocol, nomination continues running in the background.

##### Ballot protocol[​](#ballot-protocol "Direct link to Ballot protocol")

The ballot protocol ensures that the network can unanimously confirm and apply nominated transaction sets. It consists of two steps:

1.  Prepare - verifies that a node’s quorum slice has the right value and is willing to commit it
2.  Commit - ensures that a node’s quorum slice actually commits the value

#### White paper[​](#white-paper "Direct link to White paper")

Access the SCP white paper [here](https://stellar.org/learn/stellar-consensus-protocol).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/stellar-consensus-protocol.mdx)

Last updated on **Feb 18, 2025** by **Bri Wylde**

- [SCP components](#scp-components)
  - [Quorum set](#quorum-set)
  - [Thresholds and quorum slices](#thresholds-and-quorum-slices)
  - [Node blocking sets](#node-blocking-sets)
  - [Quorum](#quorum)
  - [Statement](#statement)
- [Federated voting](#federated-voting)
- [Consensus rounds](#consensus-rounds)
  - [Nomination protocol](#nomination-protocol)
  - [Ballot protocol](#ballot-protocol)
- [White paper](#white-paper)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol](https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol)_

---

## Sección 37 - Docs Learn Fundamentals Stellar Data Structures

### Blockchain Data Structures: Accounts, Smart Contracts, Assets & Ledgers | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures
**Fecha de extracción:** 2025-07-12T01:18:40.456Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures
generated: 2025-07-12T01:18:40.456Z

---

### Stellar Data Structures

The fundamental data structures and building blocks present on the Stellar network.

[

#### 📄️ Ledgers

A ledger captures the state of the Stellar network at a point in time, storing accounts, balances, orders, smart contract data, and other persistent information.

](/docs/learn/fundamentals/stellar-data-structures/ledgers)

[

#### 📄️ Accounts

Learn about accounts on the Stellar network, including how they store balances, sign transactions, and interact with assets, smart contracts, and other features.

](/docs/learn/fundamentals/stellar-data-structures/accounts)

[

#### 📄️ Assets

Learn how assets work on the Stellar network, including issuing, transferring, and managing tokens. Explore trustlines, using assets in smart contracts, & more.

](/docs/learn/fundamentals/stellar-data-structures/assets)

[

#### 📄️ Smart Contracts

A smart contract is a programmed set of executable code and state that can be invoked on the Stellar network. Smart contracts store data and also define rules for how that data can be used. Stellar has integrated a smart contracts platform called "Soroban" into the core protocol. These contracts are programs written in the Rust language and compiled as WebAssembly (Wasm) for deployment.

](/docs/learn/fundamentals/stellar-data-structures/contracts)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/stellar-data-structures/README.mdx)

Last updated on **Feb 18, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures](https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures)_

---

## Sección 38 - Docs Learn Fundamentals Stellar Ecosystem Proposals

### Stellar Ecosystem Proposals (SEPs): Standards for Interoperability & Development | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/stellar-ecosystem-proposals
**Fecha de extracción:** 2025-07-12T01:18:41.879Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/stellar-ecosystem-proposals
generated: 2025-07-12T01:18:41.879Z

---

On this page

### Stellar Ecosystem Proposals (SEPs)

Each SEP is a distinct blueprint meant to help users build a product or service that interoperates with other products and services on the Stellar network.

> **NOTE**
>
> note
>
> This page covers Stellar Ecosystem Proposals (SEPs), which define standards and protocols for projects building on the Stellar network. SEPs differ from Core Advancement Proposals (CAPs), which propose changes to the Stellar network’s core protocol. You can learn more about CAPs on [GitHub](https://github.com/stellar/stellar-protocol/tree/master/core).

When you build on Stellar, you generally use the Horizon API to interact with the network. However, anytime you want your product or service to interoperate with other products or services in the ecosystem, you must create additional infrastructure to handle those components of an interaction.

SEPs define standards for building that infrastructure on top of the Stellar network. They are designed to help different entities, such as asset issuers, wallets, exchanges, and other service providers interoperate using a single common integration. Generally, they define two sides of an interaction — often a server-side and a client-side — and using them as a blueprint allows you to connect to multiple counterparties without starting from scratch every time.

SEPs are publicly-created, open-source documents that live in the [GitHub repository](https://github.com/stellar/stellar-protocol/tree/master/ecosystem) and have a lightweight approval process. New SEPs and upgrades are discussed constantly. We encourage participation in these discussions to help build new standards and make Stellar services more accessible.

#### Notable SEPs[​](#notable-seps "Direct link to Notable SEPs")

There are many SEPs, and they cover a wide variety of standards for interoperation (see the full list of active SEPs [below](#complete-list-of-active-proposals)). Whatever you're building, you may want to take a look at the complete list to see if there's a standard for your use case.

This section will cover a few notable SEPs that define the standards for some common Stellar use cases.

##### SEP-0001 - Stellar Info File[​](#sep-0001---stellar-info-file "Direct link to SEP-0001 - Stellar Info File")

Defines how to create and host a stellar.toml file: a common place where the Internet can find information about your Stellar integration. You can store a lot of information in your stellar.toml file including organization information, currency information, and contact information. TOML is a simple and commonly used configuration file format designed to be readable by both humans and machines.

Using the `set_options` operation, you can link your Stellar account to the domain that hosts your stellar.toml, creating an on-chain connection between this information and that account.

- \*Used by anchors, issuers, and validators.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0001.md)

##### SEP-0005 - Key Derivation Methods for Stellar Accounts[​](#sep-0005---key-derivation-methods-for-stellar-accounts "Direct link to SEP-0005 - Key Derivation Methods for Stellar Accounts")

Describes methods for key derivation for Stellar, improving key storage and moving keys between wallets and applications. Guidance in this SEP improves the Stellar ecosystem by:

- Making key derivation the same across wallets and applications
- Allowing users to hold keys in hardware wallets
- Allowing users to hold keys in cold storage more reliably (using mnemonic codes)
- Allowing users to generate multiple keys from a single seed (for example, first for storing funds and second as a signer for a shared account)

* \*Used by wallets and other applications.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md)

##### SEP-0006 - Deposit and Withdrawal API[​](#sep-0006---deposit-and-withdrawal-api "Direct link to SEP-0006 - Deposit and Withdrawal API")

Defines the standard way for anchors and wallets to interact on behalf of users. With this SEP’s guidance, wallets and other clients can interact with anchors directly without the user needing to leave the wallet to go to the anchor’s site.

This SEP defines a standard protocol enabling the following features within a wallet or other Stellar client:

- Deposit external assets with an anchor
- Withdraw assets from an anchor
- Execute deposit/withdrawal between non-equivalent assets
- Communicate deposit & withdrawal fee structure for an anchor to the user
- Handle anchor KYC needs, including transmitting KYC information about the user to the anchor via SEP-12
- Check the status of ongoing deposits or withdrawals involving the user
- View history of deposits and withdrawals involving the user

SEP-0024 is the alternative to SEP-0006 which supports hosted deposits and withdrawals.

- \*Used by anchors, wallets, and other applications.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md)

##### SEP-0007 - URI Scheme to Facilitate Delegated Signing[​](#sep-0007---uri-scheme-to-facilitate-delegated-signing "Direct link to SEP-0007 - URI Scheme to Facilitate Delegated Signing")

Defines the standard URI scheme that can be used to generate a URI that will serve as a request to sign a transaction. With this SEP’s guidance, non-wallet applications can have their their users sign a transaction without seeing the wallet user's secret key in any form since the URI (request) will typically be signed by the user’s trusted wallet where the secret keys are stored.

This SEP defines a standard protocol enabling the following features within a wallet or other Stellar client:

- Deeplinks payments (online)
- QR code payments (online and offline)
- Point of sale transactions (offline)
- Peer to peer payments (online and offline)

* \*Used by wallets and other applications.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0007.md)

##### SEP-0010 - Stellar Authentication[​](#sep-0010---stellar-authentication "Direct link to SEP-0010 - Stellar Authentication")

Defines a standard way for clients (such as wallets or exchanges) to create authenticated web sessions for users holding a Stellar account. This SEP also supports authenticating users of shared or pooled Stellar accounts. Clients can use muxed accounts to distinguish users or sub-accounts of shared accounts.

Proves that the user has a Stellar account and that they control the account with a single master key or sufficient signers needed.

- \*Used by wallets and exchanges.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md)

##### SEP-0012 - KYC API[​](#sep-0012---kyc-api "Direct link to SEP-0012 - KYC API")

Allows for sharing of KYC data and defines a standard way for Stellar clients to upload KYC and other information to anchors and other services. This SEP was made with these goals in mind:

- Allow a customer to enter their KYC information into their wallet once and use it across many services without re-entering information manually
- Handle image and binary data
- Support the set of fields defined in SEP-9
- Support authentication via SEP-10
- Support the provision of data for SEP-6, SEP-24, SEP-31, and others
- Give customers control over their data by supporting complete data erasure

* \*Used by anchors, wallets, and other applications.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md)

##### SEP-0020 - Self-Verification of Validator Nodes[​](#sep-0020---self-verification-of-validator-nodes "Direct link to SEP-0020 - Self-Verification of Validator Nodes")

Defines how validators self-verify by setting the home domain of their Stellar account to their website, where they publish information on-chain about their node and organization in a stellar.toml file. This allows other participants to discover other nodes and add them to their quorum sets without needing a centralized database.

- \*Used by validators.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0020.md)

##### SEP-0024 - Hosted Deposit and Withdrawal[​](#sep-0024---hosted-deposit-and-withdrawal "Direct link to SEP-0024 - Hosted Deposit and Withdrawal")

Defines the standard way for anchors and wallets to interact on behalf of users interactively. This means that the user’s application must open a webview hosted by a third-party anchor for the user to provide the information necessary to complete the transaction.

Users use applications that implement SEP-0024 to connect to businesses that will accept off-chain value (such as USD) in exchange for on-chain value (such as USDC) and vice-versa.

SEP-0006 is the alternative to SEP-0024 that supports an API-style solution for the same use case.

- \*Used by anchors, wallets, and other applications.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md)

##### SEP-0030 - Account Recovery: Multi-Party Recovery of Stellar Accounts[​](#sep-0030---account-recovery-multi-party-recovery-of-stellar-accounts "Direct link to SEP-0030 - Account Recovery: Multi-Party Recovery of Stellar Accounts")

Defines the standard API that enables an individual (e.g., a user or wallet) to regain access to a Stellar account that it owns after the individual has lost its private key without providing any third-party control of the account. Using this protocol, the user or wallet will preregister the account and a phone number, email, or other form of authentication with one or more servers implementing the protocol and add those servers as signers of the account. If two or more servers are used with appropriate signer configuration no individual server will have control of the account, but collectively, they may help the individual recover access to the account.

The protocol also enables individuals to pass control of a Stellar account to another individual.

This SEP enables the following use cases for a user:

- Recover: Recover access to Stellar accounts for which they may have lost keys.
- Share: Gain access to Stellar accounts that another user intends to share with them.

* \*Used by wallets and other applications.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0030.md)

##### SEP-0031 - Cross-Border Payment API[​](#sep-0031---cross-border-payment-api "Direct link to SEP-0031 - Cross-Border Payment API")

Defines the protocol for two financial accounts that exist outside the Stellar network (anchors) to interact with each other.

- \*Used by anchors.\*\*

[Link to GitHub](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0031.md)

#### Complete list of active proposals[​](#complete-list-of-active-proposals "Direct link to Complete list of active proposals")

| Number                                                                                    | Title                                                                  | Track    |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| [SEP-0001](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0001.md) | Stellar Info File                                                      | Standard |
| [SEP-0002](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0002.md) | Federation Protocol                                                    | Standard |
| [SEP-0004](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0004.md) | Tx Status Endpoint                                                     | Standard |
| [SEP-0005](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md) | Key Derivation Methods for Stellar Accounts                            | Standard |
| [SEP-0006](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md) | Deposit and Withdrawal API                                             | Standard |
| [SEP-0007](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0007.md) | URI Scheme to facilitate delegated signing                             | Standard |
| [SEP-0008](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0008.md) | Regulated Assets                                                       | Standard |
| [SEP-0009](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0009.md) | Standard KYC Fields                                                    | Standard |
| [SEP-0010](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md) | Stellar Authentication                                                 | Standard |
| [SEP-0011](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0011.md) | Txrep: Human-Readable Low-Level Representation of Stellar Transactions | Standard |
| [SEP-0012](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md) | KYC API                                                                | Standard |
| [SEP-0014](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0014.md) | Dynamic Asset Metadata                                                 | Standard |
| [SEP-0018](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0018.md) | Data Entry Namespaces                                                  | Standard |
| [SEP-0020](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0020.md) | Self-verification of validator nodes                                   | Standard |
| [SEP-0023](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0023.md) | Muxed Account Strkeys                                                  | Standard |
| [SEP-0024](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md) | Hosted Deposit and Withdrawal                                          | Standard |
| [SEP-0028](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0028.md) | XDR Base64 Encoding                                                    | Standard |
| [SEP-0029](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0029.md) | Account Memo Requirements                                              | Standard |
| [SEP-0031](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0031.md) | Cross-Border Payments API                                              | Standard |
| [SEP-0033](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0033.md) | Identicons for Stellar Accounts                                        | Standard |
| [SEP-0046](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0046.md) | Contract Meta                                                          | Standard |
| [SEP-0048](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0048.md) | Contract Interface Specification                                       | Standard |

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/stellar-ecosystem-proposals.mdx)

Last updated on **May 1, 2025** by **Bri Wylde**

- [Notable SEPs](#notable-seps)
  - [SEP-0001 - Stellar Info File](#sep-0001---stellar-info-file)
  - [SEP-0005 - Key Derivation Methods for Stellar Accounts](#sep-0005---key-derivation-methods-for-stellar-accounts)
  - [SEP-0006 - Deposit and Withdrawal API](#sep-0006---deposit-and-withdrawal-api)
  - [SEP-0007 - URI Scheme to Facilitate Delegated Signing](#sep-0007---uri-scheme-to-facilitate-delegated-signing)
  - [SEP-0010 - Stellar Authentication](#sep-0010---stellar-authentication)
  - [SEP-0012 - KYC API](#sep-0012---kyc-api)
  - [SEP-0020 - Self-Verification of Validator Nodes](#sep-0020---self-verification-of-validator-nodes)
  - [SEP-0024 - Hosted Deposit and Withdrawal](#sep-0024---hosted-deposit-and-withdrawal)
  - [SEP-0030 - Account Recovery: Multi-Party Recovery of Stellar Accounts](#sep-0030---account-recovery-multi-party-recovery-of-stellar-accounts)
  - [SEP-0031 - Cross-Border Payment API](#sep-0031---cross-border-payment-api)
- [Complete list of active proposals](#complete-list-of-active-proposals)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/stellar-ecosystem-proposals](https://developers.stellar.org/docs/learn/fundamentals/stellar-ecosystem-proposals)_

---

## Sección 39 - Docs Learn Fundamentals Stellar Stack

### Learn About the Core Components and Architecture of the Stellar Network | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/stellar-stack
**Fecha de extracción:** 2025-07-12T01:18:43.298Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/stellar-stack
generated: 2025-07-12T01:18:43.298Z

---

On this page

### Stellar Stack

The Stellar stack is made up of the following components: the networks (Mainnet, Testnet, and Futurenet), Stellar Core, Horizon API, RPC, and SDKs, each of which plays a specific part in providing financial infrastructure that is resilient to failures, available to anyone, and fast and cheap enough to serve real-world use cases.

![Stellar Stack](/assets/images/stellar-tech-stack-f023ca7a0dfa83f76373c845697f6294.png)

#### Networks[​](#networks "Direct link to Networks")

Stellar has three networks: the public network (Mainnet, also called Pubnet or the Public Network), the test network (Testnet), and a dev network (Futurenet). Mainnet is the main network used by applications in production. The Testnet is a smaller, free-to-use network maintained by SDF that functions like the Mainnet but doesn’t connect to real money and is the best place for developers to test their applications. Futurenet is a dev network you can use to test more bleeding edge features.

Read more about the different networks in the [Networks section](/docs/learn/fundamentals/networks).

#### Stellar Core[​](#stellar-core "Direct link to Stellar Core")

Stellar Core is the program used by the individual nodes (or computers) that make up the network. Stellar Core keeps a common distributed ledger and engages in consensus to validate and process transactions. Generally, nodes reach consensus, apply a transaction set, and update the ledger every 5-7 seconds.

Nodes reach consensus using the Stellar Consensus Protocol, which can you can learn more about here: [Stellar Consensus Protocol](/docs/learn/fundamentals/stellar-consensus-protocol)

Anyone can run a Stellar Core node, but you don’t have to in order to build on Stellar. We recommend you do so if you issue an asset and want to ensure the accuracy of the ledger, if you want to participate in network governance by voting on protocol version, minimum fees, and resource and ledger limits, and/or if you want to contribute to Stellar’s overall health and decentralization. Check out our tutorial on installing, configuring, and maintaining your own node here: [Run a Validator Node Tutorial](/docs/validators).

#### Horizon[​](#horizon "Direct link to Horizon")

Horizon is the client-facing RESTful HTTP API server in the platform layer which allows programmatic access to submit transactions and query the network’s historical data. It acts as the interface for applications that want to access the Stellar network. You can communicate with Horizon using an SDK, a web browser, or with simple command tools like cURL.

You do not need to run your own Horizon instance — when you're getting started, you can use the free SDF Horizon instance to access the network — but it is recommended that you do when you’re ready to launch a finished product. Check out how to do so here: [Run Platform Services Tutorial](/docs/data/apis/horizon/admin-guide)

Learn all there is to know about using Horizon in the Horizon [documentation](/docs/data/apis/horizon).

#### RPC[​](#rpc "Direct link to RPC")

Stellar's RPC is a JSON RPC server that provides an interface for users and applications to interact with smart contracts on the Stellar blockchain. When an application would like to interact with smart contracts, it sends a request to the RPC server. The server interprets these requests, translates them into a format understandable by the blockchain nodes, and forwards them. After processing the requests, the blockchain nodes send back the results. The RPC server receives these results and sends them back to the requesting application.

SDF has RPC endpoints available for Futurenet and Testnet. These services are free to use, and are suitable for development and testing.

SDF does not provide a publicly available RPC endpoint for Mainnet. Developers should [select an ecosystem provider](/docs/data/apis/api-providers) that works for their project before migrating to Mainnet. In some cases, projects may choose to run their own RPC instance.

#### SDKs[​](#sdks "Direct link to SDKs")

SDKs simplify some of the work of accessing Horizon and the Stellar RPC by converting the data into friendlier formats and allowing you to program in the language of your choice. Stellar’s SDKs show you how to request data and create and submit transactions. Soroban's SDKs allow you to write smart contracts in Rust and interact with smart contracts in a myriad of other languages.

View Stellar's [SDK library](/docs/tools/sdks) to access our SDKs and their documentation.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/stellar-stack.mdx)

Last updated on **Mar 12, 2025** by **Molly Karcher**

- [Networks](#networks)
- [Stellar Core](#stellar-core)
- [Horizon](#horizon)
- [RPC](#rpc)
- [SDKs](#sdks)

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/stellar-stack](https://developers.stellar.org/docs/learn/fundamentals/stellar-stack)_

---

## Sección 40 - Docs Learn Fundamentals Transactions

### Learn About Transactions on Stellar: Lifecycle, Operations & More | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/fundamentals/transactions
**Fecha de extracción:** 2025-07-12T01:18:44.708Z

---

---

source: https://developers.stellar.org/docs/learn/fundamentals/transactions
generated: 2025-07-12T01:18:44.708Z

---

### Operations & Transactions

[

#### 📄️ Operations and Transactions

Learn how operations and transactions work on the Stellar network. Understand how multiple operations are bundled into transactions to execute blockchain actions.

](/docs/learn/fundamentals/transactions/operations-and-transactions)

[

#### 📄️ List of Operations

Explore the full list of Stellar operations, including creating accounts, making payments, creating trustlines, all smart contract operations, and more.

](/docs/learn/fundamentals/transactions/list-of-operations)

[

#### 📄️ Signatures and Multisig

This section details signing non-smart contract transactions. For auth related to smart contract transactions, see authorization.)

](/docs/learn/fundamentals/transactions/signatures-multisig)

[

#### 📄️ Transaction Lifecycle

This is the transaction lifecycle for a classic Stellar transaction. Adding smart contract components to this section is currently a work in progress.

](/docs/learn/fundamentals/transactions/transaction-lifecycle)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/fundamentals/transactions/README.mdx)

Last updated on **Feb 18, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/learn/fundamentals/transactions](https://developers.stellar.org/docs/learn/fundamentals/transactions)_

---

## Sección 41 - Docs Learn Migrate

### Migrate from Another Chain | Stellar Docs

**URL:** https://developers.stellar.org/docs/learn/migrate
**Fecha de extracción:** 2025-07-12T01:18:46.083Z

---

---

source: https://developers.stellar.org/docs/learn/migrate
generated: 2025-07-12T01:18:46.083Z

---

### Migrate from Another Chain

Adapt your existing projects to work with Stellar.

[

#### 🗃️ EVM Networks

4 items

](/docs/learn/migrate/evm)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/learn/migrate/README.mdx)

Last updated on **Mar 13, 2024** by **Elliot Voris**

---

_Extraído de [https://developers.stellar.org/docs/learn/migrate](https://developers.stellar.org/docs/learn/migrate)_

---

## Sección 42 - Docs Networks Resource Limits Fees

### Resource Limits & Fees | Stellar Docs

**URL:** https://developers.stellar.org/docs/networks/resource-limits-fees
**Fecha de extracción:** 2025-07-12T01:18:53.854Z

---

---

source: https://developers.stellar.org/docs/networks/resource-limits-fees
generated: 2025-07-12T01:18:53.854Z

---

On this page

### Resource Limits & Fees

#### Resource Limits[​](#resource-limits "Direct link to Resource Limits")

> **NOTE**
>
> note
>
> Resource limitations and fees only apply to smart contract transactions. Read more about the inner workings of fees on Stellar in the [Fees section](/docs/learn/fundamentals/fees-resource-limits-metering).

| Network Setting                                       | Value                      |
| ----------------------------------------------------- | -------------------------- |
| Soroban txn per ledger                                | 100                        |
| Max CPU instructions per txn                          | 100 million                |
| Memory limit per txn                                  | 40 MB                      |
| Individual ledger key size (contract storage key)     | 250 bytes                  |
| Individual ledger entry size (including Wasm entries) | 128 KiB                    |
| Read/Write ledger entries per txn                     | 40 read; 25 write          |
| Read/Write bytes per txn                              | 200 KB read; 129 KiB write |
| Transaction size                                      | 129 KiB                    |
| Persistent entry minimal/initial lifetime             | 120 days                   |
| Temporary entry minimal/initial lifetime              | 1 day                      |
| Max ledger entry expiration bump                      | 6 months                   |
| Events+return value size bytes                        | 8 KB                       |
| Max write bytes per ledger                            | 140 KiB                    |
| Max txs size in bytes per ledger                      | 130 KiB                    |
| Eviction scan size                                    | 500 KB                     |

#### Resource Fees[​](#resource-fees "Direct link to Resource Fees")

| Network Setting                                | Cost (stroops)            |
| ---------------------------------------------- | ------------------------- |
| 10,000 instructions                            | 25 (250,000/max tx)       |
| Read 1 ledger entry                            | 6,250 (250,000/max tx)    |
| Write 1 ledger entry                           | 10,000 (250,000/max tx)   |
| Read 1KB from ledger                           | 1,786 (250,000/max tx)    |
| 1KB of transaction size (bandwidth)            | 1,624 (113,642/max tx)    |
| 1KB of transaction size (history)              | 16,235 (1,136,418/max tx) |
| 1KB of Events/return value                     | 10,000 (80,000/max tx)    |
| Write 1KB to ledger                            | ~11,800 (826'000/max tx)  |
| 30 days of rent for 1 KB of persistent storage | 0.29 XLM                  |
| 30 days of rent for 1 KB of temporary storage  | 0.145 XLM                 |

Note that the write fee normally fluctuates a bit (within 100 stroops/KB). However, if the ledger grows too quickly, the write fee will grow in a linear fashion with a steep slope.

The ledger rent cost ('Write 1KB' entries in the table) is based on the write fee, rent period and some coefficient.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/networks/resource-limits-fees.mdx)

Last updated on **Feb 27, 2025** by **Bri Wylde**

- [Resource Limits](#resource-limits)
- [Resource Fees](#resource-fees)

---

_Extraído de [https://developers.stellar.org/docs/networks/resource-limits-fees](https://developers.stellar.org/docs/networks/resource-limits-fees)_

---

## Sección 43 - Docs Networks Software Versions

### Software Versions | Stellar Docs

**URL:** https://developers.stellar.org/docs/networks/software-versions
**Fecha de extracción:** 2025-07-12T01:18:55.405Z

---

---

source: https://developers.stellar.org/docs/networks/software-versions
generated: 2025-07-12T01:18:55.404Z

---

On this page

### Software Versions

> **WARNING**
>
> caution
>
> Release candidates are software releases that are also released to the [Testnet](/docs/networks) test network. Software releases may occur between Testnet releases. If you're interacting with Testnet, the recommended software versions to use in development are provided below. Releases to Testnet may include network resets and network passphrase changes.

#### Protocol 22 (Mainnet, December 5, 2024)[​](#protocol-22-mainnet-december-5-2024 "Direct link to Protocol 22 (Mainnet, December 5, 2024)")

##### Software[​](#software "Direct link to Software")

| Software                     | Version                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| XDR                          | `v22.0`                                                                                                            |
| Rust XDR                     | `v22.0.0`                                                                                                          |
| Soroban Environment          | `v22.1.2`                                                                                                          |
| Stellar Core                 | `v22.0.0`                                                                                                          |
| Soroban Rust SDK             | `v22.0.3`                                                                                                          |
| Stellar CLI                  | `v22.0.1`                                                                                                          |
| Stellar RPC                  | `v22.1.0`                                                                                                          |
| Stellar Horizon              | `v22.0.1`                                                                                                          |
| Stellar Quickstart           | `docker.io/stellar/quickstart:v455-latest@sha256:bbd4cea64c5428381ac5ace7c380ed7c3b72f12488aeb1f1bf19c48e74244af8` |
| Stellar JS Stellar Base      | `v13.0.1`                                                                                                          |
| Stellar JS Stellar SDK       | `v13.1.0`                                                                                                          |
| Freighter                    |                                                                                                                    |
| Laboratory                   |                                                                                                                    |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                           |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015`                                                                   |

##### Release notes[​](#release-notes "Direct link to Release notes")

###### Core[​](#core "Direct link to Core")

New features in Protocol 22:

- Constructor support in Soroban: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0058.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0058.md).
- Soroban host functions for BLS12-381: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0059.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0059.md).

###### Soroban Rust SDK[​](#soroban-rust-sdk "Direct link to Soroban Rust SDK")

Key protocol-related changes:

- Support for constructors
- Support for BLS12-381 host functions

###### Stellar CLI (Previously Soroban CLI)[​](#stellar-cli-previously-soroban-cli "Direct link to Stellar CLI (Previously Soroban CLI)")

#### Protocol 21 (Mainnet, June 18, 2024)[​](#protocol-21-mainnet-june-18-2024 "Direct link to Protocol 21 (Mainnet, June 18, 2024)")

##### Software[​](#software-1 "Direct link to Software")

| Software                     | Version                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | `v21.1`                                                                                                                                             |
| Rust XDR                     | `v21.0.1`                                                                                                                                           |
| Soroban Environment          | `v21.0.2`                                                                                                                                           |
| Stellar Core                 | `v21.0.0`                                                                                                                                           |
| Soroban Rust SDK             | `21.0.1-preview.3`                                                                                                                                  |
| Stellar CLI                  | `v21.0.0`                                                                                                                                           |
| Soroban RPC                  | `v21.3.0`                                                                                                                                           |
| Stellar Horizon              | `v2.30.0`                                                                                                                                           |
| Stellar Quickstart           | `https://hub.docker.com/layers/stellar/quickstart/v426-latest-amd64/images/sha256-274395daab6fa8033b9213f152d56699358917fb01d7c7e95392a37fc00c9d01` |
| Stellar JS Stellar Base      | `v12.0.0-rc1`                                                                                                                                       |
| Stellar JS Stellar SDK       | `v12.1.0`                                                                                                                                           |
| Freighter                    |                                                                                                                                                     |
| Laboratory                   |                                                                                                                                                     |
| Soroban React Payment dapp   | `TBD`                                                                                                                                               |
| Soroban Mint Token dapp      | `TBD`                                                                                                                                               |
| Soroban Swap Token dapp      | `TBD`                                                                                                                                               |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                                            |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                                 |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015`                                                                                                    |

##### Release notes[​](#release-notes-1 "Direct link to Release notes")

###### Core[​](#core-1 "Direct link to Core")

New features in Protocol 21:

- Secp256r1 support in Soroban host: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md)
- Soroban host function for extending TTL of contract instance and code separately: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md)
- Use refined cost model for VM instantiation in order to reduce the VM instantiation metered costs: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md)
- Intra-transaction VM module caching for the further Soroban cost reduction: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md), [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md)

###### Soroban Rust SDK[​](#soroban-rust-sdk-1 "Direct link to Soroban Rust SDK")

Key protocol-related changes:

- Support for secp256r1 signature verification
- Support for extending TTL of contract instance and code separate from each other

###### Stellar CLI (Previously Soroban CLI)[​](#stellar-cli-previously-soroban-cli-1 "Direct link to Stellar CLI (Previously Soroban CLI)")

Note: Soroban CLI has been renamed to Stellar CLI.

- Add stellar-cli crate alongside soroban-cli
- Rename to stellar-cli
- Install stellar and soroban CLIs when installing either
- Update completions to use stellar instead of soroban
- Update other references to stellar-cli
- Add support for contract id alias name when deploying and invoking contracts
- Extract alias logic into its own implementation
- Embed examples contract list into source and remove from build script
- Add cache sub commands and allow for proper transaction data logging
- Update TS Bindings stellar-sdk dep to 12rc2
- Add no-build option for fee::Args
- Do not auto add test account to keys
- Output TransactionEnvelope instead of Transaction for --build-only
- Ledger signing
- Use safe unwrapping in option unwrap
- Exclude host only functions from client
- Add container log tailing cmd
- Update network container start command to use updated enable flags
- Add libudev-dev as dep
- Bump versions of dependencies
- Update to newest soroban-rpc and copy over old signing logic
- Remove deprecated lab token command
- Remove deprecated config command
- Remove lab xdr command
- Add xdr command to root

#### Protocol 21 (Testnet only, May 20, 2024)[​](#protocol-21-testnet-only-may-20-2024 "Direct link to Protocol 21 (Testnet only, May 20, 2024)")

##### Software[​](#software-2 "Direct link to Software")

| Software                     | Version                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | `v21.1`                                                                                                                                             |
| Rust XDR                     | `v21.0.1`                                                                                                                                           |
| Soroban Environment          | `v21.0.2`                                                                                                                                           |
| Stellar Core                 | `v21.0.0`                                                                                                                                           |
| Soroban Rust SDK             | `21.0.1-preview.3`                                                                                                                                  |
| Soroban CLI                  | `v21.0.0-rc.1`                                                                                                                                      |
| Soroban RPC                  | `v21.2.0`                                                                                                                                           |
| Stellar Horizon              | `v2.30.0`                                                                                                                                           |
| Stellar Quickstart           | `https://hub.docker.com/layers/stellar/quickstart/v426-latest-amd64/images/sha256-274395daab6fa8033b9213f152d56699358917fb01d7c7e95392a37fc00c9d01` |
| Stellar JS Stellar Base      | `v12.0.0-rc1`                                                                                                                                       |
| Stellar JS Stellar SDK       | `v12.0.0-rc.3`                                                                                                                                      |
| Freighter                    |                                                                                                                                                     |
| Laboratory                   |                                                                                                                                                     |
| Soroban React Payment dapp   | `TBD`                                                                                                                                               |
| Soroban Mint Token dapp      | `TBD`                                                                                                                                               |
| Soroban Swap Token dapp      | `TBD`                                                                                                                                               |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                                            |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                                 |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015`                                                                                                    |

##### Release notes[​](#release-notes-2 "Direct link to Release notes")

###### Core[​](#core-2 "Direct link to Core")

This is the first stable Core release supporting protocol 21. New features in protocol 21:

- Secp256r1 support in Soroban host: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md)
- Soroban host function for extending TTL of contract instance and code separately: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md)
- Use refined cost model for VM instantiation in order to reduce the VM instantiation metered costs: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md)
- Intra-transaction VM module caching for the further Soroban cost reduction: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md), [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md)

###### Soroban Rust SDK[​](#soroban-rust-sdk-2 "Direct link to Soroban Rust SDK")

This is the first version of the Soroban SDK that supports protocol 21. It is marked as 'preview' because contracts built with SDK v21 will only be compatible with the networks upgraded to protocol 21. Key protocol-related changes:

- Support for secp256r1 signature verification
- Support for extending TTL of contract instance and code separate from each other

#### Protocol 21: Preview 1 (Testnet only, April 12, 2024)[​](#protocol-21-preview-1-testnet-only-april-12-2024 "Direct link to Protocol 21: Preview 1 (Testnet only, April 12, 2024)")

##### Software[​](#software-3 "Direct link to Software")

| Software                     | Version                                          |
| ---------------------------- | ------------------------------------------------ |
| XDR                          | `v21.1`                                          |
| Rust XDR                     | `v21.0.1`                                        |
| Soroban Environment          | `v21.0.1`                                        |
| Stellar Core                 | `v21.0.0rc1`                                     |
| Soroban Rust SDK             | `21.0.1-preview.1`                               |
| Soroban CLI                  | `v21.0.0-preview.1`                              |
| Soroban RPC                  | `v21.0.1`                                        |
| Stellar Horizon              | `v2.30.0`                                        |
| Stellar Quickstart           | \`\`                                             |
| Stellar JS Stellar Base      | `v11.1.0`                                        |
| Stellar JS Stellar SDK       | `v12.0.0-rc.1`                                   |
| Freighter                    | \`\`                                             |
| Laboratory                   | \`\`                                             |
| Soroban React Payment dapp   | `TBD`                                            |
| Soroban Mint Token dapp      | `TBD`                                            |
| Soroban Swap Token dapp      | `TBD`                                            |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`         |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`              |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015` |

##### Release notes[​](#release-notes-3 "Direct link to Release notes")

###### Core[​](#core-3 "Direct link to Core")

This is the first Core release supporting protocol 21. New features in protocol 21:

- Secp256r1 support in Soroban host: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md)
- Soroban host function for extending TTL of contract instance and code separately: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md)
- Use refined cost model for VM instantiation in order to reduce the VM instantiation metered costs: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md)
- Intra-transaction VM module caching for the further Soroban cost reduction: [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md), [https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md)

###### Soroban Rust SDK[​](#soroban-rust-sdk-3 "Direct link to Soroban Rust SDK")

This is the first version of the Soroban SDK that supports protocol 21. It is marked as 'preview' because contracts built with SDK v21 will only be compatible with the networks upgraded to protocol 21. The API itself may be considered stable. Key changes:

- Support for secp256r1 signature verification
- Support for extending TTL of contract instance and code separate from each other

#### Protocol 20: Soroban Phase 2 (March 19, 2024)[​](#protocol-20-soroban-phase-2-march-19-2024 "Direct link to Protocol 20: Soroban Phase 2 (March 19, 2024)")

##### Software[​](#software-4 "Direct link to Software")

| Software                     | Version                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [3da6ebcbd8afa01d5c94dbc7f0475f4c00089420](https://github.com/stellar/rs-stellar-xdr/commit/3da6ebcbd8afa01d5c94dbc7f0475f4c00089420) |
| Soroban Environment          | `v20.2.2`                                                                                                                             |
| Soroban Interface Version    | `0`                                                                                                                                   |
| Soroban Resource Limits      | [Phase 2 Limits](/docs/networks/resource-limits-fees#resource-limits)                                                                 |
| Soroban Resource Fees        | [Phase 2 Fees](/docs/networks/resource-limits-fees#resource-fees)                                                                     |
| Stellar Core                 | `v20.3.0`                                                                                                                             |
| Soroban Rust SDK             | `v20.4.0`                                                                                                                             |
| Soroban CLI                  | `v20.3.1`                                                                                                                             |
| Soroban RPC                  | `v20.3.3`                                                                                                                             |
| Stellar Horizon              | `v2.28.3`                                                                                                                             |
| Stellar Friendbot            | `TBD`                                                                                                                                 |
| Stellar Quickstart           | `docker.io/stellar/quickstart:latest@sha256:1a82b17a4fae853d24189dd25d4e6b774fa7a1b6356a993e618c6e9bd2f3e04c`                         |
| Stellar JS Stellar Base      | [`v11.0.0`](https://github.com/stellar/js-stellar-base/releases/tag/v11.0.0)                                                          |
| Stellar JS Stellar SDK       | [`v11.2.2`](https://github.com/stellar/js-stellar-sdk/releases/tag/v11.2.2)                                                           |
| Freighter                    | `v5.17.0`                                                                                                                             |
| Laboratory                   | `v4.1.0`                                                                                                                              |
| Soroban React Payment dapp   | `TBD`                                                                                                                                 |
| Soroban Mint Token dapp      | `TBD`                                                                                                                                 |
| Soroban Swap Token dapp      | `TBD`                                                                                                                                 |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                              |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                   |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015`                                                                                      |

##### Changelog[​](#changelog "Direct link to Changelog")

###### Core[​](#core-4 "Direct link to Core")

- Remove use of C99 that looks like Cxx20 designated initializers
- Reduce scan size in phase1
- Add simulate subcommand to network survey script
- Continue to capture SCP messages for previous ledger in database
- Rewrite state loading path on startup
- Add support for debug-tx-set in dump-xdr
- Bucket cleanup
- Update phase1 settings
- Fix compile error (Visual C++)
- Update soroban settings files and utils
- Add new throttling metrics
- Adds CLI tool to print BucketList archival stats
- Update denominators
- Set key size to initial value
- Update max_entries_to_archive to be 1000.
- Restrict "prev" test to just the voting path, to allow catchup.
- Strkey update
- Add scripts/extract-wasms.sh
- Bump overlay min version to 32
- Fix noisy eviction scan warnings
- Early initialization of soroban metrics

###### Soroban Rust SDK[​](#soroban-rust-sdk-4 "Direct link to Soroban Rust SDK")

- Display String contents in Debug implementation
- Add Bytes to_buffer and to_alloc_vec
- Move the Env testutil internal types into a single type
- Add option to disable test snapshots on Env
- Bump version to 20.4.0

#### Protocol 20: Soroban Phase 1 (February 27, 2024)[​](#protocol-20-soroban-phase-1-february-27-2024 "Direct link to Protocol 20: Soroban Phase 1 (February 27, 2024)")

##### Software[​](#software-5 "Direct link to Software")

| Software                     | Version                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [8b9d623ef40423a8462442b86997155f2c04d3a1](https://github.com/stellar/rs-stellar-xdr/commit/8b9d623ef40423a8462442b86997155f2c04d3a1) |
| Soroban Environment          | `v20.2.2`                                                                                                                             |
| Soroban Interface Version    | `0`                                                                                                                                   |
| Soroban Resource Limits      | [Phase 1 Limits](/docs/networks/resource-limits-fees#resource-limits)                                                                 |
| Soroban Resource Fees        | [Phase 1 Fees](/docs/networks/resource-limits-fees#resource-fees)                                                                     |
| Stellar Core                 | `v20.2.0`                                                                                                                             |
| Soroban Rust SDK             | `v20.3.2`                                                                                                                             |
| Soroban CLI                  | `v20.3.1`                                                                                                                             |
| Soroban RPC                  | `v20.3.3`                                                                                                                             |
| Stellar Horizon              | `v2.28.3`                                                                                                                             |
| Stellar Friendbot            | `TBD`                                                                                                                                 |
| Stellar Quickstart           | `docker.io/stellar/quickstart:latest@sha256:1a82b17a4fae853d24189dd25d4e6b774fa7a1b6356a993e618c6e9bd2f3e04c`                         |
| Stellar JS Stellar Base      | [`v11.0.0`](https://github.com/stellar/js-stellar-base/releases/tag/v11.0.0)                                                          |
| Stellar JS Stellar SDK       | [`v11.2.2`](https://github.com/stellar/js-stellar-sdk/releases/tag/v11.2.2)                                                           |
| Freighter                    | `v5.17.0`                                                                                                                             |
| Laboratory                   | `v4.1.0`                                                                                                                              |
| Soroban React Payment dapp   | `TBD`                                                                                                                                 |
| Soroban Mint Token dapp      | `TBD`                                                                                                                                 |
| Soroban Swap Token dapp      | `TBD`                                                                                                                                 |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                              |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                   |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015`                                                                                      |

##### Changelog[​](#changelog-1 "Direct link to Changelog")

###### Soroban RPC[​](#soroban-rpc "Direct link to Soroban RPC")

- (tag: v20.3.3) Bump version to 20.3.3
- Update Dockerfile and Makefile to refer rpc instead of tools
- Fix publish-dry-run failures
- Revert "soroban-rpc: Remove publish-dry-run Workflow"
- Perform fee padding in a larger bit width of integers
- (tag: v20.3.2) Bump version to 20.3.2
- Merge pull request #68 from stellar/add-spec-tools-crate
- Merge branch 'main' into add-spec-tools-crate
- Change module from soroban-tool to rpc in go.mod
- Add hardcoded WASM file and reference it in tests
- Uncomment install_rust
- Add prometheus hook to count different log levels
- Remove build-test-wasms from makefile

###### Soroban CLI[​](#soroban-cli "Direct link to Soroban CLI")

- (tag: v20.3.1) Bump version to 20.3.1
- Update references in end-to-end tests to point to the latest releases
- Bump version of soroban rpc and spec tools
- Repoint soroban-spec-tools to the moved one in stellar/soroban-rpc
- Rename Cargo.toml in the init template files
- soroban-cli: Remove ALL RPC Related Code and Workflows
- Use soroban-rpc crate from the RPC repo
- fix: embed the init template files in the build
- \[Epic\] Separating soroban-rpc to prepare for repo change
- Soroban contract init followup
- Merge pull request #1190 from stellar/release/v20.3.0
- Merge branch 'main' into release/v20.3.0
- Revert "\[Epic\] Separating soroban-rpc to prepare for repo change"
- \[Epic\] Separating soroban-rpc to prepare for repo change

#### Protocol 20: Soroban Phase 1 (Mainnet Edition) (February 5, 2024)[​](#protocol-20-soroban-phase-1-mainnet-edition-february-5-2024 "Direct link to Protocol 20: Soroban Phase 1 (Mainnet Edition) (February 5, 2024)")

##### Software[​](#software-6 "Direct link to Software")

| Software                     | Version                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [8b9d623ef40423a8462442b86997155f2c04d3a1](https://github.com/stellar/rs-stellar-xdr/commit/8b9d623ef40423a8462442b86997155f2c04d3a1) |
| Soroban Environment          | `v20.2.2`                                                                                                                             |
| Soroban Interface Version    | `0`                                                                                                                                   |
| Soroban Resource Limits      | [Phase 0 Limits](/docs/networks/resource-limits-fees#resource-limits)                                                                 |
| Soroban Resource Fees        | [Phase 0 Fees](/docs/networks/resource-limits-fees#resource-fees)                                                                     |
| Stellar Core                 | `v20.2.0`                                                                                                                             |
| Soroban Rust SDK             | `v20.3.2`                                                                                                                             |
| Soroban CLI                  | `v20.3.0`                                                                                                                             |
| Soroban RPC                  | `v20.3.1`                                                                                                                             |
| Stellar Horizon              | `v2.28.3`                                                                                                                             |
| Stellar Friendbot            | `TBD`                                                                                                                                 |
| Stellar Quickstart           | `docker.io/stellar/quickstart:latest@sha256:8d6f6520ad3842042bfe4e271f8b2324ec2f128564487abedd3876cea83af4f1`                         |
| Stellar JS Stellar Base      | [`v11.0.0`](https://github.com/stellar/js-stellar-base/releases/tag/v11.0.0)                                                          |
| Stellar JS Stellar SDK       | [`v11.2.2`](https://github.com/stellar/js-stellar-sdk/releases/tag/v11.2.2)                                                           |
| Freighter                    | `5.16.0`                                                                                                                              |
| Laboratory                   | `v4.1.0`                                                                                                                              |
| Soroban React Payment dapp   | `v3.0.0`                                                                                                                              |
| Soroban Mint Token dapp      | `v3.0.0`                                                                                                                              |
| Soroban Swap Token dapp      | `TBD`                                                                                                                                 |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                              |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                   |
| Mainnet Network Passphrase   | `Public Global Stellar Network ; September 2015`                                                                                      |

##### Changelog[​](#changelog-2 "Direct link to Changelog")

###### XDR[​](#xdr "Direct link to XDR")

- Run CI for the msrv and latest rust version
- Backfill changes to next for json rendering
- Bump XDR
- Bump version to 20.1.0

###### Soroban Environment[​](#soroban-environment "Direct link to Soroban Environment")

- Allow small version-range wiggle room on curve25519-dalek to enable docs.rs nightly build
- Bump version to 20.2.2
- Enable publish of soroban-simulation crate
- Add a function to invoke host function 'end-to-end' in recording mode.
- Bug 1283 asset code rendering
- Use strkeys for contract IDs and addresses in diagnostic events.
- Turn off wasm_reference_types in Wasmi
- Prng tests
- Remove ConversionError from ScVal/Val conversions
- Tightening up metering in auth
- Bump XDR to 20.1
- Allow negative fee1 kb low
- Bump version to 20.2.0
- Cover various Symbol conversion code paths with various valid/invalid cases
- Run CI for the msrv and latest rust version
- Add protocol version method to invoke_contract
- Enable VM execution in a WASM environment by guarding time track behind time feature
- Add test for checking VM stack depth.
- Migrate preflight computations from soroban-rpc
- soroban-simulate: Misc fixes
- Add CI job to run cargo-semver-checks
- Tracing
- Add some basic test coverage for e2e_invoke.
- Add test vectors for ed25519 edge cases
- Trace should not emit diagnostic errors
- Bump wasmi to 0.31.1-soroban.20.0.1
- Bump version to 20.1.1

###### Soroban Rust SDK[​](#soroban-rust-sdk-5 "Direct link to Soroban Rust SDK")

- Update soroban-env-\*
- Bump version to 20.3.2
- Update extend_ttl docs
- Bug 1076 conversion error flattening

###### Soroban RPC[​](#soroban-rpc-1 "Direct link to Soroban RPC")

- Migrate Soroban Tools to Soroban RPC
- Use soroban-tools Crates
- Pull in Recent Soroban RPC changes from soroban-tools
- Mirror Last Remaining PRs from soroban-tools Repo
- Add Workflow to Publish soroban-rpc Crate
- added user agent config on ha archive pool
- Update getTxn rpc with events data
- Remove publish-dry-run Workflow
- Use external soroban-simulation library for preflight computations
- Store and serve the event transaction ID
- Reduce event memory footprint
- Add diagnostic events to sendTransaction response
- Remove panics from internal codebase

###### Soroban CLI[​](#soroban-cli-1 "Direct link to Soroban CLI")

- feat: soroban init command
- Bump dependencies for pubnet release
- Upgrade Ubuntu to 22.04 from 20.04
- Bump Go, Rust and Core dependencies
- feat/cli: Move config commands to top level
- bindings-ts: update to latest SDK & TypeScript, add CI test
- TypeScript bindings have been updated to use the latest stellar-sdk
- Support multi-auth workflows in typescript bindings
- Replace cli xdr command with stellar-xdr cli
- Update typescript bindings for latest versions
- Warn about RC versions only when using pubnet

#### Stable v20.1.0 (January 11, 2024)[​](#stable-v2010-january-11-2024 "Direct link to Stable v20.1.0 (January 11, 2024)")

##### Software[​](#software-7 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [bb54e505f814386a3f45172e0b7e95b7badbe969](https://github.com/stellar/stellar-xdr/commit/bb54e505f814386a3f45172e0b7e95b7badbe969) |
| Soroban Environment          | `v20.1.0`                                                                                                                          |
| Soroban Interface Version    | `0`                                                                                                                                |
| Stellar Core                 | `v20.1.0`                                                                                                                          |
| Soroban Rust SDK             | `v20.2.0`                                                                                                                          |
| Soroban CLI                  | `v20.2.0`                                                                                                                          |
| Soroban RPC                  | `v20.2.0`                                                                                                                          |
| Stellar Horizon              | `v2.27.0`                                                                                                                          |
| Stellar Friendbot            | `TBD`                                                                                                                              |
| Stellar Quickstart           | `docker.io/stellar/quickstart:soroban-dev@sha256:64b2d14b8a531c534560e287768846f538b2f063fc776aa9ca016c788e86c782`                 |
| Stellar JS Stellar Base      | [`v10.0.1`](https://github.com/stellar/js-stellar-base/releases/tag/v10.0.1)                                                       |
| Stellar JS Stellar SDK       | [`v11.2.0`](https://github.com/stellar/js-stellar-sdk/releases/tag/v11.2.0)                                                        |
| Freighter                    | `5.9.0`                                                                                                                            |
| Laboratory                   | `TBD`                                                                                                                              |
| Soroban React Payment dapp   | `TBD`                                                                                                                              |
| Soroban Mint Token dapp      | `TBD`                                                                                                                              |
| Soroban Swap Token dapp      | `TBD`                                                                                                                              |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                |

##### Changelog[​](#changelog-3 "Direct link to Changelog")

###### Soroban Rust SDK[​](#soroban-rust-sdk-6 "Direct link to Soroban Rust SDK")

- Fix bug with Timepoint/Duration as parameters/returns
- Add storage update fns
- Export functions for creating Timepoint/Duration
- Allow `&Env` in contract fns

#### Stable v20.0.0 (December 18, 2023)[​](#stable-v2000-december-18-2023 "Direct link to Stable v20.0.0 (December 18, 2023)")

##### Software[​](#software-8 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [bb54e505f814386a3f45172e0b7e95b7badbe969](https://github.com/stellar/stellar-xdr/commit/bb54e505f814386a3f45172e0b7e95b7badbe969) |
| Soroban Environment          | `v20.0.0`                                                                                                                          |
| Soroban Interface Version    | `0`                                                                                                                                |
| Stellar Core                 | `v20.0.1`                                                                                                                          |
| Soroban Rust SDK             | `v20.0.0`                                                                                                                          |
| Soroban CLI                  | `v20.0.2`                                                                                                                          |
| Soroban RPC                  | `v20.0.2`                                                                                                                          |
| Stellar Horizon              | `v2.27.0`                                                                                                                          |
| Stellar Friendbot            | `TBD`                                                                                                                              |
| Stellar Quickstart           | `docker.io/stellar/quickstart:testing@sha256:3c7947f65db493f2ab8ca639753130ba4916c57d000d4a1f01ec530e3423853b`                     |
| Stellar JS Stellar Base      | [`v10.0.0`](https://github.com/stellar/js-stellar-base/releases/tag/v10.0.0)                                                       |
| Stellar JS Stellar SDK       | [`v11.0.1`](https://github.com/stellar/js-stellar-sdk/releases/tag/v11.0.1)                                                        |
| Stellar JS Soroban Client    | [`v1.0.0`](https://github.com/stellar/js-soroban-client/releases/tag/v1.0.0) (deprecated, prefer the Stellar SDK)                  |
| Freighter                    | `5.12.0`                                                                                                                           |
| Laboratory                   | `4.11.0`                                                                                                                           |
| Soroban React Payment dapp   | `3.0.0`                                                                                                                            |
| Soroban Mint Token dapp      | `3.0.0`                                                                                                                            |
| Soroban Swap Token dapp      | `TBD`                                                                                                                              |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                |

##### Changelog[​](#changelog-4 "Direct link to Changelog")

###### XDR[​](#xdr-1 "Direct link to XDR")

- Update the docs for extendTTL/restore ops to match the threshold change

###### Soroban Environment[​](#soroban-environment-1 "Direct link to Soroban Environment")

- Make RecordedAuthPayload consistently return None for invoker.
- Expiration-related fixes
- Turn dynamic borrow panics into HostErrors
- Use Ed25519 verify_strict function rather than just verify, fix #857
- Misc int32 issues
- Enforce object handle integrity when inserting into containers, fix #569
- Add testcase for out-of-order scmaps, fix #223.
- Add a function to compute the rent fee.
- Use host.err for auth error
- Add a smoke test for recording auth for create contract host fn.
- Stop treating storage errors as missing entries
- Refactor authorization manager to only maintain mutable borrow on minimal amount of fields
- Bump xdr
- Add rent bumps to the SAC
- Add is_admin function
- Bump xdr
- Add function to compute the write fee based on the ledger size.
- Prohibit using disjoint signatures to cover the auth tree.
- Enforce DepthLimiter in the Host to avoid stack overflow
- Relative objects in wasm
- Adapt to ResourceLimiter, replacing mem_fuel metering
- Make del_contract_data no-op for removing non-existent instance storage key.
- Add "tracy" feature to enable Tracy profiler, with some basic annotations
- Update host to account for the XDR changes.
- Update rust-version
- Adapt to SCError change to be an enum, with ContractError(u32)
- Make some host errors non-recoverable in try_call.
- Fix panic-string-logging code path broken by recent dynamic-borrow fix.
- Add soroban-bench-utils, add benchmark tests to measure metering accuracy
- Bump env xdr and do the fee library changes corresponding to config changes
- Bump env xdr
- Remove event topic limits
- Bump env xdr
- Unify/fix expiration bump logic in host.
- Add new tests for error escalation from contract calls.
- Add a helper that invokes a host function 'end-to-end'
- Add helpers for container bulk init; applies to auth metering
- Switch some auth errors from Internal to InvalidInput.
- Enable post-MVP WASM ops (sign-ext and mutable-globals), fix #968.
- More token tests
- Alloc example
- Mop up some residual uses of format strings in errors (no longer supported)
- Add wasm for upgrade write-bytes contract
- Scale the linear cost model coefficient; improve model fitting
- Error if bumping past max_entry_expiration and host function to retrieve max_entry_expiration
- Make has checks to properly populate the storage map in recording mode
- Clean up budget cost types
- Add debug events to storage error reporting.
- Switch to stable rust-analyzer in CI
- Add some comments and tests to env-common/symbol.rs
- Upgrade dalek crates to new stable versions.
- Add an option to return an error when encountering non-root auth in recording mode.
- Reject env.json if there are duplicate export names, fix #189
- Tighten signature of unchecked_visit_val_obj, fix #595
- Tighten dependencies further
- Fix incorrect argument name
- Bump env xdr
- Tighten up Map and Vector and metering coverage
- Store dummy instance for test contracts.
- Update XDR to take change that removes SCSpecTypeSet
- Fix comparison in Tag::is_object
- Fix calibration due to delak change
- Charge write fees for expiration entry bumps.
- Reduce the expiration entry write size.
- Refactor host to support the new expiration ledger approach.
- Add lifetime threshold
- Enable build workflow for merge groups
- Remove key size from rent change computation.
- Take change from txSOROBAN_RESOURCE_LIMIT_EXCEEDED to txSOROBAN_INVALID
- Add ExpirationEntry support
- Add git rev dep check to ci
- Fix encode contract events metering
- Trim deps
- Reject vals with invalid tags, fix #1029
- Fix EXPIRATION_ENTRY_SIZE constant
- Avoid iloop externalizing diagnostics for invalid references
- Add "coverage" Makefile target for lcov.info, add a test that extends coverage
- Fix asset-code rendering in native contract.
- Fix rent changes extraction bug
- Graydon code review
- Jay code review
- Bump xdr and use curr instead of next
- Trivial xdr bump
- Tighten wasm interface version checks, and do on upload.
- Update wasmi to 0.31.0-soroban
- Bump version to 20.0.0-rc1
- Add "next" feature to crates using xdr directly or indirectly
- Move out-slice len adjustment from symbol_copy_to_slice to its caller.
- Bump interface and regenerate wasms to handle symbol semantics change.
- No-op rename: remove metered from metered_scan_slice_of_slices
- Get rid of an unnecessary vector allocation in map_new_from_slices
- Remove metered map iterator functions.
- Small vec cleanup
- Code cleanup around PRNG
- Factor Tag::is_object to let Val::is_object delegate to it
- Set LedgerEntry extensions on existing entries
- Attach the auth in recording mode to any valid tracker.
- Improve storage error reporting for token contract.
- Env-common cleanups and dead code removal
- More cleanups, comments and fixes from code review.
- Make the 'unknown' wasmi error to be InvalidAction instead of InternalError
- Error improvements
- Small update for the default budget limits.
- Calibration for PRNG and charge budget
- Code review, cleanup, removal of dead/dangerous host functions
- Add redundant "next" dependencies
- Host code review, minor cleanups and code reorganization
- Fix the instance storage update logic.
- Feature: Expose rem_euclid functions on 256 bit numbers
- Replace address bytes conversions with strkey conversions.
- Use Address for call_account_contract_check_auth test helper.
- More code review and cleanup of host.rs module
- Budget fiddling
- Bump env XDR
- State expiration renames
- Cost type cleanup, bug fix, improve calibration
- Code review on fees, crypto, prng, dispatch
- Storage code review
- Setup bench framework to run experiments
- Decorate error for nonce missing from the footprint.
- Remove bad LEs
- Add missing fixed-size metering in comparison.rs, clean up a bit
- Properly dispatch test contracts based on the executable.
- Tighten up metering for linear memory routines
- conversion.rs code review fixes
- Review fixes for declared_size and metered_clone
- Gate recording auth behind the feature.
- Fix test wasms for latest sdk
- Cackle gate
- Remove spendable_balance from SAC.
- Extend upgrade contract from 30 to 60 days
- Bug 1042 internal renames
- Remove panic
- Stop caching authorization tracker verification status.
- Overhaul "free budget" and migrate non-metered code
- Clarify (and add redundant defensive code) in check_val_integrity
- Remove a panic and be more conservative about depth limit
- Add conceptual overview comment to auth module
- Fix fuzz-found panic in Prng::u64_in_inclusive_range
- Fix fuzzer-found frame stack corruption in rollback if instance storage fails
- Arbitrary-compatible expr generation and host fuzzing
- Improve auth test coverage a bit
- Rollback tests
- Add a test that ensures that SAC reentry is not possible.
- Remove vnext test wasms
- Add fn to find out if Host can be finished
- Add tests for more wasmi trap conditions
- Storage tests
- Add tests that try to build a deep host stack.
- More events and diagnostics testing
- Fix #1174 fuzzer-found deserialization of non-representable ScVal bug.
- tighten up handling of debug mode
- Update rust-version
- Adapt to rs-stellar-xdr Limits change
- Add tests that cover fees for each individual resource.
- Cover non-existent Wasm in test for updating Wasm.
- Adds loadgen test WASM
- Add wasm test for excessive initial memory and table size
- Initial cut at bug 872, observe side effects of tests
- Remove unnecessary copy of value
- Test update_contract_wasm with rollbacks.
- Bug 1146 test invalid val bit patterns
- Add @dmkozh as code owner of soroban-env-host
- Hook envbase and vec slices
- Update stellar-xdr
- Don't block merges on rust-analyzer compat check
- Observe most of the remainder of the testsuite
- Update deps, fix #1200
- Test nested extend_ttl
- Fix #1175 error code spoofing
- Do not error if no authorizations
- Add a contract that allows materializing arbitrarily large values.
- Updated loadgen Wasm
- Cap persistent extension to max
- Error on issuer for mint, burn, clawback, and burn_from
- Add a very simple hook for tracking top-level contract invocations.
- Macro for testing host function dispatch with bad inputs
- Check val integrity more
- Adapt to Rust 1.74
- Improve test coverage for crypto functions.
- Pub ContractInvocationEvent
- Pass ref to host to contract invocation hook
- Fix top contract invocation hook and auth interaction
- XDR limits updates
- Run user seeds to PRNGs through HMAC-SHA256 to unbias
- Add size_hint methods to Arbitrary impls
- Add tests for de-serializing deep XDR in deep call stack.
- Generate combinational tests for linear memory functions
- Add tests that grow containers until running out of memory budget.
- Observe more things
- Setting pre_release_version to zero in meta.rs in preparation of Soroban launch
- Add Host::has_frame
- Validated TTLentries
- Budget subsystem code review
- Rename extend host functions
- Fuzz fixes
- Cap number of args to wasm functions
- Cargo version pinning
- Pass --locked to publish as well
- Tighten up saturating\_ math checks
- Auth code review
- Remove unused publish scripts/make targets
- Write tests for unrecoverable errors with try_call
- Fix the invoker contract auth rollback logic and cover it in the tests.
- Re-calibration on x86 and update cost parameters
- Add tests for invalid maps, oversized maps/vecs/bytes from various paths
- Frame code review
- Improve XDR conversion coverage
- Add more error tests
- Improve budget tracker
- Validate assets when trying to create SAC instance.
- Conversion tests
- Update stellar-xdr
- Change string_new_from_slice to use &\[u8\] instead of &str.
- Update stellar-xdr
- Initial SAC review
- Derive debug, eq, ord on CostTracker for SDK
- Noop auth fix
- Test bad WASMs
- Add time tracker
- Bump wasmi and xdr to release versions
- SAC final code review
- Add fuzz target that runs wasmi on wasm-smith output
- Remaining host code review
- Bump version to 20.0.0

###### Soroban Rust SDK[​](#soroban-rust-sdk-7 "Direct link to Soroban Rust SDK")

- Token events
- Update rust-version
- Update SDK to recent env
- Add admin function
- fix: use uppercase const name
- Fix allocator
- Add Arbitrary impl for Duration and Timepoint
- Fix Budget::memory_bytes_cost
- Bump env to c5607a2e9e296b2636b46dc910387aa3446b3e29
- Bump env
- Update dalek, remove non-syn2 exemptions, tighten deps
- Update map iterator to be index based
- Remove ScSpecTypeSet support, which was already mostly dead.
- Provide a way to allow non-root auth in recording mode.
- Update env version in SDK.
- Update SDK to support expiration entry rework.
- Bump env for bump interface changes
- Correct comment on String::copy_into_slice
- Add doc comments about why symbol_short!
- Add test vector for workspace setups where contract types live in a lib
- Update rust-version
- Enable build workflow for merge groups
- re-enable linux arm64 builds
- Fix/criadoperez
- Text corrections
- Update rust-version
- bump env
- Fix name of the Stellar Asset admin client
- Add git rev dep check to ci
- Remove authorized from standard token interface
- Bump env
- Adapt to removal of ConversionError from number type conversions.
- Bump version to 20.0.0-rc1
- Implement deployer functions that return the deployed contract id.
- Add Vec::to_vals
- Expose PRNG functions
- Expose secp256k1 and keccak256 in the SDK
- Upgrade env to v20.0.0-rc2
- Elaborate more in comment on PRNG strengths and weaknesses
- Bump version to 20.0.0-rc2
- More explicit PRNG-explaining comments
- Adapt to minor env changes from code review
- Adapt to recent changes in env
- docs: Fixing a broken link in the SDK's lib.rs file
- Fix typos in arbitrary docs
- Change Storage::get to pub(crate)
- Add fn to expose max expiration available
- Update rust-version
- fix(snapshot): set entry expiration info in set_ledger_info
- Add SDK support for Address/StrKey conversions.
- bump env and xdr for state exp rename
- bump env
- Feature: expose rem_euclid functions and add 128/256 bit conversions
- Fix type of signature in auth
- Add testutils for accessing all storage of a contract
- Remove spendable balance
- Fix nightly lints on unused internal exports
- Generate all types of addresses when fuzzing.
- Use deterministic randomness in arbitrary tests
- Generate arbitrary containers with heterogeneous elements
- Add SorobanArbitrary implementations for tuples.
- Update env version
- Fix docs about prng seed
- Refactor Prng functions
- Add prng generation for slices and arrays
- Make easier to add shuffle to other types
- Make Env::default and Env::from_snapshot configure the environment the same
- Arbitrary testutils
- Remove use of rand from generated addresses, nonces, salts, and issuer pks
- Replace String::from_slice with from_str
- Update soroban-env-\* deps
- Encode network id as hex in ledger snapshots
- Autosave a test snapshot file on every test exit
- Allow bumping other instances
- Update env
- Make Option work with contract type
- Rename token::Interface/Client to TokenInterface/Client
- Don't write test snapshot if no thread name
- Minor tidy and organization of test snapshots
- Don't block merges on rust-analyzer compat check
- Expand Env test to check that separate tests are written for multiple Envs
- Do not record test snapshots for doc tests
- Check that no diffs exist after test run due to uncommitted test snapshots
- Add auth to Env snapshot
- Update env and xdr
- Snapshot all auths during a test not just last invokes
- Update rust-version
- Improvements to Arbitrary Options
- Hide EnvBase and other internal types
- Restore previous auth state in client
- Make try\_ fns return smaller SDK error type
- Remove nextest from Makefile
- bump env
- Renamed extend host function
- Update env
- Bump version to 20.0.0

###### Soroban RPC[​](#soroban-rpc-2 "Direct link to Soroban RPC")

- increased preflight instruction fee padding to 3 million
- Enforce enabling diagnostics events
- Add getPreflight benchmark and test
- Add write-through cache for config ledger entries
- Cache all ledger entries queried from DB in read transaction
- simulateTransaction automatically detects ledger entries which require restoring
- Add heap profiling endpoints
- Try to return diagnostic events on failure from simulateTransaction
- Add generic panic handling
- Limit request size to 10MB
- getLedgerEntries can query multiple ledger entries at once
- Stream ledgers on initialization
- Set maximum number of keys to query for getLedgerEntries
- Add support for new state expiration ledger entries
- Ingest temp ledger entry evictions
- Lower max http request size
- Set base prng to zero in preflight and invoke
- Exclude temporary expired entries from SnapshotSource in preflight
- Include system events in fee calculation in preflight
- Get expiration ledger sequence at source
- Add a "Building from Source" README.md
- Flatten the getEvents response structure
- Enable debug by default for preflight
- Optimize in-memory transaction store
- Force On-Disk Mode
- Fix datarace in bufferedResponseWriter.WriteOut
- Fix upsert bug in DB cache
- Fix ledger entry visibility bug
- Fix unwrap() errors in libpreflight due to bugs in the Go/Rust interface
- Fix simulation sequence number for bump/restore operations
- Improve missing command line arguments message
- Fix caching of GetLatestLedgerSequence
- Ensure that the sim events are logged; improve format of main logs
- Validate xdr payloads in soroban-rpc requests
- Fix double-counting bug in preflight
- Fix potential overflow
- Fix multi-entry responses for getLedgerEntries method
- Update jrpc2 version to enable application/json; charset=utf-8
- Unify all ledger sequence types to uint32 and stop stringyfying integers < 53-bits wide
- Restore CORS support

###### Soroban CLI[​](#soroban-cli-2 "Direct link to Soroban CLI")

- Allow fetching contract from network
- Each generated contract method adds -file-path
- Add two new output types for contract inspect
- Add config identity fund to fund accounts on networks
- Add Auth-next signing support
- Add dotenv so directories can now set CLI args
- Add key::Args and FullLedgerEntry/FullLedgerEntries
- Remove sandbox
- Add Assembled Transaction that handle preparing transaction post simulation
- Make aliases visible in help doc
- Fix --cost flag
- Set the exit code to 1 in case of an error
- Return an error once contract read is unable to read any entry
- Wrap token no longer fails with valid inputs in sandbox mode
- fund command now can accept a public strkey
- Warn or Error When Deploying Contracts Compiled with RC Version of Soroban SDK
- Print help if custom CLI is empty & replace unwrap where possible
- Fix various typescript bindings
- Make output consistent for all ways to get version

#### Preview 11 (September 11, 2023): Testnet and Futurenet Edition[​](#preview-11-september-11-2023-testnet-and-futurenet-edition "Direct link to Preview 11 (September 11, 2023): Testnet and Futurenet Edition")

##### Software[​](#software-9 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [9ac02641139e6717924fdad716f6e958d0168491](https://github.com/stellar/stellar-xdr/commit/9ac02641139e6717924fdad716f6e958d0168491) |
| Soroban Environment          | `v20.0.0-rc2`                                                                                                                      |
| Soroban Interface Version    | `57`                                                                                                                               |
| Stellar Core                 | `20.0.0-1504.rc2.22088c1f2.focal`                                                                                                  |
| Soroban Rust SDK             | `v20.0.0-rc2`                                                                                                                      |
| Soroban CLI                  | `v20.0.0-rc4`                                                                                                                      |
| Soroban RPC                  | `v20.0.0-rc4`                                                                                                                      |
| Stellar Horizon              | `2.27.0~rc2-384`                                                                                                                   |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                             |
| Stellar Quickstart           | `docker.io/stellar/quickstart:testing@sha256:0c756150e7b3c53603fe36bb932c4e7d7ceaef691906b2d3d952771ccc195559`                     |
| Stellar JS Stellar Base      | [`v10.0.0-beta.3`](https://github.com/stellar/js-stellar-base/releases/tag/v10.0.0-beta.3)                                         |
| Stellar JS Stellar SDK       | [`v11.0.0-beta.5`](https://github.com/stellar/js-stellar-sdk/releases/tag/v11.0.0-beta.5)                                          |
| Stellar JS Soroban Client    | [`v1.0.0-beta.3`](https://github.com/stellar/js-soroban-client/releases/tag/v1.0.0-beta.3) (deprecated, prefer the Stellar SDK)    |
| Freighter                    | `5.6.1`                                                                                                                            |
| Laboratory                   | `2.12.0`                                                                                                                           |
| Soroban React Payment dapp   | `2.0.0`                                                                                                                            |
| Soroban Mint Token dapp      | `2.0.0`                                                                                                                            |
| Soroban Swap Token dapp      | `2.0.0`                                                                                                                            |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |
| Testnet Network Passphrase   | `Test SDF Network ; September 2015`                                                                                                |

> **NOTE**
>
> note
>
> The Soroban RPC version for Preview 11 is presently in Stellar's unstable and testing apt repositories. Additionally, its Docker image release can be accessed at [docker.io/stellar/soroban-rpc:20.0.0-rc3-39](https://hub.docker.com/layers/stellar/soroban-rpc/20.0.0-rc3-39/images/sha256-227170869bca74998e1b6cc1e07deb3aca8d03e36154b3da700d6669e19d485b?context=explore).

##### Changelog[​](#changelog-5 "Direct link to Changelog")

###### XDR[​](#xdr-2 "Direct link to XDR")

- Generate for entry expired error
- Bump XDR
- Generate XDR DepthLimiter and depth-limited Read/WriteXdr
- Bump XDR
- Make SCError into a union to allow user errors to be u32
- Update rust-version
- Bump XDR
- Bump XDR
- Bump XDR
- Regen to pick up ContractCostType changes
- Bump XDR
- Update to reflect removal of SCSpecTypeSet
- Bump XDR
- Take change from txSOROBAN_RESOURCE_LIMIT_EXCEEDED to txSOROBAN_INVALID
- Run CI via in merge queue
- Update rust-version
- Bump curr and next
- Bump XDR
- Bump version to 20.0.0-rc1

###### Soroban Environment[​](#soroban-environment-2 "Direct link to Soroban Environment")

- Attach the auth in recording mode to any valid tracker when possible
- Make RecordedAuthPayload consistently return None for invoker
- Expiration-related fixes
- Turn dynamic borrow panics into HostErrors
- Use Ed25519 verify_strict function rather than just verify, fix #857
- Misc int32 issues
- Enforce object handle integrity when inserting into containers, fix #569
- Add testcase for out-of-order scmaps, fix #223
- Add a function to compute the rent fee
- Use host.err for auth error
- Add a smoke test for recording auth for create contract host fn
- Stop treating storage errors as missing entries
- Refactor authorization manager to only maintain mutable borrow on minimal amount of fields
- Bump xdr
- Add rent bumps to the SAC
- Add is_admin function
- Bump xdr
- Add function to compute the write fee based on the ledger size
- Prohibit using disjoint signatures to cover the auth tree
- Enforce DepthLimiter in the Host to avoid stack overflow
- Relative objects in wasm
- Adapt to ResourceLimiter, replacing mem_fuel metering
- Make del_contract_data no-op for removing non-existent instance storage key
- Add "tracy" feature to enable Tracy profiler, with some basic annotat…
- Update host to account for the XDR changes
- Update rust-version
- Adapt to SCError change to be an enum, with ContractError(u32)
- Make some host errors non-recoverable in try_call
- Fix panic-string-logging code path broken by recent dynamic-borrow fix
- Add soroban-bench-utils, add benchmark tests to measure metering accuracy
- Bump env xdr and do the fee library changes corresponding to config changes
- Bump env xdr
- Remove event topic limits
- Bump env xdr
- Unify/fix expiration bump logic in host
- Add new tests for error escalation from contract calls
- Add a helper that invokes a host function 'end-to-end'
- Add helpers for container bulk init; applies to auth metering
- Switch some auth errors from Internal to InvalidInput
- Enable post-MVP WASM ops (sign-ext and mutable-globals), fix #968
- More token tests
- Alloc example
- Mop up some residual uses of format strings in errors (no longer supported)
- Add wasm for upgrade write-bytes contract
- Scale the linear cost model coefficient; improve model fitting
- Error if bumping past max_entry_expiration and and host function to retrieve max_entry_expiration
- Make has checks to properly populate the storage map in recording mode
- Clean up budget cost types
- Add debug events to storage error reporting
- Switch to stable rust-analyzer in CI
- Add some comments and tests to env-common/symbol.rs
- Upgrade dalek crates to new stable versions
- Add an option to return an error when encountering non-root auth in recording mode
- Reject env.json if there are duplicate export names, fix #189
- Tighten signature of unchecked_visit_val_obj, fix #595
- Tighten dependencies further
- Fix incorrect argument name
- Bump env xdr
- Tighten up Map and Vector and metering coverage
- Store dummy instance for test contracts
- Update XDR to take change that removes SCSpecTypeSet
- Fix comparison in Tag::is_object
- Fix calibration due to delak change
- Charge write fees for expiration entry bumps
- Reduce the expiration entry write size
- Refactor host to support the new expiration ledger approach
- Add lifetime threshold
- Enable build workflow for merge groups
- Remove key size from rent change computation
- Take change from txSOROBAN_RESOURCE_LIMIT_EXCEEDED to txSOROBAN_INVALID
- Add ExpirationEntry support
- Add git rev dep check to ci
- Fix encode contract events metering
- Trim deps
- Reject vals with invalid tags, fix #1029
- Host: fix EXPIRATION_ENTRY_SIZE constant
- Avoid iloop externalizing diagnostics for invalid references
- Add "coverage" Makefile target for lcov.info, add a test that extends coverage
- Fix asset-code rendering in native contract
- Fix rent changes extraction bug
- Graydon code review
- Jay code review
- Bump xdr and use curr instead of next
- Trivial xdr bump
- Tighten wasm interface version checks, and do on upload, Fix #1052
- Update wasmi to 0.31.0-soroban
- Bump version to 20.0.0-rc1

###### Soroban Rust SDK[​](#soroban-rust-sdk-8 "Direct link to Soroban Rust SDK")

- Implement deployer functions that return the deployed contract id
- Add Vec::to_vals
- Expose PRNG functions
- Expose secp256k1 and keccak256 in the SDK
- Upgrade env to v20.0.0-rc2
- Elaborate more in comment on PRNG strengths and weaknesses
- Bump version to 20.0.0-rc2
- Token events
- Update rust-version
- Update SDK to recent env
- Add admin function
- fix: use uppercase const name
- Fix allocator
- Add Arbitrary impl for Duration and Timepoint
- Fix Budget::memory_bytes_cost
- Bump env to c5607a2e9e296b2636b46dc910387aa3446b3e29
- Bump env
- Update dalek, remove non-syn2 exemptions, tighten deps
- Update map iterator to be index based
- Remove ScSpecTypeSet support, which was already mostly dead
- Provide a way to allow non-root auth in recording mode
- Update env version in SDK
- Update SDK to support expiration entry rework
- Bump env for bump interface changes
- Correct comment on String::copy_into_slice
- Add doc comments about why symbol_short!
- Add test vector for workspace setups where contract types live in a lib
- Update rust-version
- Enable build workflow for merge groups
- re-enable linux arm64 builds
- Fix/criadoperez
- Text corrections
- Update rust-version
- bump env
- Fix name of the Stellar Asset admin client
- Add git rev dep check to ci
- Remove authorized from standard token interface
- Bump env
- Adapt to removal of ConversionError from number type conversions
- Bump version to 20.0.0-rc1

###### Soroban RPC[​](#soroban-rpc-3 "Direct link to Soroban RPC")

- List --network under RPC options
- Enforce enabling diagnostics events
- simulateTransaction will automatically detect ledger entries which require restoring
- simulateTransaction will try to return diagnostic events on failure
- getLedgerEntries can query multiple ledger entries at once
- getLedgerEntries can set the maximum number of keys to query for
- Temporary ledger entry evictions are ingested
- Support StrKey format for contractIds field in getEvents request
- Limit the execution duration of the jrpc requests
- Performance fixes and improvements: add writethrough cache for config ledger entries and cache DB results better
- Fix ledgerentry visibility bug
- Fix simulation sequence number for bump/restore operations
- Improve missing command line arguments message
- Add missing config settings in ledger entry cache on reads
- Fix caching of GetLatestLedgerSequence
- Limit request size to 10MB
- Limit number of concurrent requests
- Improve HTTPRequestDurationLimiter by adding a recover handling
- Stream ledgers on initialization
- Increase instruction leeway to 20% in transaction simulation
- Validate xdr payloads in soroban-rpc requests
- Fix double-counting bug
- Fix datarace in bufferedResponseWriter.WriteOut
- Fix set_authorization_entries bug in transaction simulation
- Restore CORS support

###### Soroban CLI[​](#soroban-cli-3 "Direct link to Soroban CLI")

- Add multi-party authorization + signing support
- Add two new output types for contract inspect
- Add config identity fund to fund accounts on networks
- Add restore/bump support with --wash_hash
- Allow passing true and false to boolean types
- Each generated contract method adds `<contract-arg>-file-path`
- Add dotenv so directories can now set CLI args
- Generated TypeScript bindings have significantly improved
- Make Wallet injectable
- Correct generated README
- Allow fetching contract from network
- Removed --contract-name, added --overwrite
- Require configuring network settings
- Leveraging the latest soroban-client (v1.0.0-beta)
- Make aliases visible in help doc
- Ensure that the sim events are logged; improve format of main logs
- Fix --cost flag
- Set the exit code to 1 in case of an error
- Return an error once contract read is unable to read any entry
- wrap token no longer fails with valid inputs in sandbox mode

#### Preview 10 (July 13, 2023)[​](#preview-10-july-13-2023 "Direct link to Preview 10 (July 13, 2023)")

##### Software[​](#software-10 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [e372df9f677961aac04c5a4cc80a3667f310b29f](https://github.com/stellar/stellar-xdr/commit/e372df9f677961aac04c5a4cc80a3667f310b29f) |
| Soroban Environment          | `v0.0.17`                                                                                                                          |
| Soroban Interface Version    | `51`                                                                                                                               |
| Stellar Core                 | `19.12.1-1406.b7d3a8f8d.focal~soroban`                                                                                             |
| Soroban Rust SDK             | `v0.9.2`                                                                                                                           |
| Soroban CLI                  | `v0.9.1`                                                                                                                           |
| Soroban RPC                  | `v0.9.2`                                                                                                                           |
| Stellar Horizon              | `stellar-horizon:2.26.1~soroban-373`                                                                                               |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                             |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:8a99332f834ca82e3ac1418143736af59b5288e792d1c4278d6c547c6ed8da3b`                           |
| Stellar JS Stellar Base      | `10.0.0-soroban.3`                                                                                                                 |
| Stellar JS Soroban Client    | `0.9.2`                                                                                                                            |
| Freighter                    | `5.2.3`                                                                                                                            |
| Laboratory                   | `2.11.0`                                                                                                                           |
| Soroban React Payment dapp   | `1.1.0`                                                                                                                            |
| Soroban Mint Token dapp      | `1.1.0`                                                                                                                            |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |

##### Changelog[​](#changelog-6 "Direct link to Changelog")

###### XDR[​](#xdr-3 "Direct link to XDR")

- Remove TransactionResultV2
- Regenerate for overhaul of error codes
- Bump xdr
- Bump XDR
- Update for state-expiration XDR changes
- Update rust-version
- Bump XDR
- Regenerate for new crypto cost types
- Bump XDR
- Bump op
- Generate for storage type removal
- Drop ContractCostType::VerifyEcdsaSecp256k1Sig
- Update next to pickup int256 cost types
- Regenerate rename
- Regenerate for typo
- Bump xdr with contract instance storage changes
- Regenerate for removal of ScVal::StorageType
- Regenerate for RestoreFootprintOp
- Generate rename
- Update crate-git-revision

###### Soroban Environment[​](#soroban-environment-3 "Direct link to Soroban Environment")

- Move a bunch of code out of host, reorg modules slightly.
- Remove temp storage, fixes #758
- Bump xdr
- Anti features
- Err reform
- Some further cleanups to diagnostic events
- Bump xdr
- Enforce AUTH_REVOCABLE on contract balances
- Implement PRNG subsystem (round 2)
- Remove incorrect debug_assert from ed25519_pub_key_from_bytes
- Support Auth Next for host fns
- Bump xdr
- Update rust-version
- Switch to wasmi native fuel metering
- Fix get_authenticated_authorizations test utility.
- Change authentication contract errors to be auth errors.
- Improve VmInstantiation calibration
- Update storage interface for state expiration
- Update README.md
- Implement contract expiration bumps
- Calibrate wasmi fuel and tiered wasm instructions
- Bump env XDR
- Implement `TryFrom<&Error>` for ScVal
- Provide host function for authorizing deep contract calls from current contract
- Switch auth from autoincrement nonces to temporary random values.
- Fix metering for internal events
- Return strings for name/symbol and use strkey for issuer.
- Remove Mergeable and rename Exclusive to Persistent
- Add secp256k1 and keccak256 host functions
- Add host functions for returning contract ids
- Fix comparisons
- Rename rawval to val
- Enforce readonly footprint on bump
- Add host functions for `{u,i}256` arithmetics
- More raw to val
- Support Timepoint, Duration
- Bump xdr
- Check map order when rebuilding from exact iter
- Updates for contract instance related XDR changes.
- Change StorageType to Just Be An Enum
- Bump xdr for RestoreFootprintOp
- Bump xdr for rename
- Add host function for bumping contract instance
- Implement contract instance storage in Soroban host.
- Change `[IU]256` arithmetic host functions to take \*Val not \*Object.
- Replace increase and decrease functions with approve
- Expose bumps
- Fix calibration tests
- Change `[IU]256` `[from,to]_bytes` functions to work with Val
- Bump wasmi version

###### Soroban Rust SDK[​](#soroban-rust-sdk-9 "Direct link to Soroban Rust SDK")

- Fix storage comment
- Noop in instance bump for tests

###### Soroban RPC[​](#soroban-rpc-4 "Direct link to Soroban RPC")

- Update js-soroban-client dependency from 0.9.0 to 0.9.1

###### Soroban CLI[​](#soroban-cli-4 "Direct link to Soroban CLI")

- Update js-soroban-client dependency from 0.9.0 to 0.9.1

#### Preview 9 (May 24th, 2023)[​](#preview-9-may-24th-2023 "Direct link to Preview 9 (May 24th, 2023)")

##### Software[​](#software-11 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [2f16687fdf6f4bcfb56805e2035f69997f4b34c4](https://github.com/stellar/stellar-xdr/commit/2f16687fdf6f4bcfb56805e2035f69997f4b34c4) |
| Soroban Environment          | `v0.0.16`                                                                                                                          |
| Soroban Interface Version    | `37`                                                                                                                               |
| Stellar Core                 | `19.10.1-1310.6649f5173.focal~soroban`                                                                                             |
| Soroban Rust SDK             | `v0.8.4`                                                                                                                           |
| Soroban CLI                  | `v0.8.0`                                                                                                                           |
| Soroban RPC                  | `v0.8.0`                                                                                                                           |
| Stellar Horizon              | `stellar-horizon:2.25.1~soroban-346`                                                                                               |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                             |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:57e8ab498bfa14c65595fbb01cb94b1cdee9637ef2e6634e59d54f6958c05bdb`                           |
| Stellar JS Stellar Base      | `9.0.0-soroban.1`                                                                                                                  |
| Stellar JS Soroban Client    | `0.7.0`                                                                                                                            |
| Freighter                    | `5.0.1`                                                                                                                            |
| Laboratory                   | `2.10.0`                                                                                                                           |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |

##### Changelog[​](#changelog-7 "Direct link to Changelog")

###### XDR[​](#xdr-4 "Direct link to XDR")

See [https://github.com/stellar/rs-stellar-xdr/releases](https://github.com/stellar/rs-stellar-xdr/releases) v0.0.16 for more details.

###### Soroban Environment[​](#soroban-environment-4 "Direct link to Soroban Environment")

See [https://github.com/stellar/rs-soroban-env/releases](https://github.com/stellar/rs-soroban-env/releases) v0.0.16 for more details.

###### Soroban Rust SDK[​](#soroban-rust-sdk-10 "Direct link to Soroban Rust SDK")

See [https://github.com/stellar/rs-soroban-sdk/releases](https://github.com/stellar/rs-soroban-sdk/releases) v0.8.4 for more details.

###### Soroban RPC[​](#soroban-rpc-5 "Direct link to Soroban RPC")

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.8.0 for more details.

###### Soroban CLI[​](#soroban-cli-5 "Direct link to Soroban CLI")

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.8.0 for more details.

#### Preview 8 (April 4th, 2023)[​](#preview-8-april-4th-2023 "Direct link to Preview 8 (April 4th, 2023)")

##### Software[​](#software-12 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [7356dc237ee0db5626561c129fb3fa4beaabbac6](https://github.com/stellar/stellar-xdr/commit/7356dc237ee0db5626561c129fb3fa4beaabbac6) |
| Soroban Environment          | `v0.0.15`                                                                                                                          |
| Soroban Interface Version    | `32`                                                                                                                               |
| Stellar Core                 | `19.8.1-1246.064a2787a.focal~soroban`                                                                                              |
| Soroban Rust SDK             | `v0.7.0`                                                                                                                           |
| Soroban CLI                  | `v0.7.0`                                                                                                                           |
| Soroban RPC                  | `v0.7.0`                                                                                                                           |
| Stellar Horizon              | `stellar-horizon:2.24.62~soroban-338`                                                                                              |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                             |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:a057ec6f06c6702c005693f8265ed1261e901b153a754e97cf18b0962257e872`                           |
| Stellar JS Stellar Base      | `8.2.2-soroban.12`                                                                                                                 |
| Stellar JS Soroban Client    | `v0.5.0`                                                                                                                           |
| Freighter                    | `v2.12.2`                                                                                                                          |
| Laboratory                   | `v2.8.0`                                                                                                                           |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |

##### Breaking changes note[​](#breaking-changes-note "Direct link to Breaking changes note")

This release includes a major overhaul of the value representation at the XDR level, which potentially breaks contracts that rely on the old type definitions, here is a summary of the changes:

- Removed the object/value split at the XDR level
- Expanded size of value tag from 8 to 128 cases
- Removed types: `U63`, `Static`, `Bitset`
- Added `U256`, `I256` and special case u64 subtypes `Timepoint` and `Duration`
- Added `String` which is a `Bytes`\-like object but displays as text
- Enhanced `Symbol` to have a maximum size of 32 bytes (no more 10-char limit)

SDK support has also been added/updated for these types. See [xdr](https://github.com/stellar/stellar-xdr/pull/70), [env](https://github.com/stellar/rs-soroban-env/pull/682) and [sdk](https://github.com/stellar/rs-soroban-sdk/pull/879) changes for more details.

##### Changelog[​](#changelog-8 "Direct link to Changelog")

###### XDR[​](#xdr-5 "Direct link to XDR")

- Make types wrapping Strings no longer aliases
- Value representation overhaul
- Diagnostic events

See [https://github.com/stellar/rs-stellar-xdr/releases](https://github.com/stellar/rs-stellar-xdr/releases) v0.0.15 for more details.

###### Soroban Environment[​](#soroban-environment-5 "Direct link to Soroban Environment")

- Remove the unnecessary error events that appeared in non-error scenarios.
- Reform metering for value cloning and memory allocation.
- Provide more test coverage for Auth Next.
- Check issuer clawback flag when new contract balance is created.
- Add a test that covers out-of-order require_auth calls.
- Token name in events.
- Adapt Storage and SnapshotSource to use Rc only.
- Add host functions to convert addresses to/from account/contract ids.
- Value and object representation overhaul.
- Move InvokerType from common env to internal host implementation.
- fix thinko in vec_new_from_linear_memory.
- Improve safety of custom account contracts.
- Split out DeclaredSizeForMetering from MeteredClone and use it for Compare.
- Structured debug events.
- Fix an i128 conversion bug.
- Use new bulk memory ops for tuples.
- Host budget metering, cost model, calibration changes.
- Increase memory budget to 50MB.

See [https://github.com/stellar/rs-soroban-env/releases](https://github.com/stellar/rs-soroban-env/releases) v0.0.15 for more details.

###### Soroban Rust SDK[​](#soroban-rust-sdk-11 "Direct link to Soroban Rust SDK")

- Add docs in specs for types.
- Rename Serialize/Deserialize to To/FromXdr.
- Use the updated source_account() interface.
- Update storage docs.
- Expose reset budget functions to testutils.
- Adapt storage and snapshot interface to env changes.
- Add utils for converting from/to contract/account ids.
- Value and object representation overhaul.
- Add a getter for address of a generated contract client.
- Use String for log_fmt_values.
- Add a utility to call \_\_check_auth in tests.
- Add more support for the new types in soroban-spec.
- Use vector bulk-init in Vec.
- Bump env and update for event changes.
- fix(macro): add new XDR types to parser.
- Update budget test.
- bump env and update budget print.

See [https://github.com/stellar/rs-soroban-sdk/releases](https://github.com/stellar/rs-soroban-sdk/releases) v0.7.0 for more details.

###### Soroban RPC[​](#soroban-rpc-6 "Direct link to Soroban RPC")

- Set a maximum ledger latency in /health method.
- Add resultMetaXdr and envelopeXdr back to getTransaction() response.
- Support for new `diagnostic` contract events.
  - soroban-rpc: Add filtering support for diagnostic events.
  - soroban-rpc: Ingest diagnostic events.
- Remove 'soroban serve' subcommand.
- Limit preflight-computation concurrency through a worker pool.
- Miscellaneous fixes.
- General improvements to compilation and testing.
- Add contract events to simulateTransaction's response.

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.7.0 for more details.

###### Soroban CLI[​](#soroban-cli-6 "Direct link to Soroban CLI")

- Improved documentation, and `--help` text
  - feat: auto-generate comprehensive CLI docs.
- When using `invoke`, contract function names now come after the `--`, like `soroban invoke --id <contract_id> -- hello --to "world"`
- Improvements to identity management
  - fix: allow using ENV to add identity and pass secret.
  - Replaced `--identity`, `--secret-key`, and `--account` flags. Replace with single `--source`, which understands identities, and secret keys.
  - feat: add better docs for UDT and add examples for each arg.
- Added `soroban --version`
- Better errors, replacing `Unknown`
- Refactor, so that the cli can be imported via the new `soroban-test` crate. This makes testing and using soroban-cli as a library easier.
  - feat: reorg into a proper library.
  - feat: add new soroban-test crate.
- Update to Clap v4.
- fix(CLI): string/u/i256 XDR parsing.
- Support for new `diagnostic` type events

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.7.0 for more details.

#### Preview 7 (February 16th, 2023)[​](#preview-7-february-16th-2023 "Direct link to Preview 7 (February 16th, 2023)")

##### Software[​](#software-13 "Direct link to Software")

| Software                     | Version                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [df18148747e807618acf4639db41c4fd6f0be9fc](https://github.com/stellar/stellar-xdr/commit/df18148747e807618acf4639db41c4fd6f0be9fc) |
| Soroban Environment          | `v0.0.14`                                                                                                                          |
| Soroban Interface Version    | `29`                                                                                                                               |
| Stellar Core                 | `19.7.1-1204.871accefc.focal~soroban`                                                                                              |
| Soroban Rust SDK             | `v0.6.0`                                                                                                                           |
| Soroban CLI                  | `v0.6.0`                                                                                                                           |
| Soroban RPC                  | `0.6.1-13`                                                                                                                         |
| Stellar Horizon              | `stellar-horizon:2.24.61~soroban-335`                                                                                              |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                             |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:81c23da078c90d0ba220f8fc93414d0ea44608adc616988930529c58df278739`                           |
| Stellar JS Stellar Base      | `8.2.2-soroban.11`                                                                                                                 |
| Stellar JS Soroban Client    | `v0.4.0`                                                                                                                           |
| Freighter                    | `v2.10.0`                                                                                                                          |
| Laboratory                   | `v2.7.0`                                                                                                                           |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                           |

##### Breaking changes note[​](#breaking-changes-note-1 "Direct link to Breaking changes note")

This release comes with a revamp of authorization approach that is breaking for most of the contracts that did any sort of auth logic or used tokens. [example](/docs/build/smart-contracts/example-contracts/auth) and [authorization overview](/docs/learn/fundamentals/contract-development/authorization) for more details.

##### Changelog[​](#changelog-9 "Direct link to Changelog")

###### XDR[​](#xdr-6 "Direct link to XDR")

- Update Rust XDR for Auth Next.

See [https://github.com/stellar/rs-stellar-xdr/releases](https://github.com/stellar/rs-stellar-xdr/releases) v0.0.13 and v0.0.14 for more details.

###### Soroban Environment[​](#soroban-environment-6 "Direct link to Soroban Environment")

- Allow for a custom budget outside tests
- Restructure Event to be cheap to clone and allow it to be rolled back
- Add auth_required support for non-account balances
- Reform TryFromVal to reduce number of impls
- Fix override of panic hook during cross-contract testing
- Add EnvBase::Error, remove CheckedEnv, make Env methods return Error
- Initial Auth Next implementation in Soroban Host
- Add 13-tuple conversions
- Do not include Status as the first arg of a DebugEvent
- Add a simpler version of require_auth
- Use auth specific errors
- Emulate classic account authentication in recording auth mode.
- Change the interface for the auth testing utility.

See [https://github.com/stellar/rs-soroban-env/releases](https://github.com/stellar/rs-soroban-env/releases) v0.0.13 and v0.0.14 for more details.

###### Soroban Rust SDK[​](#soroban-rust-sdk-12 "Direct link to Soroban Rust SDK")

- Support variants with multiple fields in UDTs
- Error on UDT enums with 0-element tuple variants
- Allow xlm balance updates
- Fix vec insert
- Adapt SDK to changes to `{Try,From,Into}Val` in env crates
- Fix vec pop_front
- Use better storage error in tests
- Adapt to introduction of Env::Error
- Improve compiler errors for UDTs
- Allow same named types and functions
- Make soroban_token_spec::spec_xdr easier to keep updated
- Remove build-optimized makefile target
- Auth Next changes in SDK
- Add docs to contract spec entries
- SDK support for simplified require_auth

See [https://github.com/stellar/rs-soroban-sdk/releases](https://github.com/stellar/rs-soroban-sdk/releases) v0.5.0 and v0.6.0 for more details.

###### Soroban RPC[​](#soroban-rpc-7 "Direct link to Soroban RPC")

- Configure default limit, update cursor / startLedger validation, and include latest ledger for getEvents
- Add support for AuthNext
- Fix rollback error in logs
- Add getNetwork command
- Implement event storage
- Implement ledger entry storage
- Refactor db and ingestion packages, add ingestion of LedgerCloseMeta
- Implement simulateTransaction using rust instead of preflight
- Simplify topic matching for events search

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.5.0 v0.6.0 for more details.

###### Soroban CLI[​](#soroban-cli-7 "Direct link to Soroban CLI")

- Add option for running contract with unlimited budget
- Add support for AuthNext
- Add config command
- Add getNetwork support
- Reorganize CLI commands

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.5.0 v0.6.0 for more details.

#### Preview 6 (January 9th, 2023)[​](#preview-6-january-9th-2023 "Direct link to Preview 6 (January 9th, 2023)")

##### Software[​](#software-14 "Direct link to Software")

| Software                     | Version                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [026c9cd074bdb28ddde8ee52f2a4502d9e518a09](https://github.com/stellar/stellar-xdr/tree/026c9cd074bdb28ddde8ee52f2a4502d9e518a09) |
| Soroban Environment          | `v0.0.12`                                                                                                                        |
| Soroban Interface Version    | `27`                                                                                                                             |
| Stellar Core                 | `19.6.1-1158.c0ad35aa1.focal~soroban`                                                                                            |
| Soroban Rust SDK             | `v0.4.2`                                                                                                                         |
| Soroban CLI                  | `v0.5.0`                                                                                                                         |
| Soroban RPC                  | `0.4.0-10`                                                                                                                       |
| Stellar Horizon              | `stellar-horizon:2.22.0~soroban-323`                                                                                             |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                           |
| Stellar Quickstart (amd64)   | `stellar/quickstart:soroban-dev@sha256:c4429def497ed78ca99ae40c8e2522ec932081b4428df992900b5bc8d53bd642`                         |
| Stellar Quickstart (arm64)   | `stellar/quickstart:soroban-dev@sha256:37205510329845f5fe533bb7c4c182d8f35b3a3515f0a6729889067663e1ec97`                         |
| Stellar JS Stellar Base      | `8.0.1-soroban.6`                                                                                                                |
| Stellar JS Soroban Client    | `v0.3.0`                                                                                                                         |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                         |

##### Changelog[​](#changelog-10 "Direct link to Changelog")

###### Soroban Environment[​](#soroban-environment-7 "Direct link to Soroban Environment")

- Wasm instruction level calibration
- Replace `im` containers with `Vec`
- Remove EnvVal
- Fix first/last_index_of functions to use deep object comparison
- Export type aliases for Storage and Footprint
- Add env.json
- Remove built-in soroban token
- Update rust-version
- Use single balances in the Stellar Asset Contract
- Remove unnecessary i128 clone

See [https://github.com/stellar/rs-soroban-env/releases](https://github.com/stellar/rs-soroban-env/releases) v0.0.12 for more details.

###### Soroban Rust SDK[​](#soroban-rust-sdk-13 "Direct link to Soroban Rust SDK")

- Fix contractimpl for empty impl blocks
- bump env and fix token interface
- Remove init from the token interface
- Update rust-version
- Require only a borrow of Host when updating ledger snapshot
- Fix doc comments and clippy warnings on ledger snapshot
- Add LedgerSnapshot::update(Host)
- undo token deploy revert
- Revert deploy and update env
- Remove token deploy in anticipation of removal of the soroban only built-in token
- Make ledger snapshot write file create dir path
- Make errors explicit in ledger snapshot functions
- Update env to include delete-im, remove-EnvVal changes

See [https://github.com/stellar/rs-soroban-sdk/releases](https://github.com/stellar/rs-soroban-sdk/releases) v0.4.0, v0.4.1, v0.4.2 for more details.

###### Soroban RPC[​](#soroban-rpc-8 "Direct link to Soroban RPC")

- Add GitHub linting for GO code

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.4.0 for more details.

###### Soroban CLI[​](#soroban-cli-8 "Direct link to Soroban CLI")

- Update rust version
- StrValError --> Error and implemented using thiserror
- Use soroban-ledger-snapshot for managing ledger.json
- Use LedgerSnapshot::update to update snapshot instead of unpacking the host and updating ledger info and entries separately.
- Add events subcommand for local and remote event viewing
- Deprecate token create command

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.4.0 for more details.

#### Preview 5 (December 8th, 2022)[​](#preview-5-december-8th-2022 "Direct link to Preview 5 (December 8th, 2022)")

##### Software[​](#software-15 "Direct link to Software")

| Software                     | Version                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [026c9cd074bdb28ddde8ee52f2a4502d9e518a09](https://github.com/stellar/stellar-xdr/tree/026c9cd074bdb28ddde8ee52f2a4502d9e518a09) |
| Soroban Environment          | `v0.0.11`                                                                                                                        |
| Soroban Interface Version    | `26`                                                                                                                             |
| Stellar Core                 | `stellar-core_19.5.1-1137.b3a6bc281.focal~soroban`                                                                               |
| Soroban Rust SDK             | `v0.3.2`                                                                                                                         |
| Soroban CLI                  | `v0.3.3`                                                                                                                         |
| Soroban RPC                  | `0.3.1-32`                                                                                                                       |
| Stellar Horizon              | `stellar-horizon:2.22.0~soroban-318`                                                                                             |
| Stellar Friendbot            | `soroban-v0.0.2-alpha`                                                                                                           |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:8046391718f8e58b2b88b9c379abda3587bb874689fa09b2ed4871a764ebda27`                         |
| Stellar JS Stellar Base      | `8.0.1-soroban.5`                                                                                                                |
| Stellar JS Soroban Client    | `v0.2.0`                                                                                                                         |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                         |

##### Changelog[​](#changelog-11 "Direct link to Changelog")

###### XDR[​](#xdr-7 "Direct link to XDR")

- Remove BigInt from ScVal
- Add u128 and i128 to ScVal
- Change the structure of events in meta
- Change transaction operation structure for Soroban contract deployments and invocations

See [https://github.com/stellar/stellar-xdr/compare/48d5e17ae63bba0aa9725cd9d18d7438f44c07b1...026c9cd074bdb28ddde8ee52f2a4502d9e518a09](https://github.com/stellar/stellar-xdr/compare/48d5e17ae63bba0aa9725cd9d18d7438f44c07b1...026c9cd074bdb28ddde8ee52f2a4502d9e518a09) for more details.

###### Soroban Environment[​](#soroban-environment-8 "Direct link to Soroban Environment")

- Upgrade crate-git-revision to 0.0.4 (contribution by [@brson](https://github.com/brson))
- Add Host::with_artificial_test_contract_frame
- Restructure benchmark framework, add calibration code for all CostTypes
- Disable budget costs for object cmp
- Env changes to decouple contract instance from source
- Remove BigInt, switch everything to u128 and i128

See [https://github.com/stellar/rs-soroban-env/releases](https://github.com/stellar/rs-soroban-env/releases) v0.0.10, v0.0.11 for more details.

###### Soroban Rust SDK[​](#soroban-rust-sdk-14 "Direct link to Soroban Rust SDK")

- Rename data to storage by @leighmcculloch in #786
- Add ability to get current Budget from env in tests by @leighmcculloch in #789
- Add Env::as_contract for testutils by @leighmcculloch in #761
- Update contract deployment to match the Env changes by @dmkozh in #766
- Make contract_id public in contract clients. by @dmkozh in #768
- Remove BigInt by @sisuresh in #770
- Add soroban-ledger-snapshot
- Change gen JSON output from stream to array (contribution by [@vinamogit](https://github.com/vinamogit))
- Contributions from [@vinamogit](https://github.com/vinamogit)

See [https://github.com/stellar/rs-soroban-sdk/releases](https://github.com/stellar/rs-soroban-sdk/releases) v0.3.0, v0.3.1, v0.3.2 for more details.

###### Soroban RPC[​](#soroban-rpc-9 "Direct link to Soroban RPC")

- Add soroban-rpc version subcommand
- Add a new getLedgerEntry jsonrpc method, deprecating and replacing getContractData allowing an application to fetch any ledger entry
- Added new getEvents method currently backed by horizon

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.3.0, v0.3.1 for more details.

###### Soroban CLI[​](#soroban-cli-9 "Direct link to Soroban CLI")

- Fix apt-get install in publish workflow
- Added type description to errors when using --arg (contribution by [@waldmatias](https://github.com/waldmatias))
- Additional CLI support for the contract deployment changes
- Adds support for `soroban contract deploy --wasm-hash`, as well as `soroban contract install --wasm`
- Add xdr and env version to version subcommand output
- Fix that the footpoint was not set correctly when deploying the wrapped token contract (contribution by [@overcat](https://github.com/overcat))
- Contributions from [@waldmatias](https://github.com/waldmatias), [@willemneal](https://github.com/willemneal), [@overcat](https://github.com/overcat), [@brson](https://github.com/brson)

See [https://github.com/stellar/soroban-tools/releases](https://github.com/stellar/soroban-tools/releases) v0.3.0, v0.3.1, 0.3.3 for more details.

#### Preview 4 (November 15th, 2022)[​](#preview-4-november-15th-2022 "Direct link to Preview 4 (November 15th, 2022)")

##### Software[​](#software-16 "Direct link to Software")

| Software                     | Version                                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [https://github.com/stellar/stellar-xdr-next/tree/48d5e17ae63bba0aa9725cd9d18d7438f44c07b1](https://github.com/stellar/stellar-xdr-next/tree/48d5e17ae63bba0aa9725cd9d18d7438f44c07b1) |
| Soroban Environment          | `v0.0.9`                                                                                                                                                                               |
| Soroban Interface Version    | `23`                                                                                                                                                                                   |
| Stellar Core                 | `19.5.1-1111.eba1d3de9.focal~soroban`                                                                                                                                                  |
| Soroban Rust SDK             | `v0.2.1`                                                                                                                                                                               |
| Soroban CLI                  | `v0.2.1`                                                                                                                                                                               |
| Soroban RPC                  | `0.3.1-32`                                                                                                                                                                             |
| Stellar Horizon              | `2.22.0~soroban-304`                                                                                                                                                                   |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:0993d3350148af6ffeab5dc8f0b835236b28dade6dcae77ff8a09317162f768d`                                                                               |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                                                                               |

##### Changelog[​](#changelog-12 "Direct link to Changelog")

###### XDR[​](#xdr-8 "Direct link to XDR")

- Trivial whitespace changes

###### Soroban Environment[​](#soroban-environment-9 "Direct link to Soroban Environment")

- Vm tuning
- Add token events
- Catch panics from native contracts in try_call
- Improved built-in token error reporting
- Add missing conversion from Status->ScStatus for the ContractError variant
- Capture user panic-strings in native builds, avoid spurious NoContractRunning error
- Few small fixes to error debug events

See [https://github.com/stellar/rs-soroban-env/releases](https://github.com/stellar/rs-soroban-env/releases) v0.0.7, v0.0.8, v0.0.9 for more details.

###### Soroban Rust SDK[​](#soroban-rust-sdk-15 "Direct link to Soroban Rust SDK")

- Add Logger::print in testutils
- Add conversion from Address to Identifier
- Remove deprecated functions
- Remove panic-catching and fix tests that use newly-working native try_call
- Reintroduce an optimized aborting unwrap
- Add assert_with_error! macro
- Rename panic_error! to panic_with_error!

See [https://github.com/stellar/rs-soroban-sdk/releases](https://github.com/stellar/rs-soroban-sdk/releases) v0.2.0, v0.2.1 for more details.

###### Soroban RPC[​](#soroban-rpc-10 "Direct link to Soroban RPC")

- Initial Release

###### Soroban CLI[​](#soroban-cli-10 "Direct link to Soroban CLI")

- Strings and symbols are rendered as text in JSON output
- Bytes are rendered as hex in JSON output
- Accounts in invocations are created in sandbox
- Add optimize sub-command that optimizes contracts
- Fix the bin name in the completion command
- Fix jsonrpc compliance issue

See [https://github.com/stellar/soroban-cli/releases](https://github.com/stellar/soroban-cli/releases) v0.2.0, v0.2.1 for more details.

#### Preview 3 (October 11th, 2022)[​](#preview-3-october-11th-2022 "Direct link to Preview 3 (October 11th, 2022)")

##### Software[​](#software-17 "Direct link to Software")

| Software                     | Version                                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XDR                          | [https://github.com/stellar/stellar-xdr-next/tree/161e2e5b64425a49f9ccfef7f732ae742ed5eec4](https://github.com/stellar/stellar-xdr-next/tree/161e2e5b64425a49f9ccfef7f732ae742ed5eec4) |
| Soroban Environment          | `v0.0.6`                                                                                                                                                                               |
| Soroban Interface Version    | `23`                                                                                                                                                                                   |
| Stellar Core                 | `19.4.1-1097.4e813f20e.focal~soroban`                                                                                                                                                  |
| Soroban Rust SDK             | `v0.1.1`                                                                                                                                                                               |
| Soroban CLI                  | `v0.1.2`                                                                                                                                                                               |
| Soroban RPC                  | ???                                                                                                                                                                                    |
| Stellar Horizon              | `2.22.0~soroban-304`                                                                                                                                                                   |
| Stellar Quickstart           | `stellar/quickstart:soroban-dev@sha256:e58d83f92a61f43406087f488dd1cba110a92646dca85f14b3a416163609e853`                                                                               |
| Futurenet Network Passphrase | `Test SDF Future Network ; October 2022`                                                                                                                                               |

##### Changelog[​](#changelog-13 "Direct link to Changelog")

See [https://www.stellar.org/blog/soroban-a-new-smart-contract-standard](https://www.stellar.org/blog/soroban-a-new-smart-contract-standard).

#### Preview 2 (September 13th, 2022)[​](#preview-2-september-13th-2022 "Direct link to Preview 2 (September 13th, 2022)")

See [https://www.stellar.org/developers-blog/soroban-preview-release-2](https://www.stellar.org/developers-blog/soroban-preview-release-2).

#### Preview 1 (August 1st, 2022)[​](#preview-1-august-1st-2022 "Direct link to Preview 1 (August 1st, 2022)")

See [https://www.stellar.org/blog/project-jump-cannon-soroban-preview-release](https://www.stellar.org/blog/project-jump-cannon-soroban-preview-release).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/networks/software-versions.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Protocol 22 (Mainnet, December 5, 2024)](#protocol-22-mainnet-december-5-2024)
  - [Software](#software)
  - [Release notes](#release-notes)
- [Protocol 21 (Mainnet, June 18, 2024)](#protocol-21-mainnet-june-18-2024)
  - [Software](#software-1)
  - [Release notes](#release-notes-1)
- [Protocol 21 (Testnet only, May 20, 2024)](#protocol-21-testnet-only-may-20-2024)
  - [Software](#software-2)
  - [Release notes](#release-notes-2)
- [Protocol 21: Preview 1 (Testnet only, April 12, 2024)](#protocol-21-preview-1-testnet-only-april-12-2024)
  - [Software](#software-3)
  - [Release notes](#release-notes-3)
- [Protocol 20: Soroban Phase 2 (March 19, 2024)](#protocol-20-soroban-phase-2-march-19-2024)
  - [Software](#software-4)
  - [Changelog](#changelog)
- [Protocol 20: Soroban Phase 1 (February 27, 2024)](#protocol-20-soroban-phase-1-february-27-2024)
  - [Software](#software-5)
  - [Changelog](#changelog-1)
- [Protocol 20: Soroban Phase 1 (Mainnet Edition) (February 5, 2024)](#protocol-20-soroban-phase-1-mainnet-edition-february-5-2024)
  - [Software](#software-6)
  - [Changelog](#changelog-2)
- [Stable v20.1.0 (January 11, 2024)](#stable-v2010-january-11-2024)
  - [Software](#software-7)
  - [Changelog](#changelog-3)
- [Stable v20.0.0 (December 18, 2023)](#stable-v2000-december-18-2023)
  - [Software](#software-8)
  - [Changelog](#changelog-4)
- [Preview 11 (September 11, 2023): Testnet and Futurenet Edition](#preview-11-september-11-2023-testnet-and-futurenet-edition)
  - [Software](#software-9)
  - [Changelog](#changelog-5)
- [Preview 10 (July 13, 2023)](#preview-10-july-13-2023)
  - [Software](#software-10)
  - [Changelog](#changelog-6)
- [Preview 9 (May 24th, 2023)](#preview-9-may-24th-2023)
  - [Software](#software-11)
  - [Changelog](#changelog-7)
- [Preview 8 (April 4th, 2023)](#preview-8-april-4th-2023)
  - [Software](#software-12)
  - [Breaking changes note](#breaking-changes-note)
  - [Changelog](#changelog-8)
- [Preview 7 (February 16th, 2023)](#preview-7-february-16th-2023)
  - [Software](#software-13)
  - [Breaking changes note](#breaking-changes-note-1)
  - [Changelog](#changelog-9)
- [Preview 6 (January 9th, 2023)](#preview-6-january-9th-2023)
  - [Software](#software-14)
  - [Changelog](#changelog-10)
- [Preview 5 (December 8th, 2022)](#preview-5-december-8th-2022)
  - [Software](#software-15)
  - [Changelog](#changelog-11)
- [Preview 4 (November 15th, 2022)](#preview-4-november-15th-2022)
  - [Software](#software-16)
  - [Changelog](#changelog-12)
- [Preview 3 (October 11th, 2022)](#preview-3-october-11th-2022)
  - [Software](#software-17)
  - [Changelog](#changelog-13)
- [Preview 2 (September 13th, 2022)](#preview-2-september-13th-2022)
- [Preview 1 (August 1st, 2022)](#preview-1-august-1st-2022)

---

_Extraído de [https://developers.stellar.org/docs/networks/software-versions](https://developers.stellar.org/docs/networks/software-versions)_

---

## Sección 44 - Docs Tokens Control Asset Access

### Asset Design Considerations | Stellar Docs

**URL:** https://developers.stellar.org/docs/tokens/control-asset-access
**Fecha de extracción:** 2025-07-12T01:19:09.302Z

---

---

source: https://developers.stellar.org/docs/tokens/control-asset-access
generated: 2025-07-12T01:19:09.302Z

---

On this page

### Asset Design Considerations

#### Issuing and distribution accounts[​](#issuing-and-distribution-accounts "Direct link to Issuing and distribution accounts")

It is best practice on the Stellar network to create two accounts when issuing an asset: 1) the issuing account and 2) the distribution account.

The **issuing account** creates (or mints) the asset on the network by executing a payment operation. The issuing account will always be linked to the asset’s identity. Any account wanting to hold the asset must first establish a trustline with the issuing account. Read about trustlines in our [Trustlines section](/docs/learn/fundamentals/stellar-data-structures/accounts#trustlines).

The **distribution account** is the first recipient of the issued asset and handles all other transactions.

Note that you can also issue an asset by creating an offer or liquidity pool deposit with the issuing account.

It is best practice to issue an asset by sending it from the issuing account to a distribution account for two main reasons: security and auditing.

##### Security[​](#security "Direct link to Security")

The distribution account will be a hot account, meaning that some web service out there has direct access to sign its transactions.

For example, if the account you're distributing from is also the issuing account and it is compromised by a malicious actor, the actor can now issue as much of the asset as they want. If the malicious actor redeems the newly issued tokens with an anchor service, the anchor may not have the liquidity to support the customer withdrawals. Stakes are lower if you use a distribution account- if the distribution account is compromised, you can freeze the account’s asset balance and start with a new distribution account without changing the issuing account.

##### Auditing[​](#auditing "Direct link to Auditing")

Using a distribution account is better for auditing because an issuing account can’t actually hold a balance of its own asset. Sending an asset back to its issuing account burns (deletes) the asset. If you have a standing inventory of the issued asset in a separate account, it’s easier to track and can help with bookkeeping.

#### Naming an asset[​](#naming-an-asset "Direct link to Naming an asset")

One thing you must decide when issuing an asset is what to call it. An asset code is the asset’s identifying code. There are three possible formats: Alphanumeric 4, Alphanumeric 12, and liquidity pool shares.

Learn about liquidity pool shares in the [Liquidity Pool Encyclopedia Entry](/docs/learn/encyclopedia/sdex/liquidity-on-stellar-sdex-liquidity-pools).

- Alphanumeric 4-character maximum: Any characters from the set a-z, A-Z, 0-9 are allowed. The code can be shorter than 4 characters, but the trailing characters must all be empty.
- Alphanumeric 12-character maximum: Any characters from the set a-z, A-Z, 0-9 are allowed. The code can be any number of characters from 5 to 12, but the trailing characters must all be empty.
- The pool share asset is defined by the liquidity pool identifier (PoolID), which in turn is defined by the two assets its reserves are composed of.

Provided it falls into one of these buckets, you can choose any asset code you like. That said, if you’re issuing a currency, you should use the appropriate ISO 4217 code, and if you’re issuing a stock or bond, the appropriate ISIN number. Doing so makes it easier for Stellar interfaces to properly display and sort your token in their listings and allows potential token holders to understand what your token represents.

#### Controlling access to an asset with flags[​](#controlling-access-to-an-asset-with-flags "Direct link to Controlling access to an asset with flags")

When you issue an asset on Stellar, anyone can hold it by default. In general, that’s a good thing: easy access means better reach and better liquidity. However, if you need to control access to an asset to comply with regulations (or for any other reason), you can easily do so by enabling flags on your issuing account.

Flags are created on the account level using a `set_options` operation. They can be set at any time in the life cycle of an asset, not just when you issue it.

##### Flag types[​](#flag-types "Direct link to Flag types")

The (0xn) next to each flag type denotes the bit settings for each flag.

###### Authorization Required (0x1)[​](#authorization-required-0x1 "Direct link to Authorization Required (0x1)")

When `AUTH_REQUIRED_FLAG` is enabled, an issuer must approve an account before that account can hold its asset. This setting allows issuers to vet potential token holders and to approve trustlines.

To allow access, the user creates a trustline, and the issuer approves it by changing the `AUTHORIZE` flag with the `Set_Trust_Line_Flag` operation.

There are two levels of authorization an asset issuer can grant using the `Set_Trust_Line_Flag` operation:

- `AUTHORIZED_FLAG`: signifies complete authorization allowing an account to transact freely with the asset to make and receive payments, place orders, and deposit into a liquidity pool.
- `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG`: denotes limited authorization that allows an account to maintain current orders, withdraw from a liquidity pool, or cancel current orders - but not to otherwise transact with the asset.

###### Authorization Revocable (0x2)[​](#authorization-revocable-0x2 "Direct link to Authorization Revocable (0x2)")

When `AUTH_REVOCABLE_FLAG` is enabled, an issuer can revoke an existing trustline’s authorization, thereby freezing the asset held by an account. Doing so prevents that account from transferring or trading the asset and cancels the account’s open orders for the asset.

`AUTH_REVOCABLE_FLAG` also allows an issuer to reduce authorization from complete to limited, which prevents the account from transferring or trading the asset but does not cancel the account’s open orders for the asset. This setting is useful for issuers of regulated assets who need to authorize transactions on a case-by-case basis to ensure each conforms to certain requirements.

All changes to asset authorization are performed with the Set Trustline Flags operation.

There are three levels of authorization an asset issuer can remove using the `Set_Trust_Line_Flag` operation:

- `AUTHORIZED_FLAG`: signifies complete authorization allowing an account to transact freely with the asset to make and receive payments and place orders.
- `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG`: denotes limited authorization that allows an account to maintain current orders but not to otherwise transact with the asset.
- `CLAWBACK_ENABLED`: enables the issuing account to take back (burning) all of the asset. See our [section on Clawbacks](/docs/learn/encyclopedia/transactions-specialized/clawbacks) for more information.

###### Clawback Enabled (0x8)[​](#clawback-enabled-0x8 "Direct link to Clawback Enabled (0x8)")

With the `AUTH_CLAWBACK_ENABLED_FLAG` flag set, any _subsequent_ trustlines established with this account will have clawbacks enabled. You can read more about clawbacks (and selectively controlling them on a per-trustline basis) [here](/docs/learn/encyclopedia/transactions-specialized/clawbacks).

Note that this flag requires that revocable is also set.

###### Authorization Immutable (0x4)[​](#authorization-immutable-0x4 "Direct link to Authorization Immutable (0x4)")

With this setting, none of the other authorization flags (`AUTH_REQUIRED_FLAG`, `AUTH_REVOCABLE_FLAG`) can be set, and the issuing account can’t be merged. You set this flag to signal to potential token holders that your issuing account and its assets will persist on the ledger in an open and accessible state.

##### Set Trustline Flag operation[​](#set-trustline-flag-operation "Direct link to Set Trustline Flag operation")

The issuing account can configure various authorization and trustline flags for individual trustlines to an asset. The asset parameter is of the TrustLineAsset type. If you are modifying a trustline to a regular asset (i.e. one in a Code:Issuer format), this is equivalent to the asset type. If you are modifying a trustline to a pool share, this is the liquidity pool’s unique ID.

##### Example flow[​](#example-flow "Direct link to Example flow")

Let’s look at how an issuer of a regulated asset might use the `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG` flag.

If the issuer wants to approve transactions on a case-by-case basis while allowing accounts to maintain offers, they can leave an account in the `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG` state. That account can own offers but cannot do anything else with the asset.

To initiate a new operation, the holding account requests that the issuer approve and sign a transaction. Once the issuer inspects the operation and decides to approve it, they sandwich it between a set of operations, first granting authorization, then reducing it.

Here’s a payment from A to B sandwiched between `set_trust_line_flags` operations:

- Operation 1: Issuer uses `SetTrustLineFlags` to fully authorize account A, asset X
- Operation 2: Issuer uses `SetTrustLineFlags` to fully authorize account B, asset X
- Operation 3: Payment from A to B
- Operation 4: Issuer uses `SetTrustLineFlags` to set account B, asset X to `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG` state
- Operation 5: Issuer uses `SetTrustLineFlags` to set account A, asset X to `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG` state

The authorization sandwich allows the issuer to inspect the specific payment and to grant authorization for it and it alone. Since operations bundled in a transaction are simultaneous, A and B are only authorized for the specific, pre-approved payment operation. Complete authorization does not extend beyond the specific transaction.

##### Sample code[​](#sample-code "Direct link to Sample code")

In the following code samples, proper error checking is omitted. However, you should always validate your results, as there are many ways that requests can fail. Refer to the [Error Handling](/docs/data/apis/horizon/api-reference/errors/error-handling) page for tips on error management strategies.

The following example sets authorization to be both required and revocable:

- JavaScript
- Java
- Python

```
var StellarSdk = require("stellar-sdk");var server = new StellarSdk.Horizon.Server(  "https://horizon-testnet.stellar.org",);// Keys for issuing accountvar issuingKeys = StellarSdk.Keypair.fromSecret(  "SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4",);server  .loadAccount(issuingKeys.publicKey())  .then(function (issuer) {    var transaction = new StellarSdk.TransactionBuilder(issuer, {      fee: 100,      networkPassphrase: StellarSdk.Networks.TESTNET,    })      .addOperation(        StellarSdk.Operation.setOptions({          setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag,        }),      )      // setTimeout is required for a transaction      .setTimeout(100)      .build();    transaction.sign(issuingKeys);    return server.submitTransaction(transaction);  })  .then(console.log)  .catch(function (error) {    console.error("Error!", error);  });
```

```javascript
import org.stellar.sdk.*;import org.stellar.sdk.Network;import org.stellar.sdk.responses.AccountResponse;Server server = new Server("https://horizon-testnet.stellar.org");// Keys for issuing accountKeyPair issuingKeys = KeyPair  .fromSecretSeed("SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4");AccountResponse sourceAccount = server.accounts().account(issuingKeys.getAccountId());Transaction setAuthorization = new Transaction.Builder(sourceAccount, Network.TESTNET)  .addOperation(new SetOptionsOperation.Builder()    .setSetFlags(      AccountFlag.AUTH_REQUIRED_FLAG.getValue() |      AccountFlag.AUTH_REVOCABLE_FLAG.getValue())    .build())  .build();setAuthorization.sign(issuingKeys);server.submitTransaction(setAuthorization);
```

```python
from stellar_sdk import Keypair, Network, Server, TransactionBuilder, AuthorizationFlagfrom stellar_sdk.exceptions import BaseHorizonError# Configure Stellar SDK to talk to the horizon instance hosted by Stellar.org# To use the live network, set the hostname to horizon_url for mainnetserver = Server(horizon_url="https://horizon-testnet.stellar.org")# Use the test network, if you want to use the live network, please set it to `Network.PUBLIC_NETWORK_PASSPHRASE`network_passphrase = Network.TESTNET_NETWORK_PASSPHRASE# Keys for accounts to issue and receive the new assetissuing_keypair = Keypair.from_secret(    "SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4")issuing_public = issuing_keypair.public_key# Transactions require a valid sequence number that is specific to this account.# We can fetch the current sequence number for the source account from Horizon.issuing_account = server.load_account(issuing_public)transaction = (    TransactionBuilder(        source_account=issuing_account,        network_passphrase=network_passphrase,        base_fee=100,    )    .append_set_options_op(        set_flags=AuthorizationFlag.AUTH_REVOCABLE_FLAG | AuthorizationFlag.AUTHORIZATION_REQUIRED    )    .build())transaction.sign(issuing_keypair)try:    transaction_resp = server.submit_transaction(transaction)    print(f"Transaction Resp:\n{transaction_resp}")except BaseHorizonError as e:    print(f"Error: {e}")
```

#### Limiting the supply of an asset[​](#limiting-the-supply-of-an-asset "Direct link to Limiting the supply of an asset")

> **INFO**
>
> Warning
>
> This section details how to lock your account with the purpose of limiting the supply of your issued asset. However, locking your account means you’ll never be able to do anything with it ever again- whether that’s adjusting signers, changing the home domain, claiming any held XLM, or any other operation. Your account will be completely frozen.

With that warning in mind, it is possible to lock down the issuing account of an asset so that the asset’s supply cannot increase. To do this, first set the issuing account’s master weight to 0 using the Set Options operation. This prevents the issuing account from being able to sign transactions and therefore, making the issuer unable to issue any more assets. Be sure to do this only after you’ve issued all desired assets to the distribution account. If the asset has a Stellar Asset Contract, also make sure the admin for the contract was not updated from the default (which is the issuer) using the `set_admin` contract call. If the admin was not the issuer, then the admin would be able to mint the asset even with the issuing account locked.

Learn more about signature weights in the [Signature and Multisig Encyclopedia Entry](/docs/learn/fundamentals/transactions/signatures-multisig).

See how to do this in the optional steps of the [Issuing an Asset Tutorial](/docs/tokens/how-to-issue-an-asset#configure-maximum-supply).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tokens/control-asset-access.mdx)

Last updated on **Jun 18, 2025** by **Bri Wylde**

- [Issuing and distribution accounts](#issuing-and-distribution-accounts)
  - [Security](#security)
  - [Auditing](#auditing)
- [Naming an asset](#naming-an-asset)
- [Controlling access to an asset with flags](#controlling-access-to-an-asset-with-flags)
  - [Flag types](#flag-types)
  - [Set Trustline Flag operation](#set-trustline-flag-operation)
  - [Example flow](#example-flow)
  - [Sample code](#sample-code)
- [Limiting the supply of an asset](#limiting-the-supply-of-an-asset)

---

_Extraído de [https://developers.stellar.org/docs/tokens/control-asset-access](https://developers.stellar.org/docs/tokens/control-asset-access)_

---

## Sección 45 - Docs Tokens Quickstart

### Quickstart | Stellar Docs

**URL:** https://developers.stellar.org/docs/tokens/quickstart
**Fecha de extracción:** 2025-07-12T01:19:23.066Z

---

---

source: https://developers.stellar.org/docs/tokens/quickstart
generated: 2025-07-12T01:19:23.066Z

---

### Quickstart

Issue your first asset on the Stellar network in **one, single transaction**!

- JavaScript
- Python

```javascript
import {
  Keypair,
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
} from "stellar-sdk";
const horizonUrl = "https://horizon-testnet.stellar.org";
const friendbotUrl = "https://friendbot.stellar.org";
const issuerKeypair = Keypair.random();
const destinationKeypair = Keypair.random();
console.log(
  `issuer keys:\n${issuerKeypair.publicKey()}\n${issuerKeypair.secret()}\n`
);
console.log(
  `destination account keys:\n${issuerKeypair.publicKey()}\n${issuerKeypair.secret()}\n`
);
await fetch(friendbotUrl + `?addr=${issuerKeypair.publicKey()}`); // pre-fund the `issuer` account using friendbotawait fetch(friendbotUrl + `?addr=${destinationKeypair.publicKey()}`); // pre-fund the `destination` account using friendbotconst server = new Horizon.Server(horizonUrl);const account = await server.loadAccount(issuerKeypair.publicKey());const abcAsset = new Asset("ABC", issuerKeypair.publicKey());const transaction = new TransactionBuilder(account, {  fee: BASE_FEE,  networkPassphrase: Networks.TESTNET,})  .addOperation(    Operation.changeTrust({      asset: abcAsset,      source: destinationKeypair.publicKey(),    }),  )  .addOperation(    Operation.payment({      destination: destinationKeypair.publicKey(),      asset: abcAsset,      amount: "100",    }),  )  .setTimeout(30)  .build();transaction.sign(issuerKeypair, destinationKeypair);const res = await server.submitTransaction(transaction);console.log(`transaction hash:\n${res.hash}`);
```

```javascript
import requestsfrom stellar_sdk import Asset, Keypair, Network, Server, TransactionBuilderhorion_url = "https://horizon-testnet.stellar.org"friendbot_url = "https://friendbot.stellar.org"issuer_keypair = Keypair.random()destination_keypair = Keypair.random()print(f"issuer keys:\n{issuer_keypair.public_key}\n{issuer_keypair.secret}\n")print(f"issuer keys:\n{destination_keypair.public_key}\n{destination_keypair.secret}\n")requests.get(f"{friendbot_url}?addr={issuer_keypair.public_key}")requests.get(f"{friendbot_url}?addr={destination_keypair.public_key}")server = Server('https://horizon-testnet.stellar.org')account = server.load_account(issuer_keypair.public_key)abc_asset = Asset('ABC', issuer_keypair.public_key)transaction = (    TransactionBuilder(        source_account=account,        network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,        base_fee=100,    )    .append_change_trust_op(        asset=abc_asset,        source=destination_keypair.public_key,    )    .append_payment_op(        destination=destination_keypair.public_key,        amount='100',        asset=abc_asset,    )    .set_timeout(30)    .build())transaction.sign(issuer_keypair)transaction.sign(destination_keypair)res = server.submit_transaction(transaction)print(f"Transaction hash:\n{res['hash']}")
```

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tokens/quickstart.mdx)

Last updated on **Dec 16, 2024** by **Özgün Özerk**

---

_Extraído de [https://developers.stellar.org/docs/tokens/quickstart](https://developers.stellar.org/docs/tokens/quickstart)_

---

## Sección 46 - Docs Tokens Stellar Asset Contract

### Use Issued Assets in Smart Contracts with the Stellar Asset Contract (SAC) | Stellar Docs

**URL:** https://developers.stellar.org/docs/tokens/stellar-asset-contract
**Fecha de extracción:** 2025-07-12T01:19:24.450Z

---

---

source: https://developers.stellar.org/docs/tokens/stellar-asset-contract
generated: 2025-07-12T01:19:24.450Z

---

On this page

> **INFO**
>
> info
>
> The term "custom token" has been deprecated in favor of "contract token". View the conversation in the [Stellar Developer Discord](https://discord.com/channels/897514728459468821/966788672164855829/1359276952971640953).

### Stellar Asset Contract (SAC)

The Stellar Asset Contract (SAC) is an implementation of [CAP-46-6 Smart Contract Standardized Asset](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-06.md) and [SEP-41 Token Interface](/docs/tokens/token-interface) for Stellar [assets](/docs/learn/fundamentals/stellar-data-structures/assets).

See examples of how to use the SAC in the [Tokens How-To Guides](/docs/build/guides/tokens).

#### Overview[​](#overview "Direct link to Overview")

> **NOTE**
>
> note
>
> Stellar assets are issued by Stellar accounts. Issue an asset on Stellar by following the [Issue an Asset Tutorial](/docs/tokens/how-to-issue-an-asset).

The Stellar Asset Contract allows users and contracts to make payments with, and interact with, assets. The SAC can interact with assets held by Stellar accounts or contracts.

The SAC is a special built-in contract that has access to functionality of the Stellar network that allows it to use Stellar assets directly.

Each Stellar asset has an instance of the SAC reserved on the network. To use the SAC reserved for an asset, the instance just needs to be deployed.

When the SAC transfers assets between accounts, the same debit and credits occur as they do when a Stellar payment operation is used, because the SAC interacts directly with Stellar account trust lines. When the SAC transfers assets between contracts, it uses Contract Data ledger entries to store the balances for contracts.

Stellar account balances for the native asset are always stored on the account, and Stellar contract balances for the native asset are always stored in a contract data entry.

Stellar account balances for issued assets are always stored in trust lines, and Stellar contract balances for issued assets are always stored in a contract data entry.

For example, when transferring from a Stellar account to a Stellar contract, the Stellar account's trust line entry is debited, and a contract data entry is credited.

And for example, when transferring from a Stellar contract to a Stellar account, a contract data entry is debited, and the account's trust line entry is credited.

In both those examples it is a single asset that is transferring from the account to the contract and back again. No bridging is required and no intermediary tokens are needed. An asset on Stellar and it's Stellar Asset Contract represent the same asset. The SAC for an asset is simply an API for interacting with the asset.

The SAC implements the [SEP-41 Token Interface](/docs/tokens/token-interface), which is similar to the widely used ERC-20 token standard. Contracts that depend on only the SEP-41 portion of the SAC's interface, are also compatible with any contract token that implements SEP-41.

Some functionality available on the Stellar network in transaction operations, such as the order book, do not have any functions exposed on the Stellar Asset Contract in the current protocol.

#### Deployment[​](#deployment "Direct link to Deployment")

Every Stellar asset on Stellar has reserved a contract address that the Stellar Asset Contract can be deployed to. Anyone can initiate the deploy and the Stellar asset issuer does not need to be involved.

It can be deployed using the [Stellar CLI](/docs/tools/cli/stellar-cli) as shown [here](/docs/build/guides/cli/deploy-stellar-asset-contract).

Or the [Stellar SDK](/docs/tools/sdks) can be used as shown [here](/docs/learn/fundamentals/contract-development/contract-interactions/stellar-transaction#xdr-usage) by calling `InvokeHostFunctionOp` with `HOST_FUNCTION_TYPE_CREATE_CONTRACT` and `CONTRACT_ID_FROM_ASSET`. The resulting token will have a deterministic identifier, which will be the sha256 hash of `HashIDPreimage::ENVELOPE_TYPE_CONTRACT_ID_FROM_ASSET` xdr specified [here](https://github.com/stellar/stellar-xdr/blob/dc23adf60e095a6ce626b2b09128e58a5eae0cd0/Stellar-transaction.x#L661).

Anyone can deploy the instances of Stellar Asset Contract. Note, that the initialization of the Stellar Asset Contracts happens automatically during the deployment. Asset Issuer will have the administrative permissions after the contract has been deployed.

#### Interacting with classic Stellar assets[​](#interacting-with-classic-stellar-assets "Direct link to Interacting with classic Stellar assets")

The Stellar Asset Contract is the only way for contracts to interact with Stellar assets, either the native XLM asset, or those issued by Stellar accounts.

The issuer of the asset will be the administrator of the deployed contract. Because the Native Stellar token doesn't have an issuer, it will not have an administrator either. It also cannot be burned.

After the contract has been deployed, users can use their classic account (for lumens) or trustline (for other assets) balance. There are some differences depending on if you are using a classic account `Address` vs a contract `Address` (corresponding either to a regular contract or to a custom account contract). The following section references some issuer and trustline flags from Stellar classic, which you can learn more about [here](/docs/tokens/control-asset-access#controlling-access-to-an-asset-with-flags).

- Using `Address::Account`
  - The balance must exist in a trustline (or an account for the native balance). This means the contract will not store the balance in ContractData. If the trustline or account is missing, any function that tries to interact with that balance will fail.
  - Classic trustline semantics will be followed.
    - Transfers will only succeed if the corresponding trustline(s) have the `AUTHORIZED_FLAG` set.
    - A trustline balance can only be clawed back using the `clawback` contract function if the trustline has `TRUSTLINE_CLAWBACK_ENABLED_FLAG` set.
    - Transfers to the issuer account will burn the token, while transfers from the issuer account will mint.
    - Trustline balances are stored in a 64-bit signed integer even though the interface accepts 128-bit signed integers. Any operation that attempts to send or receive an amount more than the maximum amount that can be represented by a 64-bit signed integer will fail.
- Using `Address::Contract`
  - The balance and authorization state will be stored in contract storage, as opposed to a trustline.
  - Balances are stored in a 128-bit signed integer.
  - A balance can only be clawed back if the issuer account had the `AUTH_CLAWBACK_ENABLED_FLAG` set when the balance was created. A balance is created when either an `Address::Contract` is on the receiving end of a successful transfer, or if the admin sets the authorization state. Read more about `AUTH_CLAWBACK_ENABLED_FLAG` [here](/docs/tokens/control-asset-access#clawback-enabled-0x8).

##### Balance Authorization Required[​](#balance-authorization-required "Direct link to Balance Authorization Required")

In the `Address::Contract` case, if the issuer has `AUTH_REQUIRED_FLAG` set, then the specified `Address::Contract` will need to be explicitly authorized with `set_auth` before it can receive a balance. This logic lines up with how trustlines interact with the `AUTH_REQUIRED_FLAG` issuer flag, allowing asset issuers to have the same control in Soroban as they do in Stellar classic. Read more about `AUTH_REQUIRED_FLAG` [here](/docs/tokens/control-asset-access#authorization-required-0x1).

##### Revoking Authorization[​](#revoking-authorization "Direct link to Revoking Authorization")

The admin can only revoke authorization from an `Address`, if the issuer of the asset has `AUTH_REVOCABLE_FLAG` set. The deauthorization will fail if the issuer is missing. This requirement is true for both the trustline balances of `Address::Account` and contract balances of `Address:Contract`. Note that when a trustline is deauthorized from Soroban, `AUTHORIZED_FLAG` is cleared and `AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG` is set to avoid having to pull offers and redeeming pool shares.

#### Authorization semantics[​](#authorization-semantics "Direct link to Authorization semantics")

See the [authorization overview](/docs/learn/fundamentals/contract-development/authorization) and [auth example](/docs/build/smart-contracts/example-contracts/auth) for general information about authorization in Soroban.

The token contract contains three kinds of operations that follow the token [interface](/docs/tokens/token-interface#code):

- getters, such as `balance`, which do not change the state of the contract
- unprivileged mutators, such as `incr_allow` and `xfer`, which change the state of the contract but do not require special privileges
- privileged mutators, such as `clawback` and `set_admin`, which change the state of the contract but require special privileges

Getters require no authorization because they do not change the state of the contract and all contract data is public. For example, `balance` simply returns the balance of the specified `Address` without changing it.

Unprivileged mutators require authorization from the `Address` that spends or allows spending their balance. The exceptions are `xfer_from` and `burn_from` operations where the `Address` that require authorization from the 'spender' entity that has got an allowance from another `Address` beforehand.

Priviliged mutators require authorization from a specific privileged identity, known as the "administrator". For example, only the administrator can `mint` more of the token. Similarly, only the administrator can appoint a new administrator.

#### Contract Interface[​](#contract-interface "Direct link to Contract Interface")

This interface can be found in the [SDK](https://docs.rs/soroban-sdk/latest/soroban_sdk/token/index.html). It extends the common [SEP-41 Token Interface](/docs/tokens/token-interface).

#### Contract Errors[​](#contract-errors "Direct link to Contract Errors")

All built-in smart contracts on the Stellar network share the same error types, outlined below.

```
### [derive(Debug, FromPrimitive, PartialEq, Eq)]pub(crate) enum ContractError {    // Indicates an internal error in protocol implementation, such as invalid    // ledger state. This may not happen in the real networks, but might appear    // when using malformed test data (such as malformed ledger snapshots).    InternalError = 1,    // Indicates an impossible function has been invoked, such as clawback for    // an asset that does not have clawback enabled. Or, an operation has been    // called affecting the issuer's trustline.    OperationNotSupportedError = 2,    // Indicates the SAC has already been initialized. This error may only occur    // during initialization of an asset's SAC instance.    AlreadyInitializedError = 3,    // Unused = 4, - this error code is not used by SAC    // Unused = 5, - this error code is not used by SAC    // An account that would be modified by this transaction does not exist on    // the network.    AccountMissingError = 6,    // Unused = 7, - this error code is not used by SAC    // Indicates an amount less than zero was provided for a transfer amount.    NegativeAmountError = 8,    // Indicates an insufficient spender's available allowance amount. Also used    // to indicate a problem with expiration ledger when creating an allowance.    AllowanceError = 9,    // Indicates too low of a balance to spend the requested amount, or a    // balance as a result of this transaction would be too low or high, or a    // problem with attempting a clawback on a non-clawback-enabled trustline.    BalanceError = 10,    // Indicates an address has had its balance authorization revoked by the    // asset issuer.    BalanceDeauthorizedError = 11,    // Indicates this transaction would result in a spender's allowance    // overflowing.    OverflowError = 12,    // Indicates a trustline entry does not exist for this address to hold this    // asset.    TrustlineMissingError = 13,}
```

Source: [https://github.com/stellar/rs-soroban-env/blob/main/soroban-env-host/src/builtin_contracts/contract_error.rs](https://github.com/stellar/rs-soroban-env/blob/main/soroban-env-host/src/builtin_contracts/contract_error.rs)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tokens/stellar-asset-contract.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Overview](#overview)
- [Deployment](#deployment)
- [Interacting with classic Stellar assets](#interacting-with-classic-stellar-assets)
  - [Balance Authorization Required](#balance-authorization-required)
  - [Revoking Authorization](#revoking-authorization)
- [Authorization semantics](#authorization-semantics)
- [Contract Interface](#contract-interface)
- [Contract Errors](#contract-errors)

---

_Extraído de [https://developers.stellar.org/docs/tokens/stellar-asset-contract](https://developers.stellar.org/docs/tokens/stellar-asset-contract)_

---

## Sección 47 - Docs Tokens Token Interface

### Create Contract Tokens on Stellar: Standards & Integration | Stellar Docs

**URL:** https://developers.stellar.org/docs/tokens/token-interface
**Fecha de extracción:** 2025-07-12T01:19:25.868Z

---

---

source: https://developers.stellar.org/docs/tokens/token-interface
generated: 2025-07-12T01:19:25.868Z

---

On this page

> **INFO**
>
> info
>
> The term "custom token" has been deprecated in favor of "contract token". View the conversation in the [Stellar Developer Discord](https://discord.com/channels/897514728459468821/966788672164855829/1359276952971640953).

### Token Interface

Token contracts, including the Stellar Asset Contract and example token implementations expose the following common interface.

Tokens deployed on Soroban can implement any interface they choose, however, they should satisfy the following interface to be interoperable with contracts built to support Soroban's built-in tokens.

Note, that in the specific cases the interface doesn't have to be fully implemented. For example, the contract token may not implement the administrative interface compatible with the Stellar Asset Contract - it won't stop it from being usable in the contracts that only perform the regular user operations (transfers, allowances, balances etc.).

##### Compatibility Requirements[​](#compatibility-requirements "Direct link to Compatibility Requirements")

For any given contract function, there are three requirements that should be consistent with the interface described here:

- Function interface (name and arguments) - if not consistent, then the users simply won't be able to use the function at all. This is the hard requirement.
- Authorization - the users have to authorize the token function calls with all the arguments of the invocation (see the interface comments). If this is inconsistent, then the contract token may have issues with getting the correct signatures from the users and may also confuse the wallet software.
- Events - the token has to emit the events in the specified format. If inconsistent, then the token may not be handled correctly by the downstream systems such as block explorers.

##### Code[​](#code "Direct link to Code")

The interface below uses the Rust [soroban-sdk](/docs/tools/sdks/contract-sdks#soroban-rust-sdk) to declare a trait that complies with the [SEP-41](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0041.md) token interface.

```
pub trait TokenInterface {    /// Returns the allowance for `spender` to transfer from `from`.    ///    /// # Arguments    ///    /// * `from` - The address holding the balance of tokens to be drawn from.    /// * `spender` - The address spending the tokens held by `from`.    fn allowance(env: Env, from: Address, spender: Address) -> i128;    /// Set the allowance by `amount` for `spender` to transfer/burn from    /// `from`.    ///    /// # Arguments    ///    /// * `from` - The address holding the balance of tokens to be drawn from.    /// * `spender` - The address being authorized to spend the tokens held by    ///   `from`.    /// * `amount` - The tokens to be made available to `spender`.    /// * `expiration_ledger` - The ledger number where this allowance expires. Cannot    ///    be less than the current ledger number unless the amount is being set to 0.    ///    An expired entry (where expiration_ledger < the current ledger number)    ///    should be treated as a 0 amount allowance.    ///    /// # Events    ///    /// Emits an event with topics `["approve", from: Address,    /// spender: Address], data = [amount: i128, expiration_ledger: u32]`    fn approve(env: Env, from: Address, spender: Address, amount: i128, expiration_ledger: u32);    /// Returns the balance of `id`.    ///    /// # Arguments    ///    /// * `id` - The address for which a balance is being queried. If the    ///   address has no existing balance, returns 0.    fn balance(env: Env, id: Address) -> i128;    /// Transfer `amount` from `from` to `to`.    ///    /// # Arguments    ///    /// * `from` - The address holding the balance of tokens which will be    ///   withdrawn from.    /// * `to` - The address which will receive the transferred tokens.    /// * `amount` - The amount of tokens to be transferred.    ///    /// # Events    ///    /// Emits an event with topics `["transfer", from: Address, to: Address],    /// data = amount: i128`    fn transfer(env: Env, from: Address, to: Address, amount: i128);    /// Transfer `amount` from `from` to `to`, consuming the allowance of    /// `spender`. Authorized by spender (`spender.require_auth()`).    ///    /// # Arguments    ///    /// * `spender` - The address authorizing the transfer, and having its    ///   allowance consumed during the transfer.    /// * `from` - The address holding the balance of tokens which will be    ///   withdrawn from.    /// * `to` - The address which will receive the transferred tokens.    /// * `amount` - The amount of tokens to be transferred.    ///    /// # Events    ///    /// Emits an event with topics `["transfer", from: Address, to: Address],    /// data = amount: i128`    fn transfer_from(env: Env, spender: Address, from: Address, to: Address, amount: i128);    /// Burn `amount` from `from`.    ///    /// # Arguments    ///    /// * `from` - The address holding the balance of tokens which will be    ///   burned from.    /// * `amount` - The amount of tokens to be burned.    ///    /// # Events    ///    /// Emits an event with topics `["burn", from: Address], data = amount:    /// i128`    fn burn(env: Env, from: Address, amount: i128);    /// Burn `amount` from `from`, consuming the allowance of `spender`.    ///    /// # Arguments    ///    /// * `spender` - The address authorizing the burn, and having its allowance    ///   consumed during the burn.    /// * `from` - The address holding the balance of tokens which will be    ///   burned from.    /// * `amount` - The amount of tokens to be burned.    ///    /// # Events    ///    /// Emits an event with topics `["burn", from: Address], data = amount:    /// i128`    fn burn_from(env: Env, spender: Address, from: Address, amount: i128);    /// Returns the number of decimals used to represent amounts of this token.    ///    /// # Panics    ///    /// If the contract has not yet been initialized.    fn decimals(env: Env) -> u32;    /// Returns the name for this token.    ///    /// # Panics    ///    /// If the contract has not yet been initialized.    fn name(env: Env) -> String;    /// Returns the symbol for this token.    ///    /// # Panics    ///    /// If the contract has not yet been initialized.    fn symbol(env: Env) -> String;}
```

> **WARNING**
>
> CAUTION WHEN MODIFYING ALLOWANCES
>
> The `approve` function overwrites the previous value with `amount`, so it is possible for the previous allowance to be spent in an earlier transaction before `amount` is written in a later transaction. The result of this is that `spender` can spend more than intended. This issue can be avoided by first setting the allowance to 0, verifying that the spender didn't spend any portion of the previous allowance, and then setting the allowance to the new desired amount. You can read more about this issue here - [https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).

##### Metadata[​](#metadata "Direct link to Metadata")

Another requirement for complying with the token interface is to write the standard metadata (`decimal`, `name`, and `symbol`) for the token in a specific format. This format allows users to directly read constant data from the ledger instead of invoking a Wasm function. The [token example](https://github.com/stellar/soroban-examples/blob/main/token/src/metadata.rs) demonstrates how to use the Rust [soroban-token-sdk](https://github.com/stellar/rs-soroban-sdk/blob/main/soroban-token-sdk/src/lib.rs) to write the metadata, and we strongly encourage token implementations to follow this approach.

##### Handling Failure Conditions[​](#handling-failure-conditions "Direct link to Handling Failure Conditions")

In the token interface, there are several instances where function calls can fail due to various reasons such as lack of proper authorization, insufficient allowance or balance, etc. To handle these failure conditions, it is important to specify the expected behavior when such situations arise.

Its important to note the that the token interface not only incorporates the authorization concept for matching asset authorization in Stellar Classic, but it also utilizes the Soroban authorization mechanism. So, if you try to make a token call and it fails, it could be because of either token authorization processes.

To provide more context, when you use the token interface, there is a function called `authorized` that returns "true" if an address has token authorization.

More details on Authorization can be found [here](/docs/learn/fundamentals/contract-development/authorization).

For the functions in the token interface, [trapping](https://doc.rust-lang.org/book/ch09-00-error-handling.html) should be used as the standard way to handle failure conditions since the interface is not designed to return error codes. This means that when a function encounters an error, it will halt execution and revert any state changes that occurred during the function call.

##### Failure Conditions[​](#failure-conditions "Direct link to Failure Conditions")

Here is a list of basic failure conditions and their expected behavior for functions in the token interface:

###### Admin functions:[​](#admin-functions "Direct link to Admin functions:")

- If the admin did not authorize the call, the function should trap.
- If the admin attempts to perform an invalid action (e.g., minting a negative amount), the function should trap.

###### Token functions:[​](#token-functions "Direct link to Token functions:")

- If the caller is not authorized to perform the action (e.g., transferring tokens without proper authorization), the function should trap.
- If the action would result in an invalid state (e.g., transferring more tokens than available in the balance or allowance), the function should trap.

##### Example: Handling Insufficient Allowance in `burn_from` function[​](#example-handling-insufficient-allowance-in-burn_from-function "Direct link to example-handling-insufficient-allowance-in-burn_from-function")

In the `burn_from` function, the token contract should check whether the spender has enough allowance to burn the specified amount of tokens from the `from` address. If the allowance is insufficient, the function should trap, halting execution and reverting any state changes.

Here's an example of how the `burn_from` function can be modified to handle this failure condition:

```
fn burn_from(    env: soroban_sdk::Env,    spender: Address,    from: Address,    amount: i128,) {    // Check if the spender has enough allowance    let current_allowance = allowance(env, from, spender);    if current_allowance < amount {        // Trap if the allowance is insufficient        panic!("Insufficient allowance");    }    // Proceed with burning tokens    // ...}
```

By clearly outlining how to handle failures and incorporating the right error management techniques in the token interface, we can make token contracts stronger and safer.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tokens/token-interface.mdx)

Last updated on **Jun 16, 2025** by **Bri Wylde**

- [Compatibility Requirements](#compatibility-requirements)
- [Code](#code)
- [Metadata](#metadata)
- [Handling Failure Conditions](#handling-failure-conditions)
- [Failure Conditions](#failure-conditions)
- [Example: Handling Insufficient Allowance in `burn_from` function](#example-handling-insufficient-allowance-in-burn_from-function)

---

_Extraído de [https://developers.stellar.org/docs/tokens/token-interface](https://developers.stellar.org/docs/tokens/token-interface)_

---

## Sección 48 - Docs Tools Developer Tools

### Developer Tools; Build, Test, Deploy Apps & Set Up Ramps with SDKs & APIs | Stellar Docs

**URL:** https://developers.stellar.org/docs/tools/developer-tools
**Fecha de extracción:** 2025-07-12T01:19:27.271Z

---

---

source: https://developers.stellar.org/docs/tools/developer-tools
generated: 2025-07-12T01:19:27.271Z

---

### More Developer Tools

Check out even more helpful tools created by SDF and the community in this section.

[

#### 📄️ Stella AI Bot

Stella is an AI bot that will help you with all your Stellar questions

](/docs/tools/developer-tools/ai-bot)

[

#### 📄️ Anchor Tools

Explore a suite of developer tools for Stellar, including anchor directory, demo wallet, and Polaris.

](/docs/tools/developer-tools/anchor-tools)

[

#### 📄️ Asset Sandbox

Explore a suite of developer tools for Stellar, including asset sandbox.

](/docs/tools/developer-tools/asset-tools)

[

#### 📄️ Block Explorers

Explore a suite of developer tools for Stellar, including block explorers.

](/docs/tools/developer-tools/block-explorers)

[

#### 📄️ Analytics Platforms

Explore the full history of Stellar network data.

](/docs/tools/developer-tools/analytics-platforms)

[

#### 📄️ Jupyter Notebooks

Experiment with contracts in Jupyter Notebooks

](/docs/tools/developer-tools/jupyter-notebooks)

[

#### 📄️ Network Insights

Tools to find unique insights about the Stellar network

](/docs/tools/developer-tools/network-insights)

[

#### 📄️ Network Status

Explore a suite of developer tools for monitoring Stellar network status.

](/docs/tools/developer-tools/network-status)

[

#### 📄️ Node Operator Tools

Explore a suite of developer tools for Stellar, including node operator tools.

](/docs/tools/developer-tools/node-operator-tools)

[

#### 📄️ OpenZeppelin Stellar Contracts

OpenZeppelin Stellar Contract Library and Contract Wizard

](/docs/tools/developer-tools/openzepplin-contracts)

[

#### 📄️ Security Tools

Explore a suite of security tools for Stellar developers.

](/docs/tools/developer-tools/security-tools)

[

#### 📄️ Wallet Integration

Explore a suite of developer tools for Stellar wallets.

](/docs/tools/developer-tools/wallets)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tools/developer-tools/README.mdx)

Last updated on **Mar 25, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/tools/developer-tools](https://developers.stellar.org/docs/tools/developer-tools)_

---

## Sección 49 - Docs Tools Infra Tools Cross Chain

### Cross-Chain | Stellar Docs

**URL:** https://developers.stellar.org/docs/tools/infra-tools/cross-chain
**Fecha de extracción:** 2025-07-12T01:19:28.646Z

---

---

source: https://developers.stellar.org/docs/tools/infra-tools/cross-chain
generated: 2025-07-12T01:19:28.646Z

---

On this page

### Cross-Chain

Bridges and messaging layers that connect different blockchains.

#### [Axelar](https://www.axelar.network/)[​](#axelar "Direct link to axelar")

Axelar Network is the universal interoperability network that securely connects all blockchain ecosystems, applications, assets, and users.

Get set up to write cross-chain smart contracts on Stellar using Axelar in the following guides.

##### Learn about the Stellar GMP contracts[​](#learn-about-the-stellar-gmp-contracts "Direct link to Learn about the Stellar GMP contracts")

General Message Passing (GMP) is a cross-chain communication protocol that allows smart contracts on different blockchains to communicate with each other. With GMP, Stellar contracts can:

- Send messages to contracts on other chains like Ethereum, Avalanche, Base, Polygon, etc.
- Receive and process messages from contracts on other chains.
- Execute cross-chain operations securely and efficiently.

[Dive into Stellar GMP documentation →](https://docs.axelar.dev/dev/general-message-passing/stellar-gmp/intro/)

##### Learn about the Stellar Interchain Token Service (ITS)[​](#learn-about-the-stellar-interchain-token-service-its "Direct link to Learn about the Stellar Interchain Token Service (ITS)")

The Interchain Token Service (ITS) enables tokens to scale across multiple chains by supporting both existing and newly minted tokens, preserving native-like fungibility and functionality on connected EVM chains, and automating deployment and maintenance to help teams easily manage supply on an open, scalable, and secure network. For the Stellar ecosystem, ITS offers:

- Creation of new tokens that can exist on multiple blockchains.
- Connecting existing Stellar tokens to other blockchain ecosystems.
- Secure transfers of tokens between Stellar and other chains.

[Learn how to use Axelar's ITS with Stellar →](https://docs.axelar.dev/dev/send-tokens/stellar/intro/)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tools/infra-tools/cross-chain.mdx)

Last updated on **May 15, 2025** by **Bri Wylde**

- [Axelar](#axelar)
  - [Learn about the Stellar GMP contracts](#learn-about-the-stellar-gmp-contracts)
  - [Learn about the Stellar Interchain Token Service (ITS)](#learn-about-the-stellar-interchain-token-service-its)

---

_Extraído de [https://developers.stellar.org/docs/tools/infra-tools/cross-chain](https://developers.stellar.org/docs/tools/infra-tools/cross-chain)_

---

## Sección 50 - Docs Tools Lab

### Lab | Stellar Docs

**URL:** https://developers.stellar.org/docs/tools/lab
**Fecha de extracción:** 2025-07-12T01:19:30.042Z

---

---

source: https://developers.stellar.org/docs/tools/lab
generated: 2025-07-12T01:19:30.042Z

---

On this page

### Lab

##### [Stellar Lab](https://lab.stellar.org)[​](#stellar-lab "Direct link to stellar-lab")

Stellar Lab is our new go-to tool for development, experimenting, and testing, as well as exploring APIs developers use to interact with the Stellar network. Whether you're a developer seeking to test transactions, explore RPC methods or Horizon endpoints, or dive deeper into the ecosystem, Stellar Lab provides a modern and user-friendly interface that makes the process smooth and intuitive.

![Lab: Homepage](/assets/images/lab-fea666bdd9857a0c963e9b76c595db4b.png)

##### Features of Stellar Lab[​](#features-of-stellar-lab "Direct link to Features of Stellar Lab")

- Easily Create Accounts: Create Accounts on Mainnet, Testnet, and Futurenet using a web UI. You can use Friendbot to fund those accounts directly on Lab for Testnet and Futurenet.
- Access RPC Methods and Horizon Endpoints: Leverage powerful Stellar RPC methods and Stellar Horizon endpoints in a web UI to interact with the Stellar network and obtain crucial data. Try RPC methods to get states from the ledger like accounts, trustlines, contract wasm, and more.
- Simulate and Submit: Lab supports the ability to use custom RPC providers so that you could simulate transactions, save transactions, and submit transactions directly using Lab. You can also submit transactions using Horizon.
- Save and Share API Requests: Easily save your requests and transactions for the future or share them with teammates to build faster together.
- XDR ⇔ JSON Support: We have introduced a canonical [XDR to JSON mapping](https://www.npmjs.com/package/@stellar/stellar-xdr-json-web) which is used on Stellar Lab (also used in the [Stellar CLI](https://github.com/stellar/stellar-cli)). You can see this at work in the Lab where [XDR can be converted to JSON](https://lab.stellar.org/xdr/view).
- Mobile Friendly: We heard that you use Lab on the mobile, so we optimized the Lab to have a mobile responsive layout.

![Lab XDR to JSON](/assets/images/xdr-json-lab-65dac53c1afc4165da4d4f6d08513136.png)

These are the features that are available now. There will be more upcoming features to support smart contracts. We look forward to showing you the future of Stellar Lab.

##### Video Tutorial for Stellar Lab[​](#video-tutorial-for-stellar-lab "Direct link to Video Tutorial for Stellar Lab")

- Video Tutorial for Lab: [https://developers.stellar.org/meetings/2024/11/14](https://developers.stellar.org/meetings/2024/11/14)

##### What About the Old Lab?[​](#what-about-the-old-lab "Direct link to What About the Old Lab?")

In case you need it, the previous version of Stellar Lab is still accessible [here](https://old-lab.stellar.org). However, it will no longer be actively maintained. We encourage you to explore the new Lab and if you think there is anything that’s missing, please reach out to us Stellar Github.

##### Help Us Improve![​](#help-us-improve "Direct link to Help Us Improve!")

We’re committed to making Stellar Lab even better. If you have any feature requests, please submit them on [Github](https://github.com/stellar/laboratory/issues). Your feedback is important to us with product iterations and in shaping the future of Stellar Lab.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tools/lab/README.mdx)

Last updated on **Mar 25, 2025** by **Bri Wylde**

- [Stellar Lab](#stellar-lab)
- [Features of Stellar Lab](#features-of-stellar-lab)
- [Video Tutorial for Stellar Lab](#video-tutorial-for-stellar-lab)
- [What About the Old Lab?](#what-about-the-old-lab)
- [Help Us Improve!](#help-us-improve)

---

_Extraído de [https://developers.stellar.org/docs/tools/lab](https://developers.stellar.org/docs/tools/lab)_

---

## Sección 51 - Docs Tools Quickstart

### Quickstart | Stellar Docs

**URL:** https://developers.stellar.org/docs/tools/quickstart
**Fecha de extracción:** 2025-07-12T01:19:31.441Z

---

---

source: https://developers.stellar.org/docs/tools/quickstart
generated: 2025-07-12T01:19:31.441Z

---

### Quickstart

Quickstart is a local Stellar network environment (node) that allows developers to run a local version of the Stellar network for development and testing. Quickstart runs a local version of Stellar Core, Horizon, RPC, and everything else needed to replicate the public network.

For more information about running Stellar services in production, see the documentation for the individual services here:

- [How to run Stellar Core in production](/docs/validators)
- [How to run Horizon in production](/docs/data/apis/horizon/admin-guide/overview)
- [How to run RPC in production](/docs/data/apis/rpc/admin-guide)

Quickstart is intended for use in development, not in production, although running it in public mode will cause it to join the public network.

- \*Run Quickstart\*\*

Ready to get started? The Getting Started section of the Quickstart documentation will show how to run Quickstart, but there are some configurations to decide on first. Most importantly, the network mode Quickstart will run in (pubnet, testnet, futurenet, local). Read about the modes in the Network Modes section.

> **INFO**
>
> info
>
> Quickstart can be deployed using the Getting Started guide, but the configurations used in the guide may not be ideal for your use case, so please familiarize yourself with the options to configure Quickstart to fit your use case.

> **WARNING**
>
> caution
>
> Please note: the quickstart image is not intended for production purposes. Information about setting up a production environment is available [here](/docs/validators).

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tools/quickstart/README.mdx)

Last updated on **Mar 25, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/tools/quickstart](https://developers.stellar.org/docs/tools/quickstart)_

---

## Sección 52 - Docs Tools Ramps Moneygram

### MoneyGram Ramps | Stellar Docs

**URL:** https://developers.stellar.org/docs/tools/ramps/moneygram
**Fecha de extracción:** 2025-07-12T01:19:32.808Z

---

---

source: https://developers.stellar.org/docs/tools/ramps/moneygram
generated: 2025-07-12T01:19:32.808Z

---

### MoneyGram Ramps

MoneyGram Ramps is a MoneyGram product that enables users of third-party applications, such as crypto wallets and exchanges, to cash-in (deposit) and cash-out (withdrawal) USDC on Stellar.

[Dive into the MoneyGram Ramps docs](https://developer.moneygram.com/moneygram-developer/docs/integrate-moneygram-ramps) to learn about the technical requirements for integrating MoneyGram Ramps into an existing wallet or creating a new wallet application.

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tools/ramps/moneygram.mdx)

Last updated on **May 1, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/tools/ramps/moneygram](https://developers.stellar.org/docs/tools/ramps/moneygram)_

---

## Sección 53 - Docs Tools Sdks

### Explore SDKs for Blockchain Development with JavaScript, Python & More | Stellar Docs

**URL:** https://developers.stellar.org/docs/tools/sdks
**Fecha de extracción:** 2025-07-12T01:19:34.192Z

---

---

source: https://developers.stellar.org/docs/tools/sdks
generated: 2025-07-12T01:19:34.192Z

---

### SDKs

The SDK section is split into three categories:

- [Contract SDKs](/docs/tools/sdks/contract-sdks) that are used to build smart contracts that will be deployed to the Stellar network;
- [Client & XDR SDKs](/docs/tools/sdks/client-sdks) that are used by applications to interact with the network;
- [Build your own SDK](/docs/tools/sdks/build-your-own) that details the minimum requirements for building your own SDK.

[

#### 📄️ Contract SDKs

Contract SDKs are used to build smart contracts that will be deployed to the Stellar network.

](/docs/tools/sdks/contract-sdks)

[

#### 📄️ Client & XDR SDKs

Explore the Stellar SDK library to simplify blockchain development. Leverage Rust, JavaScript, Python, and more to build on and integrate with the network.

](/docs/tools/sdks/client-sdks)

[

#### 📄️ Build Your Own Contract SDK

This is for building an SDK for writing smart contracts.

](/docs/tools/sdks/build-your-own)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/tools/sdks/README.mdx)

Last updated on **Feb 18, 2025** by **Bri Wylde**

---

_Extraído de [https://developers.stellar.org/docs/tools/sdks](https://developers.stellar.org/docs/tools/sdks)_

---

## Sección 54 - Docs Validators Admin Guide

### Admin Guide | Stellar Docs

**URL:** https://developers.stellar.org/docs/validators/admin-guide
**Fecha de extracción:** 2025-07-12T01:19:42.033Z

---

---

source: https://developers.stellar.org/docs/validators/admin-guide
generated: 2025-07-12T01:19:42.033Z

---

### Admin Guide

Stellar Core is the program nodes use to communicate with other nodes to create and maintain the Stellar peer-to-peer network. It's an implementation of the Stellar Consensus Protocol configured to construct a chain of ledgers guaranteed to be in agreement across all participating nodes at all times.

These pages describe various aspects of installing, configuring, and maintaining a `stellar-core` node.

[

#### 📄️ Prerequisites

You can install Stellar Core a number of different ways, and once you do, you can configure it to participate in the network on a several different levels: it can be either a Basic Validator or a Full Validator. No matter how you install Stellar Core or what kind of node you run, however, you need to set up and connect to the peer-to-peer network and store the state of the ledger in a SQL database.

](/docs/validators/admin-guide/prerequisites)

[

#### 📄️ Installing

There are three common ways to install and run Stellar Core:

](/docs/validators/admin-guide/installation)

[

#### 📄️ Configuring

Before attempting to configure stellar-core, it is highly recommended to first try running a private network or joining the test network.

](/docs/validators/admin-guide/configuring)

[

#### 📄️ Environment Preparation

Initialize the Database and Local State

](/docs/validators/admin-guide/environment-preparation)

[

#### 📄️ Publishing History Archives

If you want to run a Full Validator, you need to set up your node to publish a history archive. You can host an archive using a blob store such as Amazon's S3 or Digital Ocean's spaces, or you can simply serve a local archive directly via an HTTP server such as Nginx or Apache. If you're setting up a Basic Validator, you can skip this section. No matter what kind of node you're planning to run, make sure to set it up to get history, which is covered in Environment Preparation.

](/docs/validators/admin-guide/publishing-history-archives)

[

#### 📄️ Running

Starting Your Node

](/docs/validators/admin-guide/running-node)

[

#### 📄️ Logging

Stellar Core sends logs to standard error and stellar-core.log by default, configurable with the LOGFILEPATH field.

](/docs/validators/admin-guide/logging)

[

#### 📄️ Monitoring

Once your node is up and running, it's important to keep an eye on it to make sure it stays afloat and continues to contribute to the health of the overall network. To help with that, Stellar Core exposes vital information that you can use to monitor your node and diagnose potential problems.

](/docs/validators/admin-guide/monitoring)

[

#### 📄️ Maintenance

Maintenance here refers to anything involving taking your validator temporarily out of the network (to apply security patches, system upgrade, etc).

](/docs/validators/admin-guide/maintenance)

[

#### 📄️ Upgrading the Network

The network itself has network wide settings that can be updated.

](/docs/validators/admin-guide/network-upgrades)

[

#### 📄️ Soroban Settings

Soroban has a large collection of settings stored on-ledger that can be modified through a validator vote. Here you can find out how to propose a new settings upgrade as well as how to examine a proposed upgrade. You can also look at the Commands page for more details on the stellar-core commands used below.

](/docs/validators/admin-guide/soroban-settings)

[

#### 📄️ Commands

Stellar Core can be controlled using a robust CLI.

](/docs/validators/admin-guide/commands)

[

#### 📄️ Advanced

This page contains information that is useful to know but that should not stop somebody from running a node.

](/docs/validators/admin-guide/advanced)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/validators/admin-guide/README.mdx)

Last updated on **Jun 20, 2024** by **Elliot Voris**

---

_Extraído de [https://developers.stellar.org/docs/validators/admin-guide](https://developers.stellar.org/docs/validators/admin-guide)_

---

## Sección 55 - Docs Validators Tier 1 Orgs

### Tier 1 Organizations | Stellar Docs

**URL:** https://developers.stellar.org/docs/validators/tier-1-orgs
**Fecha de extracción:** 2025-07-12T01:19:49.573Z

---

---

source: https://developers.stellar.org/docs/validators/tier-1-orgs
generated: 2025-07-12T01:19:49.573Z

---

On this page

### Tier 1 Organizations

To help with Stellar’s decentralization, the most advanced teams building on Stellar run validators and strive to join the ranks of “Tier 1 organizations.”

Remember that the Stellar network consists of organizations that each run validators, and each organization decides for itself, by configuring a quorum set, which and how many other organizations it requires agreement from in order to commit to a particular new ledger. Tier 1 organizations are a group of organizations that, due to the fact that most other organizations require agreement from them, bear the safety and liveness of the Stellar network on their shoulders.[1](#user-content-fn-1)

To become a Tier 1 organization, a team running validators must convince enough other organizations in the Stellar network to trust them by including them in their quorum sets. As part of this process, they must meet some requirements that are accepted by the community of Stellar validators. For example, Tier 1 organizations generally run three validators, coordinate any changes to their quorum sets with each other, and hold themselves to a higher standard of uptime and responsiveness.

As a steward of the Stellar network, the SDF works closely with Tier 1 organizations to ensure the health of the network, maintain robust quorum intersection, and build in redundancy to minimize network disruptions. This guide outlines the minimum requirements recommended by the SDF in order to be a Tier 1 organization. However, in the end, the SDF on its own cannot add or remove a Tier 1 organization; this depends on the quorum sets of many other organizations in the network.

#### Why Three Validators[​](#why-three-validators "Direct link to Why Three Validators")

The most important recommendation for a Tier 1 organization is to set up and maintain three full validators. Why three?

On Stellar, validators choose to trust organizations when they configure their quorum set. If you are a trustworthy organization, you want your presence on the network to persist even if a node fails or you take it down for maintenance. A trio of validating nodes allows that to happen: when configuring their quorum sets, other participants can requires ⅔ of your validating nodes to agree. If 1 has issues, no big deal: the other two still vote on your organization’s behalf, so the show goes on. To ensure redundancy, it's also important that those three full validators be geographically dispersed: if they're in the same data center, they run the risk of going down at the same time.

Here’s what else Tier 1 organizations should expect of one another:

#### Publish History Archives[​](#publish-history-archives "Direct link to Publish History Archives")

In addition to participating in the Stellar Consensus Protocol, a full validator publishes an archive of network transactions. To do that, you need to configure Stellar Core to record history to a publicly accessible archive, and add the location of that archive to your stellar.toml. We recommend that, as a Tier 1 organization, you should set each of your nodes to record history to a separate archive.

Public archives make the network more resilient: when new nodes come online, or when existing nodes lose synch, they need to consult an archive to figure out what they missed. Sharing snapshots of the ledger, which detail transactions and their results, allows those nodes to catch up, and more archives mean more redundancy and greater decentralization. Plus, sharing history keeps everyone honest.

#### Set Up a Safe Quorum Set[​](#set-up-a-safe-quorum-set "Direct link to Set Up a Safe Quorum Set")

For simplicity, we’re recommending that every Tier 1 node use the same quorum set configuration, which is made up of inner quorum sets representing each Tier 1 organization.

To configure a quorum set for your validator, we recommend including several Tier 1 organizations or copying the existing Tier 1 Qset and optionally adding additional organizations that you trust to it. Using existing Tier 1 organizations as a safety net, we can work together to expand the quorum methodically and deliberately.

To see what the current recommended quorum set looks like, check out the [example Full Validator config file](https://github.com/stellar/packages/blob/master/docs/examples/pubnet-validator-full/stellar-core.cfg).

> **NOTE**
>
> note
>
> Be sure to properly add your own validators to your validators' quorum sets. As a Tier 1 organization with three validators and history archives, SDF recommends declaring your organization [`HIGH` quality](/docs/validators/admin-guide/configuring#validator-quality) in your quorum set configuration. Declaring your organization at a lower quality level [may limit its participation in consensus](/docs/validators/admin-guide/configuring#impact-of-validator-quality-on-nomination).

#### Declare Your Node[​](#declare-your-node "Direct link to Declare Your Node")

[SEP-20](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0020.md) is an open spec that explains how self-verification of validator nodes works. The fields it specifies are pretty simple: you set the home domain of your validator’s Stellar account to your website, where you publish information about your node and your organization in a stellar.toml file.

It’s an easy way to propagate information, and it harnesses the network to allow other participants to discover your node and add it to their quorum sets without the need for a centralized database.

#### Keep Your Nodes Up To Date[​](#keep-your-nodes-up-to-date "Direct link to Keep Your Nodes Up To Date")

Running a validator requires vigilance. You need to keep an eye on your nodes, keep them up to date with the latest version of Stellar Core, and check in on public channels for information about what’s currently happening with other validators. As organizations join or leave the network, you might need to update the quorum set configuration of your validators to ensure that your validators have robust quorum intersection with Tier 1 and robust quorum availability.

The best two ways to do that:

- Join the validators [email list](https://groups.google.com/forum/#!forum/stellar-validators)
- download Keybase and join the [#validators channel](https://keybase.io/team/stellar.public) on the stellar.public team

We always announce new Stellar Core releases in those channels. You can also find those releases on our github.

It’s also critical that you pay attention to information about what those updates mean: often, you’ll need to set your validators to vote on something timely, such as when to vote to upgrade to a new protocol version, or how high to set the operations-per-ledger limit.

#### Coordinate With Other Validators[​](#coordinate-with-other-validators "Direct link to Coordinate With Other Validators")

Whether you run a trio of validators or a single node, it’s important that you coordinate with other validators when you make a significant change or notice something wrong. You should let them know when you plan to:

- Take your node down for maintenance
- Make changes to your quorum set

Letting other validators know when you plan to take your node down for maintenance or to upgrade to the latest version of stellar-core prevents a critical mass of nodes from going offline at the same time.

Letting other validators know when you plan to change your quorum set allows them to respond, adjust, and think through the implications of the change. For the Stellar network to expand safely, the SDF recommends that validators coordinate off-chain to maintain good quorum intersection.

#### Monitor your quorum set[​](#monitor-your-quorum-set "Direct link to Monitor your quorum set")

We recommend using Prometheus to scrape and store your stellar-core metrics, and Grafana to render that data for human consumption. You can find step-by-step instructions for setting up monitoring and alerts in [Monitoring and Diagnostics](/docs/validators/admin-guide/monitoring), along with links to Grafana dashboards we’ve created to make things easier.

You can also use [Stellarbeat](https://stellarbeat.io) to view validators’ quorum configurations, get information about their availability and uptime, and the quorum command to diagnose problems with the quorum set of the local node.

You should do regular check-ins on your quorum set. If nodes have bad uptime or prove otherwise unreliable, you may need to remove them from your quorum set so that you don’t get stuck and so that the network doesn’t halt. You may also want to add new organizations that come online and prove reliable. If you plan to do either of those things, remember to communicate and coordinate with other validators.

#### Get in touch[​](#get-in-touch "Direct link to Get in touch")

If you think you can be a Tier 1 organization, let us know on the `#validators` channel on the [Stellar Developers' Discord](https://discord.gg/stellardev). Community members can help you through the process, and once you’re up and running, SDF team members will help you join Tier 1, so that you can take your rightful place as a pillar of the network. Once you’ve proven that you are responsive, reliable, and maintain good uptime, the SDF may recommend that other validators adjust their quorum set to include your validators.

As Stellar grows, and more and more businesses build on the network, Tier 1 organizations will be crucial to a healthy expansion of the network.

#### Footnotes[​](#footnote-label "Direct link to Footnotes")

1.  The notion of Tier 1 organization can be defined precisely, but this is besides the point of this page. [↩](#user-content-fnref-1)

[Edit this page](https://github.com/stellar/stellar-docs/edit/main/docs/validators/tier-1-orgs.mdx)

Last updated on **Jan 21, 2025** by **Brett Boston**

- [Why Three Validators](#why-three-validators)
- [Publish History Archives](#publish-history-archives)
- [Set Up a Safe Quorum Set](#set-up-a-safe-quorum-set)
- [Declare Your Node](#declare-your-node)
- [Keep Your Nodes Up To Date](#keep-your-nodes-up-to-date)
- [Coordinate With Other Validators](#coordinate-with-other-validators)
- [Monitor your quorum set](#monitor-your-quorum-set)
- [Get in touch](#get-in-touch)

---

_Extraído de [https://developers.stellar.org/docs/validators/tier-1-orgs](https://developers.stellar.org/docs/validators/tier-1-orgs)_

---

## Sección 56 - Index

### Developer Tools, SDKs & Core Resources for Building | Stellar Docs

**URL:** https://developers.stellar.org
**Fecha de extracción:** 2025-07-12T01:17:04.482Z

---

---

source: https://developers.stellar.org
generated: 2025-07-12T01:17:04.482Z

---

### Welcome to Stellar Developer Docs

Stellar is a layer-1 open-source, decentralized, peer-to-peer blockchain network that provides a framework for developers to create applications, issue assets, write smart contracts, and connect to existing financial rails. Stellar is designed to enable creators, innovators, and developers to build projects on the network that can interoperate with each other.

The developer docs will teach you how to build applications, issue and use tokens, write smart contracts, set up on and off-ramps, set up a validator node, and more.

#### **Stellar for...**[​](#stellar-for "Direct link to stellar-for")

[![](/assets/images/stellar-101-26081c928aa1f2587e8fa50c8820e4f0.png)](#asset-issuers)

##### Asset Issuers

Issue an asset or create a custom smart contract token.

[Learn More](#asset-issuers)

[![](/assets/images/contract-4360e7119b2a4ba81b3849ea53901d98.png)](#smart-contract-developers)

##### Smart Contract Developers

Write smart contracts on the Stellar network.

[Learn More](#smart-contract-developers)

[![](/assets/images/issue-assets-89ec386030248f486d74852861375c43.png)](#ramps-anchors)

##### Ramps (Anchors)

Learn about and set up an anchor.

[Learn More](#ramps-anchors)

[![](/assets/images/build-applications-41ff5c71635741622bf54098505815da.png)](#applications)

##### Applications

Build a traditional wallet, dapp, or list Stellar assets on an exchange.

[Learn More](#applications)

[![](/assets/images/dev-tools-80163b11f1e5d7aee9a2d7e24c680762.png)](#infrastructure-providers)

##### Infrastructure Providers

Set up a Horizon or RPC service.

[Learn More](#infrastructure-providers)

[![](/assets/images/access-data-cd89f8e864d88bc2518f0b4716946071.png)](#analytics)

##### Analytics

Use Hubble to perform analysis on Stellar network data.

[Learn More](#analytics)

---

#### **Navigating the docs**[​](#navigating-the-docs "Direct link to navigating-the-docs")

What each main section of the developer docs contains.

##### Build

Contains tutorials and how-to guides for writing smart contracts, building applications, interacting with the network, and more.

[Explore](/docs/build)

##### Learn

Find all informational and conceptual content here. Learn about Stellar fundamentals like how accounts and transactions function, dive deeper into the functionality of each operation, discover how fees work, and more.

[Explore](/docs/learn/fundamentals)

##### Tokens

Information on how to issue assets on the Stellar network and create custom smart contract tokens.

[Explore](/docs/tokens)

##### Data

Discover various data availability options: RPC, Hubble, Horizon, Galexie, and data indexers.

[Explore](/docs/data)

##### Tools

Learn about all the available tools for building on, interacting with, or just watching the Stellar network. Also, find information on how to use the Anchor Platform or Stellar Disbursement Platform.

[Explore](/docs/tools)

##### Networks

Information about deployed networks (Mainnet, Testnet, and Futurenet), current software versions, resource limitations, and fees.

[Explore](/docs/networks)

##### Validators

Everything you'll need to know if you want to run, operate, and maintain a core validator node on the Stellar network.

[Explore](/docs/validators)

#### **Developer resources**[​](#developer-resources "Direct link to developer-resources")

Interact with other Stellar developers, keep up with ecosystem standards and protocol upgrades, and learn about upcoming events.

##### Stellar Developer Discord

Ask questions and engage with other Stellar devs.

[Explore](https://discord.gg/stellardev)

##### Developer Site

Get the latest news and insights about building on Stellar.

[Explore](https://stellar.org/developers)

##### Stellar Stack Exchange

A question and answer site for Stellar developers; if you can’t find what you’re looking for in the docs, try searching the Stack Exchange to see if your question has been addressed. If it hasn't, feel free to ask!

[Explore](https://stellar.stackexchange.com/)

##### Stellar Developers Google Group

Discuss Core Advancement Proposals (CAPs) and Stellar Ecosystem Proposals (SEPs), talk about the development of Stellar Core and Horizon, and stay informed about important network upgrades.

[Explore](https://groups.google.com/g/stellar-dev)

##### Contribute to the docs and leave feedback

Stellar’s Developer Documentation is open-source, and contributions to the docs are encouraged. You can file an issue or pull request to add new content, suggest revisions to existing content, submit suggestions, report bugs, and more in the [Stellar Docs GitHub Repo](https://github.com/stellar/stellar-docs).

Also, feel free to leave any additional feedback by filing issues in the various other [Stellar repos](https://github.com/stellar).

---

#### **Stellar docs pathfinding**[​](#stellar-docs-pathfinding "Direct link to stellar-docs-pathfinding")

##### Asset issuers[​](#asset-issuers "Direct link to Asset issuers")

| Stellar assets                        |
| ------------------------------------- |
| [Asset and token intro](/docs/tokens) |

Learn about the difference between assets issued on Stellar and contract tokensLearn

|
| [Data availability overview](/docs/data) |

Learn about the different mechanisms for data availability on StellarLearn

|
| [Asset design considerations](/docs/tokens/control-asset-access) |

Learn about certain considerations (e.g., flags, asset naming, etc.) that are important when issuing an assetLearn

|
| [Stellar Asset Contract (SAC)](/docs/tokens/stellar-asset-contract) |

Learn about interacting with assets issued on Stellar in smart contractsLearn

|
| [Quickstart script](/docs/tokens/quickstart) |

Issue an asset on the Stellar network in a single transactionGuide

|
| [Deploy an SAC](/docs/tokens/stellar-asset-contract) |

Deploy a Stellar Asset Contract with the Stellar CLIGuide

|

| Contract tokens                       |
| ------------------------------------- |
| [Asset and token intro](/docs/tokens) |

Learn about the difference between assets issued on Stellar and contract tokensLearn

|
| [Data availability overview](/docs/data) |

Learn about the different mechanisms for data availability on StellarLearn

|
| [Token interface (SEP-41)](/docs/tokens/token-interface) |

Learn about the common interface for smart contract tokens on StellarLearn

|
| [Token example contract](/docs/build/smart-contracts/example-contracts/tokens) |

Demonstrates how to write a token contract that implements the Token InterfaceExample

|
| [Manage contracts](/docs/build/guides/cli/contract-lifecycle) |

Use the Stellar CLI to manage smart contractsGuide

|
| [Stellar CLI](/docs/build/guides/cli) |

The command line interface to Stellar smart contractsTool

|
| [Rust SDK](https://docs.rs/soroban-sdk/latest/soroban_sdk/) |

Supports writing programs for Stellar smart contractsTool

|

##### Smart contract developers[​](#smart-contract-developers "Direct link to Smart contract developers")

| Essential resources                                                      |
| ------------------------------------------------------------------------ |
| [Stellar smart contracts overview](/docs/build/smart-contracts/overview) |

Learn the essentials about writing smart contracts on StellarLearn

|
| [Migrating from EVM networks](/docs/learn/migrate) |

Stellar is not an EVM network, learn about how Stellar differs from EVM networks in this sectionLearn

|
| [Storage types](/docs/learn/fundamentals/contract-development/storage/state-archival#contract-data-type-descriptions) |

There are three different storage types for smart contract data, learn about them in this sectionLearn

|
| [Getting started guide](/docs/build/smart-contracts/getting-started) |

The go-to guide for getting setup to write smart contracts on StellarGuide

|
| [Example contracts](/docs/build/smart-contracts/example-contracts) |

These contracts are good starting points for understanding best practices and writing your own contracts on StellarGuide

|
| [General contract guides](/docs/build/guides/conventions) |

Various guides that highlight the norms seen in contract developmentGuide

|
| [Stellar CLI](/docs/build/guides/cli) |

The command line interface to Stellar smart contractsTool

|
| [Rust SDK](https://docs.rs/soroban-sdk/latest/soroban_sdk/) |

Supports writing programs for Stellar smart contractsTool

|

| Optional resources                                                                 |
| ---------------------------------------------------------------------------------- |
| [Trustlines](/docs/learn/fundamentals/stellar-data-structures/accounts#trustlines) |

Trustlines are unique to Stellar and are an explicit opt-in for an account to hold and trade a particular assetLearn

|
| [Upgrading contracts](/docs/build/guides/conventions/upgrading-contracts) |

You don’t need a proxy pattern to upgrade a contract (like in EVM), you can upgrade the Wasm bytecode directly without changing the addressGuide

|

##### Ramps (anchors)[​](#ramps-anchors "Direct link to Ramps (anchors)")

| Ramps                                               |
| --------------------------------------------------- |
| [Anchor overview](/docs/learn/fundamentals/anchors) |

Stellar ramps are called "anchors", learn about them in this overview sectionLearn

|
| [SEP-6 and SEP-24](/docs/learn/fundamentals/anchors#using-sep-6-programmatic-deposit-and-withdrawal-versus-sep-24-hosted-deposit-and-withdrawal) |

You can set up an anchor using SEP-6 or SEP-24, learn about the differences in this sectionLearn

|
| [Anchor Platform](/platforms/anchor-platform) |

Set up an anchor using the SDF-maintained Anchor PlatformTutorial

|
| [Use a third-party Horizon provider](/docs/data/apis/api-providers) |

We recommend anchors use a third-party Horizon provider, but they can also set up their ownData

|
| [Demo wallet](/docs/tools/developer-tools/anchor-tools#demo-wallet) |

An application for interactively testing anchor services. Lets financial application developers test their integrations and learn how Stellar ecosystem protocols (SEPs) workTool

|
| [Anchor test suite](/docs/tools/developer-tools/anchor-tools#anchor-test-suite) |

A test suite for validating SEP6, SEP24, SEP31 transfer serversTool

|

##### Applications[​](#applications "Direct link to Applications")

| Traditional wallets                                                                     |
| --------------------------------------------------------------------------------------- |
| [Application design considerations](/docs/build/apps/application-design-considerations) |

Various concepts to consider when building a wallet, such as custody models, security, and moreLearn

|
| [Fees](/docs/learn/fundamentals/fees-resource-limits-metering#inclusion-fee) |

Learn about how fees work on the Stellar network and decide how you'd like to handle user feesLearn

|
| [Operations & transactions](/docs/learn/fundamentals/transactions) |

Wallets build and submit transactions, learn about about how operations and transactions work hereLearn

|
| [Signatures & multisig](/docs/learn/fundamentals/transactions/signatures-multisig) |

Signatures are authorization for transactions on the Stellar network, learn about them hereLearn

|
| [Anchor overview](/docs/learn/fundamentals/anchors) |

Wallets may want to connect to financial rails via anchors (on- and off-ramps), learn about them hereLearn

|
| [Wallet SDK](/docs/category/build-a-wallet-with-the-wallet-sdk) |

Learn to build a wallet with the Wallet SDK in Kotlin, Flutter, Swift or TypeScriptTutorial

|
| [Horizon introduction](/docs/data/apis/horizon) |

Access network data using the Horizon REST APIData

|

| Decentralized applications (dapps) |
| ---------------------------------- |
| Preface                            |

Start by viewing the [smart contract wayfinding section](#smart-contract-developers)

|
| [Transaction simulation](/docs/learn/fundamentals/contract-development/contract-interactions/transaction-simulation) |

A process that allows developers to test the outcome of a transaction without actually executing it, helping to ensure accuracy and prevent errorsLearn

|
| [Dapp frontend](/docs/build/apps/dapp-frontend) |

Create a web app that interacts with the contracts via RPC callsGuide

|
| [Dapp how-to guides](/docs/build/guides/dapps) |

Explore the various guides relating to dapp developmentGuide

|
| [Stellar Wallets Kit](https://stellarwalletskit.dev/) |

A kit to handle all Stellar Wallets at once with a simple API and without caring about individual configurations for each one of themTool

|
| [Stellar JS SDK](https://stellar.github.io/js-stellar-sdk/) |

Communicate with a Horizon server and Soroban RPCData

|
| [RPC introduction](/docs/data/apis/rpc) |

Access network data using the RPCData

|

| Exchanges                                                                      |
| ------------------------------------------------------------------------------ |
| [List of operations](/docs/learn/fundamentals/transactions/list-of-operations) |

Learn how operations function on the Stellar network, notably `CreateAccount`, `Payment`, and `ChangeTrust`Learn

|
| [Trustlines](/docs/learn/fundamentals/stellar-data-structures/accounts#trustlines) |

Trustlines are unique to Stellar and are an explicit opt-in for an account to hold and trade a particular assetLearn

|
| [SDKs](/docs/tools/sdks) |

Used to connect to Horizon or RPC, as well as construct and parse transactionsTool

|
| [Run your own RPC](/docs/data/apis/rpc/admin-guide) |

Exchanges typically run their own RPC or Horizon to maintain greater control over data integrity, performance, and securityData

|
| [Run your own Horizon](/docs/data/apis/horizon/admin-guide) |

Exchanges typically run their own RPC or Horizon to maintain greater control over data integrity, performance, and securityData

|

##### Infrastructure providers[​](#infrastructure-providers "Direct link to Infrastructure providers")

| Horizon                                                                                          |
| ------------------------------------------------------------------------------------------------ |
| [Hardware requirements](/docs/data/apis/horizon/admin-guide/prerequisites#hardware-requirements) |

The recommended hardware requirements for users looking to set up a Horizon instanceLearn

|
| [Admin guide](/docs/data/apis/horizon/admin-guide) |

A comprehensive set of guides that will teach you how to administer a production Horizon instanceTutorial

|
| [API reference](/docs/data/apis/horizon/api-reference) |

Detailed documentation that provides information about the API endpoints, methods, parameters, and responsesGuide

|
| [SDK library](/docs/tools/sdks) |

Use the various SDKs to simplify the Horizon setup process by using pre-built tools and libraries that make it easier to configure, manage, and connect to the networkTool

|
| [Ecosystem providers](/docs/data/apis/api-providers) |

Create a PR in the docs to list your available Horizon service on this pageTool

|

| Stellar RPC                                                                    |
| ------------------------------------------------------------------------------ |
| [Hardware requirements](/docs/data/apis/rpc/admin-guide#hardware-requirements) |

The recommended hardware requirements for users looking to set up an RPC nodeLearn

|
| [Admin guide](/docs/data/apis/rpc/admin-guide) |

A comprehensive guide that will teach you how to administer a production RPC nodeTutorial

|
| [API reference](/docs/data/apis/rpc/api-reference) |

Detailed documentation that provides information about the API endpoints, methods, parameters, and responsesGuide

|
| [SDK library](/docs/tools/sdks) |

Use the various SDKs to simplify the RPC setup process by using pre-built tools and libraries that make it easier to configure, manage, and connect to the networkTool

|
| [Ecosystem providers](/docs/data/apis/api-providers) |

Create a PR in the docs to list your available RPC service on this pageTool

|

##### Analytics[​](#analytics "Direct link to Analytics")

| Hubble                                                                                     |
| ------------------------------------------------------------------------------------------ |
| [Connecting to Hubble](/docs/data/analytics/hubble/developer-guide/connecting-to-bigquery) |

Connect to Hubble using one of three methods: BigQuery UI, BigQuery SDK, or Looker StudioLearn

|
| [Data catalog](/docs/data/analytics/hubble/data-catalog) |

View all Hubble data catalog information.Learn

|
| [Developer guide](/docs/data/analytics/hubble/developer-guide) |

A comprehensive guide that will teach you how to extract and ingest Stellar Network Data and run your own Hubble analytics platformTutorial

|
| [Analyst guide](/docs/data/analytics/hubble/analyst-guide) |

A comprehensive guide that will teach you how to use Hubble for data analysisTutorial

|
| [End-to-end example](/docs/data/analytics/hubble/analyst-guide/creating-visualizations) |

A guide that will walk you through an end-to-end analysis use case with Hubble and Google Looker StudioExample

|
| [Analytics Providers](/docs/data/analytics/analytics-providers) |

A list of data analytics providers that use Hubble to provide a complete historical record of Pubnet data on the Stellar networkTool

|

---

_Extraído de [https://developers.stellar.org](https://developers.stellar.org)_

---

## Información del Documento

- **Archivos combinados:** 56
- **Generado:** 11/7/2025, 19:19:49
- **Herramienta:** Web Scraper to Markdown
- **Archivos fuente:**
  - `docs-build-apps-application-design-considerations.md`
  - `docs-build-apps-dapp-frontend.md`
  - `docs-build-apps-overview.md`
  - `docs-build-guides-cli.md`
  - `docs-build-guides-conventions.md`
  - `docs-build-guides-dapps.md`
  - `docs-build-guides-events.md`
  - `docs-build-guides-freighter.md`
  - `docs-build-guides-rpc.md`
  - `docs-build-guides-storage.md`
  - `docs-build-guides-testing.md`
  - `docs-build-smart-contracts-example-contracts-atomic-swap.md`
  - `docs-build-smart-contracts-example-contracts-auth.md`
  - `docs-build-smart-contracts-example-contracts-liquidity-pool.md`
  - `docs-build-smart-contracts-example-contracts-timelock.md`
  - `docs-build-smart-contracts-example-contracts-tokens.md`
  - `docs-build-smart-contracts-example-contracts.md`
  - `docs-build-smart-contracts-getting-started.md`
  - `docs-build-smart-contracts-overview.md`
  - `docs-data-analytics-hubble-analyst-guide.md`
  - `docs-data-analytics-hubble-data-catalog.md`
  - `docs-data-analytics-hubble-developer-guide.md`
  - `docs-data-analytics-hubble.md`
  - `docs-data-apis-api-providers.md`
  - `docs-data-apis-horizon-admin-guide.md`
  - `docs-data-apis-horizon-api-reference.md`
  - `docs-data-apis-horizon.md`
  - `docs-data-apis-rpc-admin-guide.md`
  - `docs-data-apis-rpc-api-reference.md`
  - `docs-data-apis-rpc.md`
  - `docs-data-indexers-build-your-own.md`
  - `docs-learn-fundamentals-anchors.md`
  - `docs-learn-fundamentals-fees-resource-limits-metering.md`
  - `docs-learn-fundamentals-lumens.md`
  - `docs-learn-fundamentals-networks.md`
  - `docs-learn-fundamentals-stellar-consensus-protocol.md`
  - `docs-learn-fundamentals-stellar-data-structures.md`
  - `docs-learn-fundamentals-stellar-ecosystem-proposals.md`
  - `docs-learn-fundamentals-stellar-stack.md`
  - `docs-learn-fundamentals-transactions.md`
  - `docs-learn-migrate.md`
  - `docs-networks-resource-limits-fees.md`
  - `docs-networks-software-versions.md`
  - `docs-tokens-control-asset-access.md`
  - `docs-tokens-quickstart.md`
  - `docs-tokens-stellar-asset-contract.md`
  - `docs-tokens-token-interface.md`
  - `docs-tools-developer-tools.md`
  - `docs-tools-infra-tools-cross-chain.md`
  - `docs-tools-lab.md`
  - `docs-tools-quickstart.md`
  - `docs-tools-ramps-moneygram.md`
  - `docs-tools-sdks.md`
  - `docs-validators-admin-guide.md`
  - `docs-validators-tier-1-orgs.md`
  - `index.md`
