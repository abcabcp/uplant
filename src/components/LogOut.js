import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const MyLogOut = styled.button`
  border: none;
  background: none;
  display: block;
  margin: 0 auto; 
  font-family:  "GangwonEdu_OTFBoldA";
  font-size: 15px;
  color: #4e6b57;
`;

const LogOut = () => {
  const history = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    history("/Login");
  };

  return (
    <>
      <MyLogOut onClick={onLogOutClick}>Logout</MyLogOut>
    </>
  );
};

export default LogOut;
