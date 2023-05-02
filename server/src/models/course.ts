import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
