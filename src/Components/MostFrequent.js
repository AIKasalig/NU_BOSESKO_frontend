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

function MostFrequent({ questionId }) {
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
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState();
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
    const generateTableData = async () => {
      try {
        if (data) {
          const response = await axios.post(
            `${API_BASE_URL}/get_frequent`,
            { texts: data }
          );
          const dataArray = Object.entries(response.data).map(
            ([name, value]) => ({
              name,
              value,
            })
          );
          setTableData(dataArray);
        }
      } catch (error) {
        console.error(error);
      }
    };
    generateTableData();
  }, [data]);
  return (
    <>
      {tableData ? (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <h3 className="text-lg font-semibold text-center pb-16">
            Most Frequent Words
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tableData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={CustomXAxisTick} />
              <YAxis
                type="category"
                dataKey="name"
                tick={CustomYAxisTick}
                //width={100}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#1498FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
}

export default MostFrequent;
