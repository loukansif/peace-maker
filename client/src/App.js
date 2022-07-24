import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/Nav";
import Home from "./components/Home";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PageNotFound from './components/PageNotFound'
import Profil from './components/Profil'
import Filter from './components/Filter'
import Settings from './components/Settings'
import Footer from "./components/Footer";
import FormNewHaiku from "./components/FormNewHaiku";
import MoodSelection from "./components/MoodSelection";


export default function App() {
  return (
    <>
      
      <div className="App">
      <div className="animation-area">
        <ul className="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
        <Routes>
          <Route path="/" element={<><Nav /><Home /></>} />
          <Route path="/inscription" element={<><SignUp /></>} />
          <Route path="/connexion" element={<><SignIn /></>} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/inscription" element={<SignUp />} /> */}
          {/* <Route path="/connexion" element={<SignIn />} /> */}
          <Route path="/newhaiku" element={<FormNewHaiku />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/:userId" element={<Filter />} />
          <Route path="/parametres" element={<><Settings /></>} />
          <Route path="*" element={<><Nav /><PageNotFound /></>} />
          <Route path="/moodselection" element={<><Nav /><MoodSelection /></>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
