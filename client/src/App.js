import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/Nav";
import Home from "./components/Home";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<SignUp />} />
          <Route path="/connexion" element={<SignIn />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
