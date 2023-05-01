import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";

// Import drawing utility here
import { drawRectQuizFamily } from "./utilities";

import QuizCSS from "../css/quiz.module.css";

export default function Quiz() {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [translatedSign, setTranslatedSign] = useState("");

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (translatedSign === questions[index].answers) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
      setIndex(index + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  }, [translatedSign]);

  // Main function
  const runCoco = async () => {
    // Loading the graph model
    const net = await tf.loadGraphModel(
      "https://raw.githubusercontent.com/dp846/SlingoModels/main/family_v1/model.json",
    );

    // Detect every 16.7 ms
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const questions = [
    {
      questionText: "Sign: Step",
      answers: "step",
    },
    {
      questionText: "Sign: Father",
      answers: "father",
    },
    {
      questionText: "Sign: Mother",
      answers: "mother",
    },
    {
      questionText: "Sign: Brother",
      answers: "brother",
    },
    {
      questionText: "Sign: Your",
      answers: "your",
    },
    {
      questionText: "Sign: Baby",
      answers: "baby",
    },
    {
      questionText: "Sign: Sister",
      answers: "sister",
    },
    {
      questionText: "Sign: Son",
      answers: "son",
    },
  ];

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const boxes = await obj[3].array();
      const classes = await obj[7].array();
      const scores = await obj[4].array();

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // Update drawing utility
      requestAnimationFrame(() => {
        drawRectQuizFamily(
          boxes[0],
          classes[0],
          scores[0],
          0.65,
          videoWidth,
          videoHeight,
          ctx,
          setTranslatedSign,
          setIsAnswerCorrect,
          questions[index].answers,
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  if (index !== questions.length) {
    return (
      <div className={QuizCSS.container}>
        <Navbar />
        <div className={QuizCSS["course-details"]}>
          <p className={QuizCSS["course-heading"]}>Family - test</p>
          <p className={QuizCSS["question-count"]}>
            Question {index + 1} of {questions.length}
          </p>
        </div>
        <div className={QuizCSS["header-container"]}>
          <div className={QuizCSS["question-section"]}>
            <div className={QuizCSS["question-text"]}>
              <p>{questions[index].questionText}</p>
            </div>
          </div>
          <div className={QuizCSS["answer-section"]}></div>
        </div>
        <div className={QuizCSS["camera-view"]}>
          <div className={QuizCSS.webcam}>
            <Webcam ref={webcamRef} muted={true} />

            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 8,
                width: 640,
                height: 480,
              }}
            />
          </div>
          <button className={QuizCSS["skip-button"]} onClick={() => setIndex(index + 1)}>
            Skip →
          </button>
        </div>
        <div className={QuizCSS["leave-section"]}>
          <button onClick={() => navigate("/learn")} className={QuizCSS["leave-button"]}>
            Leave session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={QuizCSS.container}>
      <Navbar />
      <div className={QuizCSS["course-details"]}>
        <p className={QuizCSS["course-heading"]}>Family - test</p>
        <p className={QuizCSS["question-count"]}>You have completed the test</p>
      </div>
      <div className={QuizCSS["header-container"]}>
        <div className={QuizCSS["results-section"]}>
          <div className={QuizCSS["score"]}>
            <p>
              You got {score} / {questions.length} correct.
            </p>
          </div>
        </div>
        <div className={QuizCSS["leave-section"]}>
          <button onClick={() => navigate("/learn")} className={QuizCSS["leave-button"]}>
            Leave session
          </button>
        </div>
      </div>
    </div>
  );
}
