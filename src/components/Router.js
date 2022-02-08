import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "routes/Login";
import PlantList from "routes/PlantList";
import PlantPlus from "routes/PlantPlus";
import DiaryList from "routes/DiaryList";

const AppRouter = ({ loginIn }) => {
  return (
    <Router>
      <Switch>
        <>
          {loginIn ? (
            <Route exact path="/" component={PlantList}></Route>
          ) : (
            <Route exact path="/">
              <Login />
            </Route>
          )}
          <Route path="/PlantList" component={PlantList}></Route>
          <Route path="/DiaryList" component={DiaryList}></Route>
          <Route path="/PlantPlus" component={PlantPlus}></Route>
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
