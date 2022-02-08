import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const LogOut = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default LogOut;
