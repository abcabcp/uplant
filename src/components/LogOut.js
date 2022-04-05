import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyLogOut = styled.button`
    border: none;
    background: none;
    display: block;
    margin: 0 auto;
    font-family: 'GangwonEdu_OTFBoldA';
    color: var(--green200);
`;

const LogOut = () => {
    const history = useNavigate();

    //로그아웃시 로그인 페이지로 이동
    const onLogOutClick = () => {
        authService.signOut();
        history('/Login');
    };

    return (
        <>
            <MyLogOut onClick={onLogOutClick}>Logout</MyLogOut>
        </>
    );
};

export default LogOut;
