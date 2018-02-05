# web-api-seed

A template to build a web API

## Local Dev Installation

Install [Docker](https://docs.docker.com/install/)

* UPDATE README
* UPDATE DEV SCRIPT
* IMPORT SQL DATA
* SAVE STATE OF DOCKERIZED DB - mount volume

### Environment Variables

You'll need to setup your `.env` file in your project root with the following variables.

```
# session
SESSION_SECRET=<Session Secret>

# email
MAILGUN_API_KEY=<Mailgun API Key>
MAILGUN_DOMAIN=<MSSQL Domain>

# database
MSSQL_HOST=<MSSQL Host>
MSSQL_PORT=<MSSQL Port>
MSSQL_USERNAME=<MSSQL Username>
MSSQL_PASSWORD=<MSSQL Password>
MSSQL_DATABASE=<MSSQL Database>

# azure storage (table / blob / queue)
AZURE_STORAGE_ACCOUNT=devstoreaccount1
AZURE_STORAGE_ACCESS_KEY=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==
AZURE_STORAGE_QUEUE_HOST=http://localhost:10001/devstoreaccount1
```

## Scripts

First off of course you'll have to run `npm install`.

Start developing using `npm run dev`.

This will listen to updates in the code and rebuilds it automatically.

To run the solution in production mode run `npm start`.

This will build the solution optimally with minification and bundling.