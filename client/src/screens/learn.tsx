import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import styles from "../css/learn.module.css";
import Navbar from "../components/navbar";

export default function Learn() {
  const userId = localStorage.getItem("userid");

  const navigate = useNavigate();

  const [progress, setProgress] = useState<number>(0);
  const [greetingsModalIsOpen, setGreetingsModalIsOpen] = useState<boolean>(false);
  const [familyModalIsOpen, setFamilyModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const retrieveProgress = async () => {
      try {
        const url = `http://localhost:8080/api/progress/${userId}`;
        const { data: res } = await axios.get(url);
        setProgress(Math.round((res.overallProgress / 22) * 100));
      } catch (error) {
        console.log(error);
      }
    };
    retrieveProgress();
  }, []);

  const handleOpenGreetingsModal = () => {
    setGreetingsModalIsOpen(true);
  };

  const handleCloseGreetingsModal = () => {
    setGreetingsModalIsOpen(false);
  };

  const handleOpenFamilyModal = () => {
    setFamilyModalIsOpen(true);
  };

  const handleCloseFamilyModal = () => {
    setFamilyModalIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.title}>
        <h1 className={styles["learn-title"]}>Learn</h1>
        <p className={styles["learn-text"]}>What do you want to learn today?</p>
        <div className={styles["progress-bar"]}>
          <ProgressBar width={600} height={18} text={`${progress}% progress`} percent={progress} />
        </div>
      </div>
      <div className={styles["navigation-buttons"]}>
        <button onClick={handleOpenGreetingsModal} className={styles["greeting-button"]}>
          Greetings
        </button>
        <button onClick={handleOpenFamilyModal} className={styles["family-button"]}>
          Family
        </button>
        <button className={styles["numbers-button"]}>Basic Numbers</button>
        <button className={styles["weather-button"]}>Weather</button>
        <button className={styles["travel-button"]}>Travel and Transport</button>
        <button className={styles["directions-button"]}>Giving Directions</button>
      </div>

      <Modal
        isOpen={greetingsModalIsOpen}
        onRequestClose={handleCloseGreetingsModal}
        contentLabel="Greetings Modal"
        className={styles["modal-container"]}
      >
        <button className={styles["close-button"]} onClick={handleCloseGreetingsModal}>
          X
        </button>
        <div className={styles["modal-content"]}>
          <p className={styles["modal-header"]}>Greetings section</p>
          <p className={styles["modal-sub-header"]}>What do you want to do?</p>
          <div className={styles["modal-buttons"]}>
            <button onClick={() => navigate("/quiz")}>Test</button>
            <button onClick={() => navigate("/learnsign")}>Learn</button>
            <button onClick={() => navigate("/learninteractively")}>Learn interactively</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={familyModalIsOpen}
        onRequestClose={handleCloseFamilyModal}
        contentLabel="Family Modal"
        className={styles["modal-container"]}
      >
        <button className={styles["close-button"]} onClick={handleCloseFamilyModal}>
          X
        </button>
        <div className={styles["modal-content"]}>
          <p className={styles["modal-header"]}>Family section</p>
          <p className={styles["modal-sub-header"]}>What do you want to do?</p>
          <div className={styles["modal-buttons"]}>
            <button onClick={() => navigate("/quiz2")}>Test</button>
            <button onClick={() => navigate("/learnsign2")}>Learn</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
