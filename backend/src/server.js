import express from "express";;
import routes from "./routes/index.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT= process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
    console.log("Server started on ", PORT);
    console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
});

//ogarnac modele/kontrollery
//teraz robie category