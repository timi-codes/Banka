![Banka Logo](https://raw.githubusercontent.com/timi-codes/Banka/develop/UI/img/banka-blue-logo.png)

# Banka  &middot; [![Build Status](https://travis-ci.org/timi-codes/Banka.svg?branch=develop)](https://travis-ci.org/timi-codes/Banka)  [![Coverage Status](https://coveralls.io/repos/github/timi-codes/Banka/badge.svg?branch=develop)](https://coveralls.io/github/timi-codes/Banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/61903ede845dba17166a/maintainability)](https://codeclimate.com/github/timi-codes/Banka/maintainability)

> Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.

---
## Getting Started

[Project Links](#links) 

[Technologies](#technologies)

[Tools](#tools)

[Installations](#installations)

[Acknowledgment](#acknowledgments)

[Author](#author)


---
 
## Links

UI Template for the application can be found here [Github pages](https://timi-codes.github.io/Banka/UI/index.html).

Pivotal Tracker Stories can found here [Pivotal tracker](https://www.pivotaltracker.com/n/projects/2321237).

Application was deployed to Heroku. Use public URL [https://banka-timi.herokuapp.com](https://banka-timi.herokuapp.com) with API endpoints.

API Documenttion was generated with [swagger](https://banka-timi.herokuapp.com/api-docs).

---

## Technologies

[node]: (https://nodejs.org)

- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

---

## Tools
- [Postman](https://www.getpostman.com/) is the only complete API development environment, and flexibly integrates with the software development cycle.
- Testing
  - [Mocha](https://mochajs.org/) A javascript testing framework.
  - [Chai](https://chaijs.com) A test assertion library for Javascript.
- [Swagger](https://swagger.io/) is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services
- [Pivotal Tracker](https://www.pivotaltracker.com) is the agile project management tool of choice for developers around the world for real-time collaboration around a shared, prioritized backlog.
- [Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Travis CI](https://travis-ci.org/) is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.
- [Coveralls](https://codeclimate.com/) consolidates the results from a suite of static analysis tools into a single, real-time report, giving your team the information it needs to identify hotspots, evaluate new approaches, and improve code quality(from crunch base).

---

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/timi-codes/Banka.git`

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm start
  ```
- Use `http://localhost:7778` as base url for endpoints

#### Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                 | REQUEST BODY
| ------ | --------------------------------------- | ------------------------- | ---------------
| POST   | Sign up for an account                  | `/api/v1/auth/signup`     | [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Users/post_api_v1_auth_signup)
| POST   | Sign in to an account                   | `/api/v1/auth/signin`     | [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Users/post_api_v1_auth_signin)
| POST   | Create a bank account                   | `/api/v1/accounts`        | [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Accounts/post_api_v1_accounts)
| GET    | Staff's can Get all accounts            | `/api/v1/accounts`        | [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Accounts/get_api_v1_accounts)
| GET    | Get a specific account                  | `/api/v1/accounts/:accountNumber`| 
| PATCH | Activate or deactive an account          | `/api/v1/accounts/:accountNumber`| [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Accounts/patch_api_v1_accounts__accountNumber_)
| DELETE   | Delete an account                     | `/api/v1/accounts/:accountNumber`|
| POST     | Perform a debit transaction           | `/api/v1/transactions/{accountNumber}/debit`| [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Transactions/post_api_v1_transactions__accountNumber__debit)
| POST     | Perform a credit transaction           | `/api/v1/transactions/{accountNumber}/credit`| [Request Body](https://banka-timi.herokuapp.com/api-docs/#/Transactions/post_api_v1_transactions__accountNumber__credit)

#### Running Unit Test
- Run test for all endpoints
  > run the command below
  ```shell
  $ npm test
  ```

## Acknowledgments

- [Andela](https://andela.com/)

## Author

- [Timi David Tejumola](https://twitter.com/timicodes)
