import { Link } from "react-router-dom";
import Logo from "img/logo.png";
import styled, { css } from "styled-components";

const MyHeader = styled.div`
  width: 100%;
  height: ${(props) => props.height || '50px'};
  text-align: center;
  line-height: 57px;
  font-size: 30px;
  background-color: #f8f8f8;
`;

const Header = () => {
  return (
    <>
      <MyHeader>
        <img src={Logo} alt="logo" width="30px" />
        Uplant
      </MyHeader>
    </>
  );
};

export default Header;
