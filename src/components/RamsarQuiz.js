import React, { useState, useEffect, useRef } from "react";
import NationalParkMap from "./NationalParkMap";
import { useNavigate } from "react-router-dom";

// Ramsar Sites Data
const ramsarSites = [
  { id: "tso_kar", name: "Tso Kar Wetland Complex", coords: [33.25, 78.03] },
  { id: "tsomoriri", name: "Tsomoriri Lake", coords: [32.95, 78.33] },
  { id: "asan", name: "Asan Conservation Reserve", coords: [30.44, 77.72] },
  { id: "pala", name: "Pala Wetland", coords: [24.25, 93.82] },
  { id: "loktak", name: "Loktak Lake", coords: [24.55, 93.78] },
  { id: "deepor", name: "Deepor Beel", coords: [26.13, 91.65] },
  { id: "rudrasagar", name: "Rudrasagar Lake", coords: [23.5, 91.25] },
  {
    id: "shallabugh",
    name: "Shallabugh Wetland Conservation Reserve",
    coords: [34.12, 74.71],
  },
  {
    id: "hygam",
    name: "Hygam Wetland Conservation Reserve",
    coords: [34.28, 74.5],
  },
  { id: "hokera", name: "Hokera Wetland", coords: [34.07, 74.72] },
  {
    id: "surinsar_mansar",
    name: "Surinsar-Mansar Lakes",
    coords: [32.73, 75.15],
  },
  { id: "wular", name: "Wular Lake", coords: [34.41, 74.62] },
  { id: "chandra_taal", name: "Chandra Taal", coords: [32.48, 77.61] },
  { id: "pong_dam", name: "Pong Dam Lake", coords: [32.02, 76.07] },
  { id: "renuka", name: "Renuka Lake", coords: [30.61, 77.43] },
  { id: "harike_lake", name: "Harike Lake", coords: [31.16, 74.95] },
  {
    id: "beas_conservation",
    name: "Beas Conservation Reserve",
    coords: [31.45, 75.0],
  },
  { id: "kanjli_lake", name: "Kanjli Lake", coords: [31.43, 75.38] },
  {
    id: "keshopur_miani",
    name: "Keshopur-Miani Community Reserve",
    coords: [32.04, 75.41],
  },
  {
    id: "nangal_wls",
    name: "Nangal Wildlife Sanctuary",
    coords: [31.38, 76.37],
  },
  { id: "ropar_wetland", name: "Ropar Wetland", coords: [31.01, 76.52] },
  { id: "east_kolkata", name: "East Kolkata Wetlands", coords: [22.53, 88.45] },
  {
    id: "sundarban_wetland",
    name: "Sunderban Wetland",
    coords: [21.95, 88.85],
  },
  { id: "ansupa_lake", name: "Ansupa Lake", coords: [20.48, 85.62] },
  { id: "hirakud_reservoir", name: "Hirakud Reservoir", coords: [21.5, 83.87] },
  { id: "tampara_lake", name: "Tampara Lake", coords: [19.35, 84.8] },
  { id: "chilika_lake", name: "Chilika Lake", coords: [19.81, 85.5] },
  { id: "satkosia_gorge", name: "Satkosia Gorge", coords: [20.58, 84.75] },
  { id: "bhitarkanika", name: "Bhitarkanika Mangrove", coords: [20.63, 86.87] },
  {
    id: "kanwar_lake",
    name: "Kanwar Lake (Kabartal Wetland)",
    coords: [25.58, 86.12],
  },
  { id: "nagi_bird", name: "Nagi Bird Sanctuary", coords: [24.61, 86.74] },
  { id: "nakti_bird", name: "Nakti Bird Sanctuary", coords: [24.59, 86.74] },
  { id: "yashwant_sagar", name: "Yashwant Sagar", coords: [22.75, 75.73] },
  { id: "sakhya_sagar", name: "Sakhya Sagar", coords: [25.99, 78.08] },
  { id: "sirpur_wetland", name: "Sirpur Wetland", coords: [22.72, 75.89] },
  { id: "bhoj_wetland", name: "Bhoj Wetland", coords: [23.22, 77.41] },
  { id: "tawa_reservoir", name: "Tawa Reservoir", coords: [22.63, 77.95] },
  {
    id: "sultanpur_np",
    name: "Sultanpur National Park",
    coords: [28.46, 76.89],
  },
  {
    id: "bhindawas_wls",
    name: "Bhindawas Wildlife Sanctuary",
    coords: [28.48, 76.39],
  },
  {
    id: "bakhira_wls",
    name: "Bakhira Wildlife Sanctuary",
    coords: [26.99, 83.12],
  },
  {
    id: "haiderpur_wetland",
    name: "Haiderpur Wetland",
    coords: [29.25, 78.02],
  },
  {
    id: "upper_ganga",
    name: "Upper-Ganga River (Brijghat to Narora Stretch)",
    coords: [28.8, 78.32],
  },
  { id: "sandi_bird", name: "Sandi Bird Sanctuary", coords: [27.27, 79.95] },
  { id: "sarsai_nawar", name: "Sarsai Nawar Jheel", coords: [26.89, 79.73] },
  { id: "sur_sarovar", name: "Sur Sarovar", coords: [27.18, 77.89] },
  {
    id: "samaspur_bird",
    name: "Samaspur Bird Sanctuary",
    coords: [26.22, 81.35],
  },
  { id: "saman_bird", name: "Saman Bird Sanctuary", coords: [26.9, 79.77] },
  {
    id: "parvati_agra",
    name: "Parvati Agra Bird Sanctuary",
    coords: [26.86, 79.81],
  },
  {
    id: "nawabganj_bird",
    name: "Nawabganj Bird Sanctuary",
    coords: [26.92, 80.33],
  },
  { id: "sambhar_lake", name: "Sambhar Lake", coords: [27.0, 75.02] },
  { id: "keoladeo_np", name: "Keoladeo National Park", coords: [27.16, 77.52] },
  {
    id: "nalsarovar",
    name: "Nalsarovar Bird Sanctuary",
    coords: [22.75, 72.03],
  },
  {
    id: "thol_lake",
    name: "Thol Lake Wildlife Sanctuary",
    coords: [23.1, 72.38],
  },
  { id: "wadhvana", name: "Wadhvana Wetland", coords: [22.18, 73.5] },
  {
    id: "khijadiya",
    name: "Khijadiya Wildlife Sanctuary",
    coords: [22.5, 70.05],
  },
  { id: "nanda_lake", name: "Nanda Lake", coords: [15.24, 73.99] },
  {
    id: "nandur_madhameshwar",
    name: "Nandur Madhameshwar",
    coords: [20.16, 74.03],
  },
  { id: "lonar_lake", name: "Lonar Lake", coords: [19.98, 76.5] },
  { id: "thane_creek", name: "Thane Creek", coords: [19.12, 72.97] },
  {
    id: "aghanashini_estuary",
    name: "Aghanashini Estuary",
    coords: [14.54, 74.34],
  },
  {
    id: "magadi_kere",
    name: "Magadi Kere Conservation Reserve",
    coords: [14.77, 75.63],
  },
  {
    id: "ranganathittu_bs",
    name: "Ranganathittu Bird Sanctuary",
    coords: [12.42, 76.65],
  },
  {
    id: "ankasamudra_bird",
    name: "Ankasamudra Bird Conservation Reserve",
    coords: [14.93, 75.96],
  },
  { id: "vembanad_kol", name: "Vembanad Kol Wetland", coords: [9.68, 76.39] },
  { id: "sasthamkotta", name: "Sasthamkotta Lake", coords: [9.02, 76.61] },
  { id: "ashtamudi", name: "Ashtamudi Wetland", coords: [8.94, 76.57] },
  { id: "kolleru", name: "Kolleru Lake", coords: [16.62, 81.22] },
  { id: "udhwa_lake", name: "Udhwa Lake", coords: [24.52, 87.85] },
  { id: "khecheopalri", name: "Khecheopalri Wetland", coords: [27.34, 88.18] },
  { id: "vellode_bs", name: "Vellode Bird Sanctuary", coords: [11.25, 77.65] },
  {
    id: "kanjirankulam_bs",
    name: "Kanjirankulam Bird Sanctuary",
    coords: [9.18, 78.39],
  },
  {
    id: "longwood_shola",
    name: "Longwood Shola Reserve Forest",
    coords: [11.4, 76.71],
  },
  {
    id: "karaivetti_bs",
    name: "Karaivetti Bird Sanctuary",
    coords: [10.94, 79.18],
  },
  { id: "vaduvur_bs", name: "Vaduvur Bird Sanctuary", coords: [10.59, 79.27] },
  {
    id: "suchindram_theroor",
    name: "Suchindram Theroor Wetland Complex",
    coords: [8.15, 77.47],
  },
  {
    id: "chitrangudi_bs",
    name: "Chitrangudi Bird Sanctuary",
    coords: [9.25, 78.42],
  },
  {
    id: "udayamarthandapuram_bs",
    name: "Udayamarthandapuram Bird Sanctuary",
    coords: [10.47, 79.4],
  },
  {
    id: "vedanthangal_bs",
    name: "Vedanthangal Bird Sanctuary",
    coords: [12.53, 79.86],
  },
  {
    id: "vembanur_wetland",
    name: "Vembanur Wetland Complex",
    coords: [8.28, 77.39],
  },
  {
    id: "koonthankulam_bs",
    name: "Koonthankulam Bird Sanctuary",
    coords: [8.58, 77.78],
  },
  { id: "karikili_bs", name: "Karikili Bird Sanctuary", coords: [12.6, 79.85] },
  {
    id: "pichavaram_mangrove",
    name: "Pichavaram Mangrove",
    coords: [11.42, 79.79],
  },
  {
    id: "gulf_mannar",
    name: "Gulf of Mannar Marine Biosphere Reserve",
    coords: [9.23, 79.26],
  },
  {
    id: "pallikaranai_marsh",
    name: "Pallikaranai Marsh Reserve Forest",
    coords: [12.95, 80.21],
  },
  {
    id: "point_calimere",
    name: "Point Calimere Wildlife and Bird Sanctuary",
    coords: [10.3, 79.85],
  },
  {
    id: "kazhuveli_sanctuary",
    name: "Kazhuveli Sanctuary",
    coords: [12.01, 79.9],
  },
  {
    id: "nanjarayan_bs",
    name: "Nanjarayan Bird Sanctuary",
    coords: [11.14, 77.27],
  },
  {
    id: "sakkarakottai_bs",
    name: "Sakkarakottai Bird Sanctuary",
    coords: [9.79, 78.99],
  },
  {
    id: "therthangal_bs",
    name: "Therthangal Bird Sanctuary",
    coords: [9.78, 78.98],
  },
];

