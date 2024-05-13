import Navbar from "@/components/navbar";
import styles from "@/css/learnSign.module.css";
import axios from "@/lib/axios";
import { familyImages } from "@/lib/images";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const {
          data: res,
        }: AxiosResponse<{
          course: {
            signs: any[];
          };
        }> = await axios.get("/courses/family");
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
        await axios.post(`/progress/${userId}/${signId}`);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentIndex]);

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % familyImages.length;
    setCurrentIndex(nextIndex);
    // @ts-ignore
    setSignId(signs[nextIndex]._id);
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex === 0 ? familyImages.length - 1 : currentIndex - 1;
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
          <img src={familyImages[currentIndex].src} alt={familyImages[currentIndex].alt} />
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
