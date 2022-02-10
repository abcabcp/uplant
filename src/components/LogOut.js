import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const history = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    history("/Login");
  };

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default LogOut;
