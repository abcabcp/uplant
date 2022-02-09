import { dbService } from "fbase";
import { useState, useEffect } from "react";

const PlantCard = () => {
  const [plant, setPlant] = useState("");
  const [plants, setPlants] = useState([]);

  const getPlants = async () => {
    const dbPlants = await dbService.collection("plants").get();
    dbPlants.forEach((document) => {
      const plantObject = { ...document.data(), id: document.id };
      setPlants((prev) => [plantObject, ...prev]);
    });
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <>
      {plants.map((plant) => (
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
