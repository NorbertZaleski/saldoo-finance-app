import express from "express";
import routes from "./routes/index.js"

const app = express();

app.use("/api/", routes);

app.listen(5001, () => {
    console.log("Server started");
});

//ogarnac mangodb 44:45 film