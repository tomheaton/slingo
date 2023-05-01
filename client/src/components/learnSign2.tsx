import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import baby from "../images/family/baby.jpg";
import brother from "../images/family/brother.jpg";
import daughter from "../images/family/daughter.jpg";
import father from "../images/family/father.jpg";
import home from "../images/family/home.jpg";
import mother from "../images/family/mother.jpg";
import my from "../images/family/my.jpg";
import sister from "../images/family/sister.jpg";
import son from "../images/family/son.jpg";
import step from "../images/family/step.jpg";
import your from "../images/family/your.jpg";
import Navbar from "./navbar";

export default function LearnSign2() {
  const navigate = useNavigate();

  // Retrieving course details
  const [loading, setLoading] = useState(true);
  const [signs, setSigns] = useState([]);
  const [signId, setSignId] = useState("");

  useEffect(() => {
    const retrieveSignsAndSetSign = async () => {
      try {
        const url = `http://localhost:8080/api/courses/family`;
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
    { src: father, alt: "Father" },
    { src: mother, alt: "Mother" },
    { src: son, alt: "Son" },
    { src: daughter, alt: "Daughter" },
    { src: brother, alt: "Brother" },
    { src: sister, alt: "Sister" },
    { src: step, alt: "Step" },
    { src: baby, alt: "Baby" },
    { src: home, alt: "Home" },
    { src: my, alt: "My" },
    { src: your, alt: "Your" },
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
      <div className={learnSignCSS.container}>
        <Navbar />
        <div className={learnSignCSS.content}>
          <h1 className={learnSignCSS.title}>{signs[currentIndex]["name"]}</h1>
          <div className={learnSignCSS["slide-show"]}>
            <button className={learnSignCSS.previous} onClick={handlePrevClick}>
              Previous
            </button>
            <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
            <button className={learnSignCSS.next} onClick={handleNextClick}>
              Next
            </button>
          </div>
          <p className={learnSignCSS.description}>{signs[currentIndex]["description"]}</p>
          <button onClick={() => navigate("/learn")} className={learnSignCSS["leave-button"]}>
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
