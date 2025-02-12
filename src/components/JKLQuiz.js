import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NationalParkMap from "./NationalParkMap";

const nationalParksJKL = [
  { id: "hemis", name: "Hemis National Park", coords: [34.12, 77.57] },
  { id: "dachigam", name: "Dachigam National Park", coords: [34.26, 74.89] },
  { id: "kishtwar", name: "Kishtwar National Park", coords: [33.41, 75.77] },
  { id: "salim_ali", name: "Salim Ali National Park", coords: [34.1, 74.86] },
  {
    id: "karakoram",
    name: "Karakoram Wildlife Sanctuary",
    coords: [35.17, 77.58],
  }, // Ladakh
  {
    id: "changthang",
    name: "Changthang Wildlife Sanctuary",
    coords: [33.67, 78.5],
  }, // Ladakh
  { id: "sultanpur", name: "Sultanpur National Park", coords: [28.46, 76.89] }, // Haryana
  { id: "kalesar", name: "Kalesar National Park", coords: [30.3, 77.47] }, // Haryana
  { id: "nangal", name: "Nangal Wildlife Sanctuary", coords: [31.39, 76.38] }, // Punjab
  {
    id: "bhindawas",
    name: "Bhindawas Wildlife Sanctuary",
    coords: [28.47, 76.55],
  }, // Haryana
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

const JKLQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  // Shuffle the parks on mount
  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksJKL));
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
        center={[32.5, 77]}
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

export default JKLQuiz;
