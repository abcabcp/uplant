import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "routes/Login";
import PlantList from "routes/PlantList";
import PlantPlus from "routes/PlantPlus";
import DiaryList from "routes/DiaryList";

const AppRouter = ({ loginIn, useObj }) => {
  return (
    <Router>
      <Routes>
        <>
          {loginIn ? (
            <Route path="/*" element={<PlantList />} exact={true} />
          ) : (
            <Route path="/Login" element={<Login />} />
          )}
          <Route path="/PlantList" element={<PlantList />}></Route>
          <Route path="/DiaryList" element={<DiaryList />}></Route>
          <Route path="/PlantPlus" element={<PlantPlus />}></Route>
        </>
      </Routes>
    </Router>
  );
};

export default AppRouter;
