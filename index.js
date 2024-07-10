const Cerbos = require("@cerbos/grpc");
const express = require("express");
const path = require("path");

const cerbosClient = new Cerbos.GRPC("localhost:3593", { tls: false });

const PORT = process.env.PORT || 5001;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", async (req, res) => {
    const result = await cerbosClient.checkResource({
      requestId: "5652d164-54ae-4396-bcf8-403367402442",
      resource: {
        kind: "expense",
        id: "expense1",
        attr: {
          amount: 500,
          approvedBy: null,
          createdAt: "2024-04-17T10:03:02.011Z",
          ownerId: "sally",
          region: "EMEA",
          status: "OPEN",
          vendor: "Flux Water Gear",
        },
      },
      principal: {
        id: "derek",
        roles: ["USER", "MANAGER"],
        attr: {
          department: "FINANCE",
          region: "EMEA",
        },
      },
      actions: ["view", "view:approver"],
    });
    res.json(result);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
