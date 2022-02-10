import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PlantCard = ({ userObj }) => {
  const [plant, setPlant] = useState("");
  const [plants, setPlants] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    dbService.collection("plants").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setPlants(newArray);
    });
  }, []);

  const ID_CHECK = plants.filter((plant) => plant.p_auth === uid);
  console.log(ID_CHECK);

  return (
    <>
      {ID_CHECK.map((plant) => (
        <div key={plant.id}>
          <div>이미지</div>
          <div>
            <h2>{plant.p_kind}</h2>
            <div>{plant.p_nickname}</div>
            <div>{plant.p_waterday}</div>
            <div>{plant.p_birthDate}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PlantCard;
