import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import styles from "../css/learnSign.module.css";
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

export default function LearnSign2() {
  const userId = localStorage.getItem("userid");

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [signs, setSigns] = useState<any[]>([]);
  const [signId, setSignId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // Retrieve signs from database
    (async () => {
      try {
        const url = `http://localhost:8080/api/courses/family`;
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
    // Update progress in database
    (async () => {
      try {
        const url = `http://localhost:8080/api/progress/${userId}/${signId}`;
        await axios.post(url);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentIndex]);

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
