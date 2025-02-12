import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksWB_OJ_CG = [
  {
    id: "sundarbans",
    name: "Sundarbans National Park and Tiger Reserve",
    coords: [21.95, 88.85],
  }, // WB
  { id: "gorumara", name: "Gorumara National Park", coords: [26.7, 88.8] }, // WB
  { id: "buxa", name: "Buxa Tiger Reserve", coords: [26.62, 89.56] }, // WB
  { id: "betla", name: "Betla National Park", coords: [23.83, 84.18] }, // JH
  {
    id: "bhitarkanika",
    name: "Bhitarkanika National Park",
    coords: [20.63, 86.87],
  }, // Odisha
  { id: "similipal", name: "Simlipal Tiger Reserve", coords: [21.76, 86.35] }, // Odisha
  { id: "satkosia", name: "Satkosia Tiger Reserve", coords: [20.58, 84.75] }, // Odisha
  { id: "gudavi", name: "Guru Ghasidas National Park", coords: [23.67, 82.02] }, // Chhattisgarh
  { id: "indravati", name: "Indravati Tiger Reserve", coords: [19.47, 80.97] }, // Chhattisgarh
  {
    id: "udanti",
    name: "Udanti-Sitanadi Tiger Reserve",
    coords: [20.27, 82.26],
  }, // Chhattisgarh
  {
    id: "neora_valley_np",
    name: "Neora Valley National Park",
    coords: [27.05, 88.72],
  }, // West Bengal
  {
    id: "jaldapara_np",
    name: "Jaldapara National Park",
    coords: [26.68, 89.3],
  }, // West Bengal
  { id: "palamau_tr", name: "Palamau Tiger Reserve", coords: [23.8, 84.27] }, // Jharkhand
  {
    id: "chilika_wls",
    name: "Chilika Wildlife Sanctuary",
    coords: [19.69, 85.34],
  }, // Odisha
  {
    id: "kanger_valley_np",
    name: "Kanger Valley National Park",
    coords: [18.87, 81.97],
  }, // Chhattisgarh
  {
    id: "sunabeda_tr",
    name: "Sunabeda Wildlife Sanctuary & Tiger Reserve",
    coords: [20.85, 82.5],
  }, // Odisha
  {
    id: "achanakmar_tr",
    name: "Achanakmar Tiger Reserve",
    coords: [22.42, 81.88],
  }, // Chhattisgarh
];

// 🎤 Function to announce the park name
const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
};

// 🔀 Shuffle function for varied quiz order
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const WBOJCGQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksWB_OJ_CG));
  }, []);

  useEffect(() => {
    if (!shuffledParks.length || isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    speak(shuffledParks[currentIndex].name);
  }, [currentIndex, shuffledParks]);

  const checkAnswer = (clickedPark) => {
    if (clickedPark === shuffledParks[currentIndex].id) {
      setAnsweredParks((prev) => [...prev, clickedPark]);
      setFeedback(`✅ Correct! That’s ${shuffledParks[currentIndex].name}.`);
      if (currentIndex + 1 < shuffledParks.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setFeedback("🎉 Quiz complete!");
      }
    } else {
      setFeedback("❌ Wrong! Try Again.");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Quiz: Click on {shuffledParks[currentIndex]?.name}
      </h1>
      <NationalParkMap
        nationalParks={shuffledParks}
        center={[22.8, 85]} // ✅ Centering on WB, Odisha, Jharkhand, Chhattisgarh
        checkAnswer={checkAnswer}
        answeredParks={answeredParks}
      />
      <p
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {feedback}
      </p>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/ramsar-quiz")}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#0E5793",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Ramsar Quiz 🌊
        </button>
      </div>
    </div>
  );
};

export default WBOJCGQuiz;
