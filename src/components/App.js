import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import Header from 'components/Header';
import GlobalStyles from 'GlobalStyles';

function App() {
    const [init, setInit] = useState(false);
    const [loginIn, setLoginIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged(user => {
            if (user) {
                setLoginIn(user);
                setUserObj(user);
            } else {
                setLoginIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <div>
            <GlobalStyles />
            {loginIn ? <Header /> : null}
            {init ? <AppRouter loginIn={loginIn} userObj={userObj} /> : '로딩 중...'}
        </div>
    );
}

export default App;
