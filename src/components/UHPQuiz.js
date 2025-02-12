import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksUHP = [
  {
    id: "valley_of_flowers",
    name: "Valley of Flowers National Park",
    coords: [30.73, 79.65],
  },
  {
    id: "nanda_devi",
    name: "Nanda Devi National Park",
    coords: [30.41, 79.97],
  },
  {
    id: "great_himalayan",
    name: "Great Himalayan National Park",
    coords: [31.78, 77.35],
  },
  {
    id: "pin_valley",
    name: "Pin Valley National Park",
    coords: [32.01, 77.75],
  },
  { id: "kugti", name: "Kugti Wildlife Sanctuary", coords: [32.43, 76.87] },
  {
    id: "inderkilla",
    name: "Inderkilla National Park",
    coords: [32.07, 77.22],
  }, // HP
  { id: "khirganga", name: "Khirganga National Park", coords: [31.99, 77.46] }, // HP
  {
    id: "chandratal",
    name: "Chandratal Wildlife Sanctuary",
    coords: [32.48, 77.62],
  }, // HP
  {
    id: "simbalbara",
    name: "Simbalbara National Park",
    coords: [30.45, 77.44],
  }, // HP
  { id: "renuka", name: "Renuka Wildlife Sanctuary", coords: [30.6, 77.48] }, // HP
  {
    id: "govind",
    name: "Govind Pashu Vihar National Park",
    coords: [31.0, 78.43],
  }, // Uttarakhand
  { id: "gangotri", name: "Gangotri National Park", coords: [30.99, 78.93] }, // Uttarakhand
  { id: "askot", name: "Askot Wildlife Sanctuary", coords: [29.74, 80.16] }, // Uttarakhand
  {
    id: "rajaji",
    name: "Rajaji National Park & Tiger Reserve",
    coords: [30.15, 77.89],
  }, // Uttarakhand
  {
    id: "jim_corbett",
    name: "Jim Corbett National Park & Tiger Reserve",
    coords: [29.53, 78.77],
  }, // Uttarakhand
];

// 🎤 Function to announce the park name
const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
};

// 🔀 Function to shuffle the parks for variety
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const UHPQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksUHP));
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
        center={[31.5, 78.5]} // ✅ Centered on Uttarakhand & Himachal
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

export default UHPQuiz;
