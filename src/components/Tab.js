import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Tab = styled(Link)`
    display: inline-grid;
    width: ${(props) => props.width ||"75px"};
    height: 30px;
    line-height: ${(props) => props.lineHeight || "33px" };
    text-align: center;
    margin: 0 10px 20px 0;
    border-radius: 20px;

    ${(props) => props.boxShadow && css`
        box-shadow:1px 1px 10px 1px rgba(207,207,207,0.84);
    `}

    ${(props) => props.plus && css`
        margin-left: 138px;
        width: 30px;
        line-height: 36px;
        border: none;
        background-color: var(--gray100);
        &:hover {
            transition: all 0.5s;
            background-color: var(--green200);
            color: var(--white);
        }
    `}

    ${(props) => props.active && css`
        background-color: var(--green);
    `};

    ${(props) => props.noActive && css`
        background-color: var(--gray);
        &:hover {
            background-color: #D3D3D3;
            transition: all 0.5s;
        }
        
    `}
`;
export default Tab;