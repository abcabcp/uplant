import { authService, firebaseInstance } from "fbase";
import { useState } from "react";
import Container from "components/Container";
import MyInput from "components/Input";
import MyButton from "components/Button";
import styles from "css/loginform.module.scss";
import Logo from "img/logo.png";
import Facebook from "img/facebook.png";
import Github from "img/github.png";
import Google from "img/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "facebook") {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <Container textAlign={true}>
      <h1>
        <img src={Logo} alt="uplant" className={styles.logo} />
      </h1>
      <div className={styles.loginform}>
        <form onSubmit={onSubmit}>
          <MyInput
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            bgcolor={"#ffffff"}
            fontcolor={"#1c1c1c"}
          />
          <MyInput
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
            bgcolor={"#ffffff"}
            fontcolor={"#1c1c1c"}
          />
          <MyInput
            type="submit"
            value={newAccount ? "JOIN" : "LOGIN"}
            hover={true}
          />
          {error}
        </form>
        <span onClick={toggleAccount} className={`${styles.span} ${styles.span.hover}`}>
          {newAccount ? "LOGIN" : "JOIN"}
        </span>
        <div>
          <button
            onClick={onSocialClick}
            name="google"
            className={styles.social}
          >
            Google
          </button>
          <button
            onClick={onSocialClick}
            name="facebook"
            className={styles.social}
          >
          Facebook
          </button>
          <button
            onClick={onSocialClick}
            name="github"
            className={styles.social}
          >
            Github
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
