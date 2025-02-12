import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";

// ✅ India TopoJSON Data
const INDIA_TOPO_JSON =
  "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@dc5d493/topojson/india.json";

// ✅ Define Regions with Ladakh Included
const regions = {
  "NorthEast India": [
    "Arunachal Pradesh",
    "Assam",
    "Meghalaya",
    "Manipur",
    "Mizoram",
    "Nagaland",
    "Tripura",
  ],
  "J&K, Ladakh, Punjab, Haryana": [
    "Jammu and Kashmir",
    "Ladakh",
    "Punjab",
    "Haryana",
  ],
  "Uttarakhand & Himachal": ["Uttarakhand", "Himachal Pradesh"],
  "Rajasthan & Gujarat": ["Rajasthan", "Gujarat"],
  "Uttar Pradesh & Bihar": ["Uttar Pradesh", "Bihar"],
  "West Bengal, Odisha, Jharkhand, Chhattisgarh": [
    "West Bengal",
    "Odisha",
    "Jharkhand",
    "Chhattisgarh",
  ],
  "Madhya Pradesh & Maharashtra": ["Madhya Pradesh", "Maharashtra"],
  "Telangana, Andhra, Karnataka": ["Telangana", "Andhra Pradesh", "Karnataka"],
  "Kerala & Tamil Nadu": ["Kerala", "Tamil Nadu"],
};

// ✅ Define Colors for Each Region
const regionColors = {
  "NorthEast India": "#FF5733",
  "J&K, Ladakh, Punjab, Haryana": "#33FF57",
  "Uttarakhand & Himachal": "#3357FF",
  "Rajasthan & Gujarat": "#FF33A1",
  "Uttar Pradesh & Bihar": "#A133FF",
  "West Bengal, Odisha, Jharkhand, Chhattisgarh": "#FFC300",
  "Madhya Pradesh & Maharashtra": "#33FFF6",
  "Telangana, Andhra, Karnataka": "#FF5733",
  "Kerala & Tamil Nadu": "#5733FF",
};

const RegionMap = () => {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // ✅ Handles region click navigation
  const handleRegionClick = (regionName) => {
    console.log("Clicked Region:", regionName); // Debug Log

    // ✅ Match with the exact region name from `regions`
    if (regionName === "J&K, Ladakh, Punjab, Haryana") {
      console.log("Routing to: /quiz/jkl"); // Debug Log
      navigate("/quiz/jkl"); // ✅ Fixed Route
    } else if (regionName === "Uttarakhand & Himachal") {
      console.log("Routing to: /quiz/uhp"); // Debug Log
      navigate("/quiz/uhp"); // ✅ Fixed Route
    } else if (regionName === "Uttar Pradesh & Bihar") {
      console.log("Routing to: /quiz/upb"); // Debug Log
      navigate("/quiz/upb"); // ✅ Fixed Route
    } else if (regionName === "NorthEast India") {
      console.log("Routing to: /quiz/neq"); // Debug Log
      navigate("/quiz/neq"); // ✅ Fixed Route
    } else if (regionName === "Rajasthan & Gujarat") {
      console.log("Routing to: /quiz/rgq"); // Debug Log
      navigate("/quiz/rgq"); // ✅ Fixed Route
    } else if (regionName === "Madhya Pradesh & Maharashtra") {
      console.log("Routing to: /quiz/mpm"); // Debug Log
      navigate("/quiz/mpm"); // ✅ Fixed Route
    } else if (regionName === "West Bengal, Odisha, Jharkhand, Chhattisgarh") {
      console.log("Routing to: /quiz/wbojcg"); // Debug Log
      navigate("/quiz/wbojcg"); // ✅ Fixed Route
    } else if (regionName === "Telangana, Andhra, Karnataka") {
      console.log("Routing to: /quiz/tapkt"); // Debug Log
      navigate("/quiz/tapkt"); // ✅ Fixed Route
    } else if (regionName === "Kerala & Tamil Nadu") {
      console.log("Routing to: /quiz/ktn"); // Debug Log
      navigate("/quiz/ktn"); // ✅ Fixed Route
    } else {
      const formattedRegion = regionName
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, ""); // ✅ Remove special characters
      console.log(`Routing to: /quiz/${formattedRegion}`); // Debug Log
      navigate(`/quiz/${formattedRegion}`);
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* ✅ Display Hovered Region Name */}
      {hoveredRegion && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "16px",
            zIndex: 10,
          }}
        >
          {hoveredRegion}
        </div>
      )}

      {/* ✅ Map Component */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [80, 22] }}
        style={{ width: "100%", height: "90vh" }}
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.st_nm; // ✅ Correct property for state name
              const region = Object.keys(regions).find((region) =>
                regions[region].includes(stateName)
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={region ? regionColors[region] : "#EEE"}
                  stroke="#FFF"
                  onClick={() => region && handleRegionClick(region)}
                  onMouseEnter={() => setHoveredRegion(region || stateName)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#FFD700", cursor: "pointer" },
                    pressed: { fill: "#FF6347" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default RegionMap;
