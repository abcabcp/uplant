import { Link } from "react-router-dom";
import LogOut from "components/LogOut";
import PlantCard from "components/PlantCard";

const PlantList = () => {
  return (
    <>
      <div className="tab_menu">
        <Link to="/PlantList">plant</Link>
        <Link to="/DiaryList">diary</Link>
        <Link to="/PlantPlus">+</Link>
        <PlantCard />
      </div>
    </>
  );
};

export default PlantList;
