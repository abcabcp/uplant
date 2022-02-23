import styled, { css } from "styled-components";

const MyButton = styled.button`
  width: ${(props) => props.width || "300px"};
  background-color: ${(props) => props.backgroundColor || "var(--gray100)"};
  color: ${(props) => props.color || "var(--black)"};
  height: ${(props) => props.height ||"40px"};
  border: none;
  text-align: center;
  border-radius: 20px;
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 14px;

  ${(props) =>
    props.hover &&
    css`
      background-color: var(--gray100);
      color: var(--black);

      &:hover {
        background-color: var(--green);
        transition: var(--black);
      }
    `}

    ${(props) => props.handleBtn && css`
      width: 25px;
      height: 20px;
      background-color: var(--gray50);
    `}
`;

export default MyButton;
