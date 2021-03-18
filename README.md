# dhis2-covac-cert

> **WARNING**: DO NOT USE THIS IN PRODUCTION YET!

This is a proof-of-concept COVID vaccination certificate integration module - it listens for HTTP requests, generates a DIVOC vaccination certificate, downloads the certificate PDF and posts it back to the DHIS2 system as a certification program stage event.

See the [POC Spec Document](https://docs.google.com/document/d/1l6Nq26mLKtlebFprmYJThq4R1JYTw6q7PPoFAbODV9E/edit#) for more info (DHIS2 Internal)

[**demo video**](https://www.dropbox.com/s/r7tclpwds4424ar/Screen%20Recording%202021-03-16%20at%2023.00.45.mov?dl=0) 

## API

Currently, only two API endpoints are supported:

|API Endpoint|Method|Parameters (POST body)|Description|Synchronous|
|-|-|-|-|-|
|/certificate/generate|POST|{ id }|Generates a certificate for the given TEI and stores it in DHIS2 as a program stage event||
|/certificate/generateSync|POST|{ id }|Generates a certificate for the given TEI and stores it in DHIS2 as a program stage event|YES|
---

## Usage

Requires `node` and `yarn` (for development)

```sh
yarn install

# for development
yarn start

# for production
yarn build
yarn serve # this will run `nodemon dist/index.js`
```

## UI

A very simple HTML form will be available on port 9090 (or `PORT` if specified in the environment) - it accepts a Tracked Entity Instance ID and will trigger certificate generation

## Configuration

The following environment variables are supported (authentication variables are required)

- `PORT`
- `DHIS2_BASE_URL`
- `DHIS2_API_VERSION`
- `DHIS2_USERNAME` (required)
- `DHIS2_PASSWORD` (required)
- `DHIS2_VACCINATION_PROGRAM`
- `DHIS2_VACCINATION_PROGRAM_STAGE`
- `DHIS2_ROOT_ORG_UNIT`
- `DHIS2_CERTIFICATE_DATA_ELEMENT`
- `DIVOC_BASE_URL`
- `DIVOC_TOKEN` (required)

## TODO

- [ ] Remove dummy data from certificate request - populate with vaccination data from active program
- [ ] Support bulk generation for all uncertified vaccination events on a recurring schedule
- [ ] Accept HTTP or SMTP triggers from DHIS2 program notification
- [ ] Implement Tracker Capture widget to trigger certificate generation
- [ ] Use persistent queue for asynchronous certificate generation backlog with downtime resilience
- [ ] Support connection to additional certificate generation services
- [ ] (maybe) Generalize as a standard "integration service" template that can be used for various integration tasks
