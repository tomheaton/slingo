import { useNavigate } from "react-router-dom";
import styles from "../css/tutorial.module.css";
import video from "../videos/slingo.mp4";

export default function Tutorial() {
  const navigate = useNavigate();
  localStorage.setItem("was_visited", "1");

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Slingo uses your camera!</h1>
        <p>So ensure your camera permissions are turned on!</p>
      </div>
      <div className={styles.video}>
        <video src={video} width={800} height={600} autoPlay={true} muted loop={true} />
      </div>
      <button onClick={() => navigate("/")}>Continue</button>
    </div>
  );
}
