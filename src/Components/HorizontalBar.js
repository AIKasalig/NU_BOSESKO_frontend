import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const HorizontalBar = ({ questionId }) => {
  const [data, setData] = useState([]);
  const [countedData, setCountedData] = useState([]);

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
    // Count the occurrences of each unique value in the data
    const counts = {};
    data.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });

    // Convert the counts into an array of objects
    const countedDataArray = Object.entries(counts).map(([value, count]) => ({
      value,
      count,
    }));
    setCountedData(countedDataArray);
  }, [data]);

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="10">
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} textAnchor="end" fill="#666" fontSize="10">
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={countedData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={CustomXAxisTick} />
          <YAxis
            type="category"
            dataKey="value"
            tick={CustomYAxisTick}
            //width={100}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#1498FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBar;
