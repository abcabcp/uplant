import styled, { css } from "styled-components";

const Card =  styled.div`
    width: 400px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: ${(props) => props.bgColor || "#FDFDFD"};
    border-radius: 25px;
    box-shadow:1px 1px 10px 1px rgba(207,207,207,0.84);
    ${(props) => props.position && css`
        position: relairive;
    `}

`;

export default Card;