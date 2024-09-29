import express from "express";
import bodyParser from "body-parser";
import { NucleusClient } from "@/utils/client.js";

const app = express();
app.use(bodyParser.json());

export default async (client: NucleusClient) => {
    app.get("/", (_req, res) => {
        res.send(`${client.user!.username} is online!`);
    });

    app.listen(client.config.port, () => {});
};
