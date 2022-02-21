import styled, { css } from "styled-components";


const MyInput = styled.input`
  width: ${(props) => props.width || "300px"};
  background-color: ${(props) => props.bgcolor || "#EFEFEF"};
  color: ${(props) => props.fontcolor || "#1c1c1c"};
  margin: 0 auto;
  font-family: "GangwonEdu_OTFBoldA";
  padding: 10px;
  font-size: 14px;
  height: ${(props) => props.height || "40px"};
  border: none;
  text-align: center;
  border-radius: 20px;
  display: block;
  margin-bottom: 10px;

  &::placeholder {
    color: #b5b5b5;
  }

  &[type=submit] {
    cursor : pointer;
  }
  &[type=date] {
    color: #b5b5b5;
    text-indent: 20px;
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
