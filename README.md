# Timelocked Escrow

[![Greenkeeper badge](https://badges.greenkeeper.io/SelfKeyFoundation/timelocked-escrow.svg)](https://greenkeeper.io/)

An Ethereum contract that allows an `Identity Owner` to stake `KEY` in a `Timelocked Escrow` so that a `Service Provider` will offer them a priority service.

* `develop` — [![Build Status](https://www.travis-ci.org/SelfKeyFoundation/timelocked-escrow.svg?branch=develop)](https://www.travis-ci.org/SelfKeyFoundation/timelocked-escrow) [![codecov](https://codecov.io/gh/SelfKeyFoundation/timelocked-escrow/branch/develop/graph/badge.svg)](https://codecov.io/gh/SelfKeyFoundation/timelocked-escrow)
* `master` — [![Build Status](https://www.travis-ci.org/SelfKeyFoundation/timelocked-escrow.svg?branch=master)](https://www.travis-ci.org/SelfKeyFoundation/timelocked-escrow) [![codecov](https://codecov.io/gh/SelfKeyFoundation/timelocked-escrow/branch/master/graph/badge.svg)](https://codecov.io/gh/SelfKeyFoundation/timelocked-escrow)

## About

### Definitions

* `SKF` — The SelfKey Foundation.
* `KEY` — an ERC20 token managed by the SelfKey Foundation.
* `Identity Owner` — a party wishing to obtain services from a `Service Provider`, within a defined `marketplace`.
* `Service Provider` – a party that provides services to an `Identity Owner` as part of an overall `marketplace`.
* `marketplace` – a collection of whitelisted `Service Providers` with an associated `Timelocked Escrow`.
* `Marketplace Manager` – a contract that can create new `Timelocked Escrow` contracts for `SKF`.
* `Timelocked Escrow` – a vault that holds `KEY` for an `Identity Owner` for a defined time period, and which holds a whitelist of `Service Providers` to whom the `Identity Owner` can transfer `KEY`.

An `Identity Owner` that holds an amount of `KEY` wanting to obtain services from a participating `Service Provider` within a defined marketplace is required to deposit `KEY` in a `Timelocked Escrow` that has whitelisted that `Service Provider`.

### Interactions

See the attached [`Timelocked Escrow Flow`](timelocked_escrow-flow.pdf) PDF file.

## Development

The smart contracts are being implemented in Solidity `0.4.18`.

### Prerequisites

* [NodeJS](htps://nodejs.org), version 9.5+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [truffle](http://truffleframework.com/), which is a comprehensive framework for Ethereum development. `npm install -g truffle` — this should install Truffle v4+.  Check that with `truffle version`.
* [Access to the KYC_Chain Jira](https://kyc-chain.atlassian.net)

### Initialisation

    npm install

### Testing

#### Standalone

    npm test

or with code coverage

    npm run test:cov

#### From within Truffle

Run the `truffle` development environment

    truffle develop

then from the prompt you can run

    compile
    migrate
    test

as well as other Truffle commands. See [truffleframework.com](http://truffleframework.com) for more.

### Linting

We provide the following linting options

* `npm run lint:sol` — to lint the Solidity files, and
* `npm run lint:js` — to lint the Javascript.

## Contributing

Please see [the contributing notes](CONTRIBUTING.md).
