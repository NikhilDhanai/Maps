import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

const nationalParksNE = [
  {
    id: "kaziranga",
    name: "Kaziranga National Park & Tiger Reserve",
    coords: [26.6, 93.33],
  },
  {
    id: "manas",
    name: "Manas National Park & Tiger Reserve",
    coords: [26.73, 91.0],
  },
  {
    id: "namdapha",
    name: "Namdapha National Park & Tiger Reserve",
    coords: [27.5, 96.38],
  },
  {
    id: "nameri",
    name: "Nameri National Park & Tiger Reserve",
    coords: [27.0, 92.8],
  },
  {
    id: "orang",
    name: "Orang National Park & Tiger Reserve",
    coords: [26.55, 92.25],
  },
  { id: "dampa", name: "Dampa Tiger Reserve", coords: [23.71, 92.49] },
  { id: "pakhui", name: "Pakhui/Pakke Tiger Reserve", coords: [27.0, 92.9] },
  {
    id: "balphakram",
    name: "Balphakram National Park",
    coords: [25.33, 90.83],
  },
  { id: "singalila", name: "Singalila National Park", coords: [27.1, 88.0] },
  {
    id: "khangchendzonga",
    name: "Khangchendzonga National Park",
    coords: [27.71, 88.2],
  },
  { id: "keibul", name: "Keibul Lamjao National Park", coords: [24.49, 93.78] },
  {
    id: "dibang_tr",
    name: "Dibang Wildlife Sanctuary & Tiger Reserve",
    coords: [28.8, 95.7],
  }, // Arunachal Pradesh
  { id: "mouling_np", name: "Mouling National Park", coords: [28.57, 94.91] }, // Arunachal Pradesh
  { id: "kamlang_tr", name: "Kamlang Tiger Reserve", coords: [27.68, 96.37] }, // Arunachal Pradesh
  {
    id: "dibru_saikhowa_np",
    name: "Dibru-Saikhowa National Park",
    coords: [27.63, 95.32],
  }, // Assam
  {
    id: "dehing_patkai_np",
    name: "Dehing Patkai National Park",
    coords: [27.3, 95.85],
  }, // Assam
  {
    id: "pabitora_wls",
    name: "Pabitora Wildlife Sanctuary",
    coords: [26.26, 92.08],
  }, // Assam
  { id: "raimona_np", name: "Raimona National Park", coords: [26.78, 89.8] }, // Assam
  { id: "ntangki_np", name: "Ntangki National Park", coords: [25.74, 93.62] }, // Nagaland
  { id: "nokrek_np", name: "Nokrek National Park", coords: [25.48, 90.58] }, // Meghalaya
  { id: "murlen_np", name: "Murlen National Park", coords: [23.64, 93.32] }, // Mizoram
  {
    id: "phawngpui_np",
    name: "Phawngpui Blue Mountain National Park",
    coords: [22.55, 93.02],
  }, // Mizoram
  {
    id: "clouded_leopard_np",
    name: "Clouded Leopard National Park",
    coords: [23.86, 91.27],
  }, // Tripura
  { id: "bison_np", name: "Bison National Park", coords: [23.67, 91.28] }, // Tripura
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

const NortheastQuiz = () => {
  const [shuffledParks, setShuffledParks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredParks, setAnsweredParks] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();
  useEffect(() => {
    setShuffledParks(shuffleArray(nationalParksNE));
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
        center={[26, 93]} // Centered around the Northeast region
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

export default NortheastQuiz;
