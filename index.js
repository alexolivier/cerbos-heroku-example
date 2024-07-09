const Cerbos = require("@cerbos/grpc");
const express = require("express");
const path = require("path");

const cerbosClient = new Cerbos.GRPC("localhost:3593", { tls: false });

const PORT = process.env.PORT || 5001;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/cerbos", async (req, res) => {
    const result = await cerbosClient.serverInfo();
    res.json(result);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
