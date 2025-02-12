import React from "react";
import { useParams } from "react-router-dom";

const NationalParkQuiz = () => {
  const { region } = useParams();
  console.log(region);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Quiz for {region.replace("-", " ")}</h1>
      <p>Quiz content will be here...</p>
    </div>
  );
};

export default NationalParkQuiz;
