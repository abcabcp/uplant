import { Route, Routes, HashRouter} from "react-router-dom";
import Login from "routes/Login";
import PlantList from "routes/PlantList";
import PlantPlus from "routes/PlantPlus";
import DiaryList from "routes/DiaryList";
import DiaryPlus from "routes/DiaryPlus";
import NotFound from "routes/NotFound";

const AppRouter = ({ loginIn }) => {
  return (
    <HashRouter>
      <Routes>
        {loginIn ? (
          <Route path="/" element={<PlantList />} exact={true} />
        ) : (
          <Route path="/Login" element={<Login />} />
        )}
        <Route path="/PlantList" element={<PlantList />}></Route>
        <Route path="/PlantPlus" element={<PlantPlus />}></Route>
        <Route path="/DiaryList" element={<DiaryList />}></Route>
        <Route path="/DiaryPlus" element={<DiaryPlus />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};
export default AppRouter;
