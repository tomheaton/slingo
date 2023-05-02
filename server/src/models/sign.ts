import mongoose from "mongoose";
const Schema = mongoose.Schema;

const signSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  // Possibly add image path here
});

export default mongoose.model("sign", signSchema);
