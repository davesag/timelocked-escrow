# staked-identity-owner

Smart contracts that allow an `Identity Owner` to stake `KEY` in a `Timelocked Escrow` so that a `Service Provider` will offer them a priority service

## About

### Definitions

* `SKF` — The SelfKey Foundation.
* `KEY` — an ERC20 token managed by the SelfKey Foundation.
* `Identity Owner` — a party wishing to obtain services from a `Service Provider`, within a defined `marketplace`.
* `Service Provider` – a party that provides services to an `Identity Owner` as part of an overall `marketplace`.
* `marketplace` – a collection of whitelisted `Service Providers` with an associated `Timelocked Escrow`.
* `Timelocked Escrow` – a vault that holds `KEY` for an `Identity Owner` for a defined time period, and which holds a whitelist of `Service Providers` to whom the `Identity Owner` can transfer `KEY`.

An `Identity Owner` that holds an amount of `KEY` wanting to obtain services from a participating `Service Provider` within a defined marketplace is required to deposit `KEY` in a `Timelocked Escrow` that has whitelisted that `Service Provider`.

### Interactions

See the attached [`Staked Owner Flow`](staked_owner_flow.pdf) PDF file.

## Development

The smart contracts are being implemented in Solidity `0.4.18`.

### Prerequisites

* [NodeJS](htps://nodejs.org), version 9.2+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [truffle](http://truffleframework.com/), which is a comprehensive framework for Ethereum development. `npm install -g truffle` — this should install Truffle v4+.  Check that with `truffle version`.
* [Access to the KYC_Chain Jira](https://kyc-chain.atlassian.net)

### Initialisation

        npm install

### Compiling

#### From within Truffle

Run the `truffle` development environment

    truffle develop

then from the prompt you can run

    compile
    migrate
    test

as well as othet truffle commands. See [truffleframework.com](http://truffleframework.com) for more.

#### Standalone

In one terminal run

    npm run testrpc

Then in another run

    npm test

### Linting

We provide the following linting options

* `npm run lint-sol` — to lint the solditiy files, and
* `npm run lint-js` — to lint the javascript.

## Contributing

Contributions are welcomed.  Please see [the contributing notes](CONTRIBUTING.md)
