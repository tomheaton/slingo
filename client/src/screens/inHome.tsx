import Navbar from "@/components/navbar";
import styles from "@/css/inhome.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InHome() {
  const name = localStorage.getItem("name");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("was_visited")) {
      return;
    }

    localStorage.setItem("was_visited", "1");
    return navigate("/tutorial");
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.intro}>
        <h1 className={styles.home}>Home</h1>
        <p className={styles.greeting}>Hello, {name}</p>
      </div>
      <div className={styles["navigation-buttons"]}>
        <button onClick={() => navigate("/learn")} className={styles["translate-button"]}>
          Learn
        </button>
        <button onClick={() => navigate("/translate")} className={styles["learn-button"]}>
          Translate
        </button>
      </div>
    </div>
  );
}
