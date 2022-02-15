import styled, { css } from "styled-components";

const MyButton = styled.button`
  width: ${(props) => props.width || "300px"};
  background-color: ${(props) => props.backgroundColor || "#EFEFEF"};
  color: ${(props) => props.color || "#1c1c1c"};
  height: 40px;
  border: none;
  text-align: center;
  border-radius: 20px;

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
`;

export default MyButton;
