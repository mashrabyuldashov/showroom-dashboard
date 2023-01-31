import accounting from "accounting";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

const TissueConf = () => {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [sendTissueConfLoad, setTissueConfLoad] = useState(false);
  const { tissueId, id } = useParams();
  const [tissueConfs, setTissueConfs] = useState([]);
  const [tissueConfData, setTissueConfData] = useState({
    name: "",
    color: "",
    hex_color: "",
    tissue: tissueId,
  });

  const [tissue, setTissue] = useState();

  useEffect(() => {
    axios
      .get(`tissue/${tissueId}`)
      .then((res) => {
        setTissue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/tissue-conf")
      .then((res) => setTissueConfs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const data = {
    headerInfos: {
      title: "Tissues Configuration",
      btnTitle: "Add Config",
    },
  };

  const sendTissueConf = (e) => {
    e.preventDefault();
    setTissueConfLoad(true);
    console.log(tissueConfData.hex_color, "buum");
    axios
      .post("/tissue-conf", {
        name: tissueConfData.name,
        color: tissueConfData.color,
        hex_color: tissueConfData.hex_color,
        tissue: tissueConfData.tissue,
      })
      .then((res) => console.log(res))
      .finally(() => {
        setTissueConfLoad(false);
        setIsOpen(false);
        axios.get("/tissue-conf").then((res) => setTissueConfs(res.data));
      });
  };

  console.log(tissueConfs);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        <Link style={{ color: "white" }} to="/tissues">
          <h3>{"< Back To Tissues"}</h3>
        </Link>

        <div>
          <h1 style={{ textAlign: "center", color: "white" }}>
            Tissue: {tissue?.name}
          </h1>

          <div className="edit-price-section">
            {tissueConfs &&
              tissueConfs.map((e, i) => {
                return (
                  <div key={i + 1} className="conf-boxes">
                    <div className="head-conf-box">
                      <p>Name: {e.name}</p>
                      <p>
                        Color: <b>{e.color}</b>
                      </p>
                      <p>Hex Color: {e.hex_color}</p>
                    </div>
                    <button>Edit conf</button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        onSubmit={(e) => sendTissueConf(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Config</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a config name</span>
            <input
              required={true}
              type="text"
              onChange={(e) =>
                setTissueConfData({ ...tissueConfData, name: e.target.value })
              }
              placeholder="config name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a config color</span>
            <input
              required={true}
              type="text"
              onChange={(e) =>
                setTissueConfData({ ...tissueConfData, color: e.target.value })
              }
              placeholder="config color"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a config hex color</span>
            <input
              required={true}
              type="color"
              onChange={(e) => {
                setTissueConfData({
                  ...tissueConfData,
                  hex_color: e.target.value,
                });
                console.log(e.target.value);
              }}
              placeholder="config hex color"
            />
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendTissueConfLoad ? "loading..." : "Add Model"}
        </button>
      </form>
    </div>
  );
};

export default TissueConf;
