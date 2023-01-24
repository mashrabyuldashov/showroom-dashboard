import { Route, Routes } from "react-router-dom";
import "./App.css";
import Companys from "./Pages/Companys/Companys";
import Furnute_types from "./Pages/Furnuture_types/Furnute_types";
import Login from "./Pages/Login/Login";
import Models from "./Pages/Models/Models";
import NotFound from "./Pages/NotFound/NotFound";
import Roles from "./Pages/Roles/Roles";
import Tissues from "./Pages/Tissues/Tissues";
import Users from "./Pages/Users/Users";
import Private from "./Routes/Private";
import Public from "./Routes/Public";
import { Provider as GetFetchProvider } from "./Context/GetFetchContext/GetFetchContext";

function App() {
  return (
    <GetFetchProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Private />}>
            <Route path="/" element={<Roles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companys" element={<Companys />} />
            <Route path="/furniture_types" element={<Furnute_types />} />
            <Route path="/models" element={<Models />} />
            <Route path="/tissues" element={<Tissues />} />
          </Route>
          <Route path="/" element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </GetFetchProvider>
  );
}

export default App;
