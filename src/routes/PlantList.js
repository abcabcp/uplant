import { Link } from "react-router-dom";
import PlantCard from "components/PlantCard";
import Container from "components/Container";
import Tab from "components/Tab";

const PlantList = () => {
  return (
    <Container textAlign={"start"}>
      <div className="tab_menu">
        <Tab to="/PlantList" active={true} boxShadow={true}>plant</Tab>
        <Tab to="/DiaryList" boxShadow={true}>diary</Tab>
        <Tab to="/PlantPlus" width={"25px"} backgroundColor={"#e5e5e5"} lineHeight={"30px"} marginLeft={true}>+</Tab>
      </div>
      <PlantCard />
    </Container>
  );
};

export default PlantList;
