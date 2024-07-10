import React, { useEffect, useState, useRef } from "react";
import "./WorkForm.css";

function WorkForm({ onAdd, buttonStyle, validation }) {
  const [tempStorage, setTempStorage] = useState({
    metru: "",
    hodin: "",
  });

  //const [disable, setDisable] = useState(true);

  const handleStorage = (event) => {
    const source = event.target.name;
    switch (source) {
      case "metru": {
        setTempStorage({
          metru: event.target.value,
          hodin: tempStorage.hodin,
        });
        break;
      }
      case "hodin": {
        setTempStorage({
          metru: tempStorage.metru,
          hodin: event.target.value,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  //   useEffect(() => {
  //     console.log(tempStorage);
  //   }, [tempStorage]);

  const handleClick = () => {
    const storageToSend = {
      metru: tempStorage.metru === "" ? 0 : parseInt(tempStorage.metru),
      hodin: tempStorage.hodin === "" ? 0 : parseInt(tempStorage.hodin),
    };
    onAdd(storageToSend);
    // setTempStorage({
    //   metru: "",
    //   hodin: "",
    // });
  };

  return (
    <div className="work-form">
      <div style={{ color: "white" }}>Počet kopaných metrů</div>
      <input
        type="number"
        min="0"
        placeholder="Počet metrů"
        name="metru"
        value={tempStorage.metru}
        onChange={handleStorage}
      />
      <br />
      <div style={{ color: "white" }}>Navrhovaný počet hodin</div>
      <input
        type="number"
        min="0"
        placeholder="Počet hodin"
        name="hodin"
        value={tempStorage.hodin}
        onChange={handleStorage}
      />

      {/* <button disabled={disable} onClick={handleClick}> */}
      <button style={buttonStyle} onClick={handleClick}>
        Zjistit splnitelnost
      </button>
    </div>
  );
}

export default WorkForm;
