import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { MessageBroker } from "./utils/broker";
import { Consumer, Producer } from "kafkajs";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);
  // first step: connect to producer and consumer
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console
  })

  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("consumer connected");
  })

  //2nd step: subscribe to the topic or publish the message
  await MessageBroker.subscribe(async (message) => {
    console.log("message received", message);
  }, "OrderEvents");
  app.use(cartRoutes);
  app.use(orderRoutes);

  app.use("/", (req: Request, res: Response, _: NextFunction) => {
    return res.status(200).json({ message: "I am healthy!" });
  });

  app.use(HandleErrorWithLogger);
  return app;
}

