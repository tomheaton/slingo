import styles from "@/css/tutorial.module.css";
import video from "@/videos/slingo.mp4";
import { useNavigate } from "react-router-dom";

export default function Tutorial() {
  localStorage.setItem("was_visited", "1");

  const navigate = useNavigate();

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
