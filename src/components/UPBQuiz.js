import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";
const nationalParksUPB = [
  {
    id: "dudhwa_np",
    name: "Dudhwa National Park and Tiger Reserve",
    coords: [28.58, 80.57],
  },
  { id: "valmiki_np", name: "Valmiki National Park", coords: [27.32, 84.18] },
  { id: "pilibhit_tr", name: "Pilibhit Tiger Reserve", coords: [28.63, 79.97] },
  { id: "amangarh_tr", name: "Amangarh Tiger Reserve", coords: [29.54, 78.55] },
  { id: "valmiki_np", name: "Valmiki National Park", coords: [27.32, 84.18] }, // Bihar
  {
    id: "ranipur_tr",
    name: "Ranipur Wildlife Sanctuary & Tiger Reserve",
    coords: [25.23, 81.22],
  }, // UP
  {
    id: "kanwarjheel",
    name: "Kanwarjheel Wildlife Sanctuary",
    coords: [25.47, 86.15],
  }, // Bihar
  {
    id: "kaimur_tr",
    name: "Kaimur Wildlife Sanctuary & Tiger Reserve",
    coords: [24.83, 83.6],
  }, // Bihar
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

const UPBQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksUPB));
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
        center={[27.5, 81]}
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

export default UPBQuiz;
