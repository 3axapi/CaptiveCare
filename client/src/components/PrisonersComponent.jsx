import "./PrisonersComponent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPrisonersComponent from "./AddPrisonersComponent";
import { motion, AnimatePresence } from "framer-motion";
import PrisonerComponent from "./PrisonerComponent";
import { Dialog } from "./dialog";

function PrisonersComponent(props) {
  const [prisoners, setPrisoners] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPrision, setSelectedPrision] = useState(null);

  async function fetchPrisoners() {
    try {
      const response = await axios.get('/api/prisoners');
      setPrisoners(response.data);
    } catch (error) {
      console.error('Failed to fetch prisoners:', error);
    }
  }

  const handelOperation = (isDelete) => async (data, onClose) => {
    try {
      if (isDelete) {
        await axios.delete(`/api/prisoners/${data}`);
      }
      else {
        await axios.put(`/api/prisoners/${data._id}`, data);
      }
      await fetchPrisoners();
    } catch (error) {
      console.error('Failed to fetch prisoners:', error);
    }
    if (typeof onClose === "function") onClose();
  }

  useEffect(() => {
    props.fetcher();

    let user = localStorage.getItem("user");
    if (user) {
      try {
        user = JSON.parse(user);
        if (user.isAuth) return;
        else navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  function returnList(prisoner) {
    return (
      <motion.tr
        layoutId={prisoner._id}
        onClick={() => setSelectedPrision(prisoner._id)}
        className="prisonerdata"
        key={prisoner._id}
      >
        <td>{prisoner.firstName}</td>
        <td>{prisoner.lastName}</td>
        <td>{prisoner.pesel}</td>
        <td>{prisoner.reason}</td>
      </motion.tr>
    );
  }

  return (
    <div className="prisoners-container">
      <div className="container-header">
        <div>
          <motion.button className="btn-dodac" layoutId={1} onClick={() => setSelectedId(1)}>
            Dodać więżnia
          </motion.button>
        </div>
      </div>
      <div style={{ maxHeight: 200, overflow: "auto", paddingTop: 12 }}>
        <table className="prisoners-table">
          <thead>
            <tr>
              <th>Imie</th>
              <th>Nazwisko</th>
              <th>PESEL</th>
              <th>Przyczyna</th>
            </tr>
          </thead>
          <tbody>
            {prisoners.map(prisoner => returnList(prisoner))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedId && (
          <Dialog
            layoutId={selectedId}
            caption="Dodaj więźniów"
            content={
              <AddPrisonersComponent
                onClick={() => {
                  setSelectedId(null);
                  fetchPrisoners();
                }}
              />
            }
            onClose={setSelectedId}
          />
        )}
        {selectedPrision && (
          <Dialog
            layoutId={selectedPrision}
            caption="Info i aktualizacja więźniów"
            content={
              <PrisonerComponent
                prisoner={prisoners.find(item => item._id === selectedPrision)}
                onClose={() => setSelectedPrision(null)}
                onUpdate={handelOperation(false)}
                onDelete={handelOperation(true)}
              />
            }
            onClose={setSelectedPrision}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PrisonersComponent;
