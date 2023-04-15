# Inventory Service Express Typescript
## Requirements
NODE >= 18\
Docker\


## Installation and Starting Development Project
``` docker compose up --build ```

## Endpoint Documentation
You can access to all endpoints documentation in http://localhost:{port}/api-docs

## Changing to Production Project
First of all you need to create the build.
``` npm run build ```
Automatically a build folder is created and all the ts files are compiled to js.\
You have to go to docker-compose and search the command field.\
Change the command from
``` npm run dev ```
to
``` npm start ```

## Testing Files
I create some tests to validate the good functionality of the endpoints.
``` npm run test ```
