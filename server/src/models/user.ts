import joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const validate = (data: any) => {
  const schema = joi.object({
    name: joi.string().required().label("Name"),
    email: joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(data);
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY ?? "", {
    expiresIn: "7d",
  });

  return token;
};

export default mongoose.model("user", userSchema);
