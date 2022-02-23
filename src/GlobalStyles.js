import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "css/fonts/font.module.scss";
import "css/color.module.scss";

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
        font-size: 17px;
        color: var(--black);
        padding: 0;
        margin: 0;
    }

    button:hover {
        cursor: pointer;
    }

`;

export default GlobalStyles;
