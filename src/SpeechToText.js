import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "./config/api";
function SpeechToText() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioText, setAudioText] = useState(null);

  useEffect(() => {
    getAudioPermission();
  });

  useEffect(() => {
    let interval;
    if (recordingStatus === "recording") {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); //set timer every second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recordingStatus]);

  const getAudioPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    setAudioText(null);
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: "audio/webm" });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const uploadAudio = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const audioFile = new File([audioBlob], "recording.webm", {
      type: "audio/webm",
    });

    const formData = new FormData();
    formData.append("uploaded_file", audioFile);

    try {
      const response = axios.post(
        `${API_BASE_URL}/speechtotext`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAudioText((await response).data["text"]);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      console.log("stopping record");
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      uploadAudio();
      setTimer(0);
    };
  };
  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center">
        <h2 className="text-2xl">Speech to Text API testing</h2>
        <p className="text-sm font-thin text-center">
          Press the microphone to test the API.{" "}
          <span className="font-semibold">Note:</span>API is capable of english
          only as of now
        </p>
        <div className="h-56 w-56 mt-10 rounded-full cursor-pointer border border-gray-300 flex justify-center items-center">
          {recordingStatus === "recording" ? (
            //stop icon svg
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 mx-auto text-gray-400"
              onClick={stopRecording}
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 mx-auto text-gray-400"
              onClick={startRecording}
            >
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
          )}
        </div>
        {/* Timer Display */}
        {recordingStatus === "recording" && (
          <div className="text-center mt-5">
            <span className="transform -translate-x-1/2 text-black text-md">
              {formatTime(timer)}
            </span>
          </div>
        )}

        {audio ? (
          <>
            <div className="audio-container mt-5">
              <audio src={audio} controls></audio>
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg font-semibold">Transcribed Text</h2>
              {audioText != null ? (
                <p className="font-light text-black">{audioText}</p>
              ) : (
                <span className="loading loading-dots loading-sm"></span>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default SpeechToText;
