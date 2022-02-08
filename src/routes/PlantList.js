import { Link } from "react-router-dom";
import LogOut from "components/LogOut";

const PlantList = () => {
  return (
    <>
      <div className="tab_menu">
        <Link to="/PlantList">plant</Link>
        <Link to="/DiaryList">diary</Link>
        <Link to="/PlantPlus">+</Link>
        <LogOut />
      </div>
    </>
  );
};

export default PlantList;