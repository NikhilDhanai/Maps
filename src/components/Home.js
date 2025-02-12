import React from "react";
import RegionMap from "./RegionMap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Handles region selection
  const handleRegionClick = (region) => {
    console.log("Clicked Region:", region);
    if (region === "J&K, Ladakh, Punjab, Haryana") {
      navigate("/quiz/jkl"); // Navigate to JKL Quiz page
    } else if (region === "Uttarakhand & Himachal") {
      navigate("/quiz/uhp"); // ✅ Fixed Route
    } else if (region === "Uttar Pradesh & Bihar") {
      navigate("/quiz/upb"); // ✅ Fixed Route
    } else if (region === "NorthEast India") {
      navigate("/quiz/neq"); // ✅ Fixed Route
    } else if (region === "Rajasthan & Gujarat") {
      navigate("/quiz/rgq"); // ✅ Fixed Route
    } else if (region === "Madhya Pradesh & Maharashtra") {
      navigate("/quiz/mpm"); // ✅ Fixed Route
    } else if (region === "West Bengal, Odisha, Jharkhand, Chhattisgarh") {
      navigate("/quiz/wbojcg"); // ✅ Fixed Route
    } else if (region === "Telangana, Andhra, Karnataka") {
      navigate("/quiz/tapkt"); // ✅ Fixed Route
    } else if (region === "Kerala & Tamil Nadu") {
      navigate("/quiz/ktn"); // ✅ Fixed Route
    } else {
      navigate(`/quiz/${region.replace(/\s+/g, "-").toLowerCase()}`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Select a Region to Start the Quiz</h1>
      <RegionMap onRegionClick={handleRegionClick} /> {/* Pass click handler */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/ramsar-quiz")}
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
          Go to Ramsar Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
