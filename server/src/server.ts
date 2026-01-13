import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from './routes/taskRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
