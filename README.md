# Water Back Office

> Example app representing back office functionality for Water Abstraction internal users.

Demo internal facing app intended to show how a service's core functionality can be shared between two separate apps, one for internal users and one for external users.

The shared functionality is contained in the [water-engine](https://github.com/Cruikshanks/water-engine), and the external facing app is [water-front-office](https://github.com/Cruikshanks/water-front-office).

## The spike

This is a spike to look at how to build two web apps that share a common core of functionality.

On government digital services there is often a need for the same external facing logic to be available to internal users.

Typically, services will build a single app, and incorporate checks at both the route and UI level to determine what functionality should and shouldn't be shown to the user. In our experience, this adds complexity to the codebase, and makes it harder to maintain.

Our preference is to have two separate apps, one for internal users and one for external users, that share a common core of functionality. This allows us to keep the codebase simple and maintainable, while still providing the same functionality to both sets of users.

It is inspired by the concept of 'engines' in Ruby on Rails, which allows you to build a self-contained piece of functionality that can be 'mounted' by multiple applications.

Node doesn't have a concept of engines, but we can achieve the same effect by building a core package that can be referenced by the apps when deployed, but accessed directly when developing using [npm link](https://docs.npmjs.com/cli/v9/commands/npm-link)

## Prerequisites

Make sure you already have:

- [Node.js v24.\*](https://nodejs.org/en/)

## Setup

Clone the repo.

```shell
mkdir water-back-office
cd water-back-office
git clone https://github.com/Cruikshanks/water-back-office.git
```

Install it.

```shell
cd water-back-office
npm ci
```

Create a symbolic link from the local `node_modules` to the global `node_modules` directory.

```shell
npm link water-engine
```

## Running

To start the app.

```bash
npm start
```

Make a request to the one endpoint that demonstrates use of a service from the shared engine package.

```bash
curl http://localhost:3002/licence/1234
```

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
