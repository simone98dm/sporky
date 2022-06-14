# spork-vue

Spork is a web app which helps you understand which are your top traks from your Spotify library.

Spork uses spotify public APIs to retrieve those information from your account, so in order to proceed you maight need to authorize Spork to get access to your spotify account (don't worry, just top tracks info).

[![Netlify Status](https://api.netlify.com/api/v1/badges/66dd0072-4348-435e-b4f8-7d5a3f685cd6/deploy-status)](https://app.netlify.com/sites/spork-vue/deploys)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)

```sh
npm run test:unit # or `npm run test:unit:ci` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```
