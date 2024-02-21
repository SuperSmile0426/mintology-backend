import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import { json as bodyParserJSON } from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import fileUpload from "express-fileupload";

import { ROUTE_VERSION } from "config";

import swaggerDocument from "../../swagger.json";

import { MESSAGES } from "../constants";

import { errorHandlerMiddleware, requestLoggerMiddleware } from "middlewares";

import appRoutes from "routes";

const port = process.env.PORT || 3001;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  app.use(requestLoggerMiddleware);

  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 50000000, // 50 MB
      },
      abortOnLimit: true,
    })
  );

  // Health check
  app.use("/healthCheck", function (req, res) {
    res.send("OK");
  });

  app.use(`/api/${ROUTE_VERSION}`, appRoutes);

  app.use(errorHandlerMiddleware);

  // Define Swagger options
  const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
      info: {
        title: "Mintology Backend API",
        version: "1.0.0",
        description: "",
      },
    },
    apis: ["./routes/*.router.ts"],
  };
  // Initialize swagger-jsdoc
  const specs = swaggerJsdoc(options);

  // Serve Swagger documentation using swagger-ui-express
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.listen(port, () => {
    console.info(MESSAGES.SERVER_RUN_SUCCESS);
  });
};

export default backendSetup;
