import { Link } from "react-router-dom";
import LogOut from "components/LogOut";
import DiaryCard from "components/DiaryCard";

const diaryList = () => {
  return (
    <>
      <div className="tab_menu">
        <Link to="/PlantList">plant</Link>
        <Link to="/DiaryList">diary</Link>
        <Link to="/DiaryPlus">+</Link>
        <DiaryCard />
        <LogOut />
      </div>
    </>
  );
};

export default diaryList;
