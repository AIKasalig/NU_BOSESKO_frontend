import React, { useRef } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const StopWordUploader = () => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = async () => {
    try{
        await axios.post(`${API_BASE_URL}/reset_stopwords`);
        window.location.reload();
    }
    catch(error){
        console.error(error)
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API_BASE_URL}/upload_stopwords`,
        formData
      );
      document.getElementById("my_modal_3").showModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-success">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                window.location.reload();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Sucess!</h3>
          <p className="py-4">
            Press ESC key or click on ✕ button to reload the page
          </p>
        </div>
      </dialog>
      <div className="flex gap-5">
        {/* First button */}
        <div className="space-y-4">
          <button
            onClick={handleUploadButtonClick}
            className="bg-blue-700 hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-full cursor-pointer flex text-sm items-center"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                />
              </svg>
            </span>
            ADD STOPWORDS
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
        </div>
        {/* Second button */}
        <button className="btn rounded-full bg-error py-3 px-4" onClick={handleReset}>
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </span>
          RESET STOPWORDS
        </button>
      </div>
    </>
  );
};

export default StopWordUploader;
