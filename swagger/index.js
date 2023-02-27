const express = require('express');
const cookieParser = require('cookie-parser');  
const exp = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

exp.use(express.json());
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./swagger/routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  exp.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

  module.exports = exp;