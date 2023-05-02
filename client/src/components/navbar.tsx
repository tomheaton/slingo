import { useNavigate } from "react-router-dom";
import styles from "../css/navbar.module.css";

export default function Navbar() {
  const name = localStorage.getItem("name");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("was_visited");
    // @ts-ignore
    window.location = "/";
  };

  return (
    <nav className={styles["navbar-container"]}>
      <div className={styles["navbar-container-content"]}>
        <div className={styles["brand-section"]} onClick={() => navigate("/")}>
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["brand-logo"]}
          >
            <circle cx="75" cy="75" r="75" fill="#FF6C2D" />
            <path
              d="M49.4437 115.5C48.7087 115.5 48.0656 115.223 47.5144 114.67C46.9631 114.117 46.6875 113.471 46.6875 112.733C46.6875 111.934 46.9631 111.273 47.5144 110.75C48.0656 110.227 48.7087 109.966 49.4437 109.966H66.9V104.432H43.9313C43.1962 104.432 42.5531 104.155 42.0019 103.602C41.4506 103.049 41.175 102.403 41.175 101.665C41.175 100.866 41.4506 100.205 42.0019 99.6821C42.5531 99.1594 43.1962 98.8981 43.9313 98.8981H66.9V93.3642H40.2562C39.5213 93.3642 38.8781 93.0874 38.3269 92.534C37.7756 91.9807 37.5 91.335 37.5 90.5972C37.5 89.7978 37.7756 89.1368 38.3269 88.6142C38.8781 88.0915 39.5213 87.8302 40.2562 87.8302H66.9V82.2962H45.7688C45.0338 82.2962 44.3906 82.0195 43.8394 81.4661C43.2881 80.9127 43.0125 80.2671 43.0125 79.5292C43.0125 78.7299 43.2881 78.0689 43.8394 77.5462C44.3906 77.0236 45.0338 76.7623 45.7688 76.7623H76.6387L72.5044 68.6458C72.0144 67.662 71.8612 66.6628 72.045 65.6482C72.2287 64.6337 72.7188 63.7882 73.515 63.1118C73.9437 62.7429 74.3572 62.5584 74.7553 62.5584C75.1534 62.5584 75.5975 62.7736 76.0875 63.2041L95.565 81.9273C96.4225 82.7266 97.0656 83.649 97.4944 84.6943C97.9231 85.7396 98.1375 86.8156 98.1375 87.9224V107.199C98.1375 109.474 97.3413 111.426 95.7487 113.056C94.1562 114.685 92.1963 115.5 89.8687 115.5H49.4437ZM70.9425 58.1313L59.0906 45.5876C58.6006 45.0342 58.3709 44.3732 58.4016 43.6046C58.4322 42.836 58.7231 42.175 59.2744 41.6216C59.8256 41.1297 60.4841 40.8991 61.2497 40.9299C62.0153 40.9606 62.6431 41.2527 63.1331 41.8061L78.2925 57.9468C76.945 57.3319 75.7047 57.0245 74.5716 57.0245C73.4384 57.0245 72.2288 57.3934 70.9425 58.1313ZM67.0837 70.0293L54.8644 57.2089C54.3744 56.6555 54.1447 55.9945 54.1753 55.2259C54.2059 54.4573 54.4969 53.7963 55.0481 53.2429C55.5994 52.751 56.2578 52.5204 57.0234 52.5512C57.7891 52.5819 58.4169 52.874 58.9069 53.4274L67.4512 62.2817C67.145 62.8966 66.9153 63.4961 66.7622 64.0803C66.6091 64.6644 66.5325 65.2024 66.5325 65.6943C66.5325 66.4322 66.5784 67.1547 66.6703 67.8618C66.7622 68.5689 66.9 69.2914 67.0837 70.0293ZM101.261 80.1749C100.955 79.7444 100.618 79.3294 100.251 78.9297C99.8831 78.5301 99.485 78.115 99.0562 77.6846L79.0275 58.5002L80.9569 56.5633L82.8862 54.6264L64.6031 35.1653C64.1131 34.6119 63.8681 33.9663 63.8681 33.2284C63.8681 32.4906 64.1437 31.8449 64.695 31.2915C65.2462 30.7996 65.92 30.569 66.7162 30.5998C67.5125 30.6305 68.1556 30.9226 68.6456 31.476L86.9287 50.8449L90.9712 46.9711L76.3631 31.6605C75.8731 31.1071 75.6434 30.4461 75.6741 29.6775C75.7047 28.9089 75.9956 28.2479 76.5469 27.6945C77.0981 27.2026 77.7566 26.972 78.5222 27.0027C79.2878 27.0335 79.9156 27.3255 80.4056 27.8789L101.629 50.3837L104.661 41.6216C105.028 40.5763 105.671 39.7923 106.59 39.2697C107.509 38.747 108.489 38.5472 109.53 38.6702C110.081 38.7316 110.464 38.9007 110.678 39.1774C110.893 39.4541 111 39.9307 111 40.607V67.6312C111 68.7995 110.77 69.9063 110.311 70.9516C109.852 71.9969 109.193 72.9192 108.336 73.7186L101.261 80.1749Z"
              fill="white"
            />
          </svg>
          <p className={styles["brand-name"]}>Slingo</p>
        </div>
        <div className={styles["navigation-section"]}>
          <div className={styles["navigation-icons"]}>
            {/* go back to previous page use navigate */}
            <a onClick={() => navigate(-1)}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles["navigation-icon-back"]}
              >
                <circle cx="30" cy="30" r="30" fill="#FF6C2D" />
                <path
                  d="M35.0714 44.4677L22.4286 31.0456C22.3095 30.8935 22.2083 30.7351 22.125 30.5703C22.0417 30.4056 22 30.2091 22 29.981C22 29.8035 22.0417 29.6261 22.125 29.4487C22.2083 29.2712 22.3095 29.1191 22.4286 28.9924L35.0714 15.5323C35.381 15.1774 35.7798 15 36.2679 15C36.756 15 37.1548 15.1774 37.4643 15.5323C37.8214 15.8872 38 16.3181 38 16.8251C38 17.3321 37.8214 17.7757 37.4643 18.1559L26.3571 29.981L37.5 41.8441C37.8095 42.2243 37.9702 42.6679 37.9821 43.1749C37.994 43.6819 37.8333 44.1001 37.5 44.4297C37.1429 44.8099 36.7262 45 36.25 45C35.7738 45 35.381 44.8226 35.0714 44.4677Z"
                  fill="white"
                />
              </svg>
            </a>
            {/* navigate to next page in history */}
            <a onClick={() => navigate(1)}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles["navigation-icon-forward"]}
              >
                <circle cx="30" cy="30" r="30" transform="rotate(180 30 30)" fill="#FF6C2D" />
                <path
                  d="M24.9286 15.5323L37.5714 28.9544C37.6905 29.1065 37.7917 29.2649 37.875 29.4297C37.9583 29.5944 38 29.7909 38 30.019C38 30.1965 37.9583 30.3739 37.875 30.5513C37.7917 30.7288 37.6905 30.8809 37.5714 31.0076L24.9286 44.4677C24.619 44.8226 24.2202 45 23.7321 45C23.244 45 22.8452 44.8226 22.5357 44.4677C22.1786 44.1128 22 43.6819 22 43.1749C22 42.6679 22.1786 42.2243 22.5357 41.8441L33.6429 30.019L22.5 18.1559C22.1905 17.7757 22.0298 17.3321 22.0179 16.8251C22.006 16.3181 22.1667 15.8999 22.5 15.5703C22.8571 15.1901 23.2738 15 23.75 15C24.2262 15 24.619 15.1774 24.9286 15.5323Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
          <a className={styles["user-name"]} href="#">
            {name}
          </a>
          <a className={styles["logout-button"]} onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
