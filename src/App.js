import "./App.css";
import Toggler from "./components/Toggler/Toggler";
import { useState } from "react";
import EmpForm from "./components/EmpForm/EmpForm";
import rawData from "./zamestnanciData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import EmpList from "./components/EmpList/EmpList";
import WorkForm from "./components/WorkForm/WorkForm";

function App() {
  const [listOfEmps, setListOfEmps] = useState(rawData.zamestnanci);
  const [newEmp, setNewEmp] = useState({
    id:
      listOfEmps.length > 0
        ? Math.max(...listOfEmps.map((emp) => emp.id)) + 1
        : 1,
    name: "",
    surname: "",
    sex: "muž",
  });
  const [activeTab, setActiveTab] = useState(1);
  const handleChoose = (source) => {
    switch (source) {
      case "list-of-emp": {
        setActiveTab(1);
        break;
      }
      case "work": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };
  const handleDelete = (idToDelete) => {
    setListOfEmps(listOfEmps.filter((emp) => emp.id !== idToDelete));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedEmp = { ...newEmp, [name]: value };
    setNewEmp(updatedEmp);
  };
  const [valid, setValid] = useState(false);
  const handleAdd = () => {
    if (newEmp.name === "" || newEmp.surname === "") {
      alert("Špatně zadaný zaměstnanec");
    } else {
      setListOfEmps((listOfEmps) => {
        return [...listOfEmps, newEmp];
      });
      const newEmpId = newEmp.id + 1;
      const updatedEmp = {
        id: newEmpId,
        name: "",
        surname: "",
        sex: "",
      };
      setNewEmp(updatedEmp);
    }
  };
  const empsRequirements = {
    zena: 0.5,
    muz: 1,
  };
  const [workNeeds, setWorkNeeds] = useState({
    potreba: "",
  });
  //podminky
  const handleAddToJobs = (temp) => {
    const totalRequirements = {
      mozno:
        empsRequirements.zena *
          listOfEmps.filter((emp) => emp.sex === "žena").length +
        empsRequirements.muz *
          listOfEmps.filter((emp) => emp.sex === "muž").length,
    };
    const temporaryStorage = {
      potreba: temp.metru / temp.hodin,
    };
    setWorkNeeds(temporaryStorage);
    if (temp.metru === 0 || temp.hodin === 0) {
      alert("Špatně zadaná práce");
    } else {
      const isValid = temporaryStorage.potreba;

      if (totalRequirements.mozno >= temporaryStorage.potreba) {
        setValid(isValid);
        //alert("Dostatek pracovníků pro přidání práce");
      } else {
        setValid(!isValid);
        //alert("Nedostatek pracovníků pro přidání práce");
      }
    }
  };
  const buttonStyle = {
    backgroundColor: valid ? "green" : "red",
  };
  //end-podminky
  return (
    <div className="App">
      <PageContainer>
        <Toggler active={activeTab} onChoose={handleChoose} />
        {activeTab === 1 && (
          <>
            <EmpList data={listOfEmps} onDelete={handleDelete} />
            <EmpForm data={newEmp} onChange={handleChange} onAdd={handleAdd} />
          </>
        )}
        {activeTab === 2 && (
          <>
            <h3>Aktuální možnosti</h3>
            <p>Mužů: {listOfEmps.filter((emp) => emp.sex === "muž").length}</p>
            <p>Žen: {listOfEmps.filter((emp) => emp.sex === "žena").length}</p>
            <WorkForm
              onAdd={handleAddToJobs}
              validation={valid}
              buttonStyle={buttonStyle}
            />
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default App;
