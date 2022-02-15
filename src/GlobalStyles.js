import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "css/fonts/font.module.css";

const GlobalStyles = createGlobalStyle` 

    ${reset}

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: "GangwonEdu_OTFBoldA";
        font-size: 15px;
        color: #1c1c1c;
        padding: 0;
        margin: 0;
    }

`;

export default GlobalStyles;
