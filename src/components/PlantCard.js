import { dbService } from "fbase";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
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
  const sortingField = "createAt";

  ID_CHECK.sort((a,b) => {
    return a[sortingField] -b[sortingField];
  });

  console.log(ID_CHECK);

  return (
    <div>
      {ID_CHECK.map((plant) => (
        <Plant key={plant.id} PlantObj={plant} />
      ))}
    </div>
  );
};

export default PlantCard;
