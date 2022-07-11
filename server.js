import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT;
const URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch((err) => console.error(err));
async function main() {
  mongoose.connect(URI);
  console.log("connection réussi");
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});