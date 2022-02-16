import { Link } from "react-router-dom";
import LogOut from "components/LogOut";
import DiaryCard from "components/DiaryCard";
import Container from "components/Container";
import Tab from "components/Tab";

const diaryList = () => {
  return (
    <Container textAlign={"start"}>
      <div className="tab_menu">
        <Tab to="/PlantList" boxShadow={true}>plant</Tab>
        <Tab to="/DiaryList" active={true} boxShadow={true}>diary</Tab>
        <Tab to="/PlantPlus" width={"25px"} backgroundColor={"#e5e5e5"} lineHeight={"30px"} marginLeft={true}>+</Tab>
      </div>
      <DiaryCard />
      <LogOut />
    </Container>
  );
};

export default diaryList;
