# staked-identity-owner

Smart contracts that allow an `Identity Owner` to stake `KEY` in a `Timelocked Escrow` so that a `Service Provider` will offer them a priority service

## About

_to be filled getting_started

_add a nice diagram_

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
