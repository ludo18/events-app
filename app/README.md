# Events App

This application displays events, and let authenticated users add events.

## Rules

- event properties:
  - name (32char.max)
  - description
  - startAt: ISO datetime string
  - endAt: ISO datetime string

## Assertions

- Events are considered virtual, that's why I don't care with the geolocation.

## Structure

### Database

So that anyone can easily execute this application without having to setup a database, i won't use a real database, as MongoDB.

Instead, data will be stored in json files.

Of course, this structure is not intended to be efficient: concurrency will probably be the first problem met in multi-users context.

I didn't implement the json db implementation: I used and adapted the one that can be found here: https://github.com/bonnie/udemy-NEXTJS-TESTING

The db paths must be set in .env files:

- .env: DB_PATH="./db"
- .env.test: DB_PATH="./\_\_tests\_\_/\_\_mocks\_\_/db"
