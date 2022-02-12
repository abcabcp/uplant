import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Plant from "components/Plant";

const PlantCard = ({ userObj }) => {
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
        <Plant key={plant.id} PlantObj={plant} />
      ))}
    </>
  );
};

export default PlantCard;
