import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
function WordCloud({ questionId }) {
  const [data, setData] = useState();
  const [imgWordCloud, setImgWordCloud] = useState();

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
    const generateWordCloud = async () => {
      try {
        if (data) {
          const response = await axios.post(
            `${API_BASE_URL}/generate_wordcloud`,
            { texts: data },
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(response.data);
          setImgWordCloud(imageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    generateWordCloud();
  }, [data]);
  return (
    <div className="pt-10">
      <h2 className="text-center text-lg font-semibold">WordCloud</h2>
      {imgWordCloud ? (
        <img src={imgWordCloud} alt="Word Cloud" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}

export default WordCloud;
