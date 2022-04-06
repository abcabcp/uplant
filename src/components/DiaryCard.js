import { dbService } from 'fbase';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Diary from 'components/DiaryEdit';

const DiaryCard = () => {
    const [diarys, setDiarys] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    //firebase에서 실시간으로 diarys 컬렉션 값을 가져와서 저장한다.
    useEffect(() => {
        dbService.collection('diarys').onSnapshot(snapshot => {
            const newArray = snapshot.docs.map(document => ({
                id: document.id,
                ...document.data(),
            }));
            setDiarys(newArray);
        });
    }, []);

    //로그인한 유저의 id값과 작성자의 id값이 같다면 저장한다.
    const ID_CHECK = diarys.filter(diary => diary.d_auth === uid);

    //정렬대상 - 생성일자
    const sortingField = 'createAt';

    //최근등록순으로 정렬
    ID_CHECK.sort((a, b) => {
        return b[sortingField] - a[sortingField];
    });

    return (
        <>
            {ID_CHECK.map(diary => (
                <Diary key={diary.id} DiaryObj={diary} />
            ))}
        </>
    );
};

export default DiaryCard;
