import Navbar from "@/components/navbar";
import styles from "@/css/quiz.module.css";
import { drawRectQuizFamily } from "@/lib/draw";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

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

export default function Quiz() {
  const navigate = useNavigate();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [_isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [translatedSign, setTranslatedSign] = useState<string>("");

  useEffect(() => {
    if (translatedSign === questions[index].answers) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
      setIndex(index + 1);
      return;
    }

    setIsAnswerCorrect(false);
  }, [translatedSign]);

  useEffect(() => {
    runCoco();
  }, []);

  // Main function
  const runCoco = async () => {
    // Loading the graph model
    const net = await tf.loadGraphModel(`${import.meta.env.VITE_MODEL_URL}/family_v1/model.json`);

    // Detect every 16.7 ms
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net: tf.GraphModel) => {
    // Check data is available
    if (
      typeof webcamRef.current === "undefined" ||
      webcamRef.current === null ||
      webcamRef.current.video?.readyState !== 4 ||
      canvasRef.current === null
    ) {
      return;
    }

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

    // @ts-ignore
    const boxes = await obj[3].array();
    // @ts-ignore
    const classes = await obj[7].array();
    // @ts-ignore
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
  };

  if (index === questions.length) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles["course-details"]}>
          <p className={styles["course-heading"]}>Family - test</p>
          <p className={styles["question-count"]}>You have completed the test</p>
        </div>
        <div className={styles["header-container"]}>
          <div className={styles["results-section"]}>
            <div className={styles["score"]}>
              <p>
                You got {score} / {questions.length} correct.
              </p>
            </div>
          </div>
          <div className={styles["leave-section"]}>
            <button onClick={() => navigate("/learn")} className={styles["leave-button"]}>
              Leave session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles["course-details"]}>
        <p className={styles["course-heading"]}>Family - test</p>
        <p className={styles["question-count"]}>
          Question {index + 1} of {questions.length}
        </p>
      </div>
      <div className={styles["header-container"]}>
        <div className={styles["question-section"]}>
          <div className={styles["question-text"]}>
            <p>{questions[index].questionText}</p>
          </div>
        </div>
        <div className={styles["answer-section"]}></div>
      </div>
      <div className={styles["camera-view"]}>
        <div className={styles.webcam}>
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
              // @ts-ignore
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </div>
        <button className={styles["skip-button"]} onClick={() => setIndex(index + 1)}>
          Skip →
        </button>
      </div>
      <div className={styles["leave-section"]}>
        <button onClick={() => navigate("/learn")} className={styles["leave-button"]}>
          Leave session
        </button>
      </div>
    </div>
  );
}
