import Token from "@/models/token";
import User from "@/models/user";
import sendEmail from "@/utils/sendEmail";
import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
import Joi from "joi";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });

      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}/`;
      await sendEmail(user.email, "Verify email", url);

      return res.status(400).send({ message: "An email was sent to verify your account" });
    }

    // @ts-ignore
    const token = user.generateAuthToken();
    res
      .status(200)
      .send({ token: token, name: user.name, userId: user.id, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export default router;
