import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Navbar from "../components/navbar";
import styles from "../css/learnInteractive.module.css";
import afternoon from "../images/greetings/afternoon.jpg";
import bad from "../images/greetings/bad.jpg";
import good from "../images/greetings/good.jpg";
import hello from "../images/greetings/hello.jpg";
import how from "../images/greetings/how.jpg";
import luck from "../images/greetings/luck.jpg";
import meet from "../images/greetings/meet.jpg";
import morning from "../images/greetings/morning.jpg";
import name from "../images/greetings/name.jpg";
import thanks from "../images/greetings/thanks.jpg";
import you from "../images/greetings/you.jpg";
import { drawRectQuizGreetings } from "../utils";

const images = [
  { src: afternoon, alt: "afternoon" },
  { src: bad, alt: "bad" },
  { src: good, alt: "good" },
  { src: hello, alt: "hello" },
  { src: how, alt: "how" },
  { src: luck, alt: "luck" },
  { src: meet, alt: "meet" },
  { src: morning, alt: "morning" },
  { src: name, alt: "name" },
  { src: thanks, alt: "thanks" },
  { src: you, alt: "you" },
];

export default function LearnSign() {
  const userId = localStorage.getItem("userid");

  const navigate = useNavigate();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [signs, setSigns] = useState<any[]>([]);
  const [signId, setSignId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translatedSign, setTranslatedSign] = useState<string>("");

  useEffect(() => {
    // Retrieve signs from database
    (async () => {
      try {
        const url = `http://localhost:8080/api/courses/greetings`;
        const { data: res } = await axios.get(url);
        setSigns(res.course.signs);
        setSignId(res.course.signs[0]._id);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Update progress
    (async () => {
      try {
        const url = `http://localhost:8080/api/progress/${userId}/${signId}`;
        await axios.post(url);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentIndex]);

  useEffect(() => {
    runCoco();
  }, []);

  // Main function
  const runCoco = async () => {
    // Loading the graph model
    const net = await tf.loadGraphModel(
      "https://raw.githubusercontent.com/dp846/SlingoModels/main/model.json",
    );

    // Detect every 16.7 ms
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net: tf.GraphModel) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4 &&
      canvasRef.current !== null
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

      tf.Tensor<tf.Rank>;

      // @ts-ignore
      const boxes = await obj[2].array();
      // @ts-ignore
      const classes = await obj[4].array();
      // @ts-ignore
      const scores = await obj[7].array();

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // Update drawing utility
      requestAnimationFrame(() => {
        // @ts-ignore
        drawRectQuizGreetings(
          boxes[0],
          classes[0],
          scores[0],
          0.65,
          videoWidth,
          videoHeight,
          ctx,
          setTranslatedSign,
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };
  
  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    // @ts-ignore
    setSignId(signs[nextIndex]._id);
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    // @ts-ignore
    setSignId(signs[prevIndex]._id);
  };

  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.title}>{signs[currentIndex]["name"]}</h1>
        <div className={styles["slide-show"]}>
          <button className={styles.previous} onClick={handlePrevClick}>
            Previous
          </button>
          <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 640,
              height: 480,
            }}
          >
            <Webcam ref={webcamRef} muted={true} />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                zIndex: 8,
                width: 640,
                height: 480,
              }}
            />
          </div>
          <button className={styles.next} onClick={handleNextClick}>
            Next
          </button>
        </div>
        <p className={styles.description}>{signs[currentIndex]["description"]}</p>
        <button onClick={() => navigate("/learn")} className={styles["leave-button"]}>
          Leave session
        </button>
      </div>
    </div>
  );
}