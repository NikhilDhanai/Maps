import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksKeralaTamilNadu = [
  {
    id: "periyar",
    name: "Periyar National Park & Tiger Reserve",
    coords: [9.45, 77.17],
  },
  {
    id: "silent_valley",
    name: "Silent Valley National Park",
    coords: [11.03, 76.47],
  },
  { id: "mukurthi", name: "Mukurthi National Park", coords: [11.22, 76.58] },
  {
    id: "gulf_of_mannar",
    name: "Gulf of Mannar Marine National Park",
    coords: [9.25, 79.05],
  },
  {
    id: "indira_gandhi",
    name: "Indira Gandhi (Annamalai) National Park & Tiger Reserve",
    coords: [10.35, 77.02],
  },
  {
    id: "kalakad_mundanthurai",
    name: "Kalakad Mundanthurai Tiger Reserve",
    coords: [8.53, 77.41],
  },
  {
    id: "sathyamangalam",
    name: "Sathyamangalam Tiger Reserve",
    coords: [11.5, 77.2],
  },
  {
    id: "srivilliputhur_meghamalai",
    name: "Srivilliputhur-Megamalai Tiger Reserve",
    coords: [9.64, 77.56],
  },
  {
    id: "mudumalai",
    name: "Mudumalai National Park & Tiger Reserve",
    coords: [11.58, 76.63],
  },
  {
    id: "wayanad",
    name: "Wayanad Wildlife Sanctuary",
    coords: [11.8, 76.41],
  }, // Not a NP but significant
  {
    id: "anamudi_shola_np",
    name: "Anamudi Shola National Park",
    coords: [10.21, 77.14],
  }, // Kerala
  {
    id: "eravikulam_np",
    name: "Eravikulam National Park",
    coords: [10.16, 77.04],
  }, // Kerala
  { id: "guindy_np", name: "Guindy National Park", coords: [13.0, 80.23] }, // Tamil Nadu
];

// Function to randomize the order of questions
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
};

const KTNQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();
  // Shuffle the parks on mount
  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksKeralaTamilNadu));
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
        center={[10.5, 77]}
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

export default KTNQuiz;
