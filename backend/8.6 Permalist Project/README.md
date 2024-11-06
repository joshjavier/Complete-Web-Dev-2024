# Permalist Project

A todo list app built with Node, Express, and PostgreSQL.

<!-- ## Table of Contents

- [About](#about)
- [Getting Started](#getting_started) -->

## About

This project is one of the exercises in Section 33: PostgreSQL of [The Complete 2024 Web Development Bootcamp](https://betmgm.udemy.com/course/the-complete-web-development-bootcamp/) by Dr. Angela Yu on Udemy.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- pgAdmin 4 (optional)

### Installing

Make sure the PostgreSQL server is running and there's a database named `permalist` which will be used by this app.

```sh
npm install
npx nodemon index.js
```

I used an ORM library called Sequelize to make interacting with the database more intuitive. To insert the seed data, run this:

```sh
npm run seed:up
```
