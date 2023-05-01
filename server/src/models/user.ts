import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY ?? "", {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export { User, validate };
