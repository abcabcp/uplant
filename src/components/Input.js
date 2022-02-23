import styled from "styled-components";


const MyInput = styled.input`
  width: ${(props) => props.width || "300px"};
  background-color: ${(props) => props.backgroundColor || "var(--gray100)"};
  color: ${(props) => props.fontcolor || "var(--black)"};
  margin: 0 auto;
  font-family: "GangwonEdu_OTFBoldA";
  padding: 10px;
  height: ${(props) => props.height || "40px"};
  border: none;
  text-align: center;
  border-radius: 20px;
  display: block;
  margin-bottom: 10px;

  &::placeholder {
    color: var(--gray300);
  }

  &[type=submit] {
    cursor : pointer;
  }
  &[type=date] {
    color: var(--gray300);
    text-indent: 20px;
  }
`;

export default MyInput;
