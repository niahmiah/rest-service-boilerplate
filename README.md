[![Build Status](https://img.shields.io/travis/niahmiah/rest-service-boilerplate.svg?branch=master&style=flat-square)](https://travis-ci.org/niahmiah/rest-service-boilerplate)
[![Coverage Status](https://img.shields.io/coveralls/niahmiah/rest-service-boilerplate.svg?style=flat-square)](https://coveralls.io/r/niahmiah/rest-service-boilerplate)


# REST Service Boilerplate

A boilerplate project for scalable REST Services using Node.js, Express, Mongoose, PM2, and Swagger

## Inspiration

There is usually a lot of redundancy in creating a new RESTful API. You create express routes, and you develop schemas. You come up with a way to validate requests and data going to the database. You then have to document all of this, and that documentation can easily become out-of-sync with the actual implementation. This project seeks to correct all of that duplication of effort by using a Swagger document as the "source of truth". The end result is that an API can be developed with a minimal amount of code or effort.

## Features

- Quickly implement your RESTful service. Just modify the swagger.json document, adjust the models and controllers as needed, and start the service.
- Generates express routes using swaggerRouter middleware from [swagger-tools](https://github.com/apigee-127/swagger-tools)
- Validation of requests and responses using swaggerValidator middleware from [swagger-tools](https://github.com/apigee-127/swagger-tools)
- Generates Mongoose schemas from Swagger document using [swagger2mongoose](https://github.com/niahmiah/swagger2mongoose)
- Uses [PM2] (https://github.com/Unitech/pm2) for process management. Scales the service to multiple CPUs. Allows zero downtime reloads.
- Uses [Winston] (https://github.com/winstonjs/winston) logger
- Uses [config] (https://github.com/lorenwest/node-config) for easy multi-environment configuration


## API Documentation and Test Utility

Start the service, and connect to [http://localhost:3000/docs](http://localhost:3000/docs) to open Swagger UI.
Using Swagger UI, you can:
- View the generated REST API documentation, including request and response schemas
- Test your API and see responses

## Mapping requests to controllers

In the "paths" section of your swagger.json, use the following format to declare the controller and function to use for each request.

```
 "x-swagger-router-controller": "person", // this is the controller filename
 "operationId": "GET", // this is the function that the controller exports
```

See the included swagger.json for a complete example.

##### Controller Files

server.js initializes the swaggerRouter middleware with controllers directory set as:
```
{controllers: './api/controllers'}
```

See [swagger-tools Middleware] (https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md) docs for more info.

## Useful Commands

```
# install modules
npm install

# run tests (mocha, eslint, istanbul)
npm test
npm run lint
npm run coverage

# manage process (these issue common pm2 commands)
npm start
npm stop
npm run reload
npm run status
```
