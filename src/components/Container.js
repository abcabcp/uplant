
import styled, { css } from "styled-components";

const Container = styled.div`
    width: ${(props) => props.width || "400px"};
    margin: 0 auto;
    ${(props) => props.textAlign || "center"};
`

export default Container;