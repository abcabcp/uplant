import styled, { css } from "styled-components";

const MyButton = styled.button`
  width: ${(props) => props.width || "300px"};
  background-color: ${(props) => props.backgroundColor || "#EFEFEF"};
  color: ${(props) => props.color || "#1c1c1c"};
  height: ${(props) => props.height ||"40px"};
  border: none;
  text-align: center;
  border-radius: 20px;
font-family: "GangwonEdu_OTFBoldA";

  ${(props) =>
    props.hover &&
    css`
      background-color: #efefef;
      color: #1c1c1c;

      &:hover {
        background-color: #b9e3c6;
        transition: all 0.5s;
      }
    `}

    ${(props) => props.handleBtn && css`
      width: 25px;
      height: 20px;
      background-color: #FDFDFD;
    `}
`;

export default MyButton;
