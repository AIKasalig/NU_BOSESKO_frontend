import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function EmotionGraph({ questionId }) {
  const [iframeSrc, setIframeSrc] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/responses/${questionId}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [questionId]);
  useEffect(() => {
    const generateFrame = async () => {
      try {
        if (data) {
          const response = await axios.post(
            `${API_BASE_URL}/generate_emotiongraph`,
            { texts: data }
          );

          const blob = new Blob([response.data], { type: "text/html" });
          const url = URL.createObjectURL(blob);
          setIframeSrc(url);
        }
      } catch (error) {
        console.error(error);
      }
    };
    generateFrame();
  }, [data]);

  return (
    <>
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          title="Emotion Graph"
          width="80%"
          height="400px"
        ></iframe>
      )}
    </>
  );
}

export default EmotionGraph;
