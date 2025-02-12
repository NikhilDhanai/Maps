import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksRG = [
  // Rajasthan
  {
    id: "ranthambore",
    name: "Ranthambore National Park & Tiger Reserve",
    coords: [26.0173, 76.5026],
  },
  {
    id: "sariska",
    name: "Sariska National Park & Tiger Reserve",
    coords: [27.3284, 76.4376],
  },
  {
    id: "mukundra",
    name: "Mukundra Hills Tiger Reserve",
    coords: [24.8834, 75.5586],
  },
  {
    id: "keoladeo",
    name: "Keoladeo National Park",
    coords: [27.1591, 77.5219],
  },
  { id: "desert", name: "Desert National Park", coords: [26.8556, 70.5546] },
  {
    id: "kumbhalgarh",
    name: "Kumbhalgarh Wildlife Sanctuary",
    coords: [25.1502, 73.5804],
  },

  // Gujarat
  {
    id: "gir",
    name: "Gir National Park & Wildlife Sanctuary",
    coords: [21.1243, 70.8242],
  },
  {
    id: "blackbuck",
    name: "Blackbuck National Park, Velavadar",
    coords: [21.7756, 72.0834],
  },
  {
    id: "marine",
    name: "Marine National Park, Gulf of Kutch",
    coords: [22.4751, 69.3302],
  },
  { id: "vansda", name: "Vansda National Park", coords: [20.75, 73.4667] },
  {
    id: "thol_lake_wls",
    name: "Thol Lake Wildlife Sanctuary",
    coords: [23.17, 72.38],
  }, // Gujarat
  {
    id: "khijadiya_wls",
    name: "Khijadiya Wildlife Sanctuary",
    coords: [22.5, 70.08],
  }, // Gujarat
  {
    id: "gaga_wls",
    name: "Gaga (Great Indian Bustard) Wildlife Sanctuary",
    coords: [22.1, 69.2],
  }, // Gujarat
  {
    id: "wild_ass_wls",
    name: "Wild Ass Wildlife Sanctuary",
    coords: [23.7, 71.0],
  }, // Gujarat
  {
    id: "kachh_desert_wls",
    name: "Kachchh Desert Wildlife Sanctuary",
    coords: [23.83, 70.35],
  }, // Gujarat
  {
    id: "ramgarh_vishdhari_tr",
    name: "Ramgarh Vishdhari Tiger Reserve",
    coords: [25.25, 75.95],
  }, // Rajasthan
  {
    id: "dholpur_karauli_tr",
    name: "Dholpur Karauli Tiger Reserve",
    coords: [26.75, 77.2],
  }, // Rajasthan
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

const RGQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksRG));
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
        center={[25, 73]} // Centered around Rajasthan & Gujarat
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

export default RGQuiz;
