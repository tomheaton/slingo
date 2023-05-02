import mongoose from "mongoose";

const Schema = mongoose.Schema;

const signSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  // Possibly add image path here
});

mongoose.model("sign", signSchema);

const courseSchema = new Schema({
  title: { type: String, required: true, unique: true },
  signs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sign",
    },
  ],
});

export default mongoose.model("course", courseSchema);
