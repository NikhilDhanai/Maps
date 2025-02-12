import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NationalParkQuiz from "./components/NationalParkQuiz";
import JKLQuiz from "./components/JKLQuiz"; // ✅ Ensure Correct Import
import UHPQuiz from "./components/UHPQuiz";
import UPBQuiz from "./components/UPBQuiz";
import NortheastQuiz from "./components/NortheastQuiz";
import RGQuiz from "./components/RGQuiz";
import MPMQuiz from "./components/MPMQuiz";
import WBOJCGQuiz from "./components/WBOJCGQuiz";
import TAPKTQuiz from "./components/TAPKTQuiz";
import KTNQuiz from "./components/KTNQuiz";
import RamsarQuiz from "./components/RamsarQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ Specific route for Jammu, Kashmir, Ladakh quiz */}
        <Route path="/quiz/jkl" element={<JKLQuiz />} />
        <Route path="/quiz/uhp" element={<UHPQuiz />} />
        <Route path="/quiz/upb" element={<UPBQuiz />} />
        <Route path="/quiz/neq" element={<NortheastQuiz />} />
        <Route path="/quiz/rgq" element={<RGQuiz />} />
        <Route path="/quiz/mpm" element={<MPMQuiz />} />
        <Route path="/quiz/wbojcg" element={<WBOJCGQuiz />} />
        <Route path="/quiz/tapkt" element={<TAPKTQuiz />} />
        <Route path="/quiz/ktn" element={<KTNQuiz />} />
        <Route path="/ramsar-quiz" element={<RamsarQuiz />} />
        {/* ✅ Generic quiz route for other regions */}
        <Route path="/quiz/:region" element={<NationalParkQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
