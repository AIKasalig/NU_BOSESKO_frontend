import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import HorizontalBar from "./Components/HorizontalBar";
import Thematic from "./Components/Thematic";
import WordCloud from "./Components/WordCloud";
import Bigram from "./Components/Bigram";
import MostFrequent from "./Components/MostFrequent";
import StopWordUploader from "./Components/StopWordUploader";
import SentimentAnalysis from "./Components/SentimentAnalysis";
import EmotionGraph from "./Components/EmotionGraph";
import API_BASE_URL from "./config/api";

function AnalyzeSurvey() {
  const [surveys, setSurveys] = useState();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 7;
  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/survey`);
        setSurveys(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSurveyClick = async (surveyId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/questionnaires/${surveyId}`
      );

      setQuestions(response.data);
      setCurrentPage(1); // Reset to the first page when a new survey is selected
      const selected = surveys.find((survey) => survey.id === surveyId);
      setSelectedSurvey(selected);
      // Close dropdown after clicking
      if (detailsRef.current) {
        detailsRef.current.open = false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate the index range for questions on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex">
        {/* Start of dropdown */}
        <details ref={detailsRef} className="dropdown flex-1">
          <summary className="btn bg-blue-700 text-white hover:bg-white hover:text-black rounded-full border-none">
            {selectedSurvey ? selectedSurvey.title : "Select Survey"}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>
          {/* End of dropdown */}
          <ul className="p-2 shadow menu dropdown-content rounded-box w-fit bg-base-100 z-10">
            {surveys &&
              surveys.map((survey) => (
                <li key={survey.id}>
                  <button
                    className="py-2 px-2"
                    onClick={() => handleSurveyClick(survey.id)}
                  >
                    {survey.title}
                  </button>
                </li>
              ))}
          </ul>
        </details>
        <StopWordUploader />
      </div>
      <div className="divider" />
      {currentQuestions.length > 0 &&
        currentQuestions.map((question, index) => {
          return (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-arrow bg-blue-300 shadow-sm mx-0 mt-3"
            >
              <div className="collapse-title text-sm flex items-center">
                {index + 1 + indexOfFirstQuestion}. {question.question}
              </div>
              {/* Enter content here */}
              <div className="collapse-content bg-white">
                {question.type === "openEnded" ? (
                  <div>
                    <div className="flex w-full">
                      <div className="w-1/2 h-fit">
                        <Thematic questionId={question.id} />
                      </div>
                      <div className="w-1/2 h-fit">
                        <WordCloud questionId={question.id} />
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="w-1/2 h-fit">
                        <Bigram questionId={question.id} />
                      </div>
                      <div className="w-1/2 h-fit">
                        <MostFrequent questionId={question.id} />
                      </div>
                    </div>
                    <div className="flex w-full mx-auto">
                      <div className="w-1/2 h-fit">
                        <SentimentAnalysis questionId={question.id} />
                      </div>
                      <div className="w-1/2 h-fit flex items-center justify-center">
                        <EmotionGraph questionId={question.id} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <HorizontalBar questionId={question.id}></HorizontalBar>
                )}
              </div>
            </div>
          );
        })}

      {/* Pagination */}
      {questions.length > questionsPerPage && (
        <ul className="pagination flex mx-auto py-5 gap-3">
          {Array.from({
            length: Math.ceil(questions.length / questionsPerPage),
          }).map((_, pageNumber) => (
            <li key={pageNumber}>
              <button
                className={`btn ${
                  currentPage === pageNumber + 1 ? "bg-blue-700 text-white" : ""
                }`}
                onClick={() => paginate(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default AnalyzeSurvey;
