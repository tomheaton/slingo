import mongoose from "mongoose";

export default function db() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    // @ts-ignore
    mongoose.connect(process.env.ATLAS_URI ?? "", connectionParams);
    console.log("Connected to a database successfully!");
  } catch (error) {
    console.log("Could not connect to database!");
    console.log(error);
  }
}
