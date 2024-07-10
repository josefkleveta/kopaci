import React from "react";
import "./EmpForm.css";

function EmpForm({ data, onChange, validation, onAdd }) {
  return (
    <div className="emp-form">
      <input
        type="text"
        placeholder="Jméno"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Příjmení"
        name="surname"
        value={data.surname}
        onChange={onChange}
      />
      <div>
        <input
          type="radio"
          name="sex"
          value="muž"
          checked={data.sex === "muž"}
          onChange={onChange}
        />
        <label htmlFor="level">muž</label>

        <input
          type="radio"
          name="sex"
          value="žena"
          checked={data.sex === "žena"}
          onChange={onChange}
        />
        <label htmlFor="level">žena</label>
      </div>
      <button onClick={onAdd}>Přidat zaměstnance</button>
    </div>
  );
}

export default EmpForm;
