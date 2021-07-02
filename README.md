[![Build Status](https://travis-ci.com/dushimeemma/sungazer-challenge-backend.svg?branch=develop)](https://travis-ci.com/dushimeemma/sungazer-challenge-backend) [![Coverage Status](https://coveralls.io/repos/github/dushimeemma/sungazer-challenge-backend/badge.svg?branch=develop)](https://coveralls.io/github/dushimeemma/sungazer-challenge-backend?branch=develop)

# TRANSACTIONS APIs | SUNGAZER CHALLENGE

## Setup and Installation

- clone the repo `git clone https://github.com/dushimeemma/sungazer-challenge-backend.git`

- install dependencies `yarn install`

- run the application `yarn start`

- run tests `yarn test`

## Setup Dotenv

- create .env file in project root directory
- copy keys in .env.example file, which is in the project root directory and assign values to those keys.
- you can add more environmenta variables to the .env file
- to use declared variables, require dotenv at the top of your file `import dotenv from 'dotenv'` and call its method config `dotenv.config()`
- access environment variable value by using `process.env.KEY_NAME` where `KEY_NAME` is the variable name.

Note: If you make changes that uses environmental variables make sure to add those variables with example values in the .env.example file.

## Sequelize and Sequelize-cli

- install cli `yarn install`
- run migration `sequelize db:migrate`

## Endpoints

### Signup Model

```
{
    "name":"Sample Name",
    "username":"sample_username",
    "email":"sample@email.com",
    "password":"String@Number"
}
```

### Login Model

```
{
    "email":"sample@email.com",
    "password":"String@Number"
}
```

### Transaction Model

```
{
    "description":"weekend withdraw",
    "amount": 82
}
```
