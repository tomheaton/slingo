import { sendEmail } from "@/lib/email";
import Token from "@/models/token";
import User from "@/models/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const emailSchema = joi.object({
      email: joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(409).send({ message: "User with given email does not exist!" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const url = `${process.env.BASE_URL}password-reset/${user.id}/${token.token}/`;
    await sendEmail(user.email, "Password reset", url);

    res.status(200).send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    res.status(200).send({ message: "Valid link" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// set new password
router.post("/:id/:token", async (req, res) => {
  try {
    const passwordSchema = joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      res.status(400).send({ message: "Invalid link" });
    }

    if (!user.verified) {
      user.verified = true;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token?.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