// Function to shuffle array
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// 🎤 Function for voice announcement
const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
};

const RamsarQuiz = () => {
  const [shuffledSites, setShuffledSites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answeredSites, setAnsweredSites] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = shuffleArray(ramsarSites);
    setShuffledSites(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledSites.length === 0 || isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    speak(shuffledSites[currentIndex].name);
  }, [currentIndex, shuffledSites]);

  const checkAnswer = (clickedSite) => {
    if (clickedSite === shuffledSites[currentIndex].id) {
      setAnsweredSites((prev) => [...prev, clickedSite]);
      setFeedback(`✅ Correct! That’s ${shuffledSites[currentIndex].name}.`);
      if (currentIndex + 1 < shuffledSites.length) {
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
      {shuffledSites.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Quiz: Click on {shuffledSites[currentIndex].name}
          </h1>
          <NationalParkMap
            nationalParks={shuffledSites}
            center={[23.5, 80]} // Centering on India
            zoom={4.4}
            checkAnswer={checkAnswer}
            answeredParks={answeredSites}
            isZoomable={true}
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
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                fontWeight: "bold",
                backgroundColor: "#424242",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Go to Home Page
            </button>
          </div>
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>Loading Ramsar Sites...</h2>
      )}
    </div>
  );
};

export default RamsarQuiz;
