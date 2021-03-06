import Logo from "img/logo.png";
import styled from "styled-components";

const MyHeader = styled.div`
  width: 100%;
  height: ${(props) => props.height || '50px'};
  text-align: center;
  margin: 15px 0 35px 0;
  line-height: 57px;
  font-size: 35px;
  text-indent: -20px;
  background-color: #f8f8f8;
`;

const Header = () => {
  return (
    <>
      <MyHeader>
        <img src={Logo} alt="logo" width="40px" />
        Uplant
      </MyHeader>
    </>
  );
};

export default Header;
