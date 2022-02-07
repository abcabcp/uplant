import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [loginIn, setLoggedIn] = useState();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter loginIn={loginIn} /> : "로딩 중..."}
      <footer>&copy; {new Date().getFullYear()}Uplant</footer>
    </>
  );
}

export default App;
