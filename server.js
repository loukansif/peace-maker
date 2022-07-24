import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routerUser from "./routes/user.js";
import routerHaiku from "./routes/haiku.js";

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT;
const URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", routerUser)
app.use("/haikus", routerHaiku)

routerHaiku.get('/', async (req, res) => {
  let haikus = 'hello'
  res.json(haikus);
})


main().catch((err) => console.error(err));
async function main() {
  mongoose.connect(URI);
  console.log("connection réussi");
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});