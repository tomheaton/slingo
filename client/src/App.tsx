import { Route, Routes } from "react-router-dom";

import EmailVerify from "./screens/emailVerify";
import ForgotPassword from "./screens/forgotPassword";
import Home from "./screens/home";
import InHome from "./screens/inHome";
import Learn from "./screens/learn";
import LearnInteractive from "./screens/learnInteractive";
import LearnSign from "./screens/learnSign";
import LearnSign2 from "./screens/learnSign2";
import Login from "./screens/login";
import PasswordReset from "./screens/passwordReset";
import Quiz from "./screens/quiz";
import Quiz2 from "./screens/quiz2";
import Signup from "./screens/signup";
import Translate from "./screens/translate";
import Tutorial from "./screens/tutorial";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={user ? <InHome /> : <Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

      {user && (
        <>
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learnSign" element={<LearnSign />} />
          <Route path="/learnInteractively" element={<LearnInteractive />} />
          <Route path="/learnSign2" element={<LearnSign2 />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz2" element={<Quiz2 />} />
          <Route path="/translate" element={<Translate />} />
        </>
      )}
    </Routes>
  );
};

export default App;
