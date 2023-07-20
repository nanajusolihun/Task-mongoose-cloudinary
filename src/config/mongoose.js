import mongoose from "mongoose";
import { DB_URL } from "./env.js";

// Connect to Database
try {
  mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to DB Success");
} catch (error) {
  handleError(error);
}

process.on("unhandledRejection", (error) => {
  console.log("unhandleRejection", error.message);
});

export default mongoose;
