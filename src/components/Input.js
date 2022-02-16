import styled, { css } from "styled-components";


const MyInput = styled.input`
  width: ${(props) => props.width || "300px"};
  background-color: ${(props) => props.bgcolor || "#EFEFEF"};
  color: ${(props) => props.fontcolor || "#C4C4C4"};
  height: 40px;
  border: none;
  text-align: center;
  border-radius: 20px;
  display: block;
  margin-bottom: 10px;

  &::placeholder {
    color: #b5b5b5;
    font-size: 12px;
  }


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

export default MyInput;
