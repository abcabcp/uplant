import { Link } from "react-router-dom";
import PlantCard from "components/PlantCard";
import Container from "components/Container";
import Tab from "components/Tab";
import LogOut from "components/LogOut";

const PlantList = () => {
  return (
    <Container>
      <div className="tab_menu">
        <Tab to="/PlantList" active={true} boxShadow={true}>plant</Tab>
        <Tab to="/DiaryList" boxShadow={true} noActive={true}>diary</Tab>

        <Tab to="/PlantPlus" plus={true} >+</Tab>
      </div>
      <PlantCard />
      <LogOut />
    </Container>
  );
};

export default PlantList;
