import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksMPM = [
  {
    id: "kanha",
    name: "Kanha National Park & Tiger Reserve",
    coords: [22.33, 80.61],
  },
  {
    id: "bandhavgarh",
    name: "Bandhavgarh National Park & Tiger Reserve",
    coords: [23.69, 81.03],
  },
  {
    id: "pench",
    name: "Pench National Park & Tiger Reserve",
    coords: [21.76, 79.32],
  }, // Shared MP & MH
  {
    id: "satpura",
    name: "Satpura National Park & Tiger Reserve",
    coords: [22.5, 78.22],
  },
  {
    id: "panna",
    name: "Panna National Park & Tiger Reserve",
    coords: [24.63, 80.08],
  },
  {
    id: "sanjay",
    name: "Sanjay-Dubri National Park & Tiger Reserve",
    coords: [23.89, 81.96],
  },
  { id: "madhav", name: "Madhav National Park", coords: [25.5, 77.91] },
  { id: "van_vihar", name: "Van Vihar National Park", coords: [23.25, 77.41] },
  {
    id: "tadoba",
    name: "Tadoba-Andhari National Park & Tiger Reserve",
    coords: [20.24, 79.35],
  },
  {
    id: "sanjay_gandhi",
    name: "Sanjay Gandhi National Park",
    coords: [19.21, 72.91],
  },
  { id: "navegaon", name: "Navegaon National Park", coords: [20.96, 80.17] },
  { id: "gugamal", name: "Gugamal National Park", coords: [21.46, 77.17] },
  { id: "chandoli", name: "Chandoli National Park", coords: [17.16, 73.77] },
  { id: "sahyadri_tr", name: "Sahyadri Tiger Reserve", coords: [17.66, 73.78] }, // Maharashtra
  { id: "melghat_tr", name: "Melghat Tiger Reserve", coords: [21.62, 77.33] }, // Maharashtra
  { id: "bor_tr", name: "Bor Tiger Reserve", coords: [20.75, 78.88] }, // Maharashtra
  {
    id: "dinosaur_fossil_np",
    name: "Dinosaur Fossil National Park",
    coords: [22.5, 75.0],
  }, // Madhya Pradesh
  {
    id: "mandla_fossil_np",
    name: "Mandla Fossil National Park",
    coords: [23.25, 80.38],
  }, // Madhya Pradesh
  {
    id: "durgawati_tr",
    name: "Durgawati Wildlife Sanctuary & Tiger Reserve",
    coords: [23.48, 80.03],
  }, // Madhya Pradesh
  {
    id: "ratapani_tr",
    name: "Ratapani Wildlife Sanctuary & Tiger Reserve",
    coords: [23.27, 77.58],
  }, // Madhya Pradesh
  { id: "kuno_np", name: "Kuno National Park", coords: [25.88, 77.4] }, // Madhya Pradesh
  {
    id: "chambal_wls",
    name: "Chambal Wildlife Sanctuary",
    coords: [26.45, 78.67],
  }, // Madhya Pradesh
  {
    id: "gandhi_sagar_wls",
    name: "Gandhi Sagar Wildlife Sanctuary",
    coords: [24.58, 75.52],
  }, // Madhya Pradesh
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
};

const MPMQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksMPM));
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
        center={[22, 78]} // Centering on MP & MH
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

export default MPMQuiz;
