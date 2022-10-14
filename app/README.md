---
title: 'Readme.md file - Events App'
metaTitle: 'Readme.md file - Events App'
metaDesc: 'Structure, install, setup'
image: images/default/default-readme.png
tags:
  - nextjs
---

# Events App - Readme.md

This application displays events, and anyone can add events.

Timezone can be changed, and events datetimes will reflect the timezone selected.

No authentication implemented.

**Note**: i give the user the possibility to add image url for an event. The only accepted domain is [https://images.unsplash.com](https://images.unsplash.com).
So, choose a picture from [https://www.unsplash.com](https://www.unsplash.com), copy the picture link, and use it in field **image** when creating an event.

## Deployed application

The app is currently deployed at: [https://events-app-blue-seven.vercel.app/](https://events-app-blue-seven.vercel.app/)

Sadly, Vercel file system [is not writable](https://www.github.com/orgs/vercel/discussions/239). That's why on this deployment, you'll get an error trying to create an event. up to the moment I will set an external database to store events.

## Warnings

package.json contains scripts adapted for windows.

Example: "start" script contains 'set'.

## Rules & Assertions

- event properties:
  - name (32char.max)
  - description
  - startAt: ISO datetime string
  - endAt: ISO datetime string
- Events are considered virtual, that's why I don't care with the geolocation.

## Install & setup

### Environment

The db paths must be set in .env file:

- .env.development: `DB_PATH="./db"`
- .env.test: `DB_PATH="./\_\_tests\_\_/\_\_mocks\_\_/db"`

### Scripts

```bash
cd ./app/
npm install
npm run dev
```

The app will start on port 3000.

## Tests

The db paths must be set in .env.test file:
`DB_PATH="./\_\_tests\_\_/\_\_mocks\_\_/db"`

Here is how to run tests suites with Jest (unit & integration tests) & Cypress (e2e).

### Jest

```bash
npm run test
```

### Cypress

**Headless**

To run Cypress tests headless

```bash
npm run cypress:run
```

Videos will be recorded in: `./cypress/e2e/videos`

Screenshots in: `./cypress/e2e/screenshots`.

**With Cypress application**

```bash
npm run cypress:build
```

This will start Cypress app,

## Techs & Structure

### Techs

Next.js (front & back)

### Database

So that anyone can easily execute this application without having to setup a database, i won't use a real database, as MongoDB.

Instead, data will be stored in json files.

Of course, this structure is not intended to be efficient: concurrency will probably be the first problem met in multi-users context.

I didn't implement the json db implementation: I used and adapted the one that can be found here: [https://github.com/bonnie/udemy-NEXTJS-TESTING](https://github.com/bonnie/udemy-NEXTJS-TESTING)

The db paths must be set in .env files:

- .env: `DB_PATH="./db"`
- .env.test: `DB_PATH="./\_\_tests\_\_/\_\_mocks\_\_/db"`
