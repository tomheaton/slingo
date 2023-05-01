import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/learnSign.module.css";
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
import Navbar from "./navbar";

export default function LearnSign() {
  const navigate = useNavigate();

  // Retrieving course details
  const [loading, setLoading] = useState(true);
  const [signs, setSigns] = useState([]);
  const [signId, setSignId] = useState("");

  useEffect(() => {
    const retrieveSignsAndSetSign = async () => {
      try {
        const url = `http://localhost:8080/api/courses/greetings`;
        const { data: res } = await axios.get(url);
        setSigns(res.course.signs);
        setSignId(res.course.signs[0]._id);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveSignsAndSetSign();
  }, []);

  const userId = localStorage.getItem("userid");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateProgress = async () => {
      try {
        const url = `http://localhost:8080/api/progress/${userId}/${signId}`;
        await axios.post(url);
      } catch (error) {
        console.log(error);
      }
    };
    updateProgress();
  }, [currentIndex]);

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

  function handleNextClick() {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    // @ts-ignore
    setSignId(signs[nextIndex]._id);
  }

  function handlePrevClick() {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    // @ts-ignore
    setSignId(signs[prevIndex]._id);
  }

  if (!loading) {
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

  return (
    <div>
      <p>loading...</p>
    </div>
  );
}
