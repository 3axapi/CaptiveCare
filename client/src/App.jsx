import React from "react";
import { useState, useEffect } from "react";
import LoginComponent from "./components/LoginComponent";
import PrisonerComponent from "./components/PrisonerComponent";
import PrisonersComponent from "./components/PrisonersComponent";
import AddPrisonersComponent from "./components/AddPrisonersComponent";
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [prisoners, setPrisoners] = useState([]);
  const [prisoner, setPrisoner] = useState({});

  async function fetchPrisoners() {
    try {
      const response = await axios.get('/api/prisoners');
      const chosen_prisoner = response.data.find(chosen => chosen.is_chosen);
      if (chosen_prisoner) setPrisoner(chosen_prisoner);
      setPrisoners(response.data);
    } catch (error) {
      console.error('Failed to fetch prisoners:', error);
    }
  };

  async function unsetChosenPrisoner(prisonerID) {
    try {
      await axios.patch(`/api/prisoners/${prisonerID}`, { is_chosen: false });
      fetchPrisoners();
    } catch (error) {
      console.error('Failed to unset chosen prisoner:', error);
    }
  }

  function returnLink() {
    if (location.pathname !== "/") {
      return <Link to="/prisoners" className="li-pris">Lista więżniów</Link>
    }
  }

  useEffect(() => {
    fetchPrisoners();
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            { returnLink() }
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/prisoners" element={<PrisonersComponent fetcher={fetchPrisoners} prisoners={prisoners} />} />
        <Route path="/prisoners/new-prisoner" element={<AddPrisonersComponent />} />
        <Route path={`/prisoners/prisoner-${prisoner._id}`} element={<PrisonerComponent chosen_prisoner={prisoner} onExit={() => unsetChosenPrisoner(prisoner._id)} />} />
      </Routes>
    </>
  );
}

export default App;