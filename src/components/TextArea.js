import styled from "styled-components";

const TextArea = styled.textarea`
    width: ${(props) => props.width || "300px" };
    display: block;
    margin: 0 auto;
    background-color: var(--white);
    color: var(--black);
    border: none;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 20px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 14px;
    height: ${(props) => props.height || "200px"};

    &::placeholder {
        color: #b5b5b5;
        font-size: 14px;
        font-family: "GangwonEdu_OTFBoldA";
        text-align: center;
        padding-top: 10px;
      }
`;

export default TextArea;