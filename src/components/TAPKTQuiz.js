import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksAPKT = [
  {
    id: "nagarhole",
    name: "Nagarhole National Park & Tiger Reserve",
    coords: [12.2, 76.35],
  },
  {
    id: "bandipur",
    name: "Bandipur National Park & Tiger Reserve",
    coords: [11.69, 76.67],
  },
  {
    id: "bannerghatta",
    name: "Bannerghatta National Park",
    coords: [12.8, 77.57],
  },
  {
    id: "bhadra",
    name: "Bhadra Wildlife Sanctuary & Tiger Reserve",
    coords: [13.4, 75.63],
  },
  {
    id: "srisailam",
    name: "Nagarjunasagar (Srisailam Tiger Reserve)",
    coords: [16.07, 78.87],
  },
  { id: "papikonda", name: "Papikonda National Park", coords: [17.4, 81.67] },
  {
    id: "kasu_brahmananda",
    name: "Kasu Brahmananda Reddy National Park",
    coords: [17.51, 78.4],
  },
  {
    id: "mahavir_harini",
    name: "Mahavir Harina Vanasthali National Park",
    coords: [17.33, 78.52],
  },
  { id: "amarabad_tr", name: "Amarabad Tiger Reserve", coords: [16.35, 78.78] }, // Telangana
  {
    id: "sri_venkateswara_np",
    name: "Sri Venkateswara National Park",
    coords: [13.88, 79.16],
  }, // Andhra Pradesh
  {
    id: "rajiv_gandhi_np",
    name: "Rajiv Gandhi National Park",
    coords: [15.07, 78.87],
  }, // Andhra Pradesh
  { id: "kawal_tr", name: "Kawal Tiger Reserve", coords: [19.5, 79.25] }, // Telangana
  {
    id: "mahadei_wls_tr",
    name: "Mahadei Wildlife Sanctuary & Tiger Reserve",
    coords: [15.47, 74.2],
  }, // Goa
  { id: "mollem_np", name: "Mollem National Park", coords: [15.4, 74.24] }, // Goa
  {
    id: "anshi_dandeli_tr",
    name: "Anshi-Dandeli National Park & Tiger Reserve",
    coords: [15.0, 74.35],
  }, // Karnataka
  {
    id: "kudremukh_np",
    name: "Kudremukh National Park",
    coords: [13.13, 75.3],
  }, // Karnataka
  {
    id: "biligiri_ranganatha_tr",
    name: "Biligiri Ranganatha Tiger Reserve",
    coords: [12.07, 77.15],
  }, // Karnataka
  {
    id: "madhumalai_hills_tr",
    name: "Mudumalai Wildlife Sanctuary & Tiger Reserve",
    coords: [11.57, 76.58],
  }, // Karnataka-TN Border
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

const TAPKTQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksAPKT));
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
        center={[16, 78]}
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
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Ramsar Quiz 🌿
        </button>
      </div>
    </div>
  );
};

export default TAPKTQuiz;
