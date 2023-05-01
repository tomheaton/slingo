import express from "express";
import { Course } from "../models/course";

const router = express.Router();

router.get("/:title", async (req, res) => {
  try {
    const course = await Course.findOne({
      title: new RegExp(`^${req.params.title}$`, "i"),
    }).populate("signs");

    if (!course) {
      res.status(404).send({ message: "Requested course not found" });
    }

    res.status(200).send({
      course: course,
      message: "Requested course found and populated with signs",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
