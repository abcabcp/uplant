import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "routes/Login";
import PlantList from "routes/PlantList";

const AppRouter = ({ loginIn }) => {
  return (
    <Router>
      <Switch>
        {loginIn ? (
          <Route exact path="/">
            <PlantList />
          </Route>
        ) : (
          <Route exact path="/">
            <Login />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
