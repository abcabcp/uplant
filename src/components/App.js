import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { getAuth } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [loginIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
        setUserObj(user);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter loginIn={loginIn} userObj={userObj} /> : "로딩 중..."}
      <footer>&copy; {new Date().getFullYear()}Uplant</footer>
    </>
  );
}

export default App;
