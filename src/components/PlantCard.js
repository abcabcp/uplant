import { dbService } from 'fbase';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Plant from 'components/PlantEdit';

const PlantCard = () => {
    const [plants, setPlants] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    //firebase에서 실시간으로 plants 컬렉션 값을 가져와서 저장한다.
    useEffect(() => {
        dbService.collection('plants').onSnapshot(snapshot => {
            const newArray = snapshot.docs.map(document => ({
                id: document.id,
                ...document.data(),
            }));
            setPlants(newArray);
        });
    }, []);

    //로그인한 유저의 id값과 작성자의 id값이 같다면 저장한다.
    const ID_CHECK = plants.filter(plant => plant.p_auth === uid);

    //정렬대상 - 마지막으로 물준일자
    const sortingField = 'p_nowwaterday';

    //물준일자가 과거 순으로 정렬
    ID_CHECK.sort((a, b) => {
        return a[sortingField] - b[sortingField];
    });

    return (
        <div>
            {ID_CHECK.map(plant => (
                <Plant key={plant.id} PlantObj={plant} />
            ))}
        </div>
    );
};

export default PlantCard;
