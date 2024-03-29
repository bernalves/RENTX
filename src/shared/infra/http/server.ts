import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import "../../container";
import "../typeorm";
import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";
import "express-async-errors";

const app = express();

app.use(express.json());

app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is Running on PORT 3333"));
