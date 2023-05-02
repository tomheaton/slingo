import axios from "axios";
import React, { useState } from "react";
import styles from "../css/login.module.css";

export default function Login() {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  // These methods will update the state properties
  const updateForm = (value: { [key: string]: string }) => {
    return setData((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `http://localhost:8080/api/auth/`;
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.name);
      localStorage.setItem("userid", res.userId);

      // @ts-ignore
      window.location = "/";
    } catch (error) {
      // @ts-ignore
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        // @ts-ignore
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["container-1"]}>
        <div className={styles["sub-container-1"]}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["slingo-logo"]}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M99.7398 50C99.7398 77.2829 77.5487 99.4 50.1746 99.4C22.8005 99.4 0.609375 77.2829 0.609375 50C0.609375 22.7171 22.8005 0.600006 50.1746 0.600006C77.5487 0.600006 99.7398 22.7171 99.7398 50ZM31.0544 77.5045C31.4378 77.8881 31.8853 78.08 32.3966 78.08H60.5183C62.1375 78.08 63.5009 77.5152 64.6088 76.3854C65.7166 75.2557 66.2705 73.9021 66.2705 72.3246V58.9595C66.2705 58.1922 66.1214 57.4461 65.8232 56.7213C65.5248 55.9966 65.0775 55.3571 64.4809 54.8029L50.9314 41.8214C50.5905 41.5231 50.2816 41.3738 50.0047 41.3738C49.7277 41.3738 49.44 41.5017 49.1418 41.7575C48.5879 42.2265 48.247 42.8127 48.1192 43.5161C47.9914 44.2196 48.0979 44.9123 48.4387 45.5945L51.3148 51.2218H29.8401C29.3288 51.2218 28.8813 51.4031 28.4978 51.7654C28.1144 52.1277 27.9227 52.5861 27.9227 53.1403C27.9227 53.6518 28.1144 54.0995 28.4978 54.4832C28.8813 54.8669 29.3288 55.0587 29.8401 55.0587H44.5401V58.8956H26.0053C25.494 58.8956 25.0465 59.0768 24.6631 59.4391C24.2796 59.8015 24.0879 60.2598 24.0879 60.814C24.0879 61.3256 24.2796 61.7732 24.6631 62.157C25.0465 62.5406 25.494 62.7325 26.0053 62.7325H44.5401V66.5694H28.5618C28.0505 66.5694 27.6031 66.7505 27.2196 67.1129C26.8361 67.4753 26.6444 67.9335 26.6444 68.4878C26.6444 68.9993 26.8361 69.4471 27.2196 69.8307C27.6031 70.2144 28.0505 70.4062 28.5618 70.4062H44.5401V74.2431H32.3966C31.8853 74.2431 31.4378 74.4243 31.0544 74.7866C30.6709 75.1491 30.4792 75.6073 30.4792 76.1615C30.4792 76.6732 30.6709 77.1208 31.0544 77.5045ZM39.1075 29.6074L47.3522 38.3044C48.247 37.7928 49.0886 37.5369 49.8768 37.5369C50.6651 37.5369 51.5279 37.7501 52.4653 38.1764L41.9197 26.9855C41.5788 26.6019 41.142 26.3994 40.6094 26.3781C40.0768 26.3567 39.6188 26.5166 39.2353 26.8576C38.8519 27.2414 38.6494 27.6996 38.6281 28.2325C38.6068 28.7654 38.7666 29.2237 39.1075 29.6074ZM36.1674 37.6649L44.6679 46.5536C44.5401 46.0421 44.4442 45.5411 44.3803 45.0508C44.3163 44.5606 44.2844 44.0596 44.2844 43.548C44.2844 43.207 44.3376 42.834 44.4442 42.429C44.5507 42.0239 44.7105 41.6083 44.9235 41.1819L38.9796 35.043C38.6388 34.6593 38.202 34.4568 37.6694 34.4355C37.1368 34.4141 36.6788 34.574 36.2953 34.9151C35.9119 35.2988 35.7094 35.7571 35.6881 36.29C35.6668 36.8229 35.8266 37.2812 36.1674 37.6649ZM67.7406 52.7246C67.9962 53.0017 68.2305 53.2895 68.4435 53.5879L73.3648 49.1115C73.9613 48.5573 74.4194 47.9178 74.739 47.1931C75.0586 46.4684 75.2183 45.701 75.2183 44.891V26.1543C75.2183 25.6852 75.1437 25.3549 74.9946 25.163C74.8455 24.9711 74.5792 24.8539 74.1957 24.8113C73.4713 24.726 72.7896 24.8645 72.1505 25.227C71.5114 25.5893 71.0639 26.1329 70.8083 26.8576L68.6992 32.9327L53.9353 17.3293C53.5944 16.9457 53.1576 16.7432 52.625 16.7219C52.0924 16.7005 51.6345 16.8604 51.251 17.2015C50.8675 17.5852 50.6651 18.0435 50.6438 18.5764C50.6225 19.1093 50.7823 19.5675 51.1232 19.9513L61.2853 30.5667L58.4731 33.2525L45.7545 19.8234C45.4136 19.4397 44.9661 19.2372 44.4122 19.2159C43.8584 19.1946 43.3896 19.3544 43.0062 19.6954C42.6227 20.0792 42.431 20.5268 42.431 21.0384C42.431 21.55 42.6014 21.9976 42.9423 22.3812L55.6609 35.8743L54.3188 37.2173L52.9766 38.5601L66.9096 51.8613C67.2079 52.1598 67.4849 52.4475 67.7406 52.7246Z"
              fill="white"
            />
          </svg>
          <h1 className={styles["slingo-header"]}>Slingo</h1>
        </div>
        <div className={styles["slingo-slogan"]}>
          <div className={styles["quote-part-1"]}>
            <p>"Sign language is the noblest gift </p>
            <p>God has given to deaf people."</p>
          </div>
          <p className={styles["quote-author"]}>- George William Veditz</p>
        </div>
      </div>
      <div className={styles["sub-container-2"]}>
        <h1 className={styles["login-header"]}>Login</h1>
        <form className={styles["login-form"]} onSubmit={onSubmit}>
          <div>
            <label className={styles["login-form-label"]} htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={data.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              placeholder={"Enter your email"}
            />
          </div>
          <div>
            <label className={styles["login-form-label"]} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => updateForm({ password: e.target.value })}
              placeholder={"Enter your password"}
            />
            <a className={styles["forgot-password"]} href="/forgot-password">
              Forgot password?
            </a>
          </div>
          {error && <div>{error}</div>}
          <button className={styles["login-button"]} type="submit">
            Login
          </button>
          <div className={styles["link-to-signup"]}>
            <p>
              Not a user? <a href="/signup">Sign up</a>
            </p>
          </div>
          <svg
            width="690"
            height="14"
            viewBox="0 0 690 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["or-separator"]}
          >
            <path d="M0 5.5H284" stroke="#868686" stroke-width="3" />
            <path d="M406 5.5H690" stroke="#868686" stroke-width="3" />
            <path
              d="M333.914 6.80078V6.53125C333.914 5.61719 334.047 4.76953 334.312 3.98828C334.578 3.19922 334.961 2.51562 335.461 1.9375C335.969 1.35156 336.586 0.898438 337.312 0.578125C338.047 0.25 338.875 0.0859375 339.797 0.0859375C340.727 0.0859375 341.555 0.25 342.281 0.578125C343.016 0.898438 343.637 1.35156 344.145 1.9375C344.652 2.51562 345.039 3.19922 345.305 3.98828C345.57 4.76953 345.703 5.61719 345.703 6.53125V6.80078C345.703 7.71484 345.57 8.5625 345.305 9.34375C345.039 10.125 344.652 10.8086 344.145 11.3945C343.637 11.9727 343.02 12.4258 342.293 12.7539C341.566 13.0742 340.742 13.2344 339.82 13.2344C338.891 13.2344 338.059 13.0742 337.324 12.7539C336.598 12.4258 335.98 11.9727 335.473 11.3945C334.965 10.8086 334.578 10.125 334.312 9.34375C334.047 8.5625 333.914 7.71484 333.914 6.80078ZM336.738 6.53125V6.80078C336.738 7.37109 336.797 7.91016 336.914 8.41797C337.031 8.92578 337.215 9.37109 337.465 9.75391C337.715 10.1367 338.035 10.4375 338.426 10.6562C338.816 10.875 339.281 10.9844 339.82 10.9844C340.344 10.9844 340.797 10.875 341.18 10.6562C341.57 10.4375 341.891 10.1367 342.141 9.75391C342.391 9.37109 342.574 8.92578 342.691 8.41797C342.816 7.91016 342.879 7.37109 342.879 6.80078V6.53125C342.879 5.96875 342.816 5.4375 342.691 4.9375C342.574 4.42969 342.387 3.98047 342.129 3.58984C341.879 3.19922 341.559 2.89453 341.168 2.67578C340.785 2.44922 340.328 2.33594 339.797 2.33594C339.266 2.33594 338.805 2.44922 338.414 2.67578C338.031 2.89453 337.715 3.19922 337.465 3.58984C337.215 3.98047 337.031 4.42969 336.914 4.9375C336.797 5.4375 336.738 5.96875 336.738 6.53125ZM350.906 2.73438V13H348.082V0.320312H350.777L350.906 2.73438ZM354.785 0.238281L354.762 2.86328C354.59 2.83203 354.402 2.80859 354.199 2.79297C354.004 2.77734 353.809 2.76953 353.613 2.76953C353.129 2.76953 352.703 2.83984 352.336 2.98047C351.969 3.11328 351.66 3.30859 351.41 3.56641C351.168 3.81641 350.98 4.12109 350.848 4.48047C350.715 4.83984 350.637 5.24219 350.613 5.6875L349.969 5.73438C349.969 4.9375 350.047 4.19922 350.203 3.51953C350.359 2.83984 350.594 2.24219 350.906 1.72656C351.227 1.21094 351.625 0.808594 352.102 0.519531C352.586 0.230469 353.145 0.0859375 353.777 0.0859375C353.949 0.0859375 354.133 0.101562 354.328 0.132812C354.531 0.164062 354.684 0.199219 354.785 0.238281Z"
              fill="#868686"
            />
          </svg>
          <a href="/auth/google" className={styles["continue-with-google-button"]}>
            <svg
              width="406"
              height="80"
              viewBox="0 0 406 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["continue-with-google-logo"]}
            >
              <path d="M406 0H0V80H406V0Z" fill="white" />
              <path
                d="M128.225 51.288C126.961 51.288 125.793 51.064 124.721 50.616C123.665 50.152 122.737 49.504 121.937 48.672C121.153 47.84 120.545 46.864 120.113 45.744C119.681 44.624 119.465 43.4 119.465 42.072C119.465 40.728 119.681 39.496 120.113 38.376C120.545 37.256 121.153 36.28 121.937 35.448C122.721 34.616 123.649 33.976 124.721 33.528C125.793 33.064 126.961 32.832 128.225 32.832C129.457 32.832 130.561 33.048 131.537 33.48C132.529 33.912 133.361 34.472 134.033 35.16C134.721 35.848 135.209 36.584 135.497 37.368L133.337 38.352C132.921 37.36 132.273 36.56 131.393 35.952C130.513 35.328 129.457 35.016 128.225 35.016C126.977 35.016 125.865 35.312 124.889 35.904C123.929 36.496 123.177 37.32 122.633 38.376C122.089 39.432 121.817 40.664 121.817 42.072C121.817 43.464 122.089 44.688 122.633 45.744C123.177 46.8 123.929 47.624 124.889 48.216C125.865 48.808 126.977 49.104 128.225 49.104C129.457 49.104 130.513 48.8 131.393 48.192C132.273 47.568 132.921 46.76 133.337 45.768L135.497 46.752C135.209 47.536 134.721 48.272 134.033 48.96C133.361 49.648 132.529 50.208 131.537 50.64C130.561 51.072 129.457 51.288 128.225 51.288ZM144.342 51.288C143.094 51.288 141.966 51 140.958 50.424C139.95 49.832 139.15 49.024 138.558 48C137.966 46.976 137.67 45.816 137.67 44.52C137.67 43.224 137.958 42.072 138.534 41.064C139.126 40.056 139.926 39.256 140.934 38.664C141.942 38.072 143.078 37.776 144.342 37.776C145.59 37.776 146.718 38.072 147.726 38.664C148.734 39.24 149.526 40.032 150.102 41.04C150.694 42.048 150.99 43.208 150.99 44.52C150.99 45.832 150.686 47 150.078 48.024C149.47 49.032 148.662 49.832 147.654 50.424C146.662 51 145.558 51.288 144.342 51.288ZM144.342 49.128C145.142 49.128 145.862 48.928 146.502 48.528C147.158 48.128 147.67 47.576 148.038 46.872C148.422 46.168 148.614 45.384 148.614 44.52C148.614 43.64 148.422 42.864 148.038 42.192C147.67 41.504 147.158 40.96 146.502 40.56C145.862 40.144 145.142 39.936 144.342 39.936C143.526 39.936 142.79 40.144 142.134 40.56C141.494 40.96 140.982 41.504 140.598 42.192C140.214 42.864 140.022 43.64 140.022 44.52C140.022 45.384 140.214 46.168 140.598 46.872C140.982 47.576 141.494 48.128 142.134 48.528C142.79 48.928 143.526 49.128 144.342 49.128ZM153.901 51V38.064H156.085V40.584L155.725 40.368C156.045 39.552 156.557 38.92 157.261 38.472C157.981 38.008 158.821 37.776 159.781 37.776C160.709 37.776 161.533 37.984 162.253 38.4C162.989 38.816 163.565 39.392 163.981 40.128C164.413 40.864 164.629 41.696 164.629 42.624V51H162.373V43.344C162.373 42.624 162.245 42.016 161.989 41.52C161.733 41.024 161.365 40.64 160.885 40.368C160.421 40.08 159.885 39.936 159.277 39.936C158.669 39.936 158.125 40.08 157.645 40.368C157.181 40.64 156.813 41.032 156.541 41.544C156.269 42.04 156.133 42.64 156.133 43.344V51H153.901ZM173.079 51.144C171.815 51.144 170.839 50.784 170.151 50.064C169.479 49.344 169.143 48.328 169.143 47.016V40.2H166.791V38.064H167.271C167.847 38.064 168.303 37.888 168.639 37.536C168.975 37.184 169.143 36.72 169.143 36.144V35.088H171.375V38.064H174.279V40.2H171.375V46.944C171.375 47.376 171.439 47.752 171.567 48.072C171.711 48.392 171.943 48.648 172.263 48.84C172.583 49.016 173.007 49.104 173.535 49.104C173.647 49.104 173.783 49.096 173.943 49.08C174.119 49.064 174.279 49.048 174.423 49.032V51C174.215 51.048 173.983 51.08 173.727 51.096C173.471 51.128 173.255 51.144 173.079 51.144ZM177.338 51V38.064H179.57V51H177.338ZM177.338 36V33.12H179.57V36H177.338ZM183.034 51V38.064H185.218V40.584L184.858 40.368C185.178 39.552 185.69 38.92 186.394 38.472C187.114 38.008 187.954 37.776 188.914 37.776C189.842 37.776 190.666 37.984 191.386 38.4C192.122 38.816 192.698 39.392 193.114 40.128C193.546 40.864 193.762 41.696 193.762 42.624V51H191.506V43.344C191.506 42.624 191.378 42.016 191.122 41.52C190.866 41.024 190.498 40.64 190.018 40.368C189.554 40.08 189.018 39.936 188.41 39.936C187.802 39.936 187.258 40.08 186.778 40.368C186.314 40.64 185.946 41.032 185.674 41.544C185.402 42.04 185.266 42.64 185.266 43.344V51H183.034ZM201.54 51.288C200.612 51.288 199.772 51.072 199.02 50.64C198.284 50.208 197.708 49.608 197.292 48.84C196.892 48.056 196.692 47.16 196.692 46.152V38.064H198.924V45.912C198.924 46.552 199.052 47.112 199.308 47.592C199.58 48.072 199.948 48.448 200.412 48.72C200.892 48.992 201.436 49.128 202.044 49.128C202.652 49.128 203.188 48.992 203.652 48.72C204.132 48.448 204.5 48.056 204.756 47.544C205.028 47.032 205.164 46.424 205.164 45.72V38.064H207.42V51H205.236V48.48L205.596 48.696C205.292 49.512 204.772 50.152 204.036 50.616C203.316 51.064 202.484 51.288 201.54 51.288ZM216.829 51.288C215.581 51.288 214.469 50.992 213.493 50.4C212.517 49.808 211.749 49 211.189 47.976C210.629 46.936 210.349 45.776 210.349 44.496C210.349 43.2 210.621 42.048 211.165 41.04C211.725 40.032 212.477 39.24 213.421 38.664C214.381 38.072 215.453 37.776 216.637 37.776C217.597 37.776 218.445 37.952 219.181 38.304C219.933 38.64 220.565 39.104 221.077 39.696C221.605 40.272 222.005 40.936 222.277 41.688C222.565 42.424 222.709 43.192 222.709 43.992C222.709 44.168 222.693 44.368 222.661 44.592C222.645 44.8 222.621 45 222.589 45.192H211.981V43.272H221.293L220.237 44.136C220.381 43.304 220.301 42.56 219.997 41.904C219.693 41.248 219.245 40.728 218.653 40.344C218.061 39.96 217.389 39.768 216.637 39.768C215.885 39.768 215.197 39.96 214.573 40.344C213.949 40.728 213.461 41.28 213.109 42C212.773 42.704 212.637 43.544 212.701 44.52C212.637 45.464 212.781 46.296 213.133 47.016C213.501 47.72 214.013 48.272 214.669 48.672C215.341 49.056 216.069 49.248 216.853 49.248C217.717 49.248 218.445 49.048 219.037 48.648C219.629 48.248 220.109 47.736 220.477 47.112L222.349 48.072C222.093 48.664 221.693 49.208 221.149 49.704C220.621 50.184 219.989 50.568 219.253 50.856C218.533 51.144 217.725 51.288 216.829 51.288ZM232.744 51L228.304 38.064H230.776L234.304 48.888L233.44 48.864L236.896 38.064H239.008L242.464 48.864L241.6 48.888L245.152 38.064H247.6L243.16 51H241.024L237.616 40.2H238.288L234.88 51H232.744ZM249.596 51V38.064H251.828V51H249.596ZM249.596 36V33.12H251.828V36H249.596ZM260.548 51.144C259.284 51.144 258.308 50.784 257.62 50.064C256.948 49.344 256.612 48.328 256.612 47.016V40.2H254.26V38.064H254.74C255.316 38.064 255.772 37.888 256.108 37.536C256.444 37.184 256.612 36.72 256.612 36.144V35.088H258.844V38.064H261.748V40.2H258.844V46.944C258.844 47.376 258.908 47.752 259.036 48.072C259.18 48.392 259.412 48.648 259.731 48.84C260.052 49.016 260.476 49.104 261.004 49.104C261.116 49.104 261.252 49.096 261.412 49.08C261.588 49.064 261.748 49.048 261.892 49.032V51C261.684 51.048 261.452 51.08 261.196 51.096C260.94 51.128 260.724 51.144 260.548 51.144ZM264.807 51V32.832H267.039V40.584L266.631 40.368C266.951 39.552 267.463 38.92 268.167 38.472C268.887 38.008 269.727 37.776 270.687 37.776C271.615 37.776 272.439 37.984 273.159 38.4C273.895 38.816 274.471 39.392 274.887 40.128C275.319 40.864 275.535 41.696 275.535 42.624V51H273.279V43.344C273.279 42.624 273.143 42.016 272.871 41.52C272.615 41.024 272.255 40.64 271.791 40.368C271.327 40.08 270.791 39.936 270.183 39.936C269.591 39.936 269.055 40.08 268.575 40.368C268.095 40.64 267.719 41.032 267.447 41.544C267.175 42.04 267.039 42.64 267.039 43.344V51H264.807ZM291.397 51.288C290.133 51.288 288.965 51.064 287.893 50.616C286.821 50.152 285.893 49.504 285.109 48.672C284.325 47.84 283.709 46.864 283.261 45.744C282.829 44.624 282.613 43.4 282.613 42.072C282.613 40.728 282.829 39.496 283.261 38.376C283.693 37.256 284.301 36.28 285.085 35.448C285.869 34.616 286.797 33.976 287.869 33.528C288.941 33.064 290.109 32.832 291.373 32.832C292.605 32.832 293.709 33.048 294.685 33.48C295.677 33.912 296.509 34.472 297.181 35.16C297.869 35.848 298.357 36.584 298.645 37.368L296.533 38.4C296.117 37.36 295.469 36.536 294.589 35.928C293.709 35.32 292.637 35.016 291.373 35.016C290.125 35.016 289.013 35.312 288.037 35.904C287.077 36.496 286.325 37.32 285.781 38.376C285.237 39.432 284.965 40.664 284.965 42.072C284.965 43.464 285.237 44.688 285.781 45.744C286.341 46.8 287.101 47.624 288.061 48.216C289.037 48.808 290.149 49.104 291.397 49.104C292.485 49.104 293.469 48.872 294.349 48.408C295.229 47.944 295.925 47.304 296.437 46.488C296.949 45.672 297.205 44.728 297.205 43.656V42.552L298.285 43.56H291.373V41.52H299.581V43.104C299.581 44.352 299.365 45.48 298.933 46.488C298.501 47.496 297.909 48.36 297.157 49.08C296.405 49.784 295.533 50.328 294.541 50.712C293.549 51.096 292.501 51.288 291.397 51.288ZM308.639 51.288C307.391 51.288 306.263 51 305.255 50.424C304.247 49.832 303.447 49.024 302.855 48C302.263 46.976 301.967 45.816 301.967 44.52C301.967 43.224 302.255 42.072 302.831 41.064C303.423 40.056 304.223 39.256 305.231 38.664C306.239 38.072 307.375 37.776 308.639 37.776C309.887 37.776 311.015 38.072 312.023 38.664C313.031 39.24 313.823 40.032 314.399 41.04C314.991 42.048 315.287 43.208 315.287 44.52C315.287 45.832 314.983 47 314.375 48.024C313.767 49.032 312.959 49.832 311.951 50.424C310.959 51 309.855 51.288 308.639 51.288ZM308.639 49.128C309.439 49.128 310.159 48.928 310.799 48.528C311.455 48.128 311.967 47.576 312.335 46.872C312.719 46.168 312.911 45.384 312.911 44.52C312.911 43.64 312.719 42.864 312.335 42.192C311.967 41.504 311.455 40.96 310.799 40.56C310.159 40.144 309.439 39.936 308.639 39.936C307.823 39.936 307.087 40.144 306.431 40.56C305.791 40.96 305.279 41.504 304.895 42.192C304.511 42.864 304.319 43.64 304.319 44.52C304.319 45.384 304.511 46.168 304.895 46.872C305.279 47.576 305.791 48.128 306.431 48.528C307.087 48.928 307.823 49.128 308.639 49.128ZM324.342 51.288C323.094 51.288 321.966 51 320.958 50.424C319.95 49.832 319.15 49.024 318.558 48C317.966 46.976 317.67 45.816 317.67 44.52C317.67 43.224 317.958 42.072 318.534 41.064C319.126 40.056 319.926 39.256 320.934 38.664C321.942 38.072 323.078 37.776 324.342 37.776C325.59 37.776 326.718 38.072 327.726 38.664C328.734 39.24 329.526 40.032 330.102 41.04C330.694 42.048 330.99 43.208 330.99 44.52C330.99 45.832 330.686 47 330.078 48.024C329.47 49.032 328.662 49.832 327.654 50.424C326.662 51 325.558 51.288 324.342 51.288ZM324.342 49.128C325.142 49.128 325.862 48.928 326.502 48.528C327.158 48.128 327.67 47.576 328.038 46.872C328.422 46.168 328.614 45.384 328.614 44.52C328.614 43.64 328.422 42.864 328.038 42.192C327.67 41.504 327.158 40.96 326.502 40.56C325.862 40.144 325.142 39.936 324.342 39.936C323.526 39.936 322.79 40.144 322.134 40.56C321.494 40.96 320.982 41.504 320.598 42.192C320.214 42.864 320.022 43.64 320.022 44.52C320.022 45.384 320.214 46.168 320.598 46.872C320.982 47.576 321.494 48.128 322.134 48.528C322.79 48.928 323.526 49.128 324.342 49.128ZM340.069 56.28C339.157 56.28 338.309 56.136 337.525 55.848C336.757 55.56 336.093 55.16 335.533 54.648C334.989 54.152 334.573 53.568 334.285 52.896L336.373 51.936C336.597 52.544 337.021 53.056 337.645 53.472C338.285 53.904 339.085 54.12 340.045 54.12C340.781 54.12 341.445 53.976 342.037 53.688C342.645 53.416 343.125 53 343.477 52.44C343.829 51.896 344.005 51.232 344.005 50.448V47.544L344.413 47.976C343.965 48.856 343.317 49.528 342.469 49.992C341.637 50.456 340.717 50.688 339.709 50.688C338.493 50.688 337.405 50.408 336.445 49.848C335.485 49.272 334.733 48.496 334.189 47.52C333.645 46.528 333.373 45.432 333.373 44.232C333.373 43.016 333.645 41.92 334.189 40.944C334.733 39.968 335.477 39.2 336.421 38.64C337.381 38.064 338.469 37.776 339.685 37.776C340.693 37.776 341.605 38.008 342.421 38.472C343.253 38.92 343.917 39.544 344.413 40.344L344.077 40.944V38.064H346.261V50.448C346.261 51.568 345.997 52.568 345.469 53.448C344.941 54.328 344.205 55.016 343.261 55.512C342.333 56.024 341.269 56.28 340.069 56.28ZM339.901 48.528C340.669 48.528 341.357 48.336 341.965 47.952C342.589 47.568 343.085 47.056 343.453 46.416C343.821 45.76 344.005 45.032 344.005 44.232C344.005 43.448 343.821 42.728 343.453 42.072C343.085 41.416 342.589 40.896 341.965 40.512C341.357 40.128 340.669 39.936 339.901 39.936C339.117 39.936 338.405 40.128 337.765 40.512C337.125 40.896 336.621 41.416 336.253 42.072C335.901 42.712 335.725 43.432 335.725 44.232C335.725 45.032 335.901 45.76 336.253 46.416C336.621 47.056 337.117 47.568 337.741 47.952C338.381 48.336 339.101 48.528 339.901 48.528ZM349.721 51V32.832H351.953V51H349.721ZM361.369 51.288C360.121 51.288 359.009 50.992 358.033 50.4C357.057 49.808 356.289 49 355.729 47.976C355.169 46.936 354.889 45.776 354.889 44.496C354.889 43.2 355.161 42.048 355.705 41.04C356.265 40.032 357.017 39.24 357.961 38.664C358.921 38.072 359.993 37.776 361.177 37.776C362.137 37.776 362.985 37.952 363.721 38.304C364.473 38.64 365.105 39.104 365.617 39.696C366.145 40.272 366.545 40.936 366.817 41.688C367.105 42.424 367.248 43.192 367.248 43.992C367.248 44.168 367.233 44.368 367.201 44.592C367.185 44.8 367.161 45 367.129 45.192H356.521V43.272H365.833L364.777 44.136C364.921 43.304 364.841 42.56 364.537 41.904C364.233 41.248 363.785 40.728 363.193 40.344C362.601 39.96 361.929 39.768 361.177 39.768C360.425 39.768 359.737 39.96 359.113 40.344C358.489 40.728 358.001 41.28 357.649 42C357.313 42.704 357.177 43.544 357.241 44.52C357.177 45.464 357.321 46.296 357.673 47.016C358.041 47.72 358.553 48.272 359.209 48.672C359.881 49.056 360.609 49.248 361.393 49.248C362.257 49.248 362.985 49.048 363.577 48.648C364.169 48.248 364.649 47.736 365.017 47.112L366.889 48.072C366.633 48.664 366.233 49.208 365.689 49.704C365.161 50.184 364.529 50.568 363.793 50.856C363.073 51.144 362.265 51.288 361.369 51.288Z"
                fill="#616161"
              />
              <path
                d="M391 2H15C7.8203 2 2 7.8203 2 15V65C2 72.1797 7.8203 78 15 78H391C398.18 78 404 72.1797 404 65V15C404 7.8203 398.18 2 391 2Z"
                stroke="#616161"
                stroke-width="4"
              />
              <path
                d="M60.7371 32.0915C62.0955 29.3579 64.1794 27.0598 66.7558 25.4543C69.3322 23.8488 72.2997 22.999 75.3265 23C79.7265 23 83.4229 24.6335 86.249 27.2983L81.5682 32.0305C79.8751 30.3953 77.7233 29.5621 75.3265 29.5621C71.0735 29.5621 67.4735 32.4661 66.1918 36.365C65.8653 37.355 65.6792 38.411 65.6792 39.5C65.6792 40.589 65.8653 41.645 66.1918 42.635C67.4751 46.5356 71.0735 49.4379 75.3265 49.4379C77.5224 49.4379 79.3918 48.8522 80.8547 47.8622C81.7028 47.2979 82.4288 46.5657 82.9889 45.7098C83.549 44.8539 83.9316 43.8921 84.1135 42.8825H75.3265V36.5003H90.7029C90.8955 37.5794 91 38.7047 91 39.8746C91 44.9005 89.2204 49.131 86.1314 52.002C83.431 54.5232 79.7347 56 75.3265 56C73.1823 56.0009 71.0588 55.5747 69.0776 54.7458C67.0964 53.9169 65.2962 52.7015 63.78 51.1692C62.2638 49.6369 61.0612 47.8176 60.241 45.8153C59.4209 43.813 58.9991 41.6671 59 39.5C59 36.8369 59.6302 34.319 60.7371 32.0915Z"
                fill="#616161"
              />
            </svg>
          </a>
        </form>
      </div>
    </div>
  );
}
