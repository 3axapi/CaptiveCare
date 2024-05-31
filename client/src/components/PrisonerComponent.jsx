import React, { useState } from 'react';
import "./PrisonerComponent.css";
import Input from "./input"

function PrisonerComponent({ prisoner, onClose, onUpdate, onDelete }) {
  const [data, setData] = useState(prisoner ?? {});

  const handleOperation = (isDelete) => () => {
    if (isDelete) {
      if (typeof onDelete === "function") {
        onDelete(prisoner._id, onClose);
      }
    } else {
      if (typeof onUpdate === "function") {
        onUpdate(data, onClose);
      }
    }
  }

  if (!prisoner) {
    return null;
  }

  return (
    <div>
      <Input name="firstName" caption="Imię" data={data} setData={setData} />
      <Input name="lastName" caption="Nazwisko" data={data} setData={setData} />
      <Input name="pesel" caption="PESEL" data={data} setData={setData} />
      <Input name="reason" caption="Przyczyna" data={data} setData={setData} />
      <Input name="explanation" caption="Wyjasnienie" data={data} setData={setData} />

      <div className='dialog-button'>
        <button className='btn-operation' onClick={handleOperation(true)}>delete</button>
        <button className='btn-operation' onClick={handleOperation(false)}>Save</button>
      </div>
    </div>
  );
}

export default PrisonerComponent;
