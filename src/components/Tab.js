import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Tab = styled(Link)`
    display: inline-grid;
    width: ${(props) => props.width ||"80px"};
    height: 24px;
    line-height: ${(props) => props.lineHeight || "28px" };
    text-align: center;
    margin: 0 10px 20px 0;
    border-radius: 20px;

    background-color: ${(props) => props.backgroundColor || "#ffffff"};

    ${(props) => props.boxShadow && css`
        box-shadow:1px 1px 10px 1px rgba(207,207,207,0.84);
    `}

    ${(props) => props.marginLeft && css`
        margin-left: 180px;
        &:hover {
        background-color: #4e6b57;
        transition: all 0.5s;
        color: #ffffff;
      };
    `}

    ${(props) => props.active && css`
        background-color: #b9e3c6;
    `};
`;
export default Tab;