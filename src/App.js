import React from "react";
import Table from "./Components/Table";
import { LineChart, Line } from "recharts";
const App = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 550, pv: 2800, amt: 2100 },
    { name: "Page D", uv: 350, pv: 2300, amt: 2900 },
    { name: "Page E", uv: 1250, pv: 2100, amt: 2500 },
  ];
  return (
    <>
      <div className="w-full h-fit flex flex-col lg:flex-row gap-10">
        {/* First Card */}
        <div className="w-full h-72 bg-white rounded-3xl shadow-sm px-5 py-5">
          <div className="flex w-full justify-between">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mx-auto text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.54 15h6.42l.5 1.5H8.29l.5-1.5zm8.085-8.995a.75.75 0 10-.75-1.299 12.81 12.81 0 00-3.558 3.05L11.03 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 001.146-.102 11.312 11.312 0 013.612-3.321z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-19 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl mt-16 font-medium">Survey on Progress</h2>
          <h2 className="mt-2 text-3xl font-semibold">
            3.279
            <span className="text-sm text-gray-400 font-light">
              answers/day
            </span>
          </h2>
          <progress
            className="progress w-full mt-7 progress-error"
            value="75"
            max="100"
          ></progress>
          <h3 className="text-xs text-gray-400">75/100</h3>
        </div>
        {/* 2nd Card */}
        <div className="w-full h-72 bg-white rounded-3xl shadow-sm px-5 py-5">
          <div className="flex w-full justify-between">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-100"
              >
                <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-19 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mt-16 text-xl font-medium">Categorical Questions</h2>
          <h2 className="mt-2 text-3xl font-semibold">
            8<span className="text-sm text-gray-400 font-light">questions</span>
          </h2>
          <progress
            className="progress w-full mt-7 progress-error"
            value="75"
            max="100"
          ></progress>
          <h3 className="text-xs text-gray-400">75/100</h3>
        </div>
        {/* 3rd Card */}
        <div className="w-full h-72 bg-white rounded-3xl shadow-sm px-5 py-5">
          <div className="flex w-full justify-between">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-19 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mt-16 text-xl font-medium">Open Ended</h2>
          <h2 className="mt-2 text-3xl font-semibold">
            4<span className="text-sm text-gray-400 font-light">questions</span>
          </h2>
          <progress
            className="progress w-full mt-7 progress-error"
            value="75"
            max="100"
          ></progress>
          <h3 className="text-xs text-gray-400">75/100</h3>
        </div>
      </div>
      {/* 2nd div */}
      <div className="w-full h-full flex-col lg:flex-row gap-10 my-10 flex">
        <div className="w-full lg:w-2/3 h-full hidden lg:block">
          {/* Big table card */}
          <div className="w-full h-full bg-white rounded-3xl shadow-sm p-10">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Recent Answers</h3>
              <button className="btn bg-blue-700 text-white rounded-full hover:bg-white hover:text-black border-none">
                See More
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* Start table */}
            <Table />
          </div>
        </div>
        <div className="w-full lg:w-1/3 h-full flex flex-col gap-5">
          <div className="w-full h-full lg:h-1/2 bg-gradient-to-br from-blue-700 to-secondary rounded-3xl shadow-sm p-10">
            <button className="btn bg-white border-none rounded-full">
              Upload File
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <h3 className="text-4xl text-white font-bold mt-5">
              Analyse CSV Files
            </h3>
          </div>
          <div className="w-full h-full lg:h-1/2 bg-blue-700 rounded-xl shadow-sm p-8">
            <h3 className="text-2xl text-white font-semibold">
              Website Traffic
            </h3>
            <p className="text-gray-100 font-extralight text-sm">As of August 22,2023</p>
            <div className="flex w-full h-full items-start justify-center">
              <LineChart width={300} height={200} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#FFFFFF" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
